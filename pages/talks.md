---
layout: page
title: Talks
permalink: /talks/
header-img: images/banners/talks.jpg
---

I enjoy sharing ideas with people and talking publicly about the work I do. Here are some talks I've presented both internally to BBC teams, and to a wider audience. If you'd like me to come and speak at your event then get in touch.

Most of my talks involve 80s and 90s rappers. Enjoy!

---

{% for post in site.categories["talks"] %}
<div class="post-preview">
    <a href="{{ post.url | prepend: site.baseurl }}">
        <h2 class="post-title">{{ post.title }}</h2>
    </a>
</div>
{% endfor %}
