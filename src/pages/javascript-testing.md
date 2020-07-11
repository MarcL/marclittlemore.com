---
layout: page
title: JavaScript Testing
subtitle: Want to learn more about testing your JavaScript code?
permalink: /javascript-testing/
header-img: images/banners/computer-code.jpg
social-img: images/social/javascript-testing.jpg
description: "Learn more about testing your JavaScript and sign up to my course"
---

Over the past few years I've been introduced to test driven development (TDD) in combination with using JavaScript and Node.js. It's something that I really enjoyed learning and then talking about. TDD is the practice of writing new production code by first writing a failing test. It often leads to reduced defects or bugs in your code, and helps to define a code contract for your applications.

However, it's often very confusing and difficult for beginners to get started. Here I hope to help beginners to get started with testing their JavaScript and also encourage less experienced developers to gain unit and integration testing skills for their JavaScript code. If you want to learn more then read the articles below or why not sign up for my [JavaScript Testing Made Easy]({{site.url}}/courses/javascript-testing-beginners-course/?signup=testing-page) course for some free videos showing you how to get started.

{%- for post in collections["unit-testing"] -%}
<article class="pv4 bb b--black-10 ph3 ph0-l">
<div class="flex flex-column flex-row-ns">
<div class="w-100 w-60-ns pr3-ns order-2 order-1-ns">
<a href="{{ post.url }}" class="link dim black">
<h2 class="f3 roboto mt0 lh-title">{{ post.data.title }}</h2>
</a>
<p class="f5 f4-l lh-copy roboto">
{{post.data.subtitle}}
</p>
</div>
<div class="pl3-ns order-1 order-2-ns mb4 mb0-ns w-100 w-40-ns">
    <a href="{{ post.url }}" class="grow dib">
        <img src="{{post.data.thumbnail}}" class="db" alt="{{post.data.title}}">
    </a>
</div>
</div>
</article>
{%- endfor -%}
