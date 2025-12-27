module.exports = function (match, options, oembedData) {
	const [original, type, id] = match;

	// Build the original URL
	const url = type ? `https://pca.st/${type}/${id}` : `https://pca.st/${id}`;

	// If we have oEmbed data, use the iframe it provides
	if (oembedData && oembedData.html) {
		return `<div class="${options.embedClass}">${oembedData.html}</div>`;
	}

	// Fallback to styled card if oEmbed fails
	let out = `<p><a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a></p>`;
	out += `<a href="${url}" class="${options.embedClass}--fallback" target="_blank" rel="noopener noreferrer">`;
	out += `<span class="${options.embedClass}__icon">`;
	out += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width="32" height="32">`;
	out += `<path d="M256 0C115.3 0 0 115.3 0 256s115.3 256 256 256 256-115.3 256-256S396.7 0 256 0zm0 464c-114.7 0-208-93.3-208-208S141.3 48 256 48s208 93.3 208 208-93.3 208-208 208zm-48-176c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm96 0c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm-48-96c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"/>`;
	out += `</svg>`;
	out += `</span>`;
	out += `<span class="${options.embedClass}__text">Listen on Pocket Casts</span>`;
	out += `</a>`;
	return out;
};
