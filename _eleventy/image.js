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
    const dataSrc = /^http[s]*/.test(src) ? src : `./src${src}`;

    let metadata;
    try {
        metadata = await Image(dataSrc, {
            widths: tailwindPixelList,
            formats: ['webp', 'jpeg'],
            urlPath: '/images/generated/',
            outputDir: './_site/images/generated/'
        });

        if (!metadata) {
            throw new Error(`Couldn't create image metadata for: ${dataSrc}`);
        }
    } catch(error) {
        console.error(error);
        throw error;
    }

    const highestResolutionJpeg = metadata.jpeg[metadata.jpeg.length - 1];

    const sources = Object.values(metadata).map(imageFormat => {
        const imageSizes = imageFormat.map(entry => {
            return `(min-width: ${entry.width}) ${entry.width}px`
        }).join(', ');
    
        const srcset = imageFormat.map(entry => entry.srcset).join(', ');
        return `\t<source
            type="${imageFormat[0].sourceType}"
            srcset="${srcset}"
            sizes="${imageSizes}"
        >`;
    }).join('\n');

    const pictureHtml = `<picture class="${className}">
        ${sources}
        <img
            class="${className}"
            src="${highestResolutionJpeg.url}"
            width="${highestResolutionJpeg.width}"
            height="${highestResolutionJpeg.height}"
            alt="${alt}"
            loading="lazy"
            decoding="async"
        />
    </picture>`;

    return pictureHtml;
};

module.exports = imageShortcode;
