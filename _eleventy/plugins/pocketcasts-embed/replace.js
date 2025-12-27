module.exports = function (match, options) {
	const [, , , type, id] = match;

	// Build the embed path - if there's a type (podcast/episode), include it
	const embedPath = type ? `${type}/${id}` : id;

	let out = `<div class="${options.embedClass}">`;
	out += `<iframe src="https://pca.st/embed/${embedPath}" `;
	out += `style="border: 0; width: ${options.width}; height: ${options.height}px;" `;
	out += `allowfullscreen loading="${options.lazy ? 'lazy' : 'eager'}"></iframe>`;
	out += "</div>";
	return out;
};
