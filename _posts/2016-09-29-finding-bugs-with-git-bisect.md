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

A source control system is an essential tool if you're writing software and in my mind, you shouldn't be writing *ANY* software without it, ever for your own projects. Although I've used many version control applications over the past 20+ years of development, I've only been using `git` for the past 3 or 4 years. However it's quickly become my version control of choice due to its ability to quickly create branches, and its distributed nature. It's easy to master the basics of `git` but, as with most pieces of software, there's a lot of power available if you choose to go beyond them. I'm going to look at `git bisect`, which is part of the `git` toolchain that I've only recently started using, as it's a great tool for tracking down random bugs that appear. Let's take a look at what it does and how we can start to use it to make defect tracking a lot easier.

### A wild bug appears

I'm currently working on some high-traffic Node.js projects for work and, as I normally do at the start of a new task, I ran `git pull` to ensure I had the latest code from our master branch, and then ran `npm install` to update any dependencies. I ran the tests and an odd thing happened: our test suite hung when it finished although all of the tests still passed. WHAT? I had no idea why this bug had crept in nor when it had crept into the production code. My initial thought was that it was the last pull request that had been merged, so I checked out the previous merge instead but strangely, the tests were still hanging. This felt like a perfect opportunity to try out `git bisect` for the first time in order to determine which commit had caused the error.

### What does the "git bisect" command do?

Bisect performs a [binary search](https://en.wikipedia.org/wiki/Binary_search_algorithm) to quickly find out the commit that caused a bug in your project's history. You do this by telling it which was the "bad" commit, the one which contains the bug, and a "good" commit, one in which you think the bug wasn't there. You can then use `git bisect` to pick a commit which is halfway between the two endpoints and you determine whether that one is bad or good. This can be repeated until you determine the specific commit which caused the problem and then you know what has changed.

### The "git bisect" process
```
> git bisect start
```

#### Determine when it broke in the first place

#### Split the commits

Process of elimination.

#### Find the guilty commit

#### Finish bisecting


### Pro-tip: Bisect automation

Manually finding the bugs in your code is much easier using `git bisect` but you can make things even easier by automating the process. You simply have to pass a script to be executed by `git bisect` and it will run it to determine

``` shell
# Set up our start and endpoints to check against
git bisect start
git bisect bad 62c5fa0
git bisect good da5e24d

# Run our gulp task which executes our
# test suite for each bisected commit
git bisect run gulp test
```


You can pass any script to git bisect and have it check that script against each commit within the revision list. The script should end with a non-zero return status when it fails. Your test suite already does this so if you have a failing test, this is easy.

### Wrap up

For more information have a read of this great git article on [debugging with git](https://git-scm.com/book/en/v2/Git-Tools-Debugging-with-Git). Alternatively, you can read the [git bisect documentation](https://git-scm.com/docs/git-bisect).

http://rogerdudler.github.io/git-guide/
