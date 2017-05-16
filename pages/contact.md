---
layout: page
title: Contact Me
subtitle: Get in touch and say hello
description: Get in touch and say hello
permalink: /contact/
header-img: images/banners/contact-me.jpg
---

I'm always happy to answer any questions people have or love it when people want to say hello. You can easily send me a message via [Twitter](https://twitter.com/marclittlemore) or [GitHub](https://github.com/MarcL) but if you want to send me an email, then use the form below and I'll reply as soon as possible.

<form id="contactform" action="//formspree.io/marc@marclittlemore.com" method="POST">
  <div class="form-group">
    <label for="emailAddresss">Email address</label>
    <input type="email" class="form-control" id="emailAddresss" name="email" placeholder="Enter your email address">
  </div>
  <div class="form-group">
    <label for="message">What's up?</label>
    <textarea class="form-control" id="message" rows="10" placeholder="Ask me anything..." name="message"></textarea>
  </div>
  <input type="hidden" name="_subject" value="Website contact" />
  <input type="hidden" name="_next" value="{{site.url}}/contact/thanks/" />
  <button type="submit" class="btn btn-primary">Send It Now</button>
</form>