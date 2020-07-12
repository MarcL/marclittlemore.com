const markdownIt = require('markdown-it')();
const markdownItAttributes = require('@gerhobbelt/markdown-it-attrs');
const escape = require('lodash.escape');

module.exports = (eleventyConfig) => {
    // Set up markdown parser to allow class attributes
    markdownIt.use(markdownItAttributes);
    eleventyConfig.setLibrary('md', markdownIt);

    // Copy
    eleventyConfig.addPassthroughCopy({'src/images': 'images'});
    eleventyConfig.addPassthroughCopy({'src/css': 'css'});

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
        return markdownIt.render(value);
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
        return dateToISO(
            new Date(Math.max(...collection.map(item => {return item.date})))
        );
    });

    // Liquid template options
    eleventyConfig.setLiquidOptions({
        dynamicPartials: false,
        root: [
            'src/_includes/_includes',
            '.'
        ]
    });

    return {
        dir: {
            input: './src',
            output: './_site'
        }
    }
};