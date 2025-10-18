# Marc Littlemore's Personal Blog

Marc Littlemore's personal blog is an 11ty (Eleventy) static site generator-based website with Tailwind CSS styling, deployed on Netlify. The site features blog posts, notes, games portfolio, talks, and integrations with external services like EmailOctopus, Goodreads, YouTube, and more.

**Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Bootstrap and Build
- **Node.js Version**: Use Node.js v20 (as specified in `.nvmrc`). Current system has v20.19.4 which is compatible.
- **Install Dependencies**: `npm install` (takes ~37 seconds)
- **Build Components**:
  - CSS: `npm run build:css` (takes ~2 seconds)
  - JavaScript: `npm run build:js` (takes ~1 second) 
  - Site: `npm run build:site` (takes ~4 seconds without API keys, longer with network calls)
  - **Full Build**: `npm run build:all` (takes ~7-8 seconds) - **NEVER CANCEL**. Set timeout to 120+ seconds.
  - **Production Build**: `npm run build` - includes production optimizations and link checking

### Required Environment Variables
The site requires several API keys for full functionality:
- `EMAIL_OCTOPUS_API_KEY` - for newsletter integration
- `GOODREADS_USER_ID` and `GOODREADS_API_KEY` - for book lists  
- `YOUTUBE_API_KEY` - for video playlists
- `WEBMENTIONS_IO_API_TOKEN` - for webmentions
- `RAINDROP_API_TOKEN` - for bookmarks/links

**CRITICAL**: Without these API keys, the build will FAIL with error messages. For development/testing:
1. **Create `.env` file** with dummy values:  
   `EMAIL_OCTOPUS_API_KEY=dummy GOODREADS_USER_ID=dummy GOODREADS_API_KEY=dummy YOUTUBE_API_KEY=dummy WEBMENTIONS_IO_API_TOKEN=dummy RAINDROP_API_TOKEN=dummy`
2. **Or set environment variables** before build:  
   `EMAIL_OCTOPUS_API_KEY=dummy GOODREADS_USER_ID=dummy GOODREADS_API_KEY=dummy YOUTUBE_API_KEY=dummy WEBMENTIONS_IO_API_TOKEN=dummy RAINDROP_API_TOKEN=dummy npm run build:site`

The site will show warning messages for failed API calls but will build successfully with empty data.

### Development Server
- **Full Development**: `npm run serve` - starts all services (Eleventy, Parcel, CSS watch)
- **Quick Development**: `npm run dev` - starts Eleventy and CSS watching
- **Individual Services**:
  - `npm run serve:js` - Parcel JS bundler in watch mode
  - `npm run build:css:watch` - PostCSS in watch mode

### Validation and Testing
- **Link Checking**: `npm run links:internal` (takes ~5 seconds) - validates internal site links
- **External Links**: `npm run links:external` - checks external links (takes longer)
- **Content Creation**: `npm run post:new` (takes ~0.2 seconds) - creates new blog post template
- **Notes**: `npm run postNotes` - creates social media posts from notes

### Pre-commit Validation
- **Pre-push Hook**: Automatically runs `npm run links:internal` via Husky
- **Always run link checking before committing** to avoid CI failures

## Timing Expectations
- **NEVER CANCEL builds or long-running commands**
- `npm install`: 30-40 seconds  
- `npm run build:css`: 1-3 seconds
- `npm run build:js`: 1-2 seconds  
- `npm run build:site`: 4-10 seconds (depending on network)
- `npm run build:all`: 7-15 seconds - **Set timeout to 120+ seconds**
- `npm run build` (production): 10-30 seconds - **Set timeout to 180+ seconds**
- `npm run links:internal`: 3-6 seconds - **Set timeout to 60+ seconds**
- Development server startup: 5-10 seconds

## Validation Scenarios
After making changes, **ALWAYS validate**:

1. **Build Validation**: Run `npm run build:all` to ensure the site builds successfully
2. **Link Validation**: Run `npm run links:internal` to check internal links aren't broken  
3. **Development Server**: Start `npm run serve` and verify the site loads at http://localhost:8080
4. **Content Validation**: 
   - Check that new posts appear in the correct location
   - Verify banner images and assets load correctly
   - Test any custom shortcodes or filters used

### Manual Testing Workflow
1. **Start Development Server**: `npm run serve`
2. **Navigate to**: `http://localhost:8080` 
3. **Test Navigation**: Verify main menu, topic pages, and post archives work
4. **Test Content**: Check that posts, notes, and pages render correctly
5. **Test Responsive Design**: Verify mobile/desktop layouts using browser dev tools

## Key Projects and Structure

