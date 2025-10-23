# Google Sheets Notes Integration

This integration allows the notes page to display content from both local markdown files and a Google Sheets spreadsheet, ordered chronologically.

## Setup

### Environment Variables

Add these environment variables to your `.env` file or deployment configuration:

```
GOOGLE_SHEETS_API_KEY=your_google_api_key
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id
```

### Google Sheets Format

The Google Sheets document should have the following columns (starting from row 2, row 1 is headers):

| Column | Field | Description | Required |
|--------|-------|-------------|----------|
| A | Timestamp | ISO 8601 date string (e.g., "2023-12-01T12:00:00.000Z") | ✅ |
| B | Content | Note content (markdown supported) | ✅ |
| C | Slug | URL slug (e.g., "my-note-title") | ✅ |
| D | Canonical URL | Original post URL | ❌ |
| E | Bluesky URL | Bluesky post URL | ❌ |
| F | Mastodon URL | Mastodon post URL | ❌ |
| G | Twitter URL | Twitter/X post URL | ❌ |
| H | Image URL | Image URL for the note | ❌ |
| I | Telegram Image ID | Telegram image ID | ❌ |

### Example Row

```
2023-12-01T12:00:00.000Z | This is my note content! | my-first-note | https://example.com/original | https://bsky.app/... | https://mastodon.social/... | https://twitter.com/... | https://example.com/image.jpg | telegram_123
```

## How It Works

1. **Data Fetching**: The `googleSheetsNotes.js` data file fetches notes from Google Sheets using the Google Sheets API
2. **Collection Merging**: The `allNotes` collection combines local markdown notes with Google Sheets notes  
3. **Chronological Ordering**: All notes are sorted by date (newest first)
4. **Individual Pages**: Each Google Sheets note gets its own page at `/notes/{slug}/`
5. **Graceful Degradation**: If API credentials are missing, the site builds without Google Sheets notes

## Files Modified

- `src/_data/googleSheetsNotes.js` - Google Sheets API integration
- `src/pages/googleSheetsNote.md` - Template for individual Google Sheets note pages
- `_eleventy/collections.js` - Combined notes collection
- `src/pages/notes.md` - Updated notes listing page
- `.env` - Environment variables for API credentials

## Development

For local development without real API credentials, set dummy values:

```
GOOGLE_SHEETS_API_KEY=dummy
GOOGLE_SHEETS_SPREADSHEET_ID=dummy
```

The site will build successfully and display only local notes.

## Deployment

1. Create a Google Sheets document with the required format
2. Set up Google Sheets API credentials
3. Configure environment variables in your deployment platform
4. Deploy the site

The integration will automatically fetch and display notes from both sources.