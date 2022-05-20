---
title:  "Previous Newsletters"
permalink: /newsletter/archive/
description: An archive of my weekly newsletter.
headerImage: /images/banners/newsletter-archive.jpg
image:
    source: https://unsplash.com/photos/o6GEPQXnqMY
    creator: Mr Cup / Fabien Barral
    url: https://unsplash.com/@iammrcup
---

Here is an archive of my previous newsletters where you'll find my favourite articles and thoughts on intentional remote working, technical leadership, and software engineering management. Each week I'll share helpful advice to grow your career.

Learn along with me as I discover new ways of working and help us both to build our leadership skills.

{% for issue in newsletterArchive %}
* [{{issue.title}}](/newsletter/archive/{{issue.sentSlug}}/{{issue.title | slug}}/) - {{issue.sent | date: "%A, %e %B %Y"}}
{% endfor %}