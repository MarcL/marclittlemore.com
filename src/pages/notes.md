---
title: Notes
description: Notes for my microblog which are syndicated to social media platforms.
permalink: /notes/
hideImage: true
---

<div class="max-w-full mx-auto py-4 grid grid-cols-1">
{% for note in collections.note reversed %}
{% include partials/noteCard.html, noteContent: note.content, noteImage: note.data.image, noteDate: note.date, noteUrl: note.url %}
{% endfor %}
</div>

