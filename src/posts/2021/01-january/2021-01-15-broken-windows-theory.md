---
title:  "Refactoring code: the broken windows theory"
permalink: /refactoring-code-broken-windows-theory/
headerImage: /images/banners/broken-windows.jpg
description: "Every time we touch our applications we incur technical debt. Make sure you keep a codebase healthy by fixing those broken windows."
tags:
    - leadership
image:
    source: https://unsplash.com/photos/vT684iB7Ejg
    creator: Matt Artz
    url: https://unsplash.com/@mattartz
---

Every time we write software we incur technical debt.

Every decision to add new code to a project has the potential to introduce new bugs. Over time a team will introduce disorder to their systems as new features are built and technical architecture changes. So how can you encourage a healthy codebase and avoid it falling into a state of disrepair?

Let's think about the broken windows theory.

{% quote false %}
#### The Broken Windows Theory

The [broken windows theory](https://en.wikipedia.org/wiki/Broken_windows_theory) is a criminological theory that states that visible signs of crime, anti-social behaviour, and civil disorder create an urban environment that encourages further crime and disorder, including serious crimes.
{% endquote %}

This theory, from 1982, suggests that a building with broken windows, a potential indicator of criminal behavior, causes the local residents to not care about their environment and other windows soon become broken. After a while, more windows are broken and ultimately the building becomes so damaged that it becomes abandonded.

We can apply this theory to software development and the teams who build and own applications. Small hacks added to the code can quickly add up over time. Leaving badly named variables or functions can encourage the next developer to do the same. If the previous developer didn't care about the code, why should you? Over the time a software project can quickly incur more and more technical debt. Over time the project quickly becomes a tangled mess and you'll start to see your team wince when asked to work on that application.

## Avoiding rotting software

Want to avoid software going bad? Let's look at fixing some broken windows we find.

Martin Fowler calls it [opportunistic refactoring](https://martinfowler.com/bliki/OpportunisticRefactoring.html). This is when a developer sees code that isn't as clear as it should be and takes the chance to fix it by tidying up variables or refactoring a function. If everyone does this regularly, the team can continue to keep the codebase healthy. This little act of fixing a small piece of code encourages the whole team to care about their code. It avoids a "cut and paste" mentality and builds a consistency in the code.

**By doing this we quickly build a culture of engineering excellence. 🎉**

One practice that I encourage is to avoid large pull requests. These become difficult to review and often get merged with few comments due to their size. If you're writing new code and spot the opportunity to fix one of these broken windows, sometimes it's more useful to note down where the code needs fixing rather than adding it to your current feature work. Instead raise a second pull request to make these changes so that the improvements are isolated from new features. Don't leave it for too long though or that code will start to rot again.

Be pragmatic about fixing all of the issues you find. While there is a huge benefit to refactoring and fixing your broken windows, no software will ever be perfect. You can only work with the best knowledge you have right now. Consistent small changes to make the code better may make a bigger impact in the long run and will help you to balance building new features with fixing the technical debt.

[Robert Baden-Powell](https://en.wikipedia.org/wiki/Robert_Baden-Powell,_1st_Baron_Baden-Powell), the father of scouting, says it nicely:

{% quote false %}
#### The Scouting Rule

“Try and leave the world a little better than you found it”

*- Robert Baden-Powell*
{% endquote %}

I think this is a wonderful rule to live your life by as well as using it to help you to decide when to refactor your software.
