const Image = require("@11ty/eleventy-img");

// Tailwind sizes
const tailwindSizesPixels = {
    'sm': 640,
    'md': 768,
    'lg': 1024,
    'xl': 1280,
    '2xl': 1536,
};

const tailwindPixelList = Object.keys(tailwindSizesPixels).map(key => tailwindSizesPixels[key]);

const imageShortcode = async (src, alt, size, className = 'shadow-md') => {
    if (alt === undefined) {
        throw new Error(`Missing \`alt\` on image from: ${src}`);
    }

    // Is it a local or internet source?
    let dataSrc = /^http[s]*/.test(src) ? src : `./src${src}`;

    let metadata;
    try {
        metadata = await Image(dataSrc, {
            widths: tailwindPixelList,
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

    const tailwindSizes = Object.keys(tailwindSizesPixels).map(key => {
        const value = tailwindSizesPixels[key];
        return `(min-width: ${value}) ${value}px`;
    }).join(',\n');

    const imageAttributes = {
        alt,
        sizes: tailwindSizes,
        loading: "lazy",
        decoding: "async",
    };    
    return Image.generateHTML(metadata, imageAttributes);
};

module.exports = imageShortcode;
