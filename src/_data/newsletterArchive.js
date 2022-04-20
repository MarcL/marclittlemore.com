const Cache = require("@11ty/eleventy-cache-assets");
const emailOctopusConfig = require('./emailOctopus.json')

const EMAIL_OCTOPUS_BASE_URL = 'https://emailoctopus.com/api/1.6';
const EMAIL_OCTOPUS_WEB_VIEW_URL = 'https://eocampaign1.com/web-version';

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
    const newsletters = response.data.filter(newsletter => newsletter.to.includes(listId))
        .map(newsletter => {
            const {id, name, status, created_at: created, sent_at: sent} = newsletter;
            return {
                created,
                sent,
                title: name,
                url: `${EMAIL_OCTOPUS_WEB_VIEW_URL}?p=${id}&pt=campaign`,
                status,
            };
        })
        .filter(newsletter => newsletter.status.toLowerCase() === 'sent');

    return newsletters;
};
