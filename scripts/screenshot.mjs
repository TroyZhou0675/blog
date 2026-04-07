/**
 * screenshot.mjs — Take screenshots of the running site using headless Chromium
 *
 * Usage:
 *   node scripts/screenshot.mjs                    # screenshot all key pages
 *   node scripts/screenshot.mjs /notes/           # screenshot specific path
 *   node scripts/screenshot.mjs --full             # full-page screenshots
 *
 * Prerequisites:
 *   npm install -D playwright
 *   apt install chromium chromium-headless-shell   # on Debian/Ubuntu
 *   # Or on China servers: use system chromium via PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
 *
 * Output:
 *   Screenshots are saved to /root/Interact/Image/screenshots/
 *   and can be viewed directly by the agent via the Read tool.
 */

import { chromium } from 'playwright';
import { join } from 'node:path';
import http from 'node:http';
import { existsSync, mkdirSync } from 'node:fs';

const OUT_DIR = '/root/Interact/Image/screenshots';
// Use 127.0.0.1 explicitly (avoids Node.js IPv6-first issue on some servers)
const BASE_URL = process.env.SITE_URL || 'http://127.0.0.1:4321';

// Use system Chromium if available (important for China servers where Playwright
// download is blocked). Falls back to Playwright's bundled Chromium.
const SYSTEM_CHROMIUM = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || '/usr/bin/chromium';

// Default pages to screenshot (these are the main pages of troyzhou.top)
const DEFAULT_PAGES = [
  { path: '/', name: 'homepage' },
  { path: '/notes/', name: 'notes-list' },
  { path: '/mri/', name: 'mri-section' },
  { path: '/life/', name: 'life-wall' },
  { path: '/blog/', name: 'blog-list' },
];

async function ensureDir(dir) {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

async function takeScreenshot(page, url, name, fullPage = false) {
  const outPath = join(OUT_DIR, `${name}.png`);
  console.log(`📸  Taking screenshot: ${url} → ${outPath}`);
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  // Brief pause to let fonts/animations settle
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: outPath,
    fullPage,
    timeout: 15000,
  });
  console.log(`✅  Saved: ${outPath}`);
  return outPath;
}

async function checkServer(baseUrl) {
  // Use http.get directly to avoid Node.js IPv6-vs-IPv4 resolution issues
  return new Promise(resolve => {
    const req = http.get(baseUrl, res => resolve(res.statusCode >= 200 && res.statusCode < 400));
    req.on('error', () => resolve(false));
    req.setTimeout(5000, () => { req.destroy(); resolve(false); });
  });
}

async function main() {
  const args = process.argv.slice(2);
  const fullPage = args.includes('--full');
  const specificPath = args.find(a => !a.startsWith('--'));

  await ensureDir(OUT_DIR);

  // Check if server is running
  const serverUp = await checkServer(BASE_URL);
  if (!serverUp) {
    console.error(`❌  Site not running at ${BASE_URL}`);
    console.error(`     Start the dev server first: npm run dev`);
    console.error(`     Or preview the built site: npm run preview`);
    process.exit(1);
  }

  // Use system Chromium if available, otherwise let Playwright find its bundled one
  const browserOpts = { headless: true };
  if (existsSync(SYSTEM_CHROMIUM)) {
    browserOpts.executablePath = SYSTEM_CHROMIUM;
  }
  const browser = await chromium.launch(browserOpts);
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: 2,  // Retina-quality screenshots
  });
  const page = await context.newPage();

  let results = [];

  if (specificPath) {
    const name = specificPath.replace(/\//g, '_').replace(/^_/, '').replace(/_$/, '') || 'page';
    const path = await takeScreenshot(page, BASE_URL + specificPath, name, fullPage);
    results.push(path);
  } else {
    for (const { path, name } of DEFAULT_PAGES) {
      try {
        const outPath = await takeScreenshot(page, BASE_URL + path, name, fullPage);
        results.push(outPath);
      } catch (err) {
        console.error(`⚠️   Failed on ${path}: ${err.message}`);
        // Retry with longer timeout for heavy pages (e.g. notes list with 177 entries)
        if (err.message.includes('Timeout')) {
          console.log(`⏳  Retrying ${path} with longer timeout...`);
          try {
            await page.setDefaultTimeout(60000);
            await page.goto(BASE_URL + path, { waitUntil: 'domcontentloaded', timeout: 60000 });
            await page.waitForTimeout(2000);
            await page.screenshot({ path: outPath, fullPage, timeout: 60000 });
            console.log(`✅  Saved on retry: ${outPath}`);
            results.push(outPath);
          } catch (retryErr) {
            console.error(`⚠️   Retry also failed for ${path}: ${retryErr.message}`);
          }
        }
      }
    }
  }

  await browser.close();

  console.log('\n📁  Screenshots saved to:');
  results.forEach(p => console.log(`   ${p}`));
  console.log('\n💡  Use the Read tool to view: Read("/root/Interact/Image/screenshots/<filename>.png")');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
