const addCollections = (eleventyConfig) => {
    const isDevelopmentBuild = process.env.ELEVENTY_ENV === 'dev';

    // Helper function to filter out draft posts
    const filterPublishedPosts = (posts) => posts.filter(post => !post.data.draft);

    // Create filtered post collections based on environment
    eleventyConfig.addCollection('publishedPosts', (collection) => {
        // Always return posts that are not drafts
        return filterPublishedPosts(collection.getFilteredByTag('post'));
    });

    eleventyConfig.addCollection('allPosts', (collection) => {
        const allPosts = collection.getFilteredByTag('post');
        
        // In development, return all posts including drafts
        if (isDevelopmentBuild) {
            return allPosts;
        }
        
        // In production, filter out draft posts (same as publishedPosts)
        return filterPublishedPosts(allPosts);
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
        return filterPublishedPosts(collection.getFilteredByTag('post'));
    });
};

module.exports = addCollections;
