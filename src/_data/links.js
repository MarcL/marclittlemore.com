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

const getLinks = async (collectionId, page = 0) => {
    const url = `https://api.raindrop.io/rest/v1/raindrops/${collectionId}?page=${page}&perpage=50`;
    console.log(`Retrieving Raindrop links: ${url}`);
    const data = await makeAuthenticatedCall(url);

    return data;
};

const getAllLinks = async (collectionId) => {
    let allItems = [];
    let page = 0;
    let hasMore = true;
    let totalItems = 0;

    while (hasMore) {
        const response = await getLinks(collectionId, page);
        allItems = allItems.concat(response.items);
        totalItems += response.items.length;

        hasMore = totalItems < response.count;
        page++;
    }

    return allItems;
}

const getRaindropLinks = async () => {
    let sortedLinks = [];

    try {
        const data = await makeAuthenticatedCall('https://api.raindrop.io/rest/v1/collections');
    
        // Find the collection
        const collection = data.items.find(collection => collection.title === COLLECTION_NAME);
        const {_id: id} = collection;
    
        const links = await getAllLinks(id);

        // Sort links by date, handling invalid dates
        sortedLinks = links
            .filter(item => item.created) // Filter out items without created date
            .sort((a, b) => {
                const dateA = new Date(a.created);
                const dateB = new Date(b.created);
                // Handle invalid dates by treating them as very old
                const timeA = isNaN(dateA.getTime()) ? 0 : dateA.getTime();
                const timeB = isNaN(dateB.getTime()) ? 0 : dateB.getTime();
                return timeB - timeA; // Sort newest first
            });
    } catch (error) {
        console.error('Unable to get Raindrop links: ', error.message);
    }

    return sortedLinks;
};

module.exports = getRaindropLinks;
