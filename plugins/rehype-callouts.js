/**
 * rehype-callouts.js
 *
 * Transforms Obsidian-style callout blockquotes into styled callout boxes.
 *
 * Syntax:
 *   > [!NOTE]
 *   > Content here
 *
 * Supported types: note, tip, warning, caution, info, success, failure, danger, bug, example, quote
 */

import { visit } from 'unist-util-visit';

const CALLOUT_TYPES = {
  NOTE:     { label: 'Note',     icon: '📝' },
  TIP:      { label: 'Tip',      icon: '💡' },
  WARNING:  { label: 'Warning',  icon: '⚠️' },
  CAUTION:  { label: 'Caution',  icon: '🚧' },
  INFO:     { label: 'Info',     icon: 'ℹ️' },
  SUCCESS:  { label: 'Success',  icon: '✅' },
  FAILURE:  { label: 'Failure',  icon: '❌' },
  DANGER:   { label: 'Danger',  icon: '☠️' },
  BUG:      { label: 'Bug',      icon: '🐛' },
  EXAMPLE:  { label: 'Example',  icon: '📋' },
  QUOTE:    { label: 'Quote',    icon: '❝' },
  QUESTION: { label: 'Question', icon: '❓' },
};

export function rehypeCallouts() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (!parent || index == null) return;
      if (node.tagName !== 'blockquote') return;

      // Get first paragraph's text to check for [!TYPE]
      const firstChild = node.children?.[0];
      if (!firstChild || firstChild.tagName !== 'p') return;

      const firstParaText = extractText(firstChild);
      const match = firstParaText.match(/^\[!(NOTE|TIP|WARNING|CAUTION|INFO|SUCCESS|FAILURE|DANGER|BUG|EXAMPLE|QUOTE|QUESTION)\]/i);

      if (!match) return;

      const type = match[1].toUpperCase();
      const config = CALLOUT_TYPES[type] || CALLOUT_TYPES.NOTE;
      const typeRegex = /^\[!(NOTE|TIP|WARNING|CAUTION|INFO|SUCCESS|FAILURE|DANGER|BUG|EXAMPLE|QUOTE|QUESTION)\]\s*/i;

      // Clean first paragraph: remove the [!TYPE] prefix
      if (firstChild.children?.[0]?.type === 'text') {
        firstChild.children[0].value = firstChild.children[0].value.replace(typeRegex, '');
      }

      // Build callout div structure
      const calloutDiv = {
        type: 'element',
        tagName: 'div',
        properties: {
          className: ['callout', `callout-${type.toLowerCase()}`],
          'data-type': type,
        },
        children: [
          {
            type: 'element',
            tagName: 'div',
            properties: { className: ['callout-header'] },
            children: [
              { type: 'text', value: config.icon + ' ' },
              {
                type: 'element',
                tagName: 'strong',
                properties: {},
                children: [{ type: 'text', value: config.label }],
              },
            ],
          },
          {
            type: 'element',
            tagName: 'div',
            properties: { className: ['callout-body'] },
            children: node.children,
          },
        ],
      };

      parent.children.splice(index, 1, calloutDiv);
    });
  };
}

function extractText(node) {
  if (node.type === 'text') return node.value;
  if (node.children) return node.children.map(extractText).join('');
  return '';
}
