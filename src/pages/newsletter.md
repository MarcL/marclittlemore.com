---
title:  "Join my newsletter"
permalink: /newsletter/
headerImage: /images/banners/newsletter-sign-up.jpg
description: A weekly newsletter teaching you about technical leadership, remote working, software engineering management, and helpful advice to grow your career.
tags:
    - writing
image:
    source: https://unsplash.com/photos/4vrZpOo7fTc
    creator: Mailchimp
    url: https://unsplash.com/@mailchimp

sitemap:
    exclude: yes
---

Every week I help **{{newsletters.subscribers}} technical leaders, remote workers, and full-stack developers**, to learn more about working in the software industry.

In it you'll find my favourite articles and thoughts on intentional remote working, technical leadership, software engineering management, and I'll share helpful advice to grow your career in the software development.

Enter your email address below to join our global community of technical leaders.

{% include partials/newsletter.html %}

{% if newsletters.backissues.length > 0 %}
## Previous newsletters

Want to know what you're going to receive? Check out my previous newsletters.
{% endif %}