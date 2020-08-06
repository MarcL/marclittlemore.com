const markdownLib = require('markdown-it')();

const callout = (content, type = 'info') => {
    const typeClasses = {
        info: {
            background: 'bg-washed-green b--dark-green',
            icon: 'fa-info-circle dark-green'
        },
        warning: {
            background: 'bg-washed-red b--dark-red',
            icon: 'fa-exclamation-circle dark-red'
        },
        tip: {
            background: 'bg-light-blue b--dark-blue',
            icon: 'fa-lightbulb dark-blue'
        }
    };

    const chosenType = typeClasses[type] || typeClasses['info'];
    const renderedHtml = markdownLib.render(content);

    const iconInfo = `<i class="fa absolute top-0 left-0 pa1 bg-white br-100 shadow-4 ${chosenType.icon}" style="transform: translate(-50%,-50%)"></i>`;
    return `<div class="fw5 bl bw2 br2 shadow-4 ph3 pv2 mv2 relative ${chosenType.background}">${iconInfo}${renderedHtml}</div>`
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
