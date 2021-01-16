require('dotenv').config();

const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const embedYouTube = require('eleventy-plugin-youtube-embed');

const addAllShortcodes = require('./_eleventy/shortcodes');
const addAllFilters = require('./_eleventy/filters');
const markdownLib = require('./_eleventy/markdown');

module.exports = (eleventyConfig) => {
    // Plugins
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPlugin(embedYouTube);

    eleventyConfig.setLibrary('md', markdownLib);

    // Copy
    eleventyConfig.addPassthroughCopy({'src/images': 'images'});
    eleventyConfig.addPassthroughCopy({'src/thumbnails': 'thumbnails'});
    eleventyConfig.addPassthroughCopy({'src/favicons': 'favicons'});
    eleventyConfig.addPassthroughCopy({'src/robots.txt': 'robots.txt'});
    eleventyConfig.addPassthroughCopy({'src/browserconfig.xml': 'browserconfig.xml'});
    eleventyConfig.addPassthroughCopy({'src/distjs/': 'js/'});
    eleventyConfig.addPassthroughCopy({'src/_redirects': '_redirects'});

    // Temporary aliases
    eleventyConfig.addLayoutAlias('default', 'layouts/default.html');
    eleventyConfig.addLayoutAlias('homepage', 'layouts/homepage.html');
    eleventyConfig.addLayoutAlias('post', 'layouts/post.html');
    eleventyConfig.addLayoutAlias('page', 'layouts/page.html');
    eleventyConfig.addLayoutAlias('articles', 'layouts/articles.html');
    eleventyConfig.addLayoutAlias('biography', 'layouts/biography.html');
    eleventyConfig.addLayoutAlias('landingpage-default', 'layouts/landingpage-default.html');
    eleventyConfig.addLayoutAlias('landingpage-long', 'layouts/landingpage-long.html');
    eleventyConfig.addLayoutAlias('landingpage-thank-you', 'layouts/landingpage-thank-you.html');

    addAllFilters(eleventyConfig);
    addAllShortcodes(eleventyConfig);

    // Liquid template options
    eleventyConfig.setLiquidOptions({
        dynamicPartials: false,
        root: [
            'src/_includes/_includes',
            'src/_includes/_includes/social',
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
