const markdownLib = require('markdown-it')();

const callout = (content, type = 'info') => {
    const typeClasses = {
        info: 'bg-washed-green b--dark-green',
        warning: 'bg-washed-red b--dark-red',
        tip: 'bg-washed-blue b--dark-blue',
    };

    const chosenTypeClass = typeClasses[type] || typeClasses['info'];
    const renderedHtml = markdownLib.render(content);
    return `<div class="fw5 bl bw2 ph3 pv2 ${chosenTypeClass}">${renderedHtml}</div>`
};

const quote = (content) => {
    const renderedHtml = markdownLib.render(content);
    return `<blockquote class="helvetica ml0 mt0 pl4 black-90 bl bw2 b--blue f5 f4-m f3-l lh-copy measure">${renderedHtml}</blockquote>`;
};

const addAll = (eleventyConfig) => {
    eleventyConfig.addPairedShortcode('quote', quote);
    eleventyConfig.addPairedShortcode('callout', callout);
};

module.exports = addAll;
