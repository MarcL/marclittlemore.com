// https://medium.com/hceverything/applying-srcset-choosing-the-right-sizes-for-responsive-images-at-different-breakpoints-a0433450a4a3
// Suggested sizes:
// - w 1024 for large (1.0)
// - w 768 for medium (0.75)
// - w 512 for small (0.5)
// - w 340 for thumbnails (0.33)
// --------------
// Filenames
// Keep the same file path but under /thumbnails
// - name-large.jpg
// - name-medium.jpg
// - name-small.jpg
// - name-thumb.jpg
// --------------
const fs = require('fs').promises;
const {join, resolve} = require('path');
const sharp = require('sharp');
const mkdirp = require('mkdirp');

const filenameIsAnImage = filename => {
    const filenameLowerCase = filename.toLowerCase();
    return filenameLowerCase.includes('.jpg') || filenameLowerCase.includes('.jpeg') || filenameLowerCase.includes('.png');
};

// Retrieve all image files in a directory
const getAllImageFilesInDirectory = async (sourcePath) => {
    const directoryEntries = await fs.readdir(sourcePath, { withFileTypes: true });
    const files = await Promise.all(directoryEntries.map((directoryEntry) => {
        const fullFilePath = resolve(sourcePath, directoryEntry.name);

        return directoryEntry.isDirectory() ? getAllImageFilesInDirectory(fullFilePath) : fullFilePath;
    }));

    return [].concat(...files).filter(filenameIsAnImage);
};

const convertImage = (sourceFilePath, resizeOptions, outputFilePath) => {
    return sharp(sourceFilePath)
        .resize(resizeOptions)
        .toFile(outputFilePath);
};

const createDestinationFilename = (originalFilename, suffix = '') => {
    const [filename, extension] = originalFilename.split('.');
    const destinationFilename = `${filename}${suffix}.${extension}`;

    return destinationFilename;
};

const resizeFilesInDirectory = async (options) => {
    const {imagesDirectoryPath, destinationImagesPath, fileList, resizeOptions, suffix} = options;

    await Promise.all(fileList.map(sourceFilePath => {
        const splitSourceImagesPath = sourceFilePath.split(imagesDirectoryPath);
        const outputFilePath = join(destinationImagesPath, splitSourceImagesPath[1]);
        const outputDirectoryWithFilename = outputFilePath.split('/');
        const filename = outputDirectoryWithFilename[outputDirectoryWithFilename.length - 1];
        const directoryLengthWithoutFilename = outputDirectoryWithFilename.slice(0, outputDirectoryWithFilename.length - 1);
        const outputDirectory = directoryLengthWithoutFilename.join('/');

        console.log(`${sourceFilePath} => ${outputFilePath}`);

        const outputFilename = createDestinationFilename(filename, `-${suffix}`);
        const destinationFileName = `${outputDirectory}/${outputFilename}`

        return mkdirp(outputDirectory)
            .then(() => convertImage(sourceFilePath, resizeOptions, destinationFileName));
    }));
};

const convertAllDirectoryImages = async (options) => {
    const {imagesDirectory, resizeOptions, suffix} = options;

    const sourceDirectory = '../src'
    const sourceDirectoryPath = join(__dirname, sourceDirectory);
    const imagesDirectoryPath = join(sourceDirectoryPath, 'images');

    const sourceImagesPath = join(imagesDirectoryPath, imagesDirectory);
    const destinationImagesPath = join(sourceDirectoryPath, 'thumbnails');
    
    const fileList = await getAllImageFilesInDirectory(sourceImagesPath);

    try {
        await resizeFilesInDirectory({
            imagesDirectoryPath,
            destinationImagesPath,
            fileList,
            resizeOptions,
            suffix
        });
    }
    catch(error) {
        console.log(error.toString());
    }};

const convertAllFiles = async () => {
    const imageDirectories = [
        {
            directory: 'social',
            resizeOptions: {
                width: 768
            },
            suffix: 'medium'
        },
        {
            directory: 'social',
            resizeOptions: {
                width: 512
            },
            suffix: 'small'
        },
        {
            directory: 'social',
            resizeOptions: {
                width: 340
            },
            suffix: 'thumb'
        },
        // {
        //     directory: 'social',
        //     resizeOptions: {
        //         width: 600
        //     }
        // }
    ];

    await Promise.all(imageDirectories.map((imageDirectoryInfo) => {
        const {directory, resizeOptions, suffix} = imageDirectoryInfo;
        return convertAllDirectoryImages({
            imagesDirectory: directory,
            resizeOptions,
            suffix
        });
    }));
};

convertAllFiles();