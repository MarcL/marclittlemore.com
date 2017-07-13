---
layout: post
title:  "Securing redirects"
subtitle: "Securing redirects"
permalink: /posts/securing-redirects/
header-img: images/posts/security-camera.jpg
categories:
    - development
    - node
    - security
---

* Secure redirects in node
* OWASP
* onHeaders

Could scan before / after you do the redirect but does your app do any redirects in between e.g. oAuth negotiation?

Easy phishing attack - redirect you to my bad page and grab your credentials

https://blog.qualys.com/securitylabs/2016/01/07/open-redirection-a-simple-vulnerability-threatens-your-web-applications
