---
title: "Recovering My Apple Podcast Feed"
permalink: "/recovering-my-apple-podcast-feed/"
date: "2025-11-18"
headerImage: "/images/banners/recovering-my-apple-podcast-feed.jpg"
description: "How I reclaimed ownership of my podcast feed after nearly 20 years."
excerpt: When you post your podcast to Apple Podcasts back in 2005, it's tricky to get ownership of your feed so here's how I did it.
tags:
    - podcast
image:
    source: https://unsplash.com/photos/black-and-silver-microphone-on-brown-wall-Qruwi3Ur3Ak
    creator: Chris Lynch
    url: https://unsplash.com/@chris_lynch_
---

Way back in the mid 2000s, I was still quite a successful DJ under my alter ego of [DJ Cruze](https://www.djcruze.co.uk/). I was regularly travelling to Germany and playing at various clubs and I wanted to share my mixes with a wider audience, and yes, try to get a few more DJ gigs! I also discovered podcasts for the first time and started digging into what they were and listened to a few, mainly Leo Laporte's "This Week In Tech (TWIT)" and Adam Curry's "The Daily Source Code". Nerdy ones!

As I was a video games programmer at the time, I wasn't an expert on the web so I had naively set up my DJ Cruze website as a Blogger site. This worked for a while but I moved over to self-hosted Wordpress to get a bit more control over it once I started finding the limitations of Blogger. It also allowed me to set up an RSS feed for my blog posts and then I discovered that this was the key to podcasting. I knew that Wordpress supported RSS and after some research, and with a couple of extra Wordpress plugins, I soon had an RSS feed set up for a new podcast.

Around 2005, Apple leaned heavily into podcasting and allowed you to submit your podcast to their iTunes directory. I submitted my podcast into the ether and thought nothing much of it. However, I soon gained some fans and quickly discovered that I needed to cache my feed to stop my shared Dreamhost website from quickly using up all of its bandwidth. I really was a noob when it came to understanding web technologies at the time!

## Enter Feedburner

Feedburner was a web service that let you manage RSS feeds and, more importantly for me, it could cache them and handle all the bandwidth. I remember the relief when I found it. Finally, a solution to my bandwidth problems that didn't involve me paying for better hosting! I was far too much of a cheapskate back then.

I quickly set up a redirect so my Wordpress feed URL pointed to Feedburner instead:

```
Original feed: http://www.djcruze.co.uk/cms/index.php?feed=rss2&category_name=podcasts
Feedburner URL: https://feeds.feedburner.com/djcruzepodcast
```

I submitted this new Feedburner URL to iTunes, and everything worked perfectly. My first podcast episode went live on 30th September 2005, [Episode 1: Something Fresh](https://www.djcruze.co.uk/podcasts/episode-1-something-fresh/), and subscribers started increasing.

## The Problem with Third-Party Feeds

// TODO: Talk about redirecting the feed from Wordpress to Feedburner but then not being able to control the Feedburner URL in Apple Podcasts.

For years, this setup worked great. Feedburner cached my feed, saved my bandwidth, and even provided some basic analytics. I didn't think twice about it.

But here's the thing - when you give a third party control of your feed URL, you're taking a risk. In 2012, Google acquired Feedburner. For a while, nothing changed. But eventually, as Google does, they started deprecating features and the writing was on the wall. Feedburner wasn't going to last forever.

Even worse, I realised I had a fundamental problem: my podcast in Apple Podcasts was pointing to `feeds.feedburner.com`, not my own domain. I didn't truly own my podcast feed anymore. If Feedburner shut down completely, my podcast would disappear from Apple Podcasts and all my subscribers would lose access.

After nearly 20 years, it was time to take back control.

## Moving to My Own Feed

First, I needed to create a proper podcast feed on my own domain. Years ago, I'd moved away from Wordpress to a static site built with [Eleventy](https://www.11ty.dev/). Back in 2021, I'd actually [written about how to create an Eleventy podcast feed](/create-an-eleventy-podcast-feed/), so I already had the technical infrastructure in place.

My new feed would live at: `https://www.djcruze.co.uk/podcasts/feed.xml`

But here's the crucial question: how do you tell Apple Podcasts and all your subscribers to switch to the new feed URL?

## Redirecting Subscribers to the New Feed

The answer is a special iTunes RSS tag called `<itunes:new-feed-url>`. When podcast apps encounter this tag, they automatically update their subscription to point to the new URL.

Here's what I added to my RSS podcast feed:

```xml
<itunes:new-feed-url>https://www.djcruze.co.uk/podcasts/feed.xml</itunes:new-feed-url>
```

This tag tells podcast apps: "Hey, this feed has moved. Update your subscription to this new URL instead."

Apple recommends keeping this redirect in place for at least two weeks to give subscribers time to migrate. I've kept mine in the feed forerver just to be safe. After that, the Feedburner feed could be retired and all subscribers would be pulling from my own domain.

## The Critical Importance of GUIDs

Every episode in your podcast feed has a GUID (Globally Unique Identifier). This can be anything you want it to be but I've chosen to use my URLs as these ideally should never change. Podcast apps use these GUIDs to track which episodes a subscriber has already downloaded or listened to.

Here's an example GUID from one of my episodes:

```xml
<guid isPermaLink="false">http://www.djcruze.co.uk/cms/?p=820</guid>
```

**If you change the GUIDs when migrating your feed, you're in for a world of pain.** Podcast apps will think all your episodes are brand new, and subscribers will re-download everything. They'll also lose their play progress and which episodes they've already heard.

{% callout "warning" %}
As you can see, I had to use my old Wordpress post ID URLs as my GUIDs to ensure continuity. New episodes can use my new URL structure but to avoid people re-downloading old episodes, the GUIDs must remain the same as when they were hosted in Wordpress.
{% endcallout %}

When I migrated from Feedburner to my own feed, I made absolutely certain that every episode kept its original GUID. I went through my Feedburner feed XML, noted down each episode's GUID, and made sure my new Eleventy-generated feed used the exact same identifiers.

This was tedious but crucial. Your subscribers won't notice when GUIDs stay the same - which is exactly what you want. The migration should be seamless for them.

## Claiming Ownership in Apple Podcasts

The final piece of the puzzle was claiming ownership of my podcast in Apple Podcasts. Because I'd submitted the feed nearly 20 years ago through the old iTunes system, I'd never had access to Apple Podcasts Connect, their modern dashboard for podcast management.

Thanks to Rob Knight's excellent [article on verifying an Apple Podcast feed](https://rknight.me/blog/how-to-verify-an-apple-podcasts-claim-in-your-rss-feed/), I learned about the claiming process. Here's how it works:

### Step 1: Request to claim your podcast

In Apple Podcasts Connect, you search for your podcast and request to claim it. Apple needs to verify you actually own the feed, so they generate a unique verification code, a UUID-style identifier.

### Step 2: Add the verification tag to your feed

You add this verification code to your podcast feed XML as an `<itunes:applepodcastsverify>` tag:

```xml
<itunes:applepodcastsverify>8c011b37-3cc1-4bb9-8c38-example</itunes:applepodcastsverify>
```

This tag goes in your RSS feed's channel section, alongside your other iTunes tags like `<itunes:author>` and `<itunes:category>`.

### Step 3: Complete verification

Once the tag is in your feed and live on your server, you go back to Apple Podcasts Connect and click to complete the verification. Apple's systems fetch your feed, find the verification tag, confirm it matches their generated code, and boom - you now own your podcast in their system.

After verification succeeded, I had full access to my podcast's analytics, could update the description and artwork, and most importantly, I had complete control over my feed URL.

## Lessons Learned

Looking back on this process, here's what I'd tell anyone in a similar situation:

**Own your URLs from the start.** If I'd known then what I know now, I would have set up a permanent redirect on my own domain that pointed to wherever my feed was hosted. That way, I could have changed the backend hosting without anyone noticing. Something like `djcruze.co.uk/podcast/feed` that I controlled forever.

**Third-party services are convenient but risky.** Feedburner solved my bandwidth problem, but it created a bigger ownership problem. When possible, keep control of your core infrastructure - especially feed URLs that you submit to directories.

**GUIDs are sacred.** I can't stress this enough. When migrating a podcast feed, preserving the GUIDs is non-negotiable. Check and double-check every episode to make sure the identifiers match exactly.

**Test before you switch.** Before adding the `<itunes:new-feed-url>` tag, I tested my new feed thoroughly. I subscribed to it in several podcast apps, checked that episodes downloaded correctly, and verified the metadata looked right. Only after everything worked did I flip the switch.

**Document your process.** I wish I'd kept better notes from my original 2005 setup. Having documentation about your feed structure, GUID format, and hosting setup makes migration so much easier years later.

## Own Your Content

After nearly two decades, I finally have complete control of my podcast feed. It lives on my domain, hosted on my infrastructure, with my RSS implementation. If I want to change hosting providers, I can do it without anyone noticing. If I want to move to a different static site generator, the URL stays the same.

This experience reinforced something I've been thinking about a lot lately - the importance of owning your content and controlling your infrastructure. When I rely on third-party services, I'm essentially renting space in someone else's house. It's convenient, but I'm always one acquisition, deprecation, or policy change away from losing control.

Your content deserves better than that. Whether it's a podcast, a blog, or any creative work you're putting out into the world - own it. Control it. Build it on foundations you can maintain for years.

It might take a bit more effort upfront. You might need to learn some technical details you could otherwise outsource. But twenty years from now, you'll be glad you did.

And if you're in the same boat I was - with a podcast feed stuck on Feedburner or some other third-party service - it's not too late. The migration is totally doable. Just preserve those GUIDs, test thoroughly, and take back control of what's yours.
