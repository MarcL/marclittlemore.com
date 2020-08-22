---
layout: page
title: "Books"
description: A look at the books on my bookshelf.
permalink: /books/
headerImage: /images/banners/books.jpg
---

## Reading at the moment

These are the books that I've got at the side of my bed or on my Kindle. I usually have a couple on the go at a time.

{% include partials/bookshelf.liquid, bookshelf: goodreadsBooks.currentlyReading %}

## Finished

These are books I've previously read.

{% include partials/bookshelf.liquid, bookshelf: goodreadsBooks.read %}
