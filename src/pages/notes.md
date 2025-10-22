---
title: Notes
description: Notes for my microblog which are syndicated to social media platforms.
permalink: /notes/
hideImage: true
---

<div class="max-w-full mx-auto py-4 grid grid-cols-1">
{% for note in collections.allNotes %}
{% if note.syndicated %}
{% assign noteContent = note.content %}
{% assign noteImage = note.data.image %}
{% assign noteDate = note.date %}
{% assign noteUrl = note.url %}
{% else %}
{% assign noteContent = note.content %}
{% assign noteImage = note.data.image %}
{% assign noteDate = note.date %}
{% assign noteUrl = note.url %}
{% endif %}
{% include partials/noteCard.html, noteContent: noteContent, noteImage: noteImage, noteDate: noteDate, noteUrl: noteUrl %}
{% endfor %}
</div>

