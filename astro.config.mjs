import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { remarkWikiLinks } from './plugins/remark-wiki-links.js';
import { rehypeCallouts } from './plugins/rehype-callouts.js';

export default defineConfig({
  site: 'https://troyzhou.top',
  base: '/',
  integrations: [mdx()],
  markdown: {
    remarkPlugins: [remarkMath, remarkWikiLinks],
    rehypePlugins: [rehypeKatex, rehypeCallouts],
  },
});
