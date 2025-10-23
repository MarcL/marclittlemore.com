const {google} = require('googleapis');
const {AssetCache} = require("@11ty/eleventy-cache-assets");

const credentials = {
    project_id: process.env.GOOGLE_PROJECT_ID,
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    // 2. This is the magic trick:
    //    It replaces the escaped "\\n" (from process.env) with actual newlines.
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
};

const getGoogleSheetsNotes = async () => {
    const {GOOGLE_SHEETS_API_KEY, GOOGLE_SHEETS_SPREADSHEET_ID} = process.env;

    // Return empty array if API key is not configured or is dummy
    if (credentials.client_email === '') {
        console.log('Warning: Google Sheets API not configured, returning empty notes');
        return [];
    }

    try {
        const asset = new AssetCache('google-sheets-notes');
        
        if (asset.isCacheValid('1h')) {
            console.log('Loading Google Sheets notes from cache');
            
            const rows = await asset.getCachedValue();
            console.log({rows});
            return rows;
        }

        console.log('Loading Google Sheets notes from API');
        
        const auth = new google.auth.GoogleAuth({
            credentials: credentials, // Use the object here
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        });        

        const client = await auth.getClient();
        const sheets = google.sheets({ version: 'v4', auth: client });        
        
        // Assuming the data starts at row 2 (row 1 is headers)
        const range = 'Sheet1!A2:I'; // Timestamp, Content, Slug, Canonical URL, Bluesky URL, Mastodon URL, Twitter URL, Image URL, Telegram Image ID
        
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: GOOGLE_SHEETS_SPREADSHEET_ID,
            range: range,
        });

        const rows = response.data.values || [];

        console.log(`Fetched ${rows.length} rows from Google Sheets`);
        console.log({rows});
        
        const notes = rows
            .filter(row => row[0] && row[1] && row[2]) // Must have timestamp, content, and slug
            .map(row => {
                const [timestamp, content, slug, canonicalUrl, blueskyUrl, mastodonUrl, twitterUrl, imageUrl, telegramImageId] = row;
                
                // Parse the timestamp
                let date;
                try {
                    date = new Date(timestamp);
                    if (isNaN(date.getTime())) {
                        throw new Error('Invalid date');
                    }
                } catch (error) {
                    console.warn(`Invalid timestamp for note ${slug}: ${timestamp}`);
                    return null;
                }

                return {
                    title: slug,
                    content: content,
                    slug: slug,
                    date: date,
                    url: `/notes/${slug}/`,
                    canonicalUrl: canonicalUrl || null,
                    blueskyUrl: blueskyUrl || null,
                    mastodonUrl: mastodonUrl || null,
                    twitterUrl: twitterUrl || null,
                    imageUrl: imageUrl || null,
                    telegramImageId: telegramImageId || null,
                    // Mark as syndicated to distinguish from local notes
                    syndicated: true,
                    // Match local notes structure
                    syndicate: true,
                    categories: ['twitter', 'threads', 'mastodon', 'bluesky'],
                    data: {
                        syndicate: true,
                        syndicated: true
                    }
                };
            })
            .filter(note => note !== null); // Remove invalid entries

        await asset.save(notes, 'json');
        
        console.log(`Loaded ${notes.length} notes from Google Sheets`);
        return notes;

    } catch (error) {
        console.error('Error fetching Google Sheets notes:', error.toString());
        return [];
    }
};

module.exports = getGoogleSheetsNotes;
