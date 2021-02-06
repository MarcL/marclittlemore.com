---
title: "Books"
description: I've tried to read a lot more books in the past few years. This is a look at the books on my bookshelf and those that I'm currently reading.
permalink: /books/
headerImage: /images/banners/books.jpg
date: 2020-08-23
tags:
    - featured
---

This page is generated using the [Goodreads API](https://www.goodreads.com/api) and built using the static site generator [11ty](https://www.11ty.dev/). This allows me to automatically update this page each time I publish the site with any books I add to Goodreads.

## Reading at the moment

These are the books that I've got at the side of my bed or on my Kindle. I usually have a couple on the go at a time. I generally read non-fiction books and love to learn.

{% include partials/bookshelf.liquid, bookshelf: goodreadsBooks.currentlyReading %}

## Finished

This is a list of books I've previously read and mostly enjoyed.

{% include partials/bookshelf.liquid, bookshelf: goodreadsBooks.read %}
