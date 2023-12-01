const markdownLib = require('markdown-it')();

const callout = (content, type = 'info') => {
  const iconClass = 'w-8 h-8 inline-block';
  const typeClasses = {
    info: {
      background: 'bg-emerald-50 border-emerald-500',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="${iconClass} fill-emerald-500" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-144c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z"/></svg>`,
    },
    warning: {
      background: 'bg-red-50 border-red-500',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="${iconClass} fill-red-500" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zm32 224c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32z"/></svg>`,
    },
    tip: {
      background: 'bg-blue-50 border-blue-500',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="${iconClass} fill-blue-500" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M272 384c9.6-31.9 29.5-59.1 49.2-86.2l0 0c5.2-7.1 10.4-14.2 15.4-21.4c19.8-28.5 31.4-63 31.4-100.3C368 78.8 289.2 0 192 0S16 78.8 16 176c0 37.3 11.6 71.9 31.4 100.3c5 7.2 10.2 14.3 15.4 21.4l0 0c19.8 27.1 39.7 54.4 49.2 86.2H272zM192 512c44.2 0 80-35.8 80-80V416H112v16c0 44.2 35.8 80 80 80zM112 176c0 8.8-7.2 16-16 16s-16-7.2-16-16c0-61.9 50.1-112 112-112c8.8 0 16 7.2 16 16s-7.2 16-16 16c-44.2 0-80 35.8-80 80z"/></svg>`,
    },
  };

  const chosenType = typeClasses[type] || typeClasses['info'];
  const renderedHtml = markdownLib.render(content);

  const iconInfo = `<div class="w-1/6"><div class="flex flex-none items-center justify-center bg-white rounded-full w-10 h-10 mx-auto">
    <svg class="${iconClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      ${chosenType.icon}
    </svg>
  </div>
  </div>
  `;
  return `<aside class="w-full px-2 py-0 shadow-lg border-l-2 ${chosenType.background} flex flex-row items-center break-words">${iconInfo}<div class="w-5/6">${renderedHtml}</div></aside>`;
};

module.exports = callout;
