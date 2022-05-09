const escape = require('lodash.escape');
const markdownLib = require('./markdown');

const dateToISO = dateValue => new Date(dateValue).toISOString();
const toISOStringFilter = dateValue => dateToISO(dateValue);
const xmlEscapeFilter = value => escape(value);
const markdownifyFilter = value => markdownLib.render(value);

const starRating = value => {
    const rating = Number.parseInt(value, 10);

    const ratingList = [];
    for(let i = 0; i < rating; i++) {
        ratingList.push('<i class="fas fa-star"></i>');
    }

    return ratingList.join('');
};

const webmentionsForUrl = (webmentions, url) => {
    return webmentions
       .filter(mention => mention['wm-target'] === url);
};

const webmentionsSortedByProperty = (webmentions, url) => {
    const mentions = webmentionsForUrl(webmentions, url);
    const sorted = mentions.reduce((accumulator, mention) => {
        const propertyType = mention['wm-property'];
        if (accumulator[propertyType]) {
            accumulator[propertyType] = [mention, ...accumulator[propertyType]];
        } else {
            accumulator[propertyType] = [mention];
        }
    
        return accumulator;
    }, {});
    
    return sorted;
};

const getPostByPath = (collection, path) => {
    const matchingPosts = collection.filter(post => post.url === path);

    if (matchingPosts.length > 0) {
        return matchingPosts[0];
    }

    throw new Error(`getPostByPath filter: Can't find post '${path}'`)
}

const addAll = (eleventyConfig) => {
    eleventyConfig.addFilter('getPostByPath', getPostByPath);
    eleventyConfig.addFilter('keys', object => Object.keys(object));
    eleventyConfig.addLiquidFilter('markdownify', markdownifyFilter);
    eleventyConfig.addLiquidFilter('starRating', starRating);
    eleventyConfig.addLiquidFilter('toISOString', toISOStringFilter);
    eleventyConfig.addLiquidFilter('xmlEscape', xmlEscapeFilter);

    // Webmentions
    eleventyConfig.addFilter('webmentionsForUrl', webmentionsForUrl);
    eleventyConfig.addFilter('webmentionsSortedForUrl', webmentionsSortedByProperty);
};

module.exports = addAll;
