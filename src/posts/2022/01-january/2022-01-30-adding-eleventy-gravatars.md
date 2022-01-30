---
title:  "Easily Create Gravatar Images With Eleventy"
permalink: /easily-create-gravatar-images-with-eleventy/
headerImage: /images/banners/easily-create-gravatar-images-with-eleventy.jpg
description: If you're moving your Wordpress site to Eleventy, you will want to convert your Gravatar images too. Find out how easy it is using an Eleventy shortcode.
tags:
    - development
image:
    source: https://www.webdesignerdepot.com/2016/06/free-download-avatar-vector-collection/
    creator: WDD Staff
    url: https://www.webdesignerdepot.com/author/WebdesignerDepot-Staff
---

If you're like me, your early blogs were probably hosted using [Wordpress](https://en-gb.wordpress.org/). Most of my personal sites started off with a self-hosted version of Wordpress on a server that I had to maintain and update. I'm getting too old for the constant updates that owning a server requires so I have moved to using static site generators and hosting them using [Netlify](https://netlify.com).

I'm a big fan of [Eleventy](https://www.11ty.dev/) as my static site generator as it's super simple to use. One of the most recent sites had lots of comments and I wanted to keep them in the new Eleventy build. All of the comments have a user image on them and they use a [Gravatar](https://en.gravatar.com/) image. 

## What is a Gravatar?

A Gravatar is a Globally Recognised Avatar. It was an idea started by the ex-cofounder of GitHub, [Tom Preston-Werner](https://en.wikipedia.org/wiki/Tom_Preston-Werner) and eventually bought but [Automattic](https://automattic.com/), the company who wrote Wordpress. It is a user profile image or "avatar" which is attached to a specified email address. It can be uploaded and set on the Gravatar website, and used on any websites that support them. It makes it easy to update your picture in a single place and for it to appear on multiple websites.

So now we know what a Gravatar is, how do we generate one for Eleventy?

## Adding an Eleventy shortcode

We're going to add an [Eleventy shortcode](https://www.11ty.dev/docs/shortcodes/) to convert an email address into an image URL. This will allow us to easily use it within either an HTML image tag, or from a Markdown file.

First, we add a shortcode to the Eleventy configuration file `.eleventy.js` to expose it in our template files. Let's call it `gravatar`.

{% codetitle ".eleventy.js" %}

```javascript
const gravatarShortcode = (email) => {
    // TODO: Return the Gravatar URL
};


modules.export = (eleventyConfig) => {
    // Expose the shortcode for the template
    eleventyConfig.addShortcode('gravatar', gravatarShortcode);

    // Other configuration code...
};
```

Adding this shortcode allows us to add the shortcode into one of our Markdown files to render an image.

{% codetitle "posts/example-markdown.md" %}

{% raw %}
```markdown
![A Gravatar Image]({% gravatar "email@fakedomain.com" %})
```
{% endraw %}

## Creating a Gravatar URL

A [Gravatar image URL](https://en.gravatar.com/site/implement/images/) is created by creating an MD5 hash of the email you want to use. We can use the Node.js `crypto` module to do this.

We need to ensure that the email address we pass to the hashing function is cleaned up. We can remove any leading or trailing spaces and make it lowercase. That will ensure it creates an identical hash if someone accidently calls it with a different case.

Finally, we need to return a Gravatar URL with the hash appended to it.

{% codetitle ".eleventy.js" %}

```js
const crypto = require('crypto');

const gravatarShortcode = (email) => {
    // Clean up the email address
    // - Remove any leading or trailing spaces
    // - Make it lowercase
    const cleanEmail = email.trim().toLowerCase();

    // Create an MD5 hash from the cleaned email address
    const emailHash = crypto
        .createHash('md5')
        .update(cleanEmail)
        .digest('hex');

    // Return a URL image with the hash appended
    return `https://www.gravatar.com/avatar/${emailHash}`;
};
```

In our template we'll now have an image URL for the email if a Gravatar exists for it.

{% codetitle "posts/example-markdown.md" %}

{% raw %}
```markdown
![A Gravatar Image]({% gravatar "email@fakedomain.com" %})
```
{% endraw %}

The above `gravatar` shortcode becomes this image URL:

```markdown
![A Gravatar Image]({% gravatar "email@fakedomain.com" %})
```

If you just wanted to use the shorcode in some HTML as an image tag you can do that too:

{% raw %}
```html
    <img
        src="{% gravatar "email@fakedomain.com" %}" 
        title="Jane Doe"
        alt="Avatar of user"
        width="150"
        height="150"
    />
```
{% endraw %}

Here is a Gravatar of me embedded into this Markdown file:

![Gravatar]({% gravatar "marc.littlemore@gmail.com" %})

## Adding a size

The Gravatar URL allows you to append some additional query parameters so we can update our shortcode to allow us to pass in a size. 

{% codetitle ".eleventy.js" %}

```js
const crypto = require('crypto');

// Add a size parameter which defaults to 150
const gravatarShortcode = (email, size = 150) => {
    // Clean up the email address
    // - Remove any leading or trailing spaces
    // - Make it lowercase
    const cleanEmail = email.trim().toLowerCase();

    // Create an MD5 hash from the cleaned email address
    const emailHash = crypto
        .createHash('md5')
        .update(cleanEmail)
        .digest('hex');

    // Return a URL image with the hash appended
    // Append a size query parameter
    return `https://www.gravatar.com/avatar/${emailHash}?s=${size}`;
};
```

A larger Gravatar of me!

![Gravatar]({% gravatar "marc.littlemore@gmail.com" 200 %})

## Adding a default image

Finally, the Gravatar URL allows us to [use a default image](https://en.gravatar.com/site/implement/images#default-image) which will be rendered if no Gravatar is found for the email hash. We can add that as the `d` query parameter in the URL.

```js
const crypto = require('crypto');

// Add a defaultImage parameter which defaults to 'mp' (mystery person)
const gravatarShortcode = (email, size = 150, defaultImage = 'mp') => {
    // Clean up the email address
    // - Remove any leading or trailing spaces
    // - Make it lowercase
    const cleanEmail = email.trim().toLowerCase();

    // Create an MD5 hash from the cleaned email address
    const emailHash = crypto
        .createHash('md5')
        .update(cleanEmail)
        .digest('hex');

    // Return a URL image with the hash appended
    // Append a default image query parameter
    return `https://www.gravatar.com/avatar/${emailHash}?s=${size}&d=${defaultImage}`;
};
```

A default image for an unknown email address.

{% raw %}
```md
![Gravatar]({% gravatar "unknown@email.com" 150 %})
```
{% endraw %}

![Gravatar]({% gravatar "unknown@email.com" 150 %})

Or you can render a robot as the default image instead.

{% raw %}
```md
![Gravatar]({% gravatar "unknown@email.com" 150 "robohash" %})
```
{% endraw %}

![Gravatar]({% gravatar "unknown@email.com" 150 "robohash" %})

## Conclusion

See how easy it is to add a Gravatar with Eleventy? Eleventy's awesome shortcode system gives us the ability to easily extend it and expose Gravatars in our templates.

[Let me know](/contact/) if you have any questions or spot any errors.