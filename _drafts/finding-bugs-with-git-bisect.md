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

I've only been using `git` for the past 3 or 4 years but it's quickly become my favourite version control system. It's easy to master the basics but as with most pieces of software, there's a lot of power available if you choose to go beyond them. I'm going to look at `git bisect`, which I've only recently started using, as it's a great tool for tracking down bugs that appear in your `git` repository. Let's take a look at what it does and how we can start to use it to make defect tracking a lot easier.

### A wild bug appears

```
git bisect start
```

### What does `git bisect` do?
Bisect performs a [binary search](https://en.wikipedia.org/wiki/Binary_search_algorithm) to quickly find out the commit that caused a bug in your project's history. You do this by telling it which was the "bad" commit, the one which contains the bug, and a "good" commit, one in which you think the bug wasn't there. Using `git bisect` then picks a commit which is halfway between the two endpoints and you determine whether that one is bad or good. You can keep doing this until you work out which specific commit caused the problem and then you know what has changed, and probably who to blame!

### Determine when it broke in the first place

### Split the commits

Process of elimination.

### Find the guilty commit

### Bisect Automation

### Wrap up

For more information have a read of this great git article on [debugging with git](https://git-scm.com/book/en/v2/Git-Tools-Debugging-with-Git). Alternatively, you can read the [git bisect documentation](https://git-scm.com/docs/git-bisect).

http://rogerdudler.github.io/git-guide/
