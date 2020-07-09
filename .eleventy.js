module.exports = (eleventyConfig) => {
    // eleventyConfig.addPassthroughCopy({'posts/images': 'images'});

    return {
        dir: {
            input: './old',
            output: './_site'
        }
    }
};
