const Image = require("@11ty/eleventy-img");

const imageShortcode = async (src, alt, size, className = 'db shadow-4') => {
    if (alt === undefined) {
        throw new Error(`Missing \`alt\` on image from: ${src}`);
    }

    const dataSrc = `./src${src}`;

    let metadata;
    try {
        metadata = await Image(dataSrc, {
            widths: [size],
            formats: ['jpeg'],
            urlPath: '/images/generated/',
            outputDir: './_site/images/generated/'
        });

        if (!metadata) {
            throw new Error(`Couldn't create image metadata for: ${dataSrc}`);
        }
    } catch(error) {
        console.log(error);
        throw error;
    }

    console.log({dataSrc, metadata});
    const data = metadata.jpeg.pop();
    return `<img src="${data.url}" width="${data.width}" alt="${alt}" class="${className}" loading="lazy" decoding="async">`;
};

module.exports = imageShortcode;
