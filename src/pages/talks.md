---
layout: page
title: Talks
subtitle: A few of the talks that I've given recently
permalink: /talks/
header-img: images/banners/talks.jpg
---

I used to hate public speaking. I was really shy and the thought of talking in front of 5 people, let alone hundreds, really scared me. When I came to work at the BBC in 2013, I decided I had to overcome my fear of public speaking. I decided to say "yes" whenever anyone asked me to speak and then I began to enjoy sharing my ideas with people.

After 6+ years of practice, I now **love** public speaking!

I really enjoy sharing the work I do both at the BBC and outside of the day job. Here you will find an archive of the talks I've presented both internally to BBC teams, and to a wider audience and various events. Most of my talks involve 80s and 90s rappers or gifs. Enjoy!

If you'd like me to come and speak at your event then get in [touch](/contact) or via [Twitter](https://twitter.com/marclittlemore).

{% for post in collections.talk reversed %}
<article class="pv4 bb b--black-10 ph3 ph0-l">
    <div class="flex flex-column flex-row-ns">
        <div class="w-100 w-60-ns pr3-ns order-2 order-1-ns">
            <a href="{{ post.url | prepend: site.baseurl }}" class="link dim black">
                <h1 class="f3 roboto mt0 lh-title mb1">{{ post.data.title }}</h1>
            </a>
            <p class="f5 f4-l lh-copy roboto i mv2">
                {{post.data.subtitle}}
            </p>
            <p class="f6 f5-l lh-copy roboto">
                {{post.data.description}}
            </p>
        </div>
        <div class="pl3-ns order-1 order-2-ns mb4 mb0-ns w-100 w-40-ns">
            <a href="{{ post.data.url | prepend: site.baseurl }}" class="grow dib">
                <img src="{{post.data.thumbnail}}" class="db" alt="{{post.data.title}}">
            </a>
        </div>
    </div>
</article>
{% endfor %}
