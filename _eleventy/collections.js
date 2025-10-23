const addCollections = (eleventyConfig) => {
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

    // Combined notes collection (local notes + Google Sheets notes)
    eleventyConfig.addCollection('allNotes', async (collection) => {
        // Get local notes
        const localNotes = collection.getFilteredByTag('note');
        
        // Get Google Sheets notes directly - they are available as global data
        const googleSheetsNotesModule = require('../src/_data/googleSheetsNotes.js');
        const googleSheetsNotes = await googleSheetsNotesModule();
        
        // Combine and sort by date (newest first)
        const allNotes = [...localNotes, ...googleSheetsNotes].sort((a, b) => {
            const dateA = new Date(a.date || a.data?.date);
            const dateB = new Date(b.date || b.data?.date);
            return dateB - dateA;
        });
        
        return allNotes;
    });

    // RSS feed
    // - Only add posts for now
    eleventyConfig.addCollection('feed', (collection) => {
        return collection.getFilteredByGlob(['src/posts/**/*.md']);
    });
};

module.exports = addCollections;
