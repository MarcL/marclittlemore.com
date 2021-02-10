---
title:  "Writing great pull requests"
permalink: /writing-great-pull-requests/
headerImage: /images/banners/writing-great-pull-requests.jpg
description: "Collaboration with other software developers is the key to great software. How do we make sure our code is merged into a project? By writing great pull requests."
tags:
    - writing
    - essay
image:
    source: https://unsplash.com/photos/842ofHC6MaI
    creator: Yancy Min
    url: https://unsplash.com/@yancymin
---

Teams want to write great code. They want to communicate and collaborate on their software. Sharing code via a [pull request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests) is a great way to present your code for review by your peers.

A pull request is a way to create a new feature branch which you're asking to be merged into your main branch. It's also a way to document and share your thinking around the changes and allow others to review the code and suggest changes.

Here are some ideas as to what you can do to help to write a great pull request.

## Why does it matter?

Keeping your codebase simple and easy to read is hard. Ensuring code consistency isn't easy. Reviewing code can be difficult and defects can easily occur without the whole team helping to validate any potential changes.

Each change can be neatly captured in a pull request. Keeping these pull requests descriptive, easy to read, and consistent allows your team to use their mental energy on reviewing the code. It avoids having to jump through hoops to understand why the change is being made.

## Make small pull requests

It's difficult to review large pull requests. If you have too many changes then reviewers tend to skim read the code and often merge it without a thorough review. [A study by SmartBear](https://smartbear.com/learn/code-review/best-practices-for-peer-code-review/) showed that developers should review no more than 200 to 400 lines of code at a time. The brain can only process so much information and beyond 400 lines of code, it was shown that the ability to spot issues was greatly reduced.

Look to make your smaller pull requests and then you can raise them more often. Try to have a single context for each new request. Sometimes you think "I'll just fix this other thing while I'm here". It's a great idea to [refactor your code](/refactoring-code-broken-windows-theory/) while in the codebase, but maybe save it for a separate pull request to avoid losing the context around the current changes. Having atomic contextual changes makes it easy to review.

## A useful title

We often go back through the code and look at closed pull requests. Writing descriptive titles allows you to see what happened for each set of merged changes.

Add a summary of what changes have been applied for this pull request. This should be a short description of the changes at a high level. If you use a feature or defect tracking application such as Jira, you can use a pattern of adding a ticket number to the title as my team currently does. This helps to have a quick reference to a potentially more descriptive document with more context around the changes.

You can also add a prefix to your title to define the type of pull request. For example, adding a **[WIP]** (work in progress) would suggest that the pull request is unfinished. Or adding **[RFC]** (request for comments) could suggest that it's not yet a mergeable pull request and that you'd like people to comment on the suggested architectural pattern.

GitHub also allows you to create a draft pull request which can be reviewed and commented upon but not merged into the main branch. This is a useful way to review an idea before embarking on the full implementation of the code.

## Tell them what changed

Next up is the description for the pull request.

Firstly, we should tell the reviewers what has changed. Your job here is to make it easier for the reviewer to see what this pull request achieves.

Write a high level description which explains the changes being made and what the expected results are. You can also add a list of the key changes that have been made so the reviewer can see them at a glance. Don't just make this the list of commits to the request. Those can be easily seen as the commits to this pull request. Instead, list the key changes which matter.

## Tell them why its changed

In addition to telling the reviewer what has changed, it's good to give a context as to why this change is happening. If it's related to other pull requests or architectural changes, add links to these documents so the reviewer can read them. Often the developer reading the code won't have been involved in the changes and may not have the full picture of why this change is necessary. Given them a solid context as to the reason for the pull request will definitely help with their understanding.

Adding screenshots or videos to your pull request makes it much easier to review. For visual changes, the screenshots could be a before and after shot to show what changes the pull request provides. For more complicated changes, a short video is a fantastic way to share information about user flows and expectations.

## Tags and labels

If your pull request references previous changes, make sure to link them in your description. You can tag other team members if you think that they can provide additional context around the changes or you want them involved in the discussion. In GitHub you can also tag teams if it's relevant to a whole team and not just individuals.

Use a pull requests labels to give the reviewer some additional information around the changes. This could be a `bug` label for a quick fix or a `do not merge` label if the code is not yet ready for prime time. You can add your own team's custom labels if relevant too.

## Keep consistent

The best thing for a team to do is to keep a consistent pull request format. Context switching between pull requests with different information in them can be challenging and slow down the review process.

GitHub provides the ability to add a standard [pull request Markdown template](https://docs.github.com/en/github/building-a-strong-community/creating-a-pull-request-template-for-your-repository) which gets added to the description when a pull request gets raised. This is a useful way to capture the information above into a consistent format. For GitHub, this involves creating a file named `pull_request_template.md` in the `.github` directory of your project.

## Wrapping up

These are just some of the ways you can help to write great pull requests. They are not mandatory rules but they've definitely helped my team to write better pull requests over the years. As with all processes, they should adapt and change over time. Your teams needs might be different from mine. Take the best ideas and add your own.

Let me know if you have any other fantastic ideas for writing great pull requests by [sending me a message](/contact/) or [tweeting at me]({{socialMedia.twitter.url}}).

## Useful resources
- [The anatomy of a perfect pull request](https://medium.com/@hugooodias/the-anatomy-of-a-perfect-pull-request-567382bb6067)
- [Writing a great pull request descriptipn](https://www.pullrequest.com/blog/writing-a-great-pull-request-description/)
- [How to write the perfect pull request](https://github.blog/2015-01-21-how-to-write-the-perfect-pull-request/)
- [The (written) unwritten guide to pull requests](https://www.atlassian.com/blog/git/written-unwritten-guide-pull-requests)
