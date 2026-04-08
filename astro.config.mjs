import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { remarkWikiLinks } from './plugins/remark-wiki-links.js';
import { rehypeCallouts } from './plugins/rehype-callouts.js';

export default defineConfig({
  site: 'https://troyzhou.top',
  base: '/',
  integrations: [mdx(), sitemap()],
  markdown: {
    remarkPlugins: [remarkMath, remarkWikiLinks],
    rehypePlugins: [rehypeKatex, rehypeCallouts],
    shikiConfig: {
      theme: {
        name: 'warm-light',
        type: 'light',
        settings: [],
        colors: {
          'editor.background': '#f5ede3',
          'editor.foreground': '#4a3728',
        },
        tokenColors: [
          { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: '#a09080', fontStyle: 'italic' } },
          { scope: ['keyword', 'storage.type', 'storage.modifier'], settings: { foreground: '#8B5E3C', fontStyle: 'bold' } },
          { scope: ['string', 'constant.other.symbol'], settings: { foreground: '#6B8E5A' } },
          { scope: ['constant.numeric', 'constant.language'], settings: { foreground: '#C4846A' } },
          { scope: ['variable', 'variable.other'], settings: { foreground: '#4a3728' } },
          { scope: ['entity.name.function', 'support.function'], settings: { foreground: '#6B5B8A' } },
          { scope: ['entity.name.type', 'support.type'], settings: { foreground: '#7B6BA0' } },
          { scope: ['keyword.operator', 'punctuation'], settings: { foreground: '#8B6F5E' } },
          { scope: ['entity.other.attribute-name'], settings: { foreground: '#8B6F5E' } },
          { scope: ['meta.tag', 'entity.name.tag'], settings: { foreground: '#8B5E3C' } },
        ],
      },
    },
  },
});
