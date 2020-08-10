const got = require('got');
const {parseStringPromise} = require('xml2js');

const getGoodreadsShelf = async (shelfName) => {
    const {GOODREADS_USER_ID: id, GOODREADS_API_KEY: apiKey} = process.env;

    const response = await got('https://www.goodreads.com/review/list', {
        searchParams: {
            v: 2,
            id,
            key: apiKey,
            shelf: shelfName,
            per_page: 200
        }
    });

    const data = await parseStringPromise(response.body);

    return data.GoodreadsResponse.reviews[0].review;
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
