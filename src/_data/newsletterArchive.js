const Cache = require("@11ty/eleventy-cache-assets");
const emailOctopusConfig = require('./emailOctopus.json')

const archive = [
    {
        date: '2022-04-16',
        title: '#2 - Intentional Technical Management',
        url: 'https://eocampaign1.com/web-version?p=c0293117-b902-11ec-9258-0241b9615763&pt=campaign&t=1649974143&s=3266ff457b83bcf935a934a8667520562946070817bbfd061dd8a0c0597f09ab'
    },
    {
        date: '2022-04-09',
        title: '#1 - Intentional Technical Management',
        url: 'https://eocampaign1.com/web-version?p=94cb337e-b138-11ec-9258-0241b9615763&pt=campaign&t=1649500681&s=3b446ff9d810ff8a09a5c08a6f0a0fb26e37842da31472e01b74b1ab010a2ba9'
    },
];

const EMAIL_OCTOPUS_BASE_URL = 'https://emailoctopus.com/api/1.6';

module.exports = async () => {
    const {EMAIL_OCTOPUS_API_KEY: apiKey} = process.env;

    if (!apiKey) {
        throw new Error('Expecting EMAIL_OCTOPUS_API_KEY in environment variables!');
    }
    
    const {listId} = emailOctopusConfig;
    const url = `${EMAIL_OCTOPUS_BASE_URL}/campaigns?api_key=${apiKey}`;

    const response = await Cache(url, {
        duration: '1d',
        type: 'json',
    });

    // Retrieve newsletters that match the list ID for this site
    // in case I start another!
    const newsletters = response.data.filter(newsletter => newsletter.to.includes(listId));

    return archive;
};
