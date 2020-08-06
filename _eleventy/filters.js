const rfc822Date = require('rfc822-date');
const escape = require('lodash.escape');
const markdownLib = require('./markdown');

const dateToISO = dateValue => new Date(dateValue).toISOString();

const rfc822DateFilter = dateValue => rfc822Date(dateValue);
const toISOStringFilter = dateValue => dateToISO(dateValue);
const xmlEscapeFilter = value => escape(value);
const markdownifyFilter = value => markdownLib.render(value);

const collectionLastUpdatedDateFilter = collection => {
    if( !collection || !collection.length ) {
        throw new Error( "Collection is empty in collectionLastUpdatedDate filter." );
    }

    // Newest date in the collection
    return rfc822Date(
        new Date(Math.max(...collection.map(item => {return item.date})))
    );
};

const addAll = (eleventyConfig) => {
    eleventyConfig.addLiquidFilter('rfc822Date', rfc822DateFilter);
    eleventyConfig.addLiquidFilter('toISOString', toISOStringFilter);
    eleventyConfig.addLiquidFilter('xmlEscape', xmlEscapeFilter);
    eleventyConfig.addLiquidFilter('markdownify', markdownifyFilter);
    eleventyConfig.addFilter('collectionLastUpdatedDate', collectionLastUpdatedDateFilter);
};

module.exports = addAll;
