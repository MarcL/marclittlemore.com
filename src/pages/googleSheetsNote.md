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
  title: "📝 {{ note.date | date: '%B %d, %Y %H:%M' }}"
  date: "{{ note.date }}"
  noteDate: "{{ note.date }}"
  note: {{ note | json }}
---

{{ note.content | linkify | raw }}
