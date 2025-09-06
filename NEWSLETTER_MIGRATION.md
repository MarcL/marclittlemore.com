# Newsletter Archive Migration

This documents the migration from API-based newsletter loading to local file-based loading.

## Migration Process

1. **Export existing newsletters** (one-time):
   ```bash
   # Set up your Email Octopus API key
   export EMAIL_OCTOPUS_API_KEY="your-api-key-here"
   
   # Run the export script
   node scripts/export-newsletters.js
   ```

2. **Review and edit exported files**:
   - Check `src/_data/newsletters/` directory
   - Fix any incorrect links or content in the markdown files
   - Verify frontmatter is correct

3. **Build without API dependency**:
   ```bash
   npm run build:site
   ```

## Benefits

- ✅ No API key required for builds
- ✅ Faster builds (no external API calls)
- ✅ Content can be edited and version controlled
- ✅ No build-time HTML transformations needed
- ✅ More reliable builds (no external dependencies)

## File Structure

```
src/_data/newsletters/
├── README.md
├── 2022-01-15-weekly-newsletter-issue-1.md
└── 2022-01-22-weekly-newsletter-issue-2.md
```

Each newsletter file contains:
- Frontmatter with metadata (title, sent date, URL, etc.)
- Newsletter content in HTML format

## Rollback

If needed, you can rollback by:
1. Restoring `src/_data/newsletterArchive.js.backup` to `src/_data/newsletterArchive.js`
2. Restoring `src/_data/newsletters.js.backup` to `src/_data/newsletters.js`
3. Setting the `EMAIL_OCTOPUS_API_KEY` environment variable