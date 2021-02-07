const imageShortcode = require('../_eleventy/image');

(async () => {
    try {
        const imageName = '/images/banners/404-pineapple.jpg';
        const image1 = await imageShortcode(imageName, 'alt text', 342);
        console.log(image1);
        const image2 = await imageShortcode(imageName, 'alt text', 342);
        console.log(image2);
    } catch(error) {
        console.error('error');
        console.error(error.toString());
    }
})();