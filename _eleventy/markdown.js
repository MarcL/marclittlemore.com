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

const linkClass = 'w-8 h-8 fill-current';
const linkIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="${linkClass}" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"/></svg>`;

// Render anchor links like GitHub
const markdownAnchorLinks = (md, options) => {
  const defaultOptions = {
    divClass: 'group relative',
    anchorClass: 'hidden lg:inline opacity-10 group-hover:opacity-100 absolute top-1 -left-10',
  };

  const anchorOptions = Object.assign({}, defaultOptions, options);

  const isAnchorableTag = (tag) => tag === 'h2' || tag === 'h3';

  md.renderer.rules.heading_open = (tokens, index) => {
    const contentToken = tokens[index + 1];
    const slug = slugify(contentToken.content);

    if (isAnchorableTag(tokens[index].tag)) {
      return `
      <div class="${anchorOptions.divClass}">
        <${tokens[index].tag} id="${slug}">`;
    }
    return `<${tokens[index].tag}>`;
  };

  md.renderer.rules.heading_close = (tokens, index) => {
    const contentToken = tokens[index - 1];
    const slug = slugify(contentToken.content);

    if (isAnchorableTag(tokens[index].tag)) {
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
