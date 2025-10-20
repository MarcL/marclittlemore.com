const addCollections = (eleventyConfig) => {
    const isDevelopmentBuild = process.env.ELEVENTY_ENV === 'dev';

    // Create filtered post collections based on environment
    eleventyConfig.addCollection('publishedPosts', (collection) => {
        // Always return posts that are not drafts
        return collection.getFilteredByTag('post').filter(post => !post.data.draft);
    });

    eleventyConfig.addCollection('allPosts', (collection) => {
        // In development, return all posts including drafts
        if (isDevelopmentBuild) {
            return collection.getFilteredByTag('post');
        }
        
        // In production, filter out draft posts (same as publishedPosts)
        return collection.getFilteredByTag('post').filter(post => !post.data.draft);
    });

    // Tag list for specific tag pages
    eleventyConfig.addCollection('tagList', (collection) => {
        let tagSet = new Set();

        // Ignore these tags
        const filteredTags = ['post', 'talk', 'note'];
        collection.getAll().forEach((item) => {
            if (!item.data.tags) {
                return;
            }

            item.data.tags
                .filter((tag) => !filteredTags.includes(tag))
                .filter((tag) => tag)
                .forEach((tag) => tagSet.add(tag));
        });

        return [...tagSet].sort((first, second) => first.localeCompare(second));
    });

    // RSS feed
    // - Only add published (non-draft) posts
    eleventyConfig.addCollection('feed', (collection) => {
        return collection.getFilteredByTag('post').filter(post => !post.data.draft);
    });
};

module.exports = addCollections;
