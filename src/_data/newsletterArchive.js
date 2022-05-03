const Cache = require("@11ty/eleventy-cache-assets");
const {JSDOM} = require('jsdom');
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

const parseEmailOctopusHtml = (html) => {
    const dom = new JSDOM(html);
    const {window: {document}} = dom;

    // Providing I don't change the template
    // this should work - a bit hacky I know
    // -> div with class "mj-column-per-100 mj-outlook-group-fix"
    // Should return 4 x elements
    // - View on page
    // - Main content
    // - Social / sharing links
    // - Footer
    const elements = document.getElementsByClassName('mj-column-per-100 mj-outlook-group-fix');
    if (elements[1]) {
        // Find first paragraph
        const paragraphs = elements[1].getElementsByTagName('p');
        if (paragraphs.length > 1) {
            // Replace: "Hello {{FirstName|default("my friend")}}!"
            // With: "Hello my friend!""
            paragraphs[0].innerHTML = paragraphs[0].innerHTML.replace('{{FirstName|default("my friend")}}', 'my friend');
        }
        return elements[1].innerHTML;
    }

    // First issue wasn't built with MJML
    return dom.window.document.body.innerHTML;
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

            const html = parseEmailOctopusHtml(content.html);

            return {
                created,
                sent,
                sentSlug: formatDate(sent),
                title: name,
                url: `${EMAIL_OCTOPUS_WEB_VIEW_URL}?p=${id}&pt=campaign`,
                status,
                content,
                html
            };
        })
        .filter(newsletter => newsletter.status.toLowerCase() === 'sent');

    return newsletters;
};
