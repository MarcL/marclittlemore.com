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

As someone who has been using Twitter since 2008, it's been a big part of my life since the early days of the [fail whale](https://business.time.com/2013/11/06/how-twitter-slayed-the-fail-whale/). Honestly, I was probably addicted to it at times and took the Twitter app on and off my phone to try and break the scrolling habit.

I've met lots of fantastic people through it, I've learned a lot from it, and I've probably shared far too much on it. But since a billionaire finally bought it and took it over in October 2022, it's not the same place it was when I joined. It's become a place of anger, hate, and misinformation. A lot of the great people I have followed have stopped tweeting.

I looked for an alternative platform and I signed up to all of them, as most techies did. So, you can find me on [Mastodon]({{socialMedia.mastodon.url}}), [Bluesky]({{socialMedia.bluesky.url}}), [Threads]({{socialMedia.threads.url}}), and yes, I'm on [LinkedIn]({{socialMedia.linkedin.url}}) too if that's your thing.

The trouble with all of these platforms is that I get FOMO (Fear Of Missing Out) that I'm posting my content to the wrong platform. What's the right place to share my ramblings with the world? :smile:

## Enter the IndieWeb

{% callout "info" %}
**What is the IndieWeb?**

The [IndieWeb](https://indieweb.org/IndieWeb) is a community of independent & personal websites connected by simple standards, based on the principles of: owning your domain & using it as your primary identity, publishing on your own site (optionally syndicating elsewhere), and owning your data.
{% endcallout %}

I've been following the [IndieWeb](https://indieweb.org/) movement for a while and it got me thinking about how I can use their ideas to keep my content on my site but syndicate it to the various social media platforms. This idea is known as [POSSE](https://indieweb.org/POSSE) - Publish (on your) Own Site, Syndicate Elsewhere. This means you own your content and publish your thoughts on your own site first, then syndicate it to other platforms in a format that suits it.

I was inspired by some great articles by [Max Böck](https://mxb.dev/blog/syndicating-content-to-twitter-with-netlify-functions/) and [Matthias Ott](https://matthiasott.com/notes/syndicating-posts-personal-website-twitter-mastodon) who have both written about how they syndicate their content to other platforms. As a developer, it sounded like a fun challenge to see how I could use my [11ty](https://www.11ty.dev/) blog to publish small notes on my site and automate the process of sending them to other platforms.

So let's do it...

## Create an Eleventy note collection

First we need to create a collection of notes on our site.

Thankfully [eleventy collections](https://www.11ty.dev/docs/collections/) are an easy way to group my notes together!

Using its tagging system, you can create a new collection. I like to put each collection into a new folder in my project as 11ty allows you to have per-directory configuration. This means we can set all of our note settings in one place.

 I created a new folder called `notes` and added a new file called `notes.json` to it. I set up a `layout` to be able to render each note on its own URL and added a `tags` array to allow me to create a `notes` collection.
 
 _I also added a `syndicate` flag to allow me to filter notes that I want to syndicate to other platforms or not on a per-note basis. This will be an enhancement that I've not implemented yet._

 Here's what the configuration looks like:

{% codetitle "notes/notes.json" "Eleventy config" %}

```json
{
  "layout": "note",
  "tags": ["note"],
  "syndicate": "true",
}
```

Each note is a markdown file with some YAML front matter. It's up to you want you want to post to social media but at a basic level it's some text content. You don't really need a title for it but you could add one if you wanted to display it on the note page.

I also added a `date` field which is used on my site. It won't 100% reflect the point when the note was posted to social media as it'll depend on when we actually automate the posting of it. The `date` can be set via the filename if you want to and it doesn't have to be set in the front matter. I'm not too worried about how we use this at the moment but it's probably something I can look to improve by writing the date back to the file at the point of posting with the API.

Here's an example note markdown file:

{% codetitle "notes/2023-11-20-syndicating-notes.md" "Note markdown file" %}

{% raw %}
```markdown
---
syndicate: true
date: 2023-11-19T23:10:00.000Z
---

👋 Testing out posting notes from my blog via APIs.
```
{% endraw %}


I also created a `/notes` page to render all of the notes on my site. This is a simple [11ty liquid template](https://www.11ty.dev/docs/languages/liquid/) that loops through all of the notes in a collection and renders them using a `note` partial template in reverse chronological order (the latest note is shown first). It doesn't yet have pagination if there are hundreds of notes, but I'll add that as an improvement once I start posting more.

{% codetitle "notes.md" "Notes page" %}

{% raw %}
```liquid
---
title: Notes
description: Notes for my microblog which are syndicated to social media platforms.
permalink: /notes/
---

<div>
    {% for note in collections.note reversed %}
        {% include partials/noteCard.html, noteContent: note.content, noteImage: note.data.image, noteDate: note.date, noteUrl: note.url %}
    {% endfor %}
</div>
```
{% endraw %}

My `note` layout is very simple. It renders the content of the note and adds a link to the original note on my site. I add in a link to the note page if it's not being rendered in our specific note layout.

{% codetitle "partials/noteCard.html" "Note template" %}

{% raw %}
```liquid
{% assign isDetailView = layout == 'note' %}

<div class="prose-slate shadow-xl rounded-md p-4 noteCard">
    {% if noteImage %}
      <div>
        {% image noteImage.url noteImage.alt "my-4 sm:my-0 shadow-lg rounded-md" false %}
      </div>
    {% endif %}
    <div class="content">
      {{noteContent}}
    </div>
    <div class="text-gray-500 dark:text-gray-400 text-base py-1 my-0.5">
      {{noteDate | date: "%H:%M %p - %b %d, %Y"}}
      {% if isDetailView == false %}| <a href="{{noteUrl}}">Note link</a>{% endif %}
    </div>
</div>
```
{% endraw %}

If you take a look at my [notes page](/notes/) you'll see it in action.

So now we've got a collection of notes. I can add a new markdown file and it will be added to the collection and displayed on my notes page. So far, so good!

Now we need to look at how we can post these notes to our social media platforms.

## Create Node.js scripts to share notes

- Provide step-by-step instructions on syndicating notes to social media platforms like Twitter, Mastodon, or LinkedIn.

## Check we've not posted them already

- Generate a JSON file with links to the existing notes
- Check the JSON file to see if we've posted it already

## What's next?

### Automation and Tools

- Use GitHub workflow to post notes automatically on merge

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