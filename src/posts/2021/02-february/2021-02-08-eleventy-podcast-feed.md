---
title:  "Create an Eleventy podcast feed"
permalink: /create-an-eleventy-podcast-feed/
headerImage: /images/banners/create-an-eleventy-podcast-feed.jpg
description: "Want to add an iTunes and Google friendly podcast feed to your Eleventy site? Here's how."
tags:
    - writing
    - essay
image:
    source: https://unsplash.com/photos/Zxdf_tN9eC8
    creator: Jonathan Farber
    url: https://unsplash.com/@farber
---

At the end of last year I converted my [DJ Cruze website](https://djcruze.co.uk) from Wordpress to [Eleventy](https://www.11ty.dev/). Much like this website, it's easy to deploy using [Netlify](http://netlify.com/). Moving to a statically generated site made it much easier to update and avoided me having to maintain a server, PHP, Wordpress versions, and so on.

For many years I created the DJ Cruze podcast show so I wanted to move over the podcast RSS feed from Wordpress to Eleventy. Creating a custom RSS feed based on my podcast episodes took a bit of work so I thought I'd share how I did it.

## Create the podcast data file

Eleventy supports a wide range of [data sources](https://www.11ty.dev/docs/data/).

For my podcast I define a JSON file which contains the metadata needed for the podcast. All of this data will be used to populate the RSS feed. You may have this information in other data files in your Eleventy site but I wanted to keep all of the data together.

It's stored in the data directory like this: `/data/podcast.json`. This will expose a global data object called `podcast` which matches the filename of the JSON file and can be used in your template files.

```json
{
  "title": "DJ Cruze House Music Podcast",
  "description": "DJ Cruze is in the house! Spinning funky and chunky house music since 1988. Manchester is in the house!",
  "category": "Music",
  "author": "DJ Cruze",
  "channelImage": "/images/podcasts/dj-cruze-podcast-logo-1400x1400.jpg",
  "owner": {
    "name": "Marc Littlemore",
    "email": "info@djcruze.co.uk"
  },
  "feedPath": "/podcasts/feed.xml",
  "episode": {
    "defaultDescription": "The latest episode of the DJ Cruze podcast features new and old funky and chunky house music."
  }
}
```

Most of the metadata properties should be obvious. Both iTunes and Google Podcasts support the standard RSS schema but with additional tags. Google Podcasts is essentially the same as an iTunes feeds and parses the iTunes specific tags. Make sure that your `category` property matches the expected [iTunes categories](https://help.apple.com/itc/podcasts_connect/#/itc9267a2f12) for podcasts and matches the correct case. In my case I'm using the "Music" category. Note that you can use sub-categories too but I'm not in my example.

## Set up a podcast post

In Wordpress, each of my podcasts was a new post with a specific tag. I exported these as markdown files and added some custom Markdown frontmatter to mark it up with per-podcast metadata.

```markdown
---
media:
    # The episode number
    episode: 57

    # The image file for this episode
    # You can ignore this if you don't want per-episode artwork
    image: '/images/podcasts/dj-cruze-podcast-episode-57-june-2011.jpg'

    # Your MP3 file 
    content: '/podcasts/dj-cruze-podcast-episode-57-june-2011.mp3'

    # The duration of the episode in seconds
    duration: '4230'

    # The filesize of the MP3 file in bytes
    fileSize: '67973718'

    # A per-episode description if you want it
    description: 'Another DJ set of funky house music from DJ Cruze!'

# Additional layout data here...
---
```

I use Eleventy's [directory specific data files](https://www.11ty.dev/docs/data-template-dir/) to mark up all podcasts with the tag `podcast`. The enables us to create an Eleventy collection of podcasts to iterate through.

```json
{
  "tags": ["podcast"]
}
```

## Custom filters

Our podcast feed needs some custom filters adding to the Eleventy configuration.

RSS feeds expect some dates using the [RFC822 date format](https://www.w3.org/Protocols/rfc822/#z28). There's an `npm` package we can install to do the conversion for us. Install it as a development dependency like this:

```bash
npm install --save-dev rfc822-date
```

We also need to escape some of our text to ensure some special characters are encoded correctly. I use the [Lodash](https://lodash.com/) [escape](https://lodash.com/docs/4.17.15#escape) method to do this. Again, lets install this a development dependency as follows:

```bash
npm install --save-dev lodash.escape
```

Lastly, we need to know what the date of the last episode was so we can add a special `LastBuildDate` tag. This tells any podcast readers when the podcast was last modified. By adding this, any new podcasts will bump this date and allow new episodes to be downloaded.

Here's the additional filters we add to our `.eleventy.js` configuration file. This just shows the filters we've created for the podcast feed.

```js
const escape = require('lodash.escape');
const rfc822Date = require('rfc822-date');

module.exports = (eleventyConfig) => {
    // RSS
    eleventyConfig.addLiquidFilter('rfc822Date', (dateValue) => {
        return rfc822Date(dateValue);
    });

    // Escape characters for XML feed
    eleventyConfig.addLiquidFilter('xmlEscape', (value) => {
        return escape(value);
    });

    // Newest date in the collection
    eleventyConfig.addFilter('collectionLastUpdatedDate', (collection) => {
        if (!collection || !collection.length) {
            throw new Error(
                'Collection is empty in collectionLastUpdatedDate filter.'
            );
        }

        return rfc822Date(
            new Date(
                Math.max(...collection.map((item) => {
                    return item.date;
                }))
            )
        );
    });

    // Rest of Eleventy config goes here...
};
```

## Template file

Now we can create a post with a custom template in it to iterate over our `podcast` collection and render each podcast episode correctly.

I created a podcast Liquid template file with a `/podcast/feed.xml` permalink. I'm excluding this file from other collections and from my sitemap. You might want to do this too.

The podcast feed is split up into the intial channel metadata which is mostly created from our `podcast.json` metadata. Ensure that any text is escaped correctly by passing it through the `escape` filter.

As I'm attempting to redirect my old Wordpress theme from an old URL to a new URL, I add in the `itunes:new-feed-url` tag as follows. You won't need this unless you are moving your podcast feed.

{% raw %}
```xml
<itunes:new-feed-url>{{site.url}}{{podcast.feedPath}}</itunes:new-feed-url>
```
{% endraw %}

The second part of the podcast feed iterates through our `collections.podcast` feed in reverse order. In that way, we always get the latest episode first in the RSS feed. The metadata used for each episode is the Markdown frontmatter that we defined earlier.

The `enclosure` tag defines the media file needed to play the podcast. As I host my podcasts on a different URL to the DJ Cruze site itself, I have an additional URL in my `site.json` data file which defines the external server to load them from. This explains the `site.mediaFilesUrl` URL which is prepended before the content path.

Here is the full RSS template.

{% raw %}
```markdown
---
permalink: "/podcasts/feed.xml"
eleventyExcludeFromCollections: true
sitemap:
  exclude: yes
---
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>{{podcast.title | xmlEscape}}</title>
    <link>{{site.url}}</link>
    <language>en-us</language>
    <copyright>&#169; 2005 - {{"now" | date: "%Y"}} {{podcast.author}}</copyright>
    <lastBuildDate>{{collections.podcast | collectionLastUpdatedDate}}</lastBuildDate>
    <generator>Eleventy</generator>
    <description>{{podcast.description | xmlEscape}}</description>
    <itunes:author>{{podcast.author}} </itunes:author>
    <itunes:explicit>false</itunes:explicit>
    <itunes:type>episodic</itunes:type>
    <itunes:image href="{{podcast.channelImage | prepend: site.url}}" />
    <itunes:owner>
      <itunes:name>{{podcast.owner.name}}</itunes:name>
      <itunes:email>{{podcast.owner.email}}</itunes:email>
    </itunes:owner>
    <itunes:category text="{{podcast.category}}" />
    <itunes:new-feed-url>{{site.url}}{{podcast.feedPath}}</itunes:new-feed-url>
    
    {%- for podcastEpisode in collections.podcast reversed -%}
      <item>
        <pubDate>{{ podcastEpisode.date | rfc822Date }}</pubDate>
        <link>{{ podcastEpisode.url | prepend: site.url }}</link>

        {% if podcastEpisode.data.media.guid %}
          <guid>{{ podcastEpisode.data.media.guid }}</guid>
        {% else %}
          <guid>{{ podcastEpisode.url | prepend: site.url }}</guid>
        {% endif %}

        {% if podcastEpisode.data.media.title %}
          <title>{{podcastEpisode.data.media.title | xmlEscape}}</title>
        {% else %}
          <title>{{podcastEpisode.data.title}}</title>
        {% endif %}

        {% if podcastEpisode.data.media.description %}
          <description>{{ podcastEpisode.data.media.description | xmlEscape }}</description>
        {% else %}
          <description>{{ podcast.episode.defaultDescription | xmlEscape }}</description>
        {% endif %}
        
        <enclosure
          url="{{podcastEpisode.data.media.content | prepend: site.mediaFilesUrl}}"
          length="{{podcastEpisode.data.media.fileSize}}"
          type="audio/mpeg"
        />

        {% comment %} iTunes specific tags {% endcomment %}

        {% if podcastEpisode.data.media.episodeType %}
            <itunes:episodeType>{{podcastEpisode.data.media.episodeType}}</itunes:episodeType>
        {% else %}
            <itunes:episodeType>full</itunes:episodeType>
        {% endif %}

        {% if podcastEpisode.data.media.image %}
            <itunes:image href="{{podcastEpisode.data.media.image | prepend: site.url}}" />
        {% endif %}

        {% if podcastEpisode.data.media.episode %}
            <itunes:episode>{{podcastEpisode.data.media.episode}}</itunes:episode>
        {% endif %}

        {% if podcastEpisode.data.media.season %}
            <itunes:season>{{podcastEpisode.data.media.season}}</itunes:season>
        {% endif %}

        {% if podcastEpisode.data.media.duration %}
            <itunes:duration>{{podcastEpisode.data.media.duration}}</itunes:duration>
        {% endif %}        
      </item>
    {%- endfor -%}
  </channel>
</rss>
```
{% endraw %}

## Next steps

There is some metadata which could be automatically generated from the media files. I add to the duration and file size properties to my Markdown frontmatter for each podcast episode. I do this by hand but it could easily be generated by reading the file when Eleventy builds the feed.

I hope you find this useful. [Let me know](/contact/) if you have any questions or comments.

## Useful resources

- [Apple iTunes podcast requirements](https://itunespartner.apple.com/podcasts/articles/podcast-requirements-3058)
- [Google Podcasts requirements](https://support.google.com/googleplay/podcasts/answer/6260341?hl=en)