# Newsletter Archive

This directory contains local copies of newsletter content that were previously fetched from the Email Octopus API.

Each newsletter file should be named using the format: `YYYY-MM-DD-{slug}.md`

## File Format

Each newsletter file should have the following frontmatter:

```yaml
---
title: "Newsletter Title"
sent: "2022-08-14T12:00:00Z"
sentSlug: "2022-08-14"
url: "https://eocampaign1.com/web-version?p=campaign-id&pt=campaign"
status: "sent"
---

Newsletter content goes here in HTML or Markdown format.
```

## Benefits

- No API dependency during build time
- Content can be corrected/edited locally without build-time transformations
- Faster builds since no external API calls are required
- Version controlled newsletter content