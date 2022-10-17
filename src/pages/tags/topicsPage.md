---
pagination:
    addAllPagesToCollections: true
    data: collections
    size: 1
    alias: topic
    filter:
        - post
        - talk
        - page
        - tagList
        - all
        - chatbots
        - javascript-testing
permalink: "/topics/{{topic}}/"
headerImage: /images/banners/topics.jpg
eleventyComputed:
    title: '{{topics[topic].title}}'
    description: '{{topics[topic].description}}'
---

{% if topics[topic] and topics[topic].description  %}
{{topics[topic].description}}
{% endif %}

{% assign tagCollection = collections[topic] | collectionWithoutUrls: page.url | reverse %}
{% include partials/taggedCollection.html collection: tagCollection %}
