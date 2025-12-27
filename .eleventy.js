require('dotenv').config();

const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const rss = require('@11ty/eleventy-plugin-rss');
const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");

const embedEverything = require('eleventy-plugin-embed-everything');
const timeToRead = require('eleventy-plugin-time-to-read');
const tableOfContents = require('eleventy-plugin-nesting-toc');
const externalLinks = require('@aloskutov/eleventy-plugin-external-links');

const util = require('node:util');

const addAllShortcodes = require('./_eleventy/shortcodes');
const addAllFilters = require('./_eleventy/filters');
const markdownLib = require('./_eleventy/markdown');
const site = require('./src/_data/site');
const addCollections = require('./_eleventy/collections');

module.exports = (eleventyConfig) => {
    // Plugins
    eleventyConfig.addPlugin(eleventyImageTransformPlugin);
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPlugin(embedEverything);
    eleventyConfig.addPlugin(timeToRead, { style: 'short' });
    eleventyConfig.addPlugin(tableOfContents, { tags: ['h2'] });
    eleventyConfig.addPlugin(externalLinks, {
        url: site.url,
        overwrite: false,
        rel: ['noreferrer', 'noopener', 'external'],
    });

    // Collections
    addCollections(eleventyConfig);

    // RSS
    eleventyConfig.addPlugin(rss);
    eleventyConfig.addLiquidFilter('dateToRfc3339', rss.dateToRfc3339);
    eleventyConfig.addLiquidFilter(
        'getNewestCollectionItemDate',
        rss.getNewestCollectionItemDate
    );
    eleventyConfig.addLiquidFilter('absoluteUrl', rss.absoluteUrl);
    eleventyConfig.addLiquidFilter(
        'convertHtmlToAbsoluteUrls',
        rss.convertHtmlToAbsoluteUrls
    );

    eleventyConfig.setLibrary('md', markdownLib);

    // Copy
    eleventyConfig.addPassthroughCopy({ 'src/images': 'images' });
    eleventyConfig.addPassthroughCopy({ 'src/favicons': 'favicons' });
    eleventyConfig.addPassthroughCopy({ 'src/robots.txt': 'robots.txt' });
    eleventyConfig.addPassthroughCopy({ 'src/ads.txt': 'ads.txt' });
    eleventyConfig.addPassthroughCopy({
        'src/browserconfig.xml': 'browserconfig.xml',
    });
    eleventyConfig.addPassthroughCopy({ 'src/distjs/': 'js/' });
    eleventyConfig.addPassthroughCopy({
        './_tmp/css/main.css': 'css/main.css',
    });
    eleventyConfig.addPassthroughCopy({ 'src/_redirects': '_redirects' });

    // Watch - including files in .gitignore
    eleventyConfig.setUseGitIgnore(false);
    eleventyConfig.addWatchTarget('./src/distjs/');
    eleventyConfig.addWatchTarget('./_tmp/css/main.css');

    addAllFilters(eleventyConfig);
    addAllShortcodes(eleventyConfig);

    // Debug filter
    eleventyConfig.addFilter('console', (value) => {
        return util.inspect(value);
    });

    eleventyConfig.setDataDeepMerge(true);

    eleventyConfig.setLiquidOptions({
        dynamicPartials: false,
    });

    return {
        dir: {
            input: './src',
            output: './_site',
        },
    };
};
