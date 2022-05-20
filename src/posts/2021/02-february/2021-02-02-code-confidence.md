---
title:  "Ship your code with confidence"
permalink: /ship-your-code-with-confidence/
headerImage: /images/banners/ship-your-code-with-confidence.jpg
description: "All developers want to ship code on a daily basis. If we want to get our code to our users more frequently, how can we ensure we release with confidence?"
tags:
    - development
image:
    source: https://unsplash.com/photos/ASmaVyS4AZM
    creator: Cameron Venti
    url: https://unsplash.com/@ventiviews
---

All developers want to ship code on a daily basis. But how can we ensure that the code we're pushing out to our users won't break?

There are plenty of good practices we can use to ensure we can confidently release new versions of our applications. Here are a few that I think are really valuable.

## Version control

I'm always surprised when I have to mention this, but I've still met some teams and individuals who still don't use [version control](https://en.wikipedia.org/wiki/Version_control) for their source code. Even if you're a solo developer, make sure you use a source control system. Having revisions of your code is a must for everyone's sanity. Having previous versions of your code makes it easier to spot any differences should you have errors when you deploy to production. You can also use this revision history to roll back to a previous version should you need to.

## Write tests and run locally

When you write your first computer program, you test it manually as it often doesn't do a lot. Once things get more complicated, manually verifying all of your changes can take a long time. And how do you know that you haven't broken anything else with your new code?

This is why you should start writing automated tests for your code. Investing the time into learning about unit, integration, and end-to-end tests will help you to feel confident that your new code works and that it hasn't broken any other code.

You can run your tests on your local computer but it's also great to add in hooks to run tests automatically when you attempt to commit or push code. I use `git` for my version control and I add [git hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) so that the tests have to run and complete successfully before I can push any code to a remote repository like GitHub.

{% callout %}
_If you're writing JavaScript code, and are new to testing, then download my **FREE** course on [JavaScript testing](/javascript-testing/)._
{% endcallout %}

## Pair programming and code reviews

I place a lot of value in having more than one person looking at a code change. [Pair programming](https://en.wikipedia.org/wiki/Pair_programming) is the practice of two people working together on code. This is conventionally done by two people sitting next to each other but in these times of remote working, it's just as easy to do this remotely with something like [Visual Studio Live Share](https://visualstudio.microsoft.com/services/live-share/). Working together on a problem can help to spot errors early and helps to create consistent patterns and strategies for the code.

## Code reviews

Once the code is complete, I use a [branch-based workflow in GitHub](https://guides.github.com/introduction/flow/). With this method I create pull requests to allow feature branch code reviews. This discussion around the code again gives the team another opportunity to spot any errors.

Before the code can be merged to a main branch, we can also run our tests on our [continuous integration](https://en.wikipedia.org/wiki/Continuous_integration) server. This allows us to check that all of our tests pass in a completely new environment and not just on a developer's local machine. Try and avoid "it works on my machine" syndrome in your teams.

## Small iterations and often

A few years ago, it was commonplace to spend a month or two adding features and fixing bugs for an application and then have a big bang release of thousands of lines of code. This isn't the way to build code confidence!

Breaking a problem into small iterations that you can release quickly and often is the way to combat this. It helps to speed up delivery and gives the team confidence in your code deployments. If there is a problem once you've released to production, it's such a small change that you can more easily roll it back or understand how to fix it.
## Feature flags

One of the best techniques we implemented to build confidence in our code has been [feature flags](https://launchdarkly.com/blog/what-are-feature-flags/). These are variables which we can use to determine whether a logical path should be followed or not. They are often booleans but can just as easily have multiple values. These flags allows us to release code quickly and often but not yet enable a feature until we decide that the time is right.

There are many ways to implement feature flags but in our current system, we have a user interface which allows us to change the value for the feature flag and this gets propagated to any running instances of our applications. This allows a feature flag's value to be altered and it's an almost instant change for the end users. They are also great if any issues are seen in the production environment because the new feature can almost immediately be turned off too.

Note that it does incur some technical debt when you add feature flags. The code can end up littered with feature flag logic and branching paths in both the code and tests. Make sure you remove the feature flag code as soon as you're happy that the new code works as expected.
## Development environments

In order to ensure you can perform some testing prior to the production environment, it's a good idea to consider multiple development environments. This can vary based upon your own needs. We use multiple environments for testing our integration with other products prior to the code going live.

Depending on the scale of your application, you might want to consider performance testing on one of your environments. This tends to be a staging environment where you attempt to make it as close to the production environment as possible to mimic real-world conditions.

## Live testing

Finally, once your code has been deployed to the production environment, you can test it here. These can be [smoke tests](https://en.wikipedia.org/wiki/Smoke_testing_(software)) or [regression tests](https://en.wikipedia.org/wiki/Regression_testing) to ensure that no features have been broken. You can also use any monitoring you have to ensure that alarms trigger if performance degrades or tests fail on the live environment.

I hope this has given you some ideas for giving you more confidence in your development processes. Let me know on [Twitter]({{socialMedia.twitter.url}}) or via the [contact form](/contact/) if you have any others.
