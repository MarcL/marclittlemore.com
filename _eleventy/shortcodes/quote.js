const markdownLib = require('markdown-it')();

const quote = (content, addQuotes = true) => {
  const renderableContent = addQuotes
    ? `&ldquo;${content.trim()}&rdquo;`
    : content;
  const renderedHtml = markdownLib.render(renderableContent);

  return `<div class="p-4 font-semibold text-xl sm:text-2xl italic border-l-4 border-red-600">${renderedHtml}</div>`;
};

module.exports = quote;
