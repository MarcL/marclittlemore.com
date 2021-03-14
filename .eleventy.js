require('dotenv').config();

const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const embedYouTube = require('eleventy-plugin-youtube-embed');
const embedTwitter = require('eleventy-plugin-embed-twitter');

const addAllShortcodes = require('./_eleventy/shortcodes');
const addAllFilters = require('./_eleventy/filters');
const markdownLib = require('./_eleventy/markdown');

module.exports = (eleventyConfig) => {
    // Plugins
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPlugin(embedYouTube);
    eleventyConfig.addPlugin(embedTwitter);

    eleventyConfig.setLibrary('md', markdownLib);

    // Copy
    eleventyConfig.addPassthroughCopy({'src/images': 'images'});
    eleventyConfig.addPassthroughCopy({'src/favicons': 'favicons'});
    eleventyConfig.addPassthroughCopy({'src/robots.txt': 'robots.txt'});
    eleventyConfig.addPassthroughCopy({'src/browserconfig.xml': 'browserconfig.xml'});
    eleventyConfig.addPassthroughCopy({'src/distjs/': 'js/'});
    eleventyConfig.addPassthroughCopy({'src/_redirects': '_redirects'});

    addAllFilters(eleventyConfig);
    addAllShortcodes(eleventyConfig);

    // Liquid template options
    eleventyConfig.setLiquidOptions({
        root: [
            'src/_includes/_includes',
            '.'
        ]
    });

    eleventyConfig.setDataDeepMerge(true);

    return {
        dir: {
            input: './src',
            output: './_site'
        }
    }
};
