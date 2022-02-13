const Cache = require("@11ty/eleventy-cache-assets");
const xml2js = require('xml2js');
const books = require('./books');

const extractGoodreadsBookMetadata = (goodReadsBook) => {
    const {rating, read_at} = goodReadsBook
    const {link, uri, title, image_url, authors} = goodReadsBook.book;
    const finishedOn = read_at ? new Date(read_at) : null;
    return {
        uri,
        link,
        title,
        imageUrl: image_url,
        rating,
        authorName: authors.author.name,
        authorLink: authors.author.link,
        finishedOn
    }
};

const extractReadingListMetadata = (list) => {
    const extractList = Array.isArray(list) ? list : [list];
    
    return extractList.map(extractGoodreadsBookMetadata);
};

const createGoodReadsUrl = (options) => {
    const reviewListUrl = 'https://www.goodreads.com/review/list';
    const queryParameters = new URLSearchParams(options);

    return `${reviewListUrl}?${queryParameters}`;
};

const getGoodreadsShelf = async (shelfName) => {
    try {
        const {GOODREADS_USER_ID: id, GOODREADS_API_KEY: apiKey} = process.env;
    
        const searchParams = {
            v: 2,
            id,
            key: apiKey,
            shelf: shelfName,
            per_page: 200
        };

        const url = createGoodReadsUrl(searchParams);

        const response = await Cache(url, {
            duration: '1d',
            type: 'text',
            fetchOptions: {
                headers: {
                    Accept: 'application/xhtml+xml'
                }
            }
        });

        const parser = xml2js.Parser({explicitArray: false});
        const data = await parser.parseStringPromise(response);

        return extractReadingListMetadata(data.GoodreadsResponse.reviews.review);
    }
    catch(error) {
        console.error(error.toString());
        return [];
    }
};

const updateBooks = (bookList) => {
    return bookList.map(book => {
        const {uri} = book;
        const updatedBook = books.find(updated => updated.uri === uri);
        const newBook = {
            ...book,
            ...updatedBook
        };

        return newBook;
    });
};


const getGoodreadsBooks = async () => {
    const currentlyReading = await getGoodreadsShelf('currently-reading');
    const read = await getGoodreadsShelf('read');
    read.sort((first, second) => new Date(second.finishedOn) - new Date(first.finishedOn));

    const books = {
        currentlyReading: updateBooks(currentlyReading),
        read: updateBooks(read)
    };

    return books;
};

module.exports = getGoodreadsBooks;
