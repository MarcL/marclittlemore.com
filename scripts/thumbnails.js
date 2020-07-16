const fs = require('fs').promises;
const {join, resolve} = require('path');
const sharp = require('sharp');
const mkdirp = require('mkdirp');

const filenameIsAnImage = filename => {
    const filenameLowerCase = filename.toLowerCase();
    return filenameLowerCase.includes('.jpg') || filenameLowerCase.includes('.jpeg') || filenameLowerCase.includes('.png');
};

const getAllFilesInDirectory = async (sourcePath) => {
    const directoryEntries = await fs.readdir(sourcePath, { withFileTypes: true });
    const files = await Promise.all(directoryEntries.map((directoryEntry) => {
        const fullFilePath = resolve(sourcePath, directoryEntry.name);

        return directoryEntry.isDirectory() ? getAllFilesInDirectory(fullFilePath) : fullFilePath;
    }));

    return [].concat(...files).filter(filenameIsAnImage);
};

const convertImage = (sourceFilePath, resizeOptions, outputFilePath) => {
    return sharp(sourceFilePath)
        .resize(resizeOptions)
        .toFile(outputFilePath);
};

const resizeFilesInDirectory = async (options) => {
    const {imagesDirectoryPath, destinationImagesPath, fileList, resizeOptions} = options;
    console.log(options);
    await Promise.all(fileList.map(sourceFilePath => {
        const splitSourceImagesPath = sourceFilePath.split(imagesDirectoryPath);
        const outputFilePath = join(destinationImagesPath, splitSourceImagesPath[1]);
        const outputDirectoryWithFilename = outputFilePath.split('/');
        const directoryLengthWithoutFilename = outputDirectoryWithFilename.slice(0, outputDirectoryWithFilename.length - 1);
        const outputDirectory = directoryLengthWithoutFilename.join('/');

        console.log(`${sourceFilePath} => ${outputFilePath}`);

        return mkdirp(outputDirectory)
            .then(() => convertImage(sourceFilePath, resizeOptions, outputFilePath));
    }));
};

const convertAllDirectoryImages = async (options) => {
    const {imagesDirectory, resizeOptions} = options;

    const sourceDirectory = '../src'
    const sourceDirectoryPath = join(__dirname, sourceDirectory);
    const imagesDirectoryPath = join(sourceDirectoryPath, 'images');
    const sourceImagesPath = join(imagesDirectoryPath, imagesDirectory);
    const destinationImagesPath = join(sourceDirectoryPath, 'thumbnails');
    
    const fileList = await getAllFilesInDirectory(sourceImagesPath);

    try {
        await resizeFilesInDirectory({
            imagesDirectoryPath,
            destinationImagesPath,
            fileList,
            resizeOptions
        });
    }
    catch(error) {
        console.log(error.toString());
    }};

const convertAllFiles = async () => {
    // const imageDirectories = [
    //     'banners',
    //     'games',
    //     'landingpages',
    //     'posts',
    //     'social'
    // ];

    const resizeOptions = {
        width: 825,
        // height: 510
    };

    await convertAllDirectoryImages({
        imagesDirectory: 'banners',
        resizeOptions
    })
};

convertAllFiles();