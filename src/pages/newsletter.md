---
title:  "Newsletter Sign Up"
permalink: /newsletter/
headerImage: /images/banners/newsletter-sign-up.jpg
description: Sign up for my newsletter.
tags:
    - writing
image:
    source: https://unsplash.com/photos/4vrZpOo7fTc
    creator: Mailchimp
    url: https://unsplash.com/@mailchimp
---

Every Sunday, **{{newsletters.subscribers}} technical leaders, developers and creatives** rethink their relationship with money and ambition with my newsletter.

Join our global community now!

{% capture formTitle %}
Get my **best articles**
{% endcapture %}

{% capture formText %}
Sign up for my newsletter to receive great stuff.
{% endcapture %}

{% include partials/emailOctopus/form.html, formTitle: formTitle, formText: formText, tag: "testing" %}

{% if newsletters.backissues.length > 0 %}
## Previous newsletters

Want to know what you're going to receive? Check out my previous newsletters.
{% endif %}