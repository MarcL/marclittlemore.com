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

const resizeFilesInDirectory = async ({imagesDirectoryPath, destinationDirectoryPath, fileList, resizeOptions}) => {
    await Promise.all(fileList.map(sourceFilePath => {
        const outputFilePath = join(destinationDirectoryPath, sourceFilePath.split(imagesDirectoryPath)[1]);
        const outputDirectoryWithFilename = outputFilePath.split('/');
        const directoryLengthWithoutFilename = outputDirectoryWithFilename.slice(0, outputDirectoryWithFilename.length - 1);
        const outputDirectory = directoryLengthWithoutFilename.join('/');

        console.log(`${sourceFilePath} => ${outputFilePath}`);

        return mkdirp(outputDirectory)
            .then(() => convertImage(sourceFilePath, resizeOptions, outputFilePath));
    }));
};

const convertAllDirectoryImages = async (options) => {
    const {sourceDirectoryPath, sourceDirectory, outputDirectory, resizeOptions} = options;
    const imagesDirectoryPath = join(sourceDirectoryPath, sourceDirectory);
    const destinationDirectoryPath = join(sourceDirectoryPath, outputDirectory);
    
    const fileList = await getAllFilesInDirectory(imagesDirectoryPath);

    try {
        await resizeFilesInDirectory({imagesDirectoryPath, destinationDirectoryPath, fileList, resizeOptions});
    }
    catch(error) {
        console.log(error.toString());
    }
};

const convertAllFiles = async () => {
    const sourceDirectory = '../src/images'
    const sourceDirectoryPath = join(__dirname, sourceDirectory);
    // const imageDirectories = [
    //     'banners',
    //     'games',
    //     'landingpages',
    //     'posts',
    //     'social'
    // ];

    // await convertAllDirectoryImages({
    //     sourceDirectoryPath,
    //     sourceDirectory: 'landingpages',
    //     outputDirectory: 'thumbnails',
    //     resizeOptions
    // });
    const imagesDirectoryPath = join(sourceDirectoryPath, 'landingpages');
    const destinationDirectoryPath = join(sourceDirectoryPath, 'thumbnails');
    const resizeOptions = {
        width: 825,
        // height: 510
    };
    
    const fileList = await getAllFilesInDirectory(imagesDirectoryPath);

    try {
        await resizeFilesInDirectory({imagesDirectoryPath, destinationDirectoryPath, fileList, resizeOptions});
    }
    catch(error) {
        console.log(error.toString());
    }
};

convertAllFiles();