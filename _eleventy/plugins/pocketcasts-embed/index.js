const pattern = require("./pattern.js");
const replace = require("./replace.js");
const defaults = require("./defaults.js");

module.exports = function (eleventyConfig, options = {}) {
	const config = Object.assign({}, defaults, options);
	eleventyConfig.addTransform("embedPocketCasts", async function (content, outputPath) {
		if (!outputPath || !outputPath.endsWith(".html")) {
			return content;
		}
		return content.replace(pattern, (...match) => replace(match, config));
	});
};
