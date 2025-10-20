---
title: "This is a Draft Post for Testing"
permalink: "/draft-post-example/"
date: "2025-10-20"
headerImage: "/images/banners/write-ideas.jpg"
description: "This is a draft post that should only appear in development mode."
draft: true
tags:
    - writing
    - development
image:
    source: https://unsplash.com/photos/AXqMy8MSSdk
    creator: Aaron Burden
    url: https://unsplash.com/@aaronburden
---

This is a draft blog post that I'm working on. It should only be visible when running in development mode with `ELEVENTY_ENV=dev`.

When I build for production, this post should not appear in the blog listing or RSS feed.

## Draft Features

- Only visible in development
- Won't appear in production builds
- Should be excluded from RSS feeds
- Can work on posts over time without publishing

This allows me to work on posts as pull requests without them going live until I'm ready to publish them.