---
title:  "Own Your Content: A Guide to Syndicating Notes with IndieWeb POSSE and Eleventy"
# TODO: Update title + permalink
permalink: /own-your-content-syndicating-notes-with-eleventy/
headerImage: /images/banners/syndicating-notes.jpg
description: 
tags:
    - development
image:
    creator: Leonardo.ai
    url: https://leonardo.ai
---

## Introduction

- Mention Twitter and why you want to move off it
- Other social media platforms: Mastodon, Bluesky, Threads, even LinkedIn
- FOMO - where do you post your thoughts? How do you connect with your people?

- Highlight the growing trend of sharing thoughts and ideas on social media platforms.
- Introduce the IndieWeb and the POSSE (Publish (on your) Own Site, Syndicate Elsewhere) concept.

## Understanding IndieWeb and POSSE

- Explain the IndieWeb movement and its goal of decentralizing the web.
- Define the POSSE concept and how it encourages users to publish content on their own websites before sharing it on social media platforms.
- Discuss the advantages of POSSE, such as maintaining control over your content and owning your online presence.

[POSSE](https://indieweb.org/POSSE)

## Eleventy: Create a note collection

- Guide readers on how to set up a personal website or blog using platforms like WordPress, Jekyll, or Hugo.
- Explain the importance of having a domain name and web hosting.
- Provide tips on choosing a user-friendly and customizable theme for your website.

## Create Node.js scripts to share notes
- Discuss popular note-taking tools and systems such as Evernote, OneNote, or plain text files.
- Emphasize the importance of choosing a system that allows easy integration with your personal website.
- Recommend tools that support both web-based and offline note-taking for flexibility.

## Check we've not posted them already

- Generate a JSON file with links to the existing notes
- Explain the process of creating notes on your personal website or blog.
- Guide readers on how to format and organize notes for optimal presentation.
- Provide step-by-step instructions on syndicating notes to social media platforms like Twitter, Mastodon, or LinkedIn.

## Automation and Tools
- Introduce automation tools and plugins that simplify the POSSE process.
- Discuss the benefits of using services like Zapier or IFTTT to automatically share notes across multiple platforms.
- Provide examples of how automation can save time and streamline the syndication workflow.

## Best Practices for Effective Note Syndication
- Offer tips on crafting engaging and shareable notes for social media.
- Emphasize the importance of maintaining consistency in tone and style across platforms.
- Encourage readers to actively engage with their audience on social media to foster meaningful discussions.

## What's next?

### Add Threads API

- Waiting for the API to be released

### Automation
- Using GitHub actions or Netlify functions

### Image Uploads
- Upload images

### Threaded Notes

- Split up text appropriately - simple check per-platform and it fails at the moment
- Create threads
- Link back to original note

### Optimise the code

The code doesn't need to be overly efficient when I've only got a few notes but it could become much slower.

## Conclusion
- Recap the key concepts of IndieWeb and POSSE.
- Highlight the benefits of syndicating notes to social media platforms.
- Encourage readers to explore the IndieWeb community for ongoing support and inspiration.

By following this guide, readers will be empowered to take control of their online presence, share their thoughts seamlessly across platforms, and actively contribute to the IndieWeb movement.

## Reference

- [Build bots on Bluesky with Node.js and GitHub actions](https://philna.sh/blog/2023/05/01/build-bots-on-bluesky-with-typescript/) by [Phil Nash](https://mastodon.social/@philnash)
- [Syndicating Content to Twitter](https://mxb.dev/blog/syndicating-content-to-twitter-with-netlify-functions/)