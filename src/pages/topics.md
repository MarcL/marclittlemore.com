---
title: 'All of the topics I write about'
permalink: /topics/
headerImage: /images/banners/topics.jpg
description: "I enjoy writing and here is a list of the sort of topics I write about."
image:
    source: https://unsplash.com/photos/V7RyEH0rvf0
    creator: "D J"
    url: https://unsplash.com/@trulysoutheastasia
---

{% for tag in collections.tagList %}
{% assign capitalisedTag = tag | capitalize %}

{% if topics[tag] %}
{%- assign capitalisedTag = topics[tag].title -%}
{%- capture url -%}/topics/{{tag}}/{%- endcapture -%}
{%- if topics[tag].url -%}
{%- assign url = topics[tag].url -%}
{%- endif -%}
{% endif %}

<h3><a href="{{url}}" title="{{capitalisedTag}}">{{capitalisedTag}}</a></h3>

{% if topics[tag] and topics[tag].description  %}
{{topics[tag].description}}
{% endif %}

{% endfor %}