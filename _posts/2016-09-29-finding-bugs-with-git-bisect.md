---
layout: post
title:  "Finding Bugs Using Git Bisect"
subtitle: "Bisect your way to success"
permalink: /posts/finding-bugs-using-git-bisect/
header-img: images/posts/computer-code.jpg
categories:
    - git
    - development

enableComments: true
---

A source control system is an essential tool if you're writing software and in my mind, you shouldn't be writing *ANY* software without it, ever for your own projects. I've used many systems over the past 20+ years of development and I've only been using `git` for the past 3 or 4 years but it's quickly become my version control of choise. It's easy to master the basics of `git` but, as with most pieces of software, there's a lot of power available if you choose to go beyond them. I'm going to look at `git bisect`, which is part of the `git` toolchain that I've only recently started using, as it's a great tool for tracking down wild bugs that appear in your repository. Let's take a look at what it does and how we can start to use it to make defect tracking a lot easier.

### A wild bug appears

So for a Node.js project that I was working on recently, I `git pull`ed the latest changes from our master branch and updated the dependencies. I ran the tests and a funny thing happened, our test suite hung when it finished although all of the tests still passed. WHAT? I had no idea why nor at what point this bug had crept in. My initial thought was that it was the last pull request that had been merged so I checked out the previous merge instead but strangely, the tests were still hanging. This felt like a perfect time to try out `git bisect` for the first time to try and determine which commit caused the error.

### What does `git bisect` do?
Bisect performs a [binary search](https://en.wikipedia.org/wiki/Binary_search_algorithm) to quickly find out the commit that caused a bug in your project's history. You do this by telling it which was the "bad" commit, the one which contains the bug, and a "good" commit, one in which you think the bug wasn't there. You can then use `git bisect` to pick a commit which is halfway between the two endpoints and you determine whether that one is bad or good. This can be repeated until you determine the specific commit which caused the problem and then you know what has changed.

```
> git bisect start
```

### Determine when it broke in the first place

### Split the commits

Process of elimination.

### Find the guilty commit

### Pro-tip: Bisect automation

### Wrap up

For more information have a read of this great git article on [debugging with git](https://git-scm.com/book/en/v2/Git-Tools-Debugging-with-Git). Alternatively, you can read the [git bisect documentation](https://git-scm.com/docs/git-bisect).

http://rogerdudler.github.io/git-guide/
