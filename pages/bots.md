---
layout: page
title: Chat Bots
subtitle: Chatbots and Messenger marketing
description: Chatbots and Messenger marketing
permalink: /bots/
header-img: images/banners/chatbots-and-messenger-marketing.jpg
videos:
  - title: 'Beginners Guide To Chatfuel, JSON & APIs'
    subtitle: 'Learn all about JSON and integrating with Chatfuel'
    id: 'HXBh6fQ0-QY'
  - title: 'Chatfuel Joke Bot'
    subtitle: 'Using external APIs to make your Messenger chatbot funny'
    id: 'oLFOy0f4AFQ'
  - title: 'Chatfuel Weather Bot'
    subtitle: 'Learn about external APIs and Chatfuel attributes'
    id: '7ixD6_4Vsq4'
  - title: 'Chatfuel Geofencing'
    subtitle: 'Create location based chatbots with ease'
    id: 'l4D1tQBjJnI'
  - title: 'Chatfuel & Facebook Messenger Webviews (Part 1)'
    subtitle: 'Want to get a webview hooked up to Chatfuel for your chatbot?'
    id: 'waeBQU47GFU'
  - title: 'Chatfuel & Facebook Messenger Webviews (Part 2)'
    subtitle: 'Want to make your Facebook Messenger webviews dynamic?'
    id: 'UrO5ztx1D5w'
  - title: 'Create a location-aware chatbot using Chatfuel'
    subtitle: 'Using the Chatfuel JSON API to share your nearest location'
    id: '7uQtrQeyWdE'
  - title: 'Reset user and system attributes in Chatfuel'
    subtitle: 'Learn how to reset user and system attributes using the JSON API and 6 lines of code!'
    id: 'CGR47D1ArSk'
quickTips:
  - title: 'Chatfuel Quick Tip: Reset a user attribute in Chatfuel'
    subtitle: 'Reset a Chatfuel attribute using the "set attributes" card'
    id: 'gXZh9jijIS8'
---

It seems like everyone in 2018 and 2019 is talking about **chatbots** as the next big thing in marketing but what are they?

## What is a chatbot?

A chatbot allows users or customers to interact with an automated service via a chat interface. This could be using one of the main chat platforms like Facebook Messenger, Slack, WeChat, WhatsApp or Telegram, or it could be via a pop-up on your website. They contain a set of rules, or sometimes some more advance artificial intelligence, which allows them to have a conversation with your users. This often helps to automate your business or funnel your users into finding out information about your website, product or brand. Think of it as your own little robot butler!

## Why should I be using a Chatbot?

The [use of messenging applications has sky rocketed](https://www.businessinsider.com/the-messaging-app-report-2015-11) in the past few years far beyond social networks. Everyone is using them to chat with friends and family, but now people are moving beyond that to connect with brands, buy products, and consume content. Wouldn't you like to be a part of it?

While email is a great way to connect with your users or followers, the open rates for emails have been getting lower whilst messaging open rates have been growing. People are talking about up to 90% open rates and 55% click-through-rates (CTR) for some brands with the write messaging. Sounds good right?

## Want to learn more about chatbots?

As a software engineer and chatbot developer, I've been experimenting with lots of platforms like [Chatfuel](https://chatfuel.com), [ManyChat](https://manychat.com/), [BotKit](https://botkit.ai/), and [DialogFlow](https://dialogflow.com/) over the past year and I'm really excited about the possibilities. If you want to learn more about building great chatbots then I've got a mailing list which will provide you with great information each week about the lastest trends, tutorials and quick tips to build better chatbots? Sounds like something you're interested in? Great! Sign up to my [bot builders email list now](/bots/sign-up-bot-building-for-beginners/) and get lots of great informaiton.

## Chatbot Videos

Interested in learning more about chatbots but don't know where to start? Don't worry! I've made some videos which will make life much easier. I've put them all on YouTube so you can enjoy them at your own pace. If you have some ideas for videos you want me to record then [let me know](/contact) and I'll add the ideas to my list.

<article>
  <div class="cf pa2">
{% for video in page.videos %}
    <div class="fl w-100 w-50-ns pa2">
      <a href="https://www.youtube.com/watch?v={{video.id}}" class="db link tc" target="_blank">
        <img src="https://i.ytimg.com/vi/{{video.id}}/hqdefault.jpg" alt="{{video.title}}" class="w-100 db outline black-10 grow"/>
        <dl class="mt2 f7 f6-ns lh-copy">
          <dt class="clip">Title</dt>
          <dd class="ml0 black truncate w-100">{{video.title}}</dd>
          <dt class="clip">Subtitle</dt>
          <dd class="ml0 gray truncate w-100">{{video.subtitle}}</dd>
        </dl>
      </a>
    </div>
{% endfor %}
  </div>
</article>

### Chatfuel Quick Tip Videos

<article>
  <div class="cf pa2">
{% for video in page.quickTips %}
    <div class="fl w-100 w-50-ns pa2">
      <a href="https://www.youtube.com/watch?v={{video.id}}" class="db link tc" target="_blank">
        <img src="https://i.ytimg.com/vi/{{video.id}}/hqdefault.jpg" alt="{{video.title}}" class="w-100 db outline black-10 grow"/>
        <dl class="mt2 f7 f6-ns lh-copy">
          <dt class="clip">Title</dt>
          <dd class="ml0 black truncate w-100">{{video.title}}</dd>
          <dt class="clip">Subtitle</dt>
          <dd class="ml0 gray truncate w-100">{{video.subtitle}}</dd>
        </dl>
      </a>
    </div>
{% endfor %}
  </div>
</article>
