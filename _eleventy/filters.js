const escape = require('lodash.escape');
const markdownLib = require('./markdown');
const linkifyHtml = require('linkify-html');

const dateToISO = (dateValue) => new Date(dateValue).toISOString();
const toISOStringFilter = (dateValue) => dateToISO(dateValue);
const xmlEscapeFilter = (value) => escape(value);
const markdownifyFilter = (value) => markdownLib.render(value);

const linkifyOptions = {
    // Automatically add target="_blank" and rel for external links
    target: '_blank',
    rel: 'noopener noreferrer',

    // This is a common requirement to convert only plain URLs
    // If your text might contain other HTML tags, you might need linkify-string instead
    // or a more complex setup to avoid linkifying text *within* existing tags.
};

const starRating = (value) => {
    const rating = Number.parseInt(value, 10);

    const starClass = 'w-8 h-8 fill-amber-400 inline-block';
    const ratingList = [];
    for (let i = 0; i < rating; i++) {
        ratingList.push(
            `<svg xmlns="http://www.w3.org/2000/svg" class="${starClass}" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>`
        );
    }

    return ratingList.join('');
};

const webmentionsForUrl = (webmentions, url) => {
    return webmentions.filter((mention) => mention['wm-target'] === url);
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
    const matchingPosts = collection.filter((post) => post.url === path);

    if (matchingPosts.length > 0) {
        return matchingPosts[0];
    }

    throw new Error(`getPostByPath filter: Can't find post '${path}'`);
};

const collectionWithoutUrls = (collection, urls) => {
    const filterUrls = Array.isArray(urls) ? urls : [urls];

    return collection.filter((post) => !filterUrls.includes(post.url));
};

const limitCollection = (collection, limit) => {
    return collection.slice(0, limit);
};

const linkify = (text) => {
    if (!text) return ''; // Handle empty or null input

    return linkifyHtml(text, linkifyOptions);
};

const addAll = (eleventyConfig) => {
    eleventyConfig.addFilter('getPostByPath', getPostByPath);
    eleventyConfig.addFilter('keys', (object) => Object.keys(object));
    eleventyConfig.addLiquidFilter('markdownify', markdownifyFilter);
    eleventyConfig.addLiquidFilter('starRating', starRating);
    eleventyConfig.addLiquidFilter('toISOString', toISOStringFilter);
    eleventyConfig.addLiquidFilter('xmlEscape', xmlEscapeFilter);

    // Collections
    eleventyConfig.addFilter('collectionWithoutUrls', collectionWithoutUrls);
    eleventyConfig.addFilter('limitCollection', limitCollection);

    // Webmentions
    eleventyConfig.addFilter('webmentionsForUrl', webmentionsForUrl);
    eleventyConfig.addFilter(
        'webmentionsSortedForUrl',
        webmentionsSortedByProperty
    );

    // Text processing
    eleventyConfig.addFilter('linkify', linkify);
};

module.exports = addAll;
