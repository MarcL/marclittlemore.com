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
            background: 'bg-lightest-blue b--dark-blue',
            icon: 'fa-fire-alt dark-blue'
        }
    };

    const chosenType = typeClasses[type] || typeClasses['info'];
    const renderedHtml = markdownLib.render(content);

    const iconInfo = `<div class="dtc w-10 v-mid"><i class="fa fa-2x pa1 bg-white br-100 shadow-4 ${chosenType.icon}"aria-hidden="true"></i></div>`;
    return `<div class="dt fw5 bt bw2 br2 br--bottom shadow-4 ph3 pv2 mv2 ${chosenType.background}">${iconInfo}${renderedHtml}</div>`
};

const quote = (content) => {
    const renderedHtml = markdownLib.render(content);
    return `<blockquote class="helvetica ml0 mt0 pl4 black-90 bl bw2 b--blue f5 f4-m f3-l lh-copy measure"><div class="dtc w-90">${renderedHtml}</div></blockquote>`;
};

const addAll = (eleventyConfig) => {
    eleventyConfig.addPairedShortcode('quote', quote);
    eleventyConfig.addPairedShortcode('callout', callout);
};

module.exports = addAll;
