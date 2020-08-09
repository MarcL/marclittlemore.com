const markdownIt = require('markdown-it');
const markdownItAttributes = require('@gerhobbelt/markdown-it-attrs');

// Create own markdown renderer so we can add class attributes
// https://www.11ty.dev/docs/languages/markdown/#markdown-options
const markdownItOptions = {
    html: true,
};
const markdownLib = markdownIt(markdownItOptions);
markdownLib.use(markdownItAttributes);

module.exports = markdownLib;
