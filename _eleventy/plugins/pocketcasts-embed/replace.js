module.exports = function (match, options) {
	const [, id] = match;

	let out = `<div class="${options.embedClass}">`;
	out += `<iframe src="https://pca.st/embed/${id}" `;
	out += `style="border: 0; width: ${options.width}; height: ${options.height}px;" `;
	out += `allowfullscreen loading="${options.lazy ? 'lazy' : 'eager'}"></iframe>`;
	out += "</div>";
	return out;
};
