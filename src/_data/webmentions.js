const Cache = require("@11ty/eleventy-cache-assets");
const site = require('./site');

const WEBMENTIONS_IO_API = 'https://webmention.io/api/mentions.jf2';
const token = process.env.WEBMENTIONS_IO_API_TOKEN;

module.exports = async () => {
    if (!token) {
        console.log('Warning: WEBMENTIONS_IO_API_TOKEN not configured, returning empty webmentions');
        return [];
    }

    const url = `${WEBMENTIONS_IO_API}?domain=${site.domain}&token=${token}&per-page=999`;

    try {
        const response = await Cache(url, {
            duration: '1h',
            type: 'text',
            fetchOptions: {
                headers: {
                    Accept: 'application/json'
                }
            }
        });

        const parsedResponse = JSON.parse(response);
        const {children: webmentions} = parsedResponse;

        return webmentions;
    } catch(error) {
        console.error(error);
        return null;
    }
};
