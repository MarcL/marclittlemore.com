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

A source control system is an essential tool if you're writing software and in my mind, you shouldn't be writing **ANY** software without it, even for your own side projects. Although I've used many version control applications over the past 20+ years of development, I've only been using `git` for the past 3 or 4 years. However it's quickly become my version control of choice due to its ability to quickly create branches, and its distributed nature. It's easy to master the basics of `git` but, as with most pieces of software, there's a lot of power available if you choose to go beyond them. I'm going to look at `git bisect`, which is part of the `git` toolchain that I've only recently started using, as it's a great tool for tracking down random bugs that appear. Let's take a look at what it does and how we can start to use it to make bug tracking a lot easier.

### A wild bug appears

I'm currently working on some high-traffic Node.js projects for work and, as I normally do at the start of a new task, I ran `git pull` to ensure I had the latest code from our master branch, and then ran `npm install` to update any dependencies. I ran the tests and an odd thing happened: our test suite hung when it finished although all of the tests still passed. WHAT?

![A wild bug appears](/images/posts/a-wild-bug-appeared.jpg){:title="A wild bug appears"}

I had no idea why this bug had crept in nor when it had crept into the production code. My initial thought was that it was the last pull request that had been merged, so I checked out the previous merge instead but strangely, the tests were still hanging. This felt like a perfect opportunity to try out `git bisect` for the first time in order to determine which commit had caused the error.

### What does the "git bisect" command do?

Bisect performs a [binary search](https://en.wikipedia.org/wiki/Binary_search_algorithm) to quickly find out the commit that caused a bug in your project's history. You do this by telling it which was the "bad" commit, the one which contains the bug, and a "good" commit, one in which you think the bug wasn't there. You can then use `git bisect` to pick a commit which is halfway between the two endpoints and you determine whether that one is bad or good. This can be repeated until you determine the specific commit which caused the problem and then you know what has changed.

### The "git bisect" process

The first thing we need to do is tell `git` that we're about to start using bisect by using the `git bisect start` command. Before you do this, you should make sure you've commited or stashed any changes to avoid losing any work as it will checkout each revision as we attempt to find the commit with the bug.

``` shell
git bisect start
```

The next step is to determine when the bug first occurred and when we think that the repository was ok. We can tell bisect where the bad commit was and where we think the good commit was. This allows it to determine the range of revisions to search through.

``` shell
# If the bug occurs in the current HEAD revision
git bisect bad HEAD

# If the bug occurs in a specific revision then use its SHA
git bisect bad 62c5fa0
```

For the good revision, you can choose an arbitrary place in the past but the more commits that have happened between the two endpoints, the more potential revisions `git bisect` will have to check. This will depend on the speed of development in your project but it's probably wise to not choose a point in time that was too far away.

``` shell
# Choose your good revision
git bisect good da5e24d
```

Now that you've chosen your two endpoints, `git bisect` will choose a revision that's in the middle of these two and tell you how many more revisions it will need to check from this point.

```
> git bisect good da5e24d
Bisecting: 54 revisions left to test after this (roughly 6 steps)
[dac781864e62c49b279c122c42d447ed26ad16e2] Merge pull request #100 from features/my-feature
```

It's now a process of elimination to determine which specific commit caused the bug. You do this by running your test suite or using your project to see if the bug is still present in the current revision. At this point `git bisect` wants to know if this commit is good or bad so you answer `git bisect bad` or `git bisect good`.

```
> git bisect bad
Bisecting: 27 revisions left to test after this (roughly 5 steps)
[4f455b6e42487657e0492305f025dd82021735d5] some commit message from this revision
```

In my case, the `gulp` task was still hanging so I answered that the commit was bad. The revisions are then split into two and you need to continue to answer whether the revisions are good or bad until you reach the last revision and find the guilty commit. At this point `git bisect` will show you which commit caused the problem and you can check your code and see what happened.

```
02ce44a7491e9b0151169647115f9a073513e0ce is the first bad commit
commit 02ce44a7491e9b0151169647115f9a073513e0ce
Author: some-author <some-author@gmail.com>
Date:   Mon Sep 12 13:59:20 2016 +0100

    Added some code that might break! :D
```

Once you've determined the cause, you'll want to finish your current `git bisect` session. For this you just use the `reset` command and it will reset to your **HEAD** to where you were before you started.

``` shell
git bisect reset
```

Make sure you do this otherwise you may find yourself in an weird state.

### Pro-tip: Bisect automation

Manually finding the bugs in your code is helped by using `git bisect` but you can make things even faster by automating the process. You simply have to pass a script to be executed by `git bisect run`. Doing this will run the script against each bisected commit in order to determine which one causes the script to fail.

``` shell
# Set up our start and endpoints to check against
git bisect start
git bisect bad 62c5fa0
git bisect good da5e24d

# Note: you can also move the bad and good SHAs to the
# the start command and replace the above 3 commands with:
git bisect start 62c5fa0 da5e24d

# Run our gulp task which executes our
# test suite for each bisected commit
git bisect run gulp test
```

You'll have to ensure the script that you're using fails with a non-zero return value for this to work. For the code that fails in my above discussion, our test suite hung so it wasn't as easy to use automation here.

### Wrap up

As you can see, using `git bisect` is an easy way to quickly determine where defects have crept into a `git` codebase. You should start using it as its an effective tool to understand. For more information have a read of this great git SCM article on [debugging with git](https://git-scm.com/book/en/v2/Git-Tools-Debugging-with-Git). Also, take some time to look at the [git bisect documentation](https://git-scm.com/docs/git-bisect) too.
