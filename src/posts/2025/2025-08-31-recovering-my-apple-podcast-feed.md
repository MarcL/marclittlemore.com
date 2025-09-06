---
title: "Recovering My Apple Podcast Feed"
permalink: "/recovering-my-apple-podcast-feed/"
date: "2025-08-31"
headerImage: "/images/banners/recovering-my-apple-podcast-feed.jpg"
description: ""
excerpt: When you post your podcast to Apple Podcasts back in 2005, it's tricky to get ownership of your feed so here's how I did it.
tags:
    - podcast
image:
    source: https://unsplash.com/photos/black-and-silver-microphone-on-brown-wall-Qruwi3Ur3Ak
    creator: Chris Lynch
    url: https://unsplash.com/@chris_lynch_
---

Way back in the early 2000s, I was still quite a successful DJ under my alter ego of [DJ Cruze](https://www.djcruze.co.uk/). I was regularly travelling to Germany and playing at various clubs and I wanted to share my mixes with a wider audience, and get more gigs! Around this time I discovered podcasts and started digging into what they were and how to create them.

As I was a video games programmer at the time, I wasn't an expert on the web so I had originally set up my DJ Cruze website as a Blogger site and then moved over to a self-hosted Wordpress site when I needed more control over it. I knew that Wordpress supported RSS and with a couple of extra plugins, I soon had an RSS feed set up for a new podcast.

Around 2005, Apple leaned heavily into podcasting and allowed you to submit your podcast to their iTunes directory. I submitted my podcast and and quickly discovered that I needed to cache my feed to stop my shared Dreamhost website from quickly using up all of its bandwidth. I really was a noob when it came to understanding web technologies at the time! :man_facepalming:

## Enter Feedburner

Feedburner was a web service that let you manage RSS feeds. I remember finding it and realising I could offload most of the bandwidth usage to them. I quickly redirected the site to use them.

https://feeds.feedburner.com/djcruzepodcast

http://www.djcruze.co.uk/cms/index.php?feed=rss2&category_name=podcasts


https://www.djcruze.co.uk/podcasts/

1st podcast: 30th September 2005
https://www.djcruze.co.uk/podcasts/episode-1-something-fresh/

## Redirecting the feed URL

```xml
 <itunes:new-feed-url>https://www.djcruze.co.uk/podcasts/feed.xml</itunes:new-feed-url>
 ```

## Make sure your GUIDs don't change

Some text

## Claiming the feed in Apple Podcasts

Thanks to the great info in Rob Knight's [article on verifying an Apple Podcast feed](https://rknight.me/blog/how-to-verify-an-apple-podcasts-claim-in-your-rss-feed/) , I was able to verify ownership of my podcast feed in Apple Podcasts.

Similar to a UUID

```xml
<itunes:applepodcastsverify>8c011b37-3cc1-4bb9-8c38</itunes:applepodcastsverify>
```
