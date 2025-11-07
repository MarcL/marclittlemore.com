const crypto = require('node:crypto');
const markdownLib = require('markdown-it')();

const callout = (content, type = 'info') => {
    const iconClass = 'w-8 h-8 inline-block';
    const typeClasses = {
        info: {
            background: 'bg-emerald-100 border-emerald-800',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="${iconClass} fill-emerald-800" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-144c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z"/></svg>`,
        },
        warning: {
            background: 'bg-red-100 border-red-800',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="${iconClass} fill-red-800" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zm32 224c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32z"/></svg>`,
        },
        tip: {
            background: 'bg-blue-100 border-blue-800',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="${iconClass} fill-blue-800" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M272 384c9.6-31.9 29.5-59.1 49.2-86.2l0 0c5.2-7.1 10.4-14.2 15.4-21.4c19.8-28.5 31.4-63 31.4-100.3C368 78.8 289.2 0 192 0S16 78.8 16 176c0 37.3 11.6 71.9 31.4 100.3c5 7.2 10.2 14.3 15.4 21.4l0 0c19.8 27.1 39.7 54.4 49.2 86.2H272zM192 512c44.2 0 80-35.8 80-80V416H112v16c0 44.2 35.8 80 80 80zM112 176c0 8.8-7.2 16-16 16s-16-7.2-16-16c0-61.9 50.1-112 112-112c8.8 0 16 7.2 16 16s-7.2 16-16 16c-44.2 0-80 35.8-80 80z"/></svg>`,
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
    return `<div class="w-full px-3 py-4 shadow-lg border-t-2 ${chosenType.background} flex flex-row items-center break-words">${iconInfo}<div class="w-5/6">${renderedHtml}</div></div>`;
};

const quote = (content, addQuotes = true) => {
    const renderableContent = addQuotes
        ? `&ldquo;${content.trim()}&rdquo;`
        : content;
    const renderedHtml = markdownLib.render(renderableContent);

    return `<div class="p-4 font-semibold text-xl sm:text-2xl italic border-l-4 border-red-600">${renderedHtml}</div>`;
};

const gravatarShortcode = (email, size = 80, defaultImage = 'mp') => {
    // Create an MD5 hash from the email address
    const emailHash = crypto
        .createHash('md5')
        .update(email.trim().toLowerCase())
        .digest('hex');

    // Return a URL image with the hash
    return `https://www.gravatar.com/avatar/${emailHash}?d=${defaultImage}&s=${size}`;
};

const codeTitle = (title, heading = 'Filename') => {
    return `<div class="text-sm"><span class="uppercase pr-4">${heading}</span> <span class="">${title}</span></div>`;
};

const getPlatformIcon = (platform) => {
    const size = 'w-8 h-8 inline-block flex justify-center items-center';
    const svgClass = 'fill-slate-400';
    const platformIcons = {
        twitter: `<span class="${size}"><svg xmlns="http://www.w3.org/2000/svg" class="${svgClass}" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/></svg></span>`,
        threads: `<span class="${size}"><svg xmlns="http://www.w3.org/2000/svg" class="${svgClass}" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM294.2 244.3c19.5 9.3 33.7 23.5 41.2 40.9c10.4 24.3 11.4 63.9-20.2 95.4c-24.2 24.1-53.5 35-95.1 35.3h-.2c-46.8-.3-82.8-16.1-106.9-46.8C91.5 341.8 80.4 303.7 80 256v-.1-.1c.4-47.7 11.5-85.7 33-113.1c24.2-30.7 60.2-46.5 106.9-46.8h.2c46.9 .3 83.3 16 108.2 46.6c12.3 15.1 21.3 33.3 27 54.4l-26.9 7.2c-4.7-17.2-11.9-31.9-21.4-43.6c-19.4-23.9-48.7-36.1-87-36.4c-38 .3-66.8 12.5-85.5 36.2c-17.5 22.3-26.6 54.4-26.9 95.5c.3 41.1 9.4 73.3 26.9 95.5c18.7 23.8 47.4 36 85.5 36.2c34.3-.3 56.9-8.4 75.8-27.3c21.5-21.5 21.1-47.9 14.2-64c-4-9.4-11.4-17.3-21.3-23.3c-2.4 18-7.9 32.2-16.5 43.2c-11.4 14.5-27.7 22.4-48.4 23.5c-15.7 .9-30.8-2.9-42.6-10.7c-13.9-9.2-22-23.2-22.9-39.5c-1.7-32.2 23.8-55.3 63.5-57.6c14.1-.8 27.3-.2 39.5 1.9c-1.6-9.9-4.9-17.7-9.8-23.4c-6.7-7.8-17.1-11.8-30.8-11.9h-.4c-11 0-26 3.1-35.6 17.6l-23-15.8c12.8-19.4 33.6-30.1 58.5-30.1h.6c41.8 .3 66.6 26.3 69.1 71.8c1.4 .6 2.8 1.2 4.2 1.9l.1 .5zm-71.8 67.5c17-.9 36.4-7.6 39.7-48.8c-8.8-1.9-18.6-2.9-29-2.9c-3.2 0-6.4 .1-9.6 .3c-28.6 1.6-38.1 15.5-37.4 27.9c.9 16.7 19 24.5 36.4 23.6l-.1-.1z"/></svg></span>`,
        mastodon: `<span class="${size}"><svg xmlns="http://www.w3.org/2000/svg" class="${svgClass}" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M433 179.11c0-97.2-63.71-125.7-63.71-125.7-62.52-28.7-228.56-28.4-290.48 0 0 0-63.72 28.5-63.72 125.7 0 115.7-6.6 259.4 105.63 289.1 40.51 10.7 75.32 13 103.33 11.4 50.81-2.8 79.32-18.1 79.32-18.1l-1.7-36.9s-36.31 11.4-77.12 10.1c-40.41-1.4-83-4.4-89.63-54a102.54 102.54 0 0 1-.9-13.9c85.63 20.9 158.65 9.1 178.75 6.7 56.12-6.7 105-41.3 111.23-72.9 9.8-49.8 9-121.5 9-121.5zm-75.12 125.2h-46.63v-114.2c0-49.7-64-51.6-64 6.9v62.5h-46.33V197c0-58.5-64-56.6-64-6.9v114.2H90.19c0-122.1-5.2-147.9 18.41-175 25.9-28.9 79.82-30.8 103.83 6.1l11.6 19.5 11.6-19.5c24.11-37.1 78.12-34.8 103.83-6.1 23.71 27.3 18.4 53 18.4 175z"/></svg></span>`,
        bluesky: `<span class="${size}"><svg xmlns="http://www.w3.org/2000/svg" class="${svgClass}" viewBox="0 0 600 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M407.8 294.7c-3.3-.4-6.7-.8-10-1.3c3.4 .4 6.7 .9 10 1.3zM288 227.1C261.9 176.4 190.9 81.9 124.9 35.3C61.6-9.4 37.5-1.7 21.6 5.5C3.3 13.8 0 41.9 0 58.4S9.1 194 15 213.9c19.5 65.7 89.1 87.9 153.2 80.7c3.3-.5 6.6-.9 10-1.4c-3.3 .5-6.6 1-10 1.4C74.3 308.6-9.1 342.8 100.3 464.5C220.6 589.1 265.1 437.8 288 361.1c22.9 76.7 49.2 222.5 185.6 103.4c102.4-103.4 28.1-156-65.8-169.9c-3.3-.4-6.7-.8-10-1.3c3.4 .4 6.7 .9 10 1.3c64.1 7.1 133.6-15.1 153.2-80.7C566.9 194 576 75 576 58.4s-3.3-44.7-21.6-52.9c-15.8-7.1-40-14.9-103.2 29.8C385.1 81.9 314.1 176.4 288 227.1z"/></svg></span>`,
    };

    return platformIcons[platform] || '';
};

const addAll = (eleventyConfig) => {
    eleventyConfig.addPairedShortcode('callout', callout);
    eleventyConfig.addShortcode('codetitle', codeTitle);
    eleventyConfig.addShortcode('gravatar', gravatarShortcode);
    eleventyConfig.addPairedShortcode('quote', quote);
};

module.exports = addAll;
