const COLLECTION_NAME = 'marclittlemore.com links';

const makeAuthenticatedCall = async (url, options) => {
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${process.env.RAINDROP_API_TOKEN}`
        },
        ...options
    });

    return await response.json();
};

const getLinks = async (collectionId) => {
    const data = await makeAuthenticatedCall(`https://api.raindrop.io/rest/v1/raindrops/${collectionId}`);

    return data;
};

const getRaindropLinks = async () => {
    const data = await makeAuthenticatedCall('https://api.raindrop.io/rest/v1/collections');

    // Find the collection
    const collection = data.items.find(collection => collection.title === COLLECTION_NAME);
    const {_id: id} = collection;

    const links = await getLinks(id);

    // Sort links by date
    const sortedLinks = links.items.sort((a, b) => new Date(b.created) - new Date(a.created));

    return sortedLinks;
};

module.exports = getRaindropLinks;