### Directory Structure
```
├── src/
│   ├── _data/          # Eleventy data files (APIs, site config)
│   ├── _includes/      # Liquid templates and layouts
│   ├── clientjs/       # Client-side JavaScript (bundled with Parcel)
│   ├── css/           # Tailwind CSS source
│   ├── images/        # Static images and assets
│   ├── posts/         # Blog posts organized by year
│   ├── notes/         # Short-form notes/thoughts
│   └── pages/         # Static pages (about, contact, etc.)
├── _eleventy/         # Eleventy configuration (shortcodes, filters, collections)
├── _tmp/              # Temporary build files (CSS output)
├── _site/             # Generated static site (build output)
└── scripts/           # Node.js utility scripts
```

### Important Files
- `.eleventy.js` - Main Eleventy configuration
- `package.json` - Build scripts and dependencies
- `tailwind.config.js` - Tailwind CSS configuration  
- `postcss.config.js` - PostCSS configuration for CSS processing
- `netlify.toml` - Netlify deployment configuration
- `.nvmrc` - Node.js version specification

### Data Sources (`src/_data/`)
- `site.js` - Global site configuration
- `navigationMenu.json` - Main site navigation
- `goodreadsBooks.js` - Reading list from Goodreads API
- `newsletters.js` - Newsletter subscriber data from EmailOctopus
- `youTubeVideos.js` - Video playlists from YouTube API
- `webmentions.js` - Social mentions from webmention.io
- `links.js` - Bookmarks from Raindrop.io

### Custom Features
- **Shortcodes**: `callout`, `codetitle`, `gravatar`, `quote` (defined in `_eleventy/shortcodes.js`)
- **Filters**: `markdownify`, `starRating`, `rfc822Date`, `xmlEscape` (defined in `_eleventy/filters.js`)
- **Image Processing**: Automatic optimization via `@11ty/eleventy-img`
- **Syntax Highlighting**: Code blocks with `@11ty/eleventy-plugin-syntaxhighlight`

## Common Tasks

### Creating New Content
- **New Blog Post**: `npm run post:new` - creates template in `src/posts/YYYY/`
- **Banner Images**: Place in `src/images/banners/` and reference in post frontmatter
- **Topic Tags**: Use existing topics like "leadership", "learning", "development", "writing"

### Modifying Styles
- **CSS Changes**: Edit `src/css/main.css` (Tailwind CSS)
- **Rebuild CSS**: `npm run build:css` 
- **Watch Mode**: `npm run build:css:watch` for live reloading

### Working with APIs
- **Missing APIs**: Site builds with warnings when API keys are missing
- **Network Issues**: Data files handle fetch failures gracefully with fallback data
- **Testing**: Use dummy environment variables to test API integration locally

### Deployment
- **Production Build**: `npm run build` - includes optimizations and link validation
- **Deploy Target**: Netlify (configured in `netlify.toml`)
- **Build Command**: `npm run build` (configured in Netlify)
- **Publish Directory**: `_site`

## Known Issues and Workarounds

### API Dependencies
- **External API Failures**: The site gracefully handles API timeouts/failures with warning messages
- **Development**: Can build and run locally without API keys (with reduced functionality)
- **Production**: Requires valid API keys for full feature set

### Network Limitations  
- **Gravatar Images**: May fail to load in restricted network environments
- **External Link Checking**: `npm run links:external` may timeout in restricted environments
- **Solution**: Use `npm run links:internal` for validation in restricted environments

### Build Warnings
- **Dependency Warnings**: npm install shows deprecation warnings - these are expected and don't affect functionality
- **Eleventy Image Errors**: External image fetch failures are expected in restricted networks

## Quick Reference Commands

### Essential Commands (copy-paste ready)
```bash
# Bootstrap
npm install

# Setup for development (required for builds without real API keys)
cat > .env << 'EOF'
EMAIL_OCTOPUS_API_KEY=dummy
GOODREADS_USER_ID=dummy
GOODREADS_API_KEY=dummy
WEBMENTIONS_IO_API_TOKEN=dummy
YOUTUBE_API_KEY=dummy
RAINDROP_API_TOKEN=dummy
EOF

# Development
npm run serve                    # Full dev server
npm run dev                     # Quick dev mode  
npm run build:css:watch         # CSS watch only

# Building
npm run build:css               # CSS only
npm run build:js                # JS only  
npm run build:site              # Site only
npm run build:all               # Complete build
npm run build                   # Production build

# Validation  
npm run links:internal          # Internal link check
npm run post:new               # Create new post

# Git hooks
# Pre-push automatically runs: npm run links:internal
```

### Directory Listing
```
# Repository root
.eleventy.js         package.json         src/
.eleventyignore      postcss.config.js    tailwind.config.js
.nvmrc              renovate.json         netlify.toml
README.md           scripts/              functions/
```

Always build and validate your changes before committing. The site is designed to be resilient to network issues but requires proper build validation to ensure content renders correctly.