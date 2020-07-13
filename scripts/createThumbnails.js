const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const srcPath = path.join(__dirname, '../src/images');
const destPath = path.join(__dirname, '../src/thumbnails');
const resize = {
    width: 825,
    height: 510
};

fs.readdir(srcPath, (err, files) => {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    files.forEach((file) => {
        const srcFile = `${srcPath}/${file}`;
        const destFile = `${destPath}/${file}`;
        console.log(`${srcFile} => ${destFile}`);

        const {width, height} = resize;

        sharp(srcFile)
            .resize(width, height)
            .toFile(destFile, (sharpError, resizeImage) => {
                if (sharpError) {
                    console.log(sharpError);
                }
            });
    });
});