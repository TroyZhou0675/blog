/**
 * rehype-extract-headings.js
 *
 * Extracts h2, h3, h4 headings from the HTML tree and attaches them
 * to the tree's data for consumption by Astro.
 */

import { visit } from 'unist-util-visit';

export function rehypeExtractHeadings() {
  return (tree) => {
    const headings = [];

    visit(tree, 'element', (node) => {
      if (!['h2', 'h3', 'h4'].includes(node.tagName)) return;

      // Get text content of the heading
      const text = getText(node);
      if (!text) return;

      // Generate an id for linking
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\u4e00-\u9fff]+/g, '-')
        .replace(/^-|-$/g, '');

      // Attach id to heading if not present
      if (!node.properties?.id) {
        node.properties = { ...node.properties, id };
      }

      headings.push({
        level: parseInt(node.tagName[1]),
        text,
        id,
      });
    });

    // Attach headings to tree data for Astro to read
    tree.data = { ...tree.data, headings };
  };
}

function getText(node) {
  if (node.type === 'text') return node.value;
  if (node.children) return node.children.map(getText).join('');
  return '';
}
