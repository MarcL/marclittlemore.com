---
layout: note
pagination:
  data: googleSheetsNotes
  size: 1
  alias: note
permalink: '/notes/{{ note.slug }}/'
hideImage: true
syndicate: true
showWebmentions: false
eleventyComputed:
  date: "{{ note.date }}"
  noteDate: "{{ note.date }}"
  note: {{ note | json }}
---

{{ note.content | linkify | raw }}
