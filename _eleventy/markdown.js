const markdownIt = require('markdown-it');
const markdownItAttributes = require('@gerhobbelt/markdown-it-attrs');
const markdownEmoji = require('markdown-it-emoji');
const string = require('string');

// Create own markdown renderer so we can add class attributes
// https://www.11ty.dev/docs/languages/markdown/#markdown-options
const markdownItOptions = {
    html: true,
};

const slugify = text => string(text).slugify().toString();

const markdownLib = markdownIt(markdownItOptions);

const linkIcon = '<i class="fas fa-link fa-lg"></i>';

// Render anchor links like GitHub
const markdownAnchorLinks = (md, options) => {
  const defaultOptions = {
    divClass: 'group relative',
    anchorClass: 'hidden lg:inline opacity-10 group-hover:opacity-100 absolute top-1 -left-10',
  };

  const anchorOptions = Object.assign({}, defaultOptions, options);

  md.renderer.rules.heading_open = function(tokens, index) {
    const contentToken = tokens[index + 1];
    const slug = slugify(contentToken.content);

    if (tokens[index].tag === 'h2') {
      return `
      <div class="${anchorOptions.divClass}">
        <${tokens[index].tag} id="${slug}">`;
    }
    return `<${tokens[index].tag}>`;
  };

  md.renderer.rules.heading_close = function(tokens, index) {
    const contentToken = tokens[index - 1];
    const slug = slugify(contentToken.content);

    if (tokens[index].tag === 'h2') {
      return `
      </${tokens[index].tag}>
        <a class="${anchorOptions.anchorClass}" href="#${slug}">
          <span aria-hidden="true">${linkIcon}</span>
          <span class="hidden">Permalink to "${contentToken.content}"</span>
        </a>
      </div>`;
    }
    return `</${tokens[index].tag}>`;
  };
};

markdownLib
    .use(markdownItAttributes)
    .use(markdownAnchorLinks)
    .use(markdownEmoji);

module.exports = markdownLib;
