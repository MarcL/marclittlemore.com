# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Marc Littlemore's personal blog built with Eleventy (11ty) v3, styled with Tailwind CSS v3, and deployed on Netlify. The site is a content-rich platform featuring blog posts, short-form notes, games portfolio, talks, and integrations with multiple external APIs.

## Essential Build Commands

### Development
```bash
npm install                  # Install dependencies
npm run serve               # Full development server (Eleventy + Parcel + CSS watch)
npm run dev                 # Quick dev mode (Eleventy + CSS watch only)
npm run build:css:watch     # CSS watch mode only
npm run serve:js            # Parcel JS bundler in watch mode
```

### Building
```bash
npm run build:css           # Build CSS with PostCSS and Tailwind
npm run build:js            # Bundle JavaScript with Parcel
npm run build:site          # Build Eleventy site
npm run build:all           # Complete build (CSS + JS + site) - timeout: 120s+
npm run build               # Production build with optimizations and link validation - timeout: 180s+
```

### Validation & Testing
```bash
npm run links:internal      # Validate internal site links (pre-push hook) - timeout: 60s+
npm run links:external      # Check external links (slower, may timeout in restricted networks)
```

### Content Creation
```bash
npm run post:new            # Create new blog post template
```

## Critical Environment Variables

The site requires several API keys for full functionality. **Without these, builds will FAIL**. For development/testing, create a `.env` file with dummy values:

```bash
EMAIL_OCTOPUS_API_KEY=dummy
GOODREADS_API_KEY=dummy
GOODREADS_USER_ID=dummy
RAINDROP_API_TOKEN=dummy
WEBMENTIONS_IO_API_TOKEN=dummy
YOUTUBE_API_KEY=dummy
```

The site will build successfully with warning messages for failed API calls but show empty data for those sections.

## Architecture Overview

### Core Build Pipeline

The build process involves three independent stages that must complete before Eleventy runs:

1. **CSS Build**: PostCSS processes `src/css/main.css` → outputs to `_tmp/css/main.css` → Eleventy copies to `_site/css/main.css`
2. **JavaScript Build**: Parcel bundles `src/clientjs/index.js` → outputs to `src/distjs/` → Eleventy copies to `_site/js/`
3. **Eleventy Build**: Processes templates, markdown, data files → generates static site in `_site/`

### Directory Structure

```
├── src/
│   ├── _data/              # Global data files (APIs, site config)
│   ├── _includes/          # Liquid templates, layouts, partials
│   │   └── components/     # WebC components
│   ├── posts/              # Blog posts organized by year (markdown)
│   ├── pages/              # Static pages
│   ├── css/                # Tailwind CSS source
│   ├── clientjs/           # Client-side JavaScript (bundled with Parcel)
│   └── images/             # Static images and assets
├── _eleventy/              # Eleventy configuration modules
│   ├── collections.js      # Custom collections (tagList, feed)
│   ├── filters.js          # Custom Liquid filters
│   ├── shortcodes.js       # Custom shortcodes
│   ├── markdown.js         # Markdown-it configuration
│   └── plugins/            # Custom Eleventy plugins
├── _tmp/                   # Temporary build artifacts (CSS output)
├── _site/                  # Generated static site (build output)
├── scripts/                # Utility scripts (postNew.js)
├── netlify/                # Netlify functions and edge functions
└── .eleventy.js            # Main Eleventy configuration
```

### Data Layer Architecture (`src/_data/`)

Eleventy's global data files power dynamic content through external API integrations:

- **`site.js`**: Global site configuration, environment detection, canonical URLs
- **`goodreadsBooks.js`**: Fetches reading list from Goodreads API (requires `GOODREADS_API_KEY`, `GOODREADS_USER_ID`)
- **`newsletters.js`**: Subscriber data from EmailOctopus API (requires `EMAIL_OCTOPUS_API_KEY`)
- **`youTubeVideos.js`**: Video playlists from YouTube Data API (requires `YOUTUBE_API_KEY`)
- **`webmentions.js`**: Social mentions from webmention.io (requires `WEBMENTIONS_IO_API_TOKEN`)
- **`links.js`**: Bookmarks from Raindrop.io API (requires `RAINDROP_API_TOKEN`)
- **`navigationMenu.json`**: Main site navigation structure
- **`topics.js`**: Blog topic taxonomy

All data files handle API failures gracefully with fallback empty data and console warnings.

### Template Engine & Component System

The site uses **Liquid** as the primary template language with **WebC** for reusable components:

- **Layouts**: `src/_includes/default.html` is the base layout
- **Partials**: Reusable UI fragments in `src/_includes/partials/`
- **WebC Components**: `src/_includes/components/*.webc` (e.g., `post-meta.webc`, `post-image.webc`)

### Custom Eleventy Extensions

#### Collections (`_eleventy/collections.js`)
- **`tagList`**: Unique tags across all content (excludes 'post', 'talk', 'note')
- **`feed`**: RSS feed collection from `src/posts/**/*.md`

