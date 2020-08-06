const markdownLib = require('markdown-it')();

const quote = (content) => {
    const renderedHtml = markdownLib.render(content);
    return `<blockquote class="helvetica ml0 mt0 pl4 black-90 bl bw2 b--blue f5 f4-m f3-l lh-copy measure">${renderedHtml}</blockquote>`;
};

const addAll = (eleventyConfig) => {
    eleventyConfig.addPairedShortcode('quote', quote);
};

module.exports = addAll;
