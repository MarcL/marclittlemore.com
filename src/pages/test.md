---
title: Test
subtitle: Testing web components
description: A list of software and hardware that I use almost every day for software development and audio production.
permalink: /test/
headerImage: /images/banners/laptop.jpg
date: 2020-01-30
---

Here is some text that is much longer than the page.
Ah ok we need it to have a minimum width it seems. So we can do that with a div. But we need to make sure that the div is not too wide on mobile. So we can do that with a media query.

## WebC
{% renderTemplate "webc" %}
<code-title heading="testing heading" title="testing title"></code-title>
<callout-info>
Want to learn more about testing your JavaScript code but don't know where to start? Get my [FREE 7-day testing course](/javascript-testing-beginners-course/?signup=testing-page) and you'll be a JavaScript testing expert in no time!
</callout-info>

<callout-info></callout-info>
{% endrenderTemplate %}

## Shortcodes
{% callout "info" %}
Want to learn more about testing your JavaScript code but don't know where to start? Get my [FREE 7-day testing course](/javascript-testing-beginners-course/?signup=testing-page) and you'll be a JavaScript testing expert in no time!
{% endcallout %}