#### Filters (`_eleventy/filters.js`)
- **Content Processing**: `markdownify`, `xmlEscape`, `linkify`
- **Date Formatting**: `toISOString`, `rfc822Date`
- **Specialized**: `starRating`, `getPostByPath`, `webmentionsForUrl`, `collectionWithoutUrls`, `limitCollection`

#### Shortcodes (`_eleventy/shortcodes.js`)
- **`callout`**: Info/warning/tip callout blocks (supports markdown content)
- **`codetitle`**: Code block title labels
- **`gravatar`**: Gravatar avatar images by email
- **`quote`**: Styled blockquotes (optional quotation marks)

### Markdown Configuration (`_eleventy/markdown.js`)

Uses `markdown-it` with plugins:
- `markdown-it-attrs`: Add CSS classes/attributes to markdown elements
- `markdown-it-emoji`: Emoji support (`:heart:` → ❤️)

### Styling System

**Tailwind CSS** with plugins:
- `@tailwindcss/typography`: Prose styling for markdown content
- `@tailwindcss/forms`: Form component styling
- `@tailwindcss/aspect-ratio`: Responsive aspect ratios

Configuration: `tailwind.config.js` scans `src/**/*.{html,liquid,md,js}` and `_eleventy/**/*.js`

### Client-Side JavaScript

Minimal client-side JS bundled by Parcel:
- Entry: `src/clientjs/index.js`
- Output: `src/distjs/index.js` → copied to `_site/js/`
- Modules: `countdownTimer.js`, `responsiveMenuHandler.js`

### Plugin Architecture

**11ty Official Plugins**:
- `@11ty/eleventy-img`: Automatic image optimization with transforms
- `@11ty/eleventy-plugin-syntaxhighlight`: Code syntax highlighting
- `@11ty/eleventy-plugin-rss`: RSS feed generation
- `@11ty/eleventy-plugin-webc`: WebC component support

**Community Plugins**:
- `eleventy-plugin-embed-everything`: Auto-embed YouTube, Twitter, etc.
- `eleventy-plugin-time-to-read`: Calculate reading time
- `eleventy-plugin-nesting-toc`: Table of contents from h2 headers
- `@aloskutov/eleventy-plugin-external-links`: Auto-add rel/target to external links

**Custom Plugin**:
- `_eleventy/plugins/pocketcasts-embed`: Custom PocketCasts embed support

### Content Structure

**Blog Posts** (`src/posts/YYYY/*.md`):
- Frontmatter: `title`, `date`, `description`, `headerImage`, `tags`, `permalink`
- Organized by year directories
- Supports image attribution metadata

**Notes** (`src/notes/*.md`):
- Short-form content
- Similar frontmatter structure

### Deployment Architecture

**Netlify Configuration** (`netlify.toml`):
- Build command: `npm run build`
- Publish directory: `_site`
- Framework: `#static`

**Edge Functions**:
- `replaceSignupQuery`: Processes signup parameters on `/`, `/newsletter/`, `/about/`

**Netlify Functions** (`netlify/functions/`):
- `rebuild-daily.mts`: Scheduled daily rebuilds
- `rebuild-yearly.mts`: Scheduled yearly rebuilds

**Git Hooks** (Husky):
- Pre-push: Runs `npm run links:internal` to validate internal links

## Common Development Patterns

### Creating New Blog Posts

1. Run `npm run post:new` to generate template
2. Posts are created in `src/posts/YYYY/` based on current year
3. Add banner image to `src/images/banners/`
4. Use existing topic tags: "leadership", "learning", "development", "writing", "testing"

### Adding Shortcodes to Posts

```markdown
{% callout "info" %}
Your markdown content here
{% endcallout %}

{% codetitle "src/example.js" %}

{% gravatar "email@example.com" 150 "robohash" %}

{% quote %}
Your quote text
{% endquote %}
```

### Working with Data Files

Data files in `src/_data/` are automatically available in templates. To add new data:

1. Create `src/_data/mydata.js` with `module.exports = { ... }`
2. Access in templates via `{{ mydata.property }}`
3. For API integrations, handle failures gracefully with try-catch

### Modifying Styles

1. Edit `src/css/main.css` (Tailwind directives and custom CSS)
2. Use Tailwind utility classes directly in templates/markdown
3. Build with `npm run build:css` or use watch mode during development
4. Custom utility classes defined via Tailwind config

## Important Build Considerations

- **Never cancel long-running builds** - they will complete successfully given proper timeout
- **Always run `npm run links:internal`** before committing to catch broken links
- **API failures are expected in development** - site builds with warnings
- **Watch processes must be stopped properly** - use Ctrl+C, not hard kills
- **Parcel cache issues**: Delete `src/distjs/` and `.parcel-cache/` if JS changes don't appear

## Node.js Version

Use Node.js v22 LTS as specified in `.nvmrc`. Use `nvm use` if you have nvm installed.
