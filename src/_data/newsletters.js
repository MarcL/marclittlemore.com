const Cache = require("@11ty/eleventy-cache-assets");
const emailOctopusConfig = require('./emailOctopus.json')

const MINIMUM_SUBSCRIBERS = 237;
const EMAIL_OCTOPUS_BASE_URL = 'https://emailoctopus.com/api/1.6';

module.exports = async () => {
    const {EMAIL_OCTOPUS_API_KEY: apiKey} = process.env;

    if (!apiKey || apiKey === 'dummy') {
        console.log('Warning: EMAIL_OCTOPUS_API_KEY not configured, using fallback subscribers count');
        return {
            subscribers: MINIMUM_SUBSCRIBERS
        };
    }
    
    try {
        const {listId} = emailOctopusConfig;
        const url = `${EMAIL_OCTOPUS_BASE_URL}/lists/${listId}?api_key=${apiKey}`;

        const response = await Cache(url, {
            duration: '1d',
            type: 'json',
        });

        const actualSubscribers = response.counts.subscribed;
        const subscribers = actualSubscribers < MINIMUM_SUBSCRIBERS ?
            MINIMUM_SUBSCRIBERS : actualSubscribers;

        return {
            subscribers
        };
    } catch (error) {
        console.error('Error fetching newsletter data:', error.toString());
        return {
            subscribers: MINIMUM_SUBSCRIBERS
        };
    }
}