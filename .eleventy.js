require('dotenv').config();

const markdownIt = require('markdown-it');
const markdownItAttributes = require('@gerhobbelt/markdown-it-attrs');
const escape = require('lodash.escape');
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const rfc822Date = require('rfc822-date');

module.exports = (eleventyConfig) => {
    // Plugins
    eleventyConfig.addPlugin(syntaxHighlight);

    // Create own markdown renderer so we can add class attributes
    // https://www.11ty.dev/docs/languages/markdown/#markdown-options
    const markdownItOptions = {
        html: true,
    };
    const markdownLib = markdownIt(markdownItOptions);

    // Set up markdown parser to allow class attributes
    markdownLib.use(markdownItAttributes);

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

    eleventyConfig.addLiquidFilter('markdownify', (value) => {
        return markdownLib.render(value);
    });

    eleventyConfig.addLiquidFilter('rfc822Date', (dateValue) => {
        return rfc822Date(dateValue);
    });

    const dateToISO = dateValue => new Date(dateValue).toISOString();

    eleventyConfig.addLiquidFilter('toISOString', (dateValue) => {
        return dateToISO(dateValue);
    });

    eleventyConfig.addLiquidFilter('toUTCString', (dateValue) => {
        return new Date(dateValue).toUTCString();
    });

    eleventyConfig.addLiquidFilter('xmlEscape', (value) => {
        return escape(value);
    });

    eleventyConfig.addFilter("collectionLastUpdatedDate", collection => {
        if( !collection || !collection.length ) {
            throw new Error( "Collection is empty in collectionLastUpdatedDate filter." );
        }

        // Newest date in the collection
        return rfc822Date(
            new Date(Math.max(...collection.map(item => {return item.date})))
        );
    });

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
