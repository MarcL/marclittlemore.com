---
title:  "Moving from Jekyll to Eleventy"
permalink: /moving-from-jekyll-to-eleventy/
headerImage: /images/banners/tv-static.jpg
description: "Blah blash"

# Feed excerpt
excerpt: "Feed excerpt"
tags:
    - eleventy
    - javascript
---

## How this site started

I bought the Marc Littlemore domain names (.com and .co.uk) way back in 2007 but never built a website for them until a year later. I'd had my [DJ Cruze](djcruze.co.uk) website since 2004 and that ran on [Blogger](https://www.blogger.com) and then on [Wordpress](https://wordpress.com/) when I got a bit more tech savvy. I moved my personal site onto using Wordpress and then left it to rot with about 4 or 5 blog posts and not much love.

In 2015 I wanted to start writing again and Wordpress seemed unnecessary for such a minimal website with little dynamic content. I started reading about [static site generators](https://www.smashingmagazine.com/2015/11/modern-static-website-generators-next-big-thing/) and this seemed like a good idea for my site. I chose [Jekyll](https://jekyllrb.com/) as it seemed to be the best option at the time and was the framework used for [GitHub Pages](https://pages.github.com/). Whilst Jekyll did the job for 5 years, I had little experience in the Ruby ecosystem and adding functionality became trickier without diving into Ruby.

## Why choose Eleventy?

In 2019 I used Gatsby to build my wife's author site [clarelittlemore.com](https://clarelittlemore.com) and whilst it gave great results, I found that needing to use GraphQL to query data sources and React to build out the site was too much of an overhead. Since 2015 I'd worked in the JavaScript and Node world so I wanted to find a framework that used Node as the build tool. I'd played around with [Metalsmith](https://metalsmith.io/) a few years ago but it was now 2020 and I'd heard great things about a new framework called [Eleventy](https://www.11ty.dev/).

## How I moved from Jekyll to Eleventy

- Eleventy config
- YAML data files to JSON files / JS functions
- PR https://github.com/MarcL/marclittlemore.com/pull/17/

## Issues

- Liquid template includes
- Liquid template types
- Page format differs

## Benefits

- Configuration for layout vs my own layout
- Data as functions + API calls
- Understanding the ecosystem
- Faster

## Conclusion

[Turn Jekyll Up To Eleventy](https://24ways.org/2018/turn-jekyll-up-to-eleventy/) by Paul Lloyd