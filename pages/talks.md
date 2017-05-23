---
layout: page
title: Talks
subtitle: Talks that I've given
permalink: /talks/
header-img: images/banners/talks.jpg
---

I enjoy sharing ideas with people and talking publicly about the work I do. Here are some talks I've presented both internally to BBC teams, and to a wider audience. If you'd like me to come and speak at your event then get in touch.

Most of my talks involve 80s and 90s rappers. Enjoy!

<div class="f1-ns f5 bb b--black-20 pv3">Recent Talks I've Given</div>

{% for post in site.categories["talks"] %}
<article class="pv4 bb b--black-10 ph3 ph0-l">
    <div class="flex flex-column flex-row-ns">
        <div class="w-100 w-60-ns pr3-ns order-2 order-1-ns">
            <a href="{{ post.url | prepend: site.baseurl }}" class="link dim black">
                <h1 class="f3 roboto mt0 lh-title">{{ post.title }}</h1>
            </a>
            <p class="f5 f4-l lh-copy roboto">
                {{post.subtitle}}
            </p>
        </div>
        <div class="pl3-ns order-1 order-2-ns mb4 mb0-ns w-100 w-40-ns">
            <img src="/{{post.social-img}}" class="db" alt="{{post.title}}">
        </div>
    </div>
</article>
{% endfor %}
