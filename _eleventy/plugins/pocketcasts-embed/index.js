const pattern = require("./pattern.js");
const replace = require("./replace.js");
const defaults = require("./defaults.js");

async function fetchOEmbed(url) {
	try {
		const oembedUrl = `https://pca.st/oembed.json?url=${encodeURIComponent(url)}`;
		const response = await fetch(oembedUrl);
		if (!response.ok) return null;
		return await response.json();
	} catch (error) {
		console.warn(`Failed to fetch oEmbed for ${url}:`, error.message);
		return null;
	}
}

module.exports = function (eleventyConfig, options = {}) {
	const config = Object.assign({}, defaults, options);
	eleventyConfig.addTransform("embedPocketCasts", async function (content, outputPath) {
		if (!outputPath || !outputPath.endsWith(".html")) {
			return content;
		}

		// Find all matches first
		const matches = [...content.matchAll(pattern)];
		if (matches.length === 0) return content;

		// Fetch oEmbed data for each match
		for (const match of matches) {
			const [, type, id] = match;
			const url = type ? `https://pca.st/${type}/${id}` : `https://pca.st/${id}`;
			const oembedData = await fetchOEmbed(url);
			const replacement = replace(match, config, oembedData);
			content = content.replace(match[0], replacement);
		}

		return content;
	});
};
