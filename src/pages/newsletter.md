---
title:  "Join my newsletter"
permalink: /newsletter/
headerImage: /images/banners/newsletter-sign-up.jpg
description: A weekly newsletter teaching you about technical leadership, intentional remote working, and growing your leadership career.
tags:
    - writing
image:
    source: https://unsplash.com/photos/4vrZpOo7fTc
    creator: Mailchimp
    url: https://unsplash.com/@mailchimp
---

Every week I help **{{newsletters.subscribers}} technical leaders, remote workers, and full-stack developers**, to learn more how to be successful in the software industry.

In it you'll find my favourite articles and thoughts on intentional remote working, technical leadership, software engineering management, and I'll share helpful advice to grow your career.

Enter your email address below to join our global community of technical leaders.

{% include partials/newsletter.html %}

{% if newsletters.backIssues.length > 0 %}
## Previous newsletters

Want to know what you're going to receive in my weekly newsletter? Check out my previous newsletters and see what to expect.

{% for issue in newsletters.backIssues %}
* {{issue.date | date: "%A, %e %B %Y"}} - [{{issue.title}}]({{issue.url}})
{% endfor %}

{% endif %}