---
layout: note
pagination:
  data: googleSheetsNotes
  size: 1
  alias: note
permalink: '/notes/{{ note.slug }}/'
hideImage: true
syndicate: true
showWebmentions: true
eleventyComputed:
  title: "{{ note.title }}"
  date: "{{ note.date }}"
---

{{ note.content }}