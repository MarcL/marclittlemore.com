---
layout: default
title: Links
permalink: /links/
headerImage: /images/banners/links.jpg
description: A collection of fascinating links I've encountered across the web, encompassing a variety of topics which intrigued me.
image:
    source: https://unsplash.com/photos/low-angle-photography-of-gray-metal-chains-K8iHtzoIKQ4
    creator: Fré Sonneveld
    url: https://unsplash.com/@fresonneveld
---

I've curated a collection of fascinating links I've encountered across the web, encompassing a variety of topics which intrigued me. Enjoy!

{% for link in links %}
{% render components/link.html link: link, theme: theme, site: site %}
{% endfor %}