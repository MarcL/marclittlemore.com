const path = require('node:path');
const Image = require('@11ty/eleventy-img');


async function generateImage(src, alt, classes = "") {
    const dataSrc = /^http[s]*/.test(src) ? src : `./src${src}`;
    const metadata = await Image(dataSrc, {
      widths: [300, 600, 1280], // Define image widths
      formats: ["webp", "jpeg"], // Generate WebP and fallback JPEG
        urlPath: '/images/generated/',
      outputDir: './_site/images/generated/',
      filenameFormat: (id, src, width, format) => {
          const extension = path.extname(src);
          const name = path.basename(src, extension);
  
          return `${name}-${width}w.${format}`;
      }
});
  
    const imageAttributes = {
      alt,
      sizes: "(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px", // Define responsive sizes
      class: classes, // Pass Tailwind classes
      loading: "lazy", // Lazy-load images
      decoding: "async", // Optimize decoding
    };
  
    // Return the <picture> element for responsive images
    return Image.generateHTML(metadata, imageAttributes);
};

module.exports = generateImage;
