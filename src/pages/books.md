---
layout: page
title: "Reading"
description: Books I'm currently reading or have read.
permalink: /books/
headerImage: /images/banners/books.jpg
---

## Books I'm Reading

{% for book in goodreadsBooks.currentlyReading %}
### {{book.book[0].title[0]}}
<pre>{{book.book[0]}}</pre>
{% endfor %}

## Books I've Read

{% for book in goodreadsBooks.read %}
### {{book.book[0].title[0]}}
<pre>{{book.book[0]}}</pre>
{% endfor %}
