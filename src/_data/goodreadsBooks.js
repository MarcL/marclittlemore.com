const Cache = require("@11ty/eleventy-cache-assets");
const querystring = require('querystring');

const xml2js = require('xml2js');

const createGoodReadsUrl = (options) => {
    const reviewListUrl = 'https://www.goodreads.com/review/list';
    const queryParameters = querystring.stringify(options);
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

        return data.GoodreadsResponse.reviews.review;
    }
    catch(error) {
        console.error(error.toString());
        return [];
    }
}

const getGoodreadsBooks = async () => {
    const currentlyReading = await getGoodreadsShelf('currently-reading');
    const read = await getGoodreadsShelf('read');
    const books = {
        currentlyReading,
        read
    };

    return books;
};

module.exports = getGoodreadsBooks;
