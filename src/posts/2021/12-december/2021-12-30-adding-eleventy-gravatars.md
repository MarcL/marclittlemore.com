---
title:  "Adding Eleventy Gravatars"
permalink: /adding-eleventy-gravatars/
headerImage: /images/banners/eleventy-gravatar-avatars.jpg
description: Some gravatar stuff
tags:
    - development
image:
    source: https://www.webdesignerdepot.com/2016/06/free-download-avatar-vector-collection/
    creator: WDD Staff
    url: https://www.webdesignerdepot.com/author/WebdesignerDepot-Staff
---

## What is a Gravatar?

An "avatar" is an image that represents you online—a little picture that appears next to your name when you interact with websites.

A Gravatar is a Globally Recognized Avatar. You upload an image and create your public profile just once, and then when you participate in any Gravatar-enabled site, your Gravatar image and public profile will automatically follow you there.

Gravatar is a free service for site owners, developers, and users. It is automatically included in every WordPress.com account and is run and supported by Automattic.

## Adding one to eleventy

```javascript
const crypto = require('crypto');

const gravatarShortcode = (email, size = 80) => {

    // Create an MD5 hash from the email address
    const emailHash = crypto
        .createHash('md5')
        .update(email)
        .digest('hex');

    // Return a URL image with the hash
    return `https://www.gravatar.com/avatar/${emailHash}?d=mp&s=${size}`;
};


modules.export = (eleventyConfig) => {
    // Expose the shortcode for the template
    eleventyConfig.addShortcode('gravatar', gravatarShortcode);
};
```

Use it in your template and set the size
{% raw %}
```html
    <img
        src="{% gravatar userEmail 150 %}" 
        title="Jane Doe"
        alt="Avatar of user"
        width="150"
        height="150"
    />
```
{% endraw %}

TODO: Image of the avatar