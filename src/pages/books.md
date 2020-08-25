---
layout: page
title: "Books"
description: I've tried to read a lot more books in the past few years. This is a look at the books on my bookshelf and those that I'm currently reading.
permalink: /books/
headerImage: /images/banners/books.jpg
date: 2020-08-23
tags:
    - featured
---

## Reading at the moment

These are the books that I've got at the side of my bed or on my Kindle. I usually have a couple on the go at a time.

{% include partials/bookshelf.liquid, bookshelf: goodreadsBooks.currentlyReading %}

## Finished

These are books I've previously read.

{% include partials/bookshelf.liquid, bookshelf: goodreadsBooks.read %}
