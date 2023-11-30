// Copied and adapted from markdown-to-txt
// https://github.com/ejrbuss/markdown-to-txt
const { marked } = require('marked');
const { escape, unescape } = require('lodash');

const block = (text) => text + '\n\n';
const escapeBlock = (text) => escape(text) + '\n\n';
const line = (text) => text + '\n';
const inline = (text) => text;
const newline = () => '\n';
const empty = () => '';

// Text followed by the link in brackets
const formatLink = (href, title, text) => {
  // Is it already a link?
  // If so, don't add the link after it
  if (text.includes('http')) {
    return text;
  }

  return `${text} (${href})`;
};

const TxtRenderer = {
  // Block elements
  code: escapeBlock,
  blockquote: block,
  html: empty,
  heading: block,
  hr: newline,
  list: (text) => block(text.trim()),
  listitem: line,
  checkbox: empty,
  paragraph: block,
  table: (header, body) => line(header + body),
  tablerow: (text) => line(text.trim()),
  tablecell: (text) => text + ' ',
  // Inline elements
  strong: inline,
  em: inline,
  codespan: inline,
  br: newline,
  del: inline,
  link: (href, title, text) => formatLink(href, title, text),
  image: (href, title, text) => text,
  text: inline,
  // etc.
  options: {},
};

/**
 * Converts markdown to plaintext using the marked Markdown library.
 * Accepts [MarkedOptions](https://marked.js.org/using_advanced#options) as
 * the second argument.
 *
 * NOTE: The output of markdownToTxt is NOT sanitized. The output may contain
 * valid HTML, JavaScript, etc. Be sure to sanitize if the output is intended
 * for web use.
 *
 * @param markdown the markdown text to txtify
 * @param options  the marked options
 * @returns the unmarked text
 */
function markdownToTxt(markdown, options) {
  const unmarked = marked(markdown, { ...options, renderer: TxtRenderer });
  const unescaped = unescape(unmarked);
  const trimmed = unescaped.trim();
  return trimmed;
}

module.exports = markdownToTxt;
