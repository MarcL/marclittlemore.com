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

All developers set out with best laid plans to keep applications simple. We separate the concerns of the code with nice APIs and interfaces. We abstract our business logic away from our domain services. It's as simple as we can make it but over time, all software will rot and incur [technical debt](/refactoring-code-broken-windows-theory/). 

Code complexity is not always just driven by the software engineers working on the code. There are plenty of reasons why it's not only a technical issue. Sofware isn't useful until it provides business value and is in front of users. There are often time constraints and deadlines so new features are added to the application in a short time frame. If external teams integrate with your services, there are often requirements from stakeholders which are agreed and add complexity. Software is written with the best knowledge you have at the time of writing it. Architecture changes over time as new requirements appear and the whole application changes based on the needs of a product team, the user experience (UX) team, and the developers working on it. Over time the engineering team may change and steer the architecture in different directions. As a software developer you'll always be learning and discover new patterns which make more sense.


Over time, all software will rot and incur [technical debt](/refactoring-code-broken-windows-theory/). There's no getting around this so we have to put plans in place to make it easier.

Some of the above are justified

## How do we reduce complexity?

https://twitter.com/KentBeck/status/250733358307500032

{% quote %}
What Kent was referring to, was that for a piece of software to be easily changed you needed to simplify its design in such a way for it to be able to facilitate a future requirement.
{% endquote %}

Simplicity is not easy.

- Eliminate redundancy
- Clarity in naming - Human readable - make it read like English

{% quote %}
**"There are only two hard things in Computer Science: cache invalidation and naming things."** - [Phil Karlton](https://www.karlton.org/2017/12/naming-things-hard/)
{% endquote %}

People underestimate how important it is to properly name things. Whether it be a new open-source library, a class, a function, a variable - it doesn't matter what it is - there is a potential to cause confusion and in some cases real problems if named badly.

Either way, you need to not underestimate the problems and confusion that can be caused by a badly named object/class/thing. Be vigilant, and if you're unsure then discuss it with your team. But be warned, this isn't always a quick or obvious process.

https://github.com/kettanaito/naming-cheatsheet

- Easily testable
- Separation of concerns
- DRY - but within reason
- YAGNI
- Optimise features for simplicity
- Avoid edge cases
- Reduce your dependencies

No silver bullet

Allow time for design.
Allow time for good coding practices.
Allow time for refactoring.
