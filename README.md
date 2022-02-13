# Marc Littlemore blog

[![Netlify Status](https://api.netlify.com/api/v1/badges/9805f848-927b-4a33-adcd-d0f49f9f3bcf/deploy-status)](https://app.netlify.com/sites/marcl/deploys)

The source code for my personal blog - [marclittlemore.com](https://marclittlemore.com)

## Technologies used

The site is built using [11ty](https://www.11ty.dev/). I ❤️ this static site generator and have moved most of my sites to using it.

I originally styled the site using Tachyons but moved over to [Tailwind CSS](https://tailwindcss.com/). It's made it simple for someone with less CSS experience to responsively style the whole site. I use it on most projects now.

The site is deployed using [Netlify](http://netlify.com/). I moved over from running my own [VPS](https://en.wikipedia.org/wiki/Virtual_private_server) to using Netlify for most of my sites. This allows a simple Git-based workflow for previewing and deploying my site changes easily.

There is very little client-side JavaScript but what is there uses [Parcel](https://parceljs.org/) to bundle the code into a single module.

## Shortcodes

I added custom shortcodes to the setup to add helpers for posts and pages. Here is a list of them and what they do.

### callout

Create a callout in a post. Pass the type as the first parameter. By default this is an info block. The types of callout are:

* `info` (default) - An information block
* `warning` - A warning block
* `tip` - A tip block

The content of the callout can be markdown.

```
{% callout "info" %}
If you want to learn more about building great chatbots then I've got a mailing list which will provide you with great information each week about the lastest trends, tutorials and quick tips to build better chatbots? Sounds like something you're interested in? Great!
{% endcallout %}
```

### codetitle

Create a title for a codeblock. Pass a title as the first parameter and an optional heading. This defaults to `Filename`.

```
{% codetitle "posts/example-markdown.md" "SomeHeading" %}
```

### gravatar

Add a [Gravatar](https://gravatar.com) avatar image inside a post. Pass the following parameters:

* `email` - An email address
* `size` (default: 80) - The size of the Gravatar in pixels
* `defaultImage` (default: `mp`) - The [Gravatar default image](https://en.gravatar.com/site/implement/images/#default-image) if no valid Gravatar is found for the email address

```
{% gravatar "unknown@email.com" 150 "robohash" %}
```

### image

Add a resized image to a post within an `<img>` tag. Pass the following parameters:

* `src` - The source of the image. This can be local, which is assumed to be in the `/src/` directory, or a URL to an image.
* `alt` - Alt text for the image. This is mandatory!
* `size` - This is the size of the image to create.
* `className` - This is an additional classes to add to the image. By default it adds a [Tailwind CSS](https://tailwindcss.com) medium shadow.

**TODO: I need to look at supporting multiple images to support `srcset` in the near future.**

```
{% image "/images/banners/marc-littlemore-homepage-banner-small.jpg" "Marc Littlemore" 500 "w-full sm:w-1/2 my-4 sm:my-0 shadow-lg sm:shadow-none rounded-md sm:rounded-none" %}
```

### quote

Adds a blockquote surrounded by quotes. The text is parsed as markdown. Pass `false` as the first parameter to remove the quoatations.

```
{% quote false %}
## Example title

Some text goes here.
{% endquote %}
```

## Filters

Here are the filters added to the codebase.

### collectionLastUpdatedDate

Pass a collection to determine the last updated date in from all of the items in it. It returns a [RFC822 formatted date](https://github.com/tjconcept/js-rfc822-date).

```
{{ collections.post | collectionLastUpdatedDate }} // E.g. 'Mon, 13 Sep 2013 14:27:00 +0200'
```

### getPostByPath

Finds a post in a collection by its path. It will throw an error if no post is found.

```
{% assign cardPost = collections.all | getPostByPath: path %}
```

### keys

Finds all of the keys for a specified object.

```
{% assign socialMediaKeys = socialMedia | keys %}
```

### markdownify

Renders the passed Markdown as HTML.

```
{{article.data.description | markdownify}}
```

### starRating

Returns HTML using [Font Awesome stars](https://fontawesome.com/v5/icons/star?s=solid). Pass in the number of starts to render as the value.

```
{{book.rating | starRating}}
```

### rfc822Date

Returns a [RFC822 formatted date](https://github.com/tjconcept/js-rfc822-date).

```
<pubDate>{{ post.date | rfc822Date }}</pubDate> // E.g. 'Mon, 13 Sep 2013 14:27:00 +0200'
```

### toISOString

Renders a date as an [ISO 8601 date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString).


```
<lastmod>{{ post.date | toISOString }}</lastmod>
```

### xmlEscape

Renders characters as HTML entities - see [lodash.escape](https://lodash.com/docs/#escape). Used for RSS feeds.

```
<description><![CDATA[{{ post.templateContent | xmlEscape }}]]></description>
```

### webmentionsForUrl

Returns an array of Webmentions for the specified absolute URL.

```
{% assign webMentionsForPage = webmentions | webmentionsForUrl: absoluteUrl %}
```

### webmentionsSortedForUrl

Returns a sorted object of Webmentions for the specified absolute URL. The keys are the different types of mentions.

```
{% assign webMentionsForPage = webmentions | webmentionsForUrl: absoluteUrl %}
```
