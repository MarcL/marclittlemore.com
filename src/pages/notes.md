---
title: Microblog Notes
description: Microblogging notes
permalink: /notes/
hideImage: true
---

<div class="max-w-full mx-auto py-4 grid grid-cols-2 space-x-4">
{% for note in collections.note %}
{% include partials/noteCard.html, noteContent: note.content, noteImage: note.data.image, noteDate: note.date, noteUrl: note.url %}
{% endfor %}
</div>

