const Cache = require("@11ty/eleventy-cache-assets");
const emailOctopusConfig = require('./emailOctopus.json')

const EMAIL_OCTOPUS_BASE_URL = 'https://emailoctopus.com/api/1.6';
const EMAIL_OCTOPUS_WEB_VIEW_URL = 'https://eocampaign1.com/web-version';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    const locale = 'en-US';
    const day = date.toLocaleDateString(locale, { day: '2-digit' });
    const month = date.toLocaleDateString(locale, { month: '2-digit' });
    const year = date.toLocaleDateString(locale, { year: 'numeric' });
    return `${year}-${month}-${day}`;
};

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
            const {id, name, status, created_at: created, sent_at: sent, content} = newsletter;
            return {
                created,
                sent,
                sentSlug: formatDate(sent),
                title: name,
                url: `${EMAIL_OCTOPUS_WEB_VIEW_URL}?p=${id}&pt=campaign`,
                status,
                content
            };
        })
        .filter(newsletter => newsletter.status.toLowerCase() === 'sent');

    return newsletters;
};
