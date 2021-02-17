---
title:  "Build simple software"
permalink: /build-simple-software/
headerImage: /images/banners/build-simple-software.jpg
description: "Writing software is hard. It's inherently complex. How do we make it simpler?"
tags:
    - writing
    - essay
image:
    source: https://unsplash.com/photos/l090uFWoPaI
    creator: John Barkiple
    url: https://unsplash.com/@barkiple
---

Nobody sets to build complex software.

All developers set out with best laid plans to keep applications simple. We separate the concerns of the code with nice APIs and interfaces. We abstract our business logic away from our domain services. It's as simple as we can make it but over time the code gets more complex. But why?


There are times when developers over-engineer a problem. We add [Gang of four](https://en.wikipedia.org/wiki/Design_Patterns) design patterns to the code because we care about separations of concern but often these layers of factories on top of facades on top of proxies make our code much more difficult to read. Code complexity is not always driven by the software engineers working on the code. There are plenty of reasons why it's not only a technical issue.

Sofware isn't useful until it provides business value and is in front of users. There are often time constraints and deadlines so new features are added to the application in a short time frame. If external teams integrate with your services, there are often requirements from yet more stakeholders. Software is written with the best knowledge you have at the time of writing it. Software architecture changes over time as new requirements appear. The requirements of the application are based on the needs of a product team, the user experience (UX) team, and the developers working on it. Over time the engineering team may change and steer the architecture in different directions. As a software developer you'll always be learning and discover new patterns which make more sense. Ultimately, all software will rot and incur [technical debt](/refactoring-code-broken-windows-theory/). There's no getting around this so we have to put plans in place to make it easier.

So what can we as software developers do?

## How do we reduce software complexity?

[Ross](https://twitter.com/rossalexwilson), the principal engineer on my team at the BBC, loves this quote from well known software engineer [Kent Beck](https://en.wikipedia.org/wiki/Kent_Beck) and I think this is applicable in software design.

https://twitter.com/KentBeck/status/250733358307500032

In this instance, Kent was referring to refactoring your code but it also applies to the design of your software. You simplify the design of your code such that you can lay simpler foundations for future requirements.

Simplicity in code is not necessarily easy to achieve but there are some ways we can help to point us in the right direction.

## Make it human readable

It's easy to write more code than you need to and overcomplicate your software. Try to eliminate unnecessary code where possible but not to the point of losing readibility. As developers we often spend more time reading code than writing it, especially if it's not a new project. Optimise for making this easy.

{% quote %}
**There are only two hard things in Computer Science: cache invalidation and naming things.** - [Phil Karlton](https://www.karlton.org/2017/12/naming-things-hard/)
{% endquote %}

People underestimate how important it is to clearly name your variables and functions. If you can read the code like you're reading it set of instructions, it means you've done a good job. If there's a potential to cause confusion in what the code does, consider simplifying the names. If you agree on naming conventions with your team, this makes life simpler.

## Easily testable

If you follow the concept of [test-driven development](https://en.wikipedia.org/wiki/Test-driven_development) (TDD) then you will be writing your tests before your code. This naturally leads you to only writing the code you need to pass the tests. Even if you're not following strict TDD and writing your tests afterwards, if you find that the code is difficult to test, then you've perhaps you need to simplify the code to make this easier.

## Separation of concerns

You should look at removing complexity by separating your code modules into their areas of concern. For example, if you're writing an API service, move your business logic away from your HTTP transport layer. You don't want to mix database calls and HTTP JSON responses together. Think about how you can isolate your code into only the areas that it should be concerned about. It simplifies the application and will also make testing easier.

## Don't repeat yourself - but within reason

The ["don't repeat yourself" (DRY)](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) software principal is the idea that looks to reduce the repetition of code. If you start to repeat the same block of code multiple times, then look to abstract it out into its own function or class. However, be wary or [premature optimisation](https://en.wikipedia.org/wiki/Program_optimization). You might find that the two pieces of code actually have different business reasons for existing. You don't want to refactor into a single function which ends up with branching business logic inside it. My rule of thumb for DRY is to see if the code is used a 3rd time. Once that's the case, I'll usually refactor it to a shared function.

## Reduce your dependencies

It's really easy to search the JavaScript [npm](https://npmjs.com) registry, or the equivalent registry for other programming languages, to add some open-source code to your project. Be mindful of additional dependencies you're adding to your software by doing so. While some of the packages might be useful, it adds a layer of complexity in code that you and your team haven't written. Try not to import packages just because you can and only use them when you need to.
## Avoid developing for edge cases

During tight deadlines, it's often easy to fix issues by adding special cases into your functions. Code which branches based upon state passed into the function, or even worse, based on global state. It's a slippery slope if you start adding these edge cases to your code. It's much harder to determine what a function does once there are more branches of logic to follow. Attempt to keep your code [functional](https://en.wikipedia.org/wiki/Functional_programming) and avoid the need for global state.

As an example, about 20 years ago, I was involved in writing a AAA videogame. Right before mastering the finished DVD, we discovered issues with the final boss battle that I had developed the AI for. The main character had a move which was too powerful and would kill the final foe with one hit. This hadn't been thought of from the start so I was asked to add a line of code which removed the special move for this level only. So I had to add an additional `if` statement to check the global level state and remove the special move for this level only. This was in the main characters input code. 🤦🏻‍♂️

Don't do this!
## Conclusion

There's no silver bullet for writing simple code. You have to think about your architecture before hitting the keyboard. Make time to build a good foundation for your application architecture. Allow the team to think about good coding practices and don't try and cut corners. Make sure you build in contingency for refactoring tech debt as the requirements change.

And remember to [Keep It Simple Stupid](https://en.wikipedia.org/wiki/KISS_principle)!
## Useful resources

- A great [naming cheatsheet](https://github.com/kettanaito/naming-cheatsheet) on how to get better at naming variables and functions in your code