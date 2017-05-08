---
layout: page
title: JavaScript Testing
permalink: /javascript-testing/
header-img: images/banners/computer-code.jpg
social-img: images/social/javascript-testing.jpg
---

Over the past few years I've been introduced to test driven development (TDD) in combination with using JavaScript and Node.js. It's something that I really enjoyed learning and then talking about. TDD is the practice of writing new production code by first writing a failing test. It often leads to reduced defects or bugs in your code, and helps to define a code contract for your applications.

However, it's often very confusing and difficult for beginners to get started. Here I hope to help beginners to get started with testing their JavaScript and also encourage less experienced developers to gain unit and integration testing skills for their JavaScript code. If you want to learn more then read the articles below or why not sign up for my [JavaScript Testing Made Easy]({{site.url}}/courses/javascript-testing-made-easy) course for some free videos showing you how to get started.

---

{% for post in site.categories["unit-testing"] %}
<div class="post-preview">
    <a href="{{site.url}}/{{post.url}}">
        <h2 class="post-title">{{ post.title }}</h2>
        <img class="image" src="{{site.url}}/{{post.social-img}}" />
    </a>
    <hr />
</div>
{% endfor %}
