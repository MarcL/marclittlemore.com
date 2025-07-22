---
title: Chatbots & Messenger Marketing
subtitle: Learn more about automating your marketing using chatbots and Facebook Messenger
description: Learn more about automating your marketing using chatbots and Facebook Messenger.
permalink: /bots/
headerImage: /images/banners/chatbots-and-messenger-marketing.jpg
---

It seems like everyone in 2018 and 2019 is talking about **chatbots** as the next big thing in marketing but what are they?

## What is a chatbot?

A chatbot allows users or customers to interact with an automated service via a chat interface. This could be using one of the main chat platforms like Facebook Messenger, Slack, WeChat, WhatsApp or Telegram, or it could be via a pop-up on your website. They contain a set of rules, or sometimes some more advance artificial intelligence, which allows them to have a conversation with your users. This often helps to automate your business or funnel your users into finding out information about your website, product or brand. Think of it as your own little robot butler!

## Why should I be using a chatbot?

The [use of messenging applications has sky rocketed](https://www.businessinsider.com/the-messaging-app-report-2015-11) in the past few years far beyond social networks. Everyone is using them to chat with friends and family, but now people are moving beyond that to connect with brands, buy products, and consume content. Wouldn't you like to be a part of it?

While email is a great way to connect with your users or followers, the open rates for emails have been getting lower whilst messaging open rates have been growing. People are talking about up to 90% open rates and 55% click-through-rates (CTR) for some brands with the write messaging. Sounds good right?

## Want to learn more about chatbots?

As a software engineer and chatbot developer, I've been experimenting with lots of platforms like [Chatfuel](https://chatfuel.com), [ManyChat](https://manychat.com/), [BotKit](https://botkit.ai/), and [DialogFlow](https://dialogflow.com/) over the past year and I'm really excited about the possibilities.



## Chatbot Articles

{% assign tagCollection = collections['chatbots'] | collectionWithoutUrls: page.url | reverse %}
{% include partials/taggedCollection.html collection: tagCollection %}

## Chatbot Videos

Interested in learning more about chatbots but don't know where to start? Don't worry! I've made some videos which will make life much easier. I've put them all on YouTube so you can enjoy them at your own pace. If you have some ideas for videos you want me to record then [let me know](/contact/) and I'll add the ideas to my list.

<div class="flex flex-col sm:flex-row flex-wrap justify-center w-full prose prose-sm max-w-full">
{%- for video in youTubeVideos.marketing.items -%}
<article class="w-full md:w-1/2 px-2 py-2 text-center">
    <a href="https://www.youtube.com/watch?v={{video.snippet.resourceId.videoId}}" class="" target="_blank" rel="noreferrer">
      <img src="{{video.snippet.thumbnails.high.url}}" alt="{{video.snippet.title}}" class="object-cover rounded-sm shadow-lg mt-2 mb-2"/>
      <h3 class="text-sm">{{video.snippet.title}}</h3>
    </a>
</article>
{% endfor %}
</div>