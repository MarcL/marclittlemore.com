const addCollections = (eleventyConfig) => {
    // Tag list for specific tag pages
    eleventyConfig.addCollection('tagList', (collection) => {
      let tagSet = new Set();
  
      const filteredTags = ['post', 'talk'];
      collection.getAll().forEach((item) => {
        if (!item.data.tags) {
          return;
        }
  
        item.data.tags
          .filter((tag) => !filteredTags.includes(tag))
          .forEach((tag) => tagSet.add(tag));
      });
  
      return [...tagSet].sort((first, second) => first.localeCompare(second));
    });
  
    // RSS feed
    // - Only add posts for now
    eleventyConfig.addCollection('feed', (collection) => {
      return collection.getFilteredByGlob(['src/posts/**/*.md']);
    });
  };
  
  module.exports = addCollections;