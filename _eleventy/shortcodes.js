const callout = require('./shortcodes/callout');
const codeTitle = require('./shortcodes/codeTitle');
const gravatar = require('./shortcodes/gravatar');
const image = require('./shortcodes/image');
const quote = require('./shortcodes/quote');

const addAll = (eleventyConfig) => {
  eleventyConfig.addPairedShortcode('callout', callout);
  eleventyConfig.addShortcode('codetitle', codeTitle);
  eleventyConfig.addShortcode('gravatar', gravatar);
  eleventyConfig.addLiquidShortcode('image', image);
  eleventyConfig.addPairedShortcode('quote', quote);
};

module.exports = addAll;
