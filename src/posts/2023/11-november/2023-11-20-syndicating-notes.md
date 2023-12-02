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

As someone who has been using Twitter since 2008, it's been a big part of my life since the early days of the [fail whale](https://www.theatlantic.com/technology/archive/2015/01/the-story-behind-twitters-fail-whale/384313/). Honestly, I was probably addicted to it at times and took it on and off my phone to try and break the scrolling habit.

I've met lots of fantastic people through it, I've learned a lot from it, and I've probably shared far too much on it. But since a billionaire finally bought it and took it over in October 2022, it's not the same place it was when I joined. It's become a place of anger, hate, and misinformation. Most of the great people I have followed have stopped tweeting.

As we all did, I looked for an alternative platform and I signed up to all of them, as most techies did. So, you can find me on [Mastodon]({{socialMedia.mastodon.url}}), [Bluesky]({{socialMedia.bluesky.url}}), [Threads]({{socialMedia.threads.url}}), and yes, I'm on [LinkedIn]({{socialMedia.linkedin.url}}) too if that's your thing.

The trouble with all of these platforms is that I get FOMO (Fear Of Missing Out) that I'm posting my content to the wrong platform. What's the right place to share my ramblings with the world? :smile:

## Enter the IndieWeb

{% callout "info" %}
**What is the IndieWeb?**

The [IndieWeb](https://indieweb.org/IndieWeb) is a community of independent & personal websites connected by simple standards, based on the principles of: owning your domain & using it as your primary identity, publishing on your own site (optionally syndicating elsewhere), and owning your data.
{% endcallout %}

I've been following the [IndieWeb](https://indieweb.org/) movement for a while and it got me thinking about how I can use their ideas to keep my content on my site but syndicate it to the various social media platforms. This idea is known as [POSSE](https://indieweb.org/POSSE) - Publish (on your) Own Site, Syndicate Elsewhere. This means you own your content and publish your thoughts on your own site first, then syndicate it to other platforms in a format that suits it.

I was inspired by some great articles by [Max Böck](https://mxb.dev/blog/syndicating-content-to-twitter-with-netlify-functions/) and [Matthias Ott](https://matthiasott.com/notes/syndicating-posts-personal-website-twitter-mastodon) who have both written about how they syndicate their content to other platforms. As a developer, it sounded like a fun challenge to see how I could use 11ty to post small notes to my site and automate the process of sending them to other platforms.

So let's do it...

## Create an Eleventy note collection



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