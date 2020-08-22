const cachedHttpRequest = require('../../helpers/cachedHttpRequest');

const xml2js = require('xml2js');

const getGoodreadsShelf = async (shelfName) => {
    try {
        const {GOODREADS_USER_ID: id, GOODREADS_API_KEY: apiKey} = process.env;
    
        const response = await cachedHttpRequest('https://www.goodreads.com/review/list', {
            searchParams: {
                v: 2,
                id,
                key: apiKey,
                shelf: shelfName,
                per_page: 200
            },
            headers: {
                Accept: 'application/xhtml+xml'
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
