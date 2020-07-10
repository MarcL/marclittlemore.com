module.exports = (eleventyConfig) => {
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
