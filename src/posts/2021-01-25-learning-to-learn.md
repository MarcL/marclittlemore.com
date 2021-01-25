---
title:  "Learning to learn about software development"
permalink: /learning-to-learn-software-development/
headerImage: /images/banners/learning-to-learn-software-development.jpg
description: "With a constant stream of information about software development, how do you stay on top of it all? Learning how to learn and being ruthless with your time is a great skill to learn."
tags:
    - writing
    - essay
image:
    source: https://unsplash.com/photos/eeSdJfLfx1A
    creator: Ed Robertson
    url: https://unsplash.com/@eddrobertson
---

One of my team asked me a fantastic question today.

{% quote %}
"How do I stay on top of learning with software development technologies and best practices?"
{% endquote %}

There's an information overload in the software development world. Every day there's a new framework, a new library, a new technology stack, or a new programming language. It feels like you have to learn everything, especially if you're not an experienced developer yet.

So how do you manage to learn new skills when there's a massive influx of articles and videos competing for your attention? 

My day-to-day role is as a software engineering team lead. This means I'm not as hands-on with development work as I used to be. I have to pick and choose what I have time to learn and, with the exception of our team's 10% time ([similar to Google's 20% time](https://en.wikipedia.org/wiki/20%25_Project)), most of my learning is done after work in the evenings or at weekends.

## Knowing what to learn

I'm somewhat addicted to Twitter, although I try my best not to be. This is my first port of call when it comes to ideas for new technologies or frameworks to investigate. You can follow some interesting developers and technologists on Twitter but it's sometimes difficult to keep up if you follow too many people. Alternatively, you can create and follow lists of people, or follow lists that others have made. This is a great way to expose yourself to new people and their ideas. Don't forget to keep your ideas diverse by following more than just people inside your own area of knowledge.

Another great source of new technologies are technology aggregators such as [Hacker News](https://news.ycombinator.com/) (don't read the comments!), [Dev.to](https://dev.to/), [Reddit](https://www.reddit.com/), and [Hashnode](https://hashnode.com/explore).

I also watch a lot of YouTube videos. YouTube is a fantastic search engine but by also following the right people, its algorithm will also suggest other technology videos you might be interested in. I enjoy watching [Fireship](https://www.youtube.com/c/AngularFirebase), [Adam Wathan](https://www.youtube.com/channel/UCy1H38XrN7hi7wHSClfXPqQ), [Firebase](https://www.youtube.com/channel/UCP4bf6IHJJQehibu6ai__cg), [Google Chrome Developers](https://www.youtube.com/channel/UCnUYZLuoy1rq1aVMwx4aTzw) and many more.

You'll find plenty to read on Twitter, YouTube, and these sites and it'll help you to discover **what** you're interested in learning.

## Scratch your own itch

I always like to investigate new ideas and technologies by "scratching my own itch". This means that I have an idea for something I'd like to do and it allows me to learn whilst I'm implementing.

For example, my wife was watching a series of online webinars that were only available for the next 5 days. She had no time to watch it so wondered if I could download the video so she could watch it later. It was a video hosted by [Wistia](https://wistia.com/) so I investigated how I could find the source video file by digging through the websites source code and discovering how the video was launched. As I needed to download multiple videos, I wondered if I could automate the process through a command line tool. This took me off on a voyage of discovery as I scraped a webpage, used regular expressions to parse script tags to pull out JSON data, and worked out which hidden binary file URL to download. Leading on from this I investigated Node.js streams, which I'd not used before with any force, to stream the video file and write it to disk.

As you can see, working a project that you're interested in can open up a world of learning opportunities.

## Open source GitHub repositories

Once you've discovered what you want to learn it's a good idea to dig into other people's code. When I'm thinking about functionality I need for a project, I have to decide whether it's worth writing the code myself or exploring an open source library which might do what I need.

If it's an open source library I'm using, I quickly jump to their GitHub, GitLab, or BitBucket repository. A well-written README file can teach you a lot about the architecture and design of their library. Once I've got an idea of how it works, I'll attempt to use the library in my project to understand their public API. If I struggle to get something working, now is a good time to jump into the code. The great thing about open source projects is that their code is their for you to read. Take a look through and work out the code path for what you're attempting. You'll fix your own bug and learn how their code is designed.

## Take notes and share them

As I've mentioned previously, I take a lot of notes using [Obsidian](/beginners-guide-note-taking-obsidian/). I use this to build up a list of technologies, languages or frameworks I'd like to learn as I discover them. I use this to remember what I want to look at next. As I start using something new, I take notes as I'm learning and note down any problems I've encountered, other libraries that they use, or how they're structured. This helps me to make my own technical decisions for my code.

Once you've done that, try and write up your notes so that you can [learn in public](/learn-in-public/). You might not know all of the details yet but you're one step ahead of someone who's not yet discovered it. Why not write up some notes on Twitter or if you have a personal website, blog about it.

## Just-in-time learning

If you're anything like me, you've probably now got hundreds of ideas of what you want to build. But you can't learn everything. You have to be ruthless with your time, especially if you have other commitments like a partner or family. I try and employ just-in-time learning. I don't go off and attempt to become an expert in a technology that I don't currently need. I learn it when I need it for my job or my side projects. You can't learn everything so gain your knowledge at the right time.
