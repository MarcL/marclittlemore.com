---
title:  "Rubber duck debugging"
permalink: /rubber-duck-debugging/
headerImage: /images/banners/rubber-duck-debugging.jpg
description: "Don't know how to solve a problem in your code? It's time to say hello to a rubber duck."
tags:
    - writing
    - essay
image:
    source: https://unsplash.com/photos/59yg_LpcvzQ
    creator: Andrew Wulf
    url: https://unsplash.com/@andreuuuw
---

I wrote [video games](/games) for about 20 years and for a long time I made games for the Sony PlayStation consoles.

Sony were famous for using rubber ducks in their console announcement demos. Here's some old footage of the PlayStation 3 announcement from the wonderful [Phil Harrison](https://twitter.com/mrphilharrison):

https://www.youtube.com/watch?v=7UaDvIPpQnQ

At Sony's [Studio Liverpool](https://www.eurogamer.net/articles/2013-03-22-wipeout-the-rise-and-fall-of-sony-studio-liverpool), we had hundreds of rubber ducks in the offices. They became part of our debugging process.

Yes, I used to talk to them when I had coding problems.

## What is rubber duck debugging?

Writing computer software is a very precise skill. You have to be explicit in your code and clear in the logic to get the results you want. Humans are often not so good at this. We often read thing ambigiously. We often become blind to errors that we've created. Our code is sometimes wrong but we can't see why.

The idea of rubber duck debugging is that when you encounter a problem in your code, you talk through your code to a rubber duck. It doesn't have to be a duck. It can be another member of your team, your partner, your children, or especially in these times of working from home, it could be your cat, dog, or hamster.

So what do I do?

### 1. Read through your code out loud

Explain your code at a high level to your duck friend. Tell it what the code is meant to do if it was working.

### 2. Explain each line and functions

It's time to explain each line on its own. Explain the flow of your function and what each line does. Say how it changes values or state within the function. Don't skip any of the details.

### 3. Explain the state or globals

If your code isn't purely [functional](https://en.wikipedia.org/wiki/Functional_programming), you may rely on state or global variables from outside of this code. Explain what this is, where it is set, and what its values should be.

### 4. Find your problem

At this point you should have your "aha" moment. Speaking the code out loud will help you to realise the assumptions you've made which might not be true. You'll spot the typo where you've misnamed a variable. You'll see that your logic is incorrect.

Your duck will have helped you to find your problem! 🐤

## Why does rubber duck debugging work?

You'll be amazed that this type of debugging actually works. I've often explained a problem to one of my team and as I explain each line, I end up discovering the issue. While writing new code, you can easily enter a state of [flow](https://en.wikipedia.org/wiki/Flow_(psychology)), also known as "being in the zone". In this state your brain and hands are working quickly as you think you understand what's needed for your requirements. Once you start explaining a problem to your rubber duck, your brain slows down to read and understand what's going on. You think a lot faster than you talk. Talking out loud helps you to focus on the issues.

Try out rubber duck debugging when you next have a problem. You'll find that you quickly gain clarity on what your code does rather than what you think it does.






