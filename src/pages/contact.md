---
title: Contact Me
subtitle: Got something to say or a question to ask? Get in touch and say hello!
description: Got something to say or a question to ask? Get in touch and say hello!
permalink: /contact/
headerImage: /images/banners/contact-me.jpg
---

I'm always happy to answer any questions people have or love it when people want to say hello. You can easily send me a message via [Twitter]({{socialMedia.twitter.url}}) or [GitHub]({{socialMedia.github.url}}) but if you want to send me an email, then use the form below and I'll reply as soon as possible.

<form id="contact-form" class="" method="POST" action="/contact/thanks/" subject="Contact form" data-netlify="true">
  <div class="mt8 w-full space-y-8">
    <label class="block">
      <span class="text-gray-700">Email address (so I can email you back)</span>
      <input type="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" id="emailAddresss" name="email" placeholder="Enter your email address">
    </label>
    <label class="block">
      <span class="text-gray-700">What's up?</span>
      <textarea class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" rows="3" spellcheck="false" placeholder="Ask me anything..." name="message" id="message"></textarea>
    </label>
  
  </div>
  <input type="hidden" name="_subject" value="Website contact" />
  <div class="flex flex-col justify-center items-center">
    <button type="submit" class="mt-8 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-8 rounded w-full lg:w-1/2">Get in touch</button>
  </div>
</form>
