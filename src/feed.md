---
layout: null
permalink: "/feed.xml"
sitemap:
  exclude: yes
---
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>{{ site.title | xml_escape }}</title>
    <description>{{ site.description | xml_escape }}</description>
    <link>{{ site.url }}{{ site.baseurl }}/</link>
    <atom:link href="{{ "/feed.xml" | prepend: site.baseurl | prepend: site.url }}" rel="self" type="application/rss+xml" />
    <pubDate>{{ date | date_to_rfc822 }}</pubDate>
    <lastBuildDate>{{ date | date_to_rfc822 }}</lastBuildDate>
    <generator>Eleventy</generator>
    {%- for post in collections.post limit:10 -%}
      <item>
        <title>{{ post.data.title | xml_escape }}</title>
        <description>{{ post.data.content | xml_escape }}</description>
        <pubDate>{{ post.data.date | date_to_rfc822 }}</pubDate>
        <link>{{ post.url | prepend: site.baseurl | prepend: site.url }}</link>
        <guid isPermaLink="true">{{ post.url | prepend: site.baseurl | prepend: site.url }}</guid>
        {%- for tag in post.data.tags -%}
        <category>{{ tag | xml_escape }}</category>
        {%- endfor -%}
        {%- for cat in post.categories -%}
        <category>{{ cat | xml_escape }}</category>
        {% endfor %}
      </item>
    {%- endfor -%}
  </channel>
</rss>
