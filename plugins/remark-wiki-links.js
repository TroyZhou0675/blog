/**
 * remark-wiki-links.js
 *
 * Reads all notes at build time and resolves [[Wiki Links]] to real URLs.
 * Supports: [[Page Title]] and [[alias|Page Title]]
 *
 * Run once at module level during Astro build.
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { visit } from 'unist-util-visit';
/**
 * Simple frontmatter parser - extracts title from YAML frontmatter
 * Matches: title: '...' or title: "..." or title: ...
 */
function extractTitle(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  const fm = match[1];
  const titleMatch = fm.match(/^title:\s*['"](.*?)['"]|^\s+title:\s*['"](.*?)['"]/m);
  return titleMatch ? (titleMatch[1] || titleMatch[2]) : null;
}

const NOTES_DIR = new URL('../src/content/notes/', import.meta.url).pathname;

/** Recursively collect all .md file paths */
function getAllNotePaths(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...getAllNotePaths(full));
    } else if (extname(entry) === '.md') {
      results.push(full);
    }
  }
  return results;
}

/** Build { title: slug } and { slug: title } maps */
function buildNoteMaps() {
  const titleToSlug = new Map(); // "标题" → "category/note-slug"
  const slugToTitle = new Map(); // "category/note-slug" → "标题"

  const files = getAllNotePaths(NOTES_DIR);
  for (const file of files) {
    try {
      const raw = readFileSync(file, 'utf-8');
      const title = extractTitle(raw);
      if (!title) continue;

      // Derive slug from file path (mimics Astro's slug behavior)
      let slug = file.replace(NOTES_DIR, '').replace(/\.md$/, '').replace(/\\/g, '/');
      // Normalize: lowercase, spaces → hyphens
      slug = slug.split('/').map(s => s.toLowerCase().replace(/\s+/g, '-')).join('/');

      titleToSlug.set(title, slug);
      slugToTitle.set(slug, title);
    } catch (e) {
      // ignore
    }
  }
  return { titleToSlug, slugToTitle };
}

const { titleToSlug } = buildNoteMaps();

/**
 * Remark plugin: transforms [[Wiki Links]] into markdown links
 */
export function remarkWikiLinks() {
  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      if (!parent || index == null) return;

      const wikiLinkRegex = /\[\[([^\]|]+?)(?:\|([^\]]+?))?\]\]/g;
      const text = node.value;
      if (!wikiLinkRegex.test(text)) return;

      wikiLinkRegex.lastIndex = 0; // reset
      const newChildren = [];
      let lastIndex = 0;
      let match;

      while ((match = wikiLinkRegex.exec(text)) !== null) {
        const [full, pageName, alias] = match;
        const displayText = alias || pageName;
        const start = match.index;

        // Text before the wiki link
        if (start > lastIndex) {
          newChildren.push({ type: 'text', value: text.slice(lastIndex, start) });
        }

        // Resolve wiki link to URL
        const slug = titleToSlug.get(pageName.trim());
        if (slug) {
          // Found: make it an internal link
          newChildren.push({
            type: 'link',
            url: `/notes/${slug}/`,
            title: null,
            children: [{ type: 'text', value: displayText }],
            data: {
              hProperties: { className: 'internal-link' },
            },
          });
        } else {
          // Not found: render as span with "missing" class
          newChildren.push({
            type: 'html',
            value: `<span class="wiki-link-missing" title="笔记不存在: ${pageName}">${displayText}</span>`,
          });
        }

        lastIndex = start + full.length;
      }

      // Remaining text
      if (lastIndex < text.length) {
        newChildren.push({ type: 'text', value: text.slice(lastIndex) });
      }

      if (newChildren.length > 0) {
        parent.children.splice(index, 1, ...newChildren);
      }
    });
  };
}
