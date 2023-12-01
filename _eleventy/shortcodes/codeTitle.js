const codeTitle = (title, heading = 'Filename') => {
  return `<div class="text-sm"><span class="uppercase pr-4">${heading}</span> <span class="">${title}</span></div>`;
};

module.exports = codeTitle;
