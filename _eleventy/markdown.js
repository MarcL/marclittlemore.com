const markdownIt = require('markdown-it');
const markdownItAttributes = require('markdown-it-attrs');
const markdownEmoji = require('markdown-it-emoji').full;
const string = require('string');

// Create own markdown renderer so we can add class attributes
// https://www.11ty.dev/docs/languages/markdown/#markdown-options
const markdownItOptions = {
    html: true,
};

const slugify = text => string(text).slugify().toString();

const markdownLib = markdownIt(markdownItOptions);

// Add slug ID to all tags we want (h2 + h3 at the moment)
const markdownAnchorLinks = (md, options) => {
  const isAnchorableTag = (tag) => tag === 'h2' || tag === 'h3';

  md.renderer.rules.heading_open = (tokens, index) => {
    const contentToken = tokens[index + 1];
    const slug = slugify(contentToken.content);

    if (isAnchorableTag(tokens[index].tag)) {
      return `<${tokens[index].tag} id="${slug}">`;
    }
    
    return `<${tokens[index].tag}>`;
  };

  md.renderer.rules.heading_close = (tokens, index) => {
    return `</${tokens[index].tag}>`;
  };
};

markdownLib
    .use(markdownItAttributes)
    .use(markdownAnchorLinks)
    .use(markdownEmoji);

module.exports = markdownLib;
