---
layout: page
title: Contact Me
subtitle: Got something to say or a question to ask? Get in touch and say hello!
description: Got something to say or a question to ask? Get in touch and say hello!
permalink: /contact/
headerImage: /images/banners/contact-me.jpg
---

I'm always happy to answer any questions people have or love it when people want to say hello. You can easily send me a message via [Twitter]({{socialMedia.twitter.url}}) or [GitHub]({{socialMedia.github.url}}) but if you want to send me an email, then use the form below and I'll reply as soon as possible.

<form id="contact-form" class="pa4 black-80" method="POST" action="/contact/thanks/" subject="Contact form" netlify>
  <div class="measure-wide">
    <label for="emailAddresss" class="f6 b db mb2">Email address <span class="normal black-60">(so I can email you back)</span></label>
    <input type="email" class="input-reset ba b--black-20 pa2 mb2 db w-100"  id="emailAddresss" name="email" placeholder="Enter your email address" />
    <label for="message" class="f6 b db mb2">What's up?</label>
    <textarea id="message" class="input-reset ba b--black-20 pa2 mb2 db w-100" rows="10" placeholder="Ask me anything..." name="message"></textarea>
    <small id="name-desc" class="f6 black-60 db mb2">Ask me a question or just say "hello"!</small>
  </div>
  <input type="hidden" name="_subject" value="Website contact" />
  <input type="hidden" name="_next" value="{{site.url}}/contact/thanks/" />
  <button type="submit" class="f6 link dim br3 bn ph5 pv3 mb2 dib bg-dark-blue white">Send It Now</button>
</form>
