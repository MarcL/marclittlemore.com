const COLLECTION_NAME = 'marclittlemore.com links';
const PLACEHOLDER_IMAGE = 'https://placehold.co/600x400?text=Image+Unavailable';

const isImageValid = async (url) => {
    if (!url) return false;
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        const response = await fetch(url, {
            method: 'HEAD',
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        if (!response.ok) return false;
        // Ensure the Content-Type is actually an image
        const contentType = response.headers.get('content-type');
        return contentType && contentType.startsWith('image/');
    } catch {
        return false;
    }
};

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
    const perPage = 50; // max allowed by API
    let page = 0;
    let allItems = [];

    while (true) {
        const url = `https://api.raindrop.io/rest/v1/raindrops/${collectionId}?page=${page}&perpage=${perPage}`;
        const data = await makeAuthenticatedCall(url);

        if (!data.items || data.items.length === 0) {
            break;
        }

        allItems = allItems.concat(data.items);

        // If we got fewer items than requested, we've reached the end
        if (data.items.length < perPage) {
            break;
        }

        page++;
    }

    return { items: allItems };
};

const getRaindropLinks = async () => {
    if (!process.env.RAINDROP_API_TOKEN) {
        console.log('Warning: RAINDROP_API_TOKEN not configured, returning empty links');
        return [];
    }

    let sortedLinks = [];

    try {
        const data = await makeAuthenticatedCall('https://api.raindrop.io/rest/v1/collections');
    
        // Find the collection
        const collection = data.items.find(collection => collection.title === COLLECTION_NAME);
        const {_id: id} = collection;
    
        const links = await getLinks(id);
    
        // Sort links by date
        sortedLinks = links.items.sort((a, b) => new Date(b.created) - new Date(a.created));

        // Validate cover images and replace broken ones with placeholder
        for (const link of sortedLinks) {
            if (!await isImageValid(link.cover)) {
                console.log(`Invalid cover image for "${link.title}": ${link.cover}`);
                link.cover = PLACEHOLDER_IMAGE;
            }
        }
    } catch (error) {
        console.error('Unable to get Raindrop links: ', error.message);
    }

    return sortedLinks;
};

module.exports = getRaindropLinks;
