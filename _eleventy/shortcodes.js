const markdownLib = require('markdown-it')();
const imageShortcode = require('./image');

const callout = (content, type = 'info') => {
    const typeClasses = {
        info: {
            background: 'bg-green-100 border-green-800',
            icon: 'fa-info-circle text-green-800'
        },
        warning: {
            background: 'bg-red-100 border-red-800',
            icon: 'fa-exclamation-circle text-red-800'
        },
        tip: {
            background: 'bg-blue-100 border-blue-800',
            icon: 'fa-fire-alt text-blue-800'
        }
    };

    const chosenType = typeClasses[type] || typeClasses['info'];
    const renderedHtml = markdownLib.render(content);

    const iconInfo = `<div class="w-1/6 text-center"><i class="fa fa-2x px-1 py-1 bg-white rounded-full shadow-sm ${chosenType.icon}"aria-hidden="true"></i></div>`;
    return `<div class="w-full px-3 py-4 shadow-lg border-t-2 ${chosenType.background} flex flex-row items-center">${iconInfo}<div class="w-5/6">${renderedHtml}</div></div>`
};

const quote = (content, addQuotes = true) => {
    const renderableContent = addQuotes ? `&ldquo;${content.trim()}&rdquo;` : content;
    const renderedHtml = markdownLib.render(renderableContent);

    return `<div class="p-4 font-semibold text-xl sm:text-2xl italic border-l-4 border-red-600">${renderedHtml}</div>`;
};

const addAll = (eleventyConfig) => {
    eleventyConfig.addPairedShortcode('quote', quote);
    eleventyConfig.addPairedShortcode('callout', callout);
    eleventyConfig.addLiquidShortcode('image', imageShortcode);
};

module.exports = addAll;
