---
title: "Reading"
description: I've tried to read a lot more books in the past few years and redeveloped my love of reading. Take a look at the books on my bookshelf and see what I've read and am currently reading.
permalink: /reading/
headerImage: /images/banners/books.jpg
date: 2020-08-23
---

This page is generated using the [Goodreads API](https://www.goodreads.com/api) and built using the static site generator [11ty](https://www.11ty.dev/). This allows me to automatically update this page each time I publish the site with any books I add to Goodreads.

## Reading at the moment

These are the books that I've got at the side of my bed or on my Kindle. I usually have a couple on the go at a time. I generally read non-fiction books and love to learn.

{% include partials/bookshelf.html, bookshelf: goodreadsBooks.currentlyReading %}

## Finished

This is a list of books I've previously read and mostly enjoyed.

{% include partials/bookshelf.html, bookshelf: goodreadsBooks.read %}

