---
title:  "Getting Started With JavaScript Testing"
permalink: /javascript-testing/getting-started-with-javascript-testing/
headerImage: /images/banners/getting-started-with-javascript-testing.jpg
description: It's easy to be overwhelmed when you start writing tests for your JavaScript code. You want to test everything but don't know where to start. Here are some ideas for what to focus on first.
tags:
    - javascript-testing
image:
    source: https://unsplash.com/photos/m_HRfLhgABo
    creator: Christopher Gower
    url: https://unsplash.com/@cgower
---

## Intro


> I think the most difficult part in writing test cases is to figure out which function/code I want to cover under test cases. I am currently working as a developer in a startup and we do not want to invest a large portion of our time in writing test cases and so we want to write test cases for most important APIs/features only. Now the question is should i write test case for each and every helper function for that API, or should I write test case for a complete end to end API. I think the second option would involve too much mocking as code is in backend service and it is interacting with databases, s3, and with other microservices etc. So it would be great if you can suggest this.

One of the questions people ask when starting their journey into testing their JavaScript code is where to start. What functions should the team test? Do we need to test every function, or should we look at testing the whole API end-to-end? It can be overwhelming to know where to start. This paralysis often stops people from adding tests at all.

## Starting to test your code

Testing is often an area that's overlooked when writing code. You start with with a proof of concept demo project and before you know it, it's become the production code and you haven't written any tests.

There's also a common misconception that tests are there to find bugs in your code. Testing actually means to test that given an input into a function, you always receive the same output. Tests are there to give you confidence in your code so that you can make changes and ensure that everything still produces the same results as it used to.

Another common worry is that testing will take too much time and effort. Teams often think it's not worth the time to add tests to your code. It's true that testing takes some upfront thinking about your code, but this often makes your design better. The benefits pay for themselves later when we deploy the code to your production environment, you run all of your tests and they pass, and your users see fewer or no issues.

The types of tests you will want to add to your code may differ depending on how much code has already been written.

## Adding tests to an existing codebase

If you've already got an existing project with lots of code, a good approach is to start writing end-to-end tests. These test the functionality that the user will see and don't attempt to mock out any of your dependencies.

For end-to-end tests, you can use a fresh environment that you create to run the tests. This can match your production environment as closely as it can but it's created and intialised when you start running your end-to-end tests. Alternatively, you can have some way to initialise your data before your tests run and remove this data at the end of the test cycle. This is often known as setup and tear-down in a lot of test frameworks.

Your database could be intialised via fixture files which contain the state of your application that you want to test. Your tests can then assert that the data changes as you run your test cases. It's good to ensure that your tests can run independently. You want to avoid sharing state between tests if possible. You don't want a test to fail because a previous test has run incorrectly.

End-to-end tests are great because they mimic what a real user would do when they use your application. However, they can take longer to run and can take development time to get the data and environment set up correctly. A good complement to end-to-end tests are integration tests.

If you want to start writing some end-to-end tests for your code then take a look at [Cypress](https://www.cypress.io/), [Test Cafe](https://testcafe.io/), or [Codecept](https://codecept.io/). These are all fantastic testing frameworks which will help you to get started.

Integration tests can be used to test your code but for these tests you can mock or stub your dependencies with fake data. This means that things like upstream APIs or databases can have mocked data that you control. This allows you to avoid having to depend on parts of your system that you might not easily control. You are able to provide your application with both the happy path, when the code works as expected, and the unhappy paths, when there are errors or upstream APIs don't work as expected.

Integration tests can be harder to get started with as you have to start understanding how to provide fake data for your systems. This will depend on how your code is architected. A common JavaScript or Node.js pattern is to use mocking libraries such as [Sinon](https://sinonjs.org/), [Proxyquite](https://github.com/thlorenz/proxyquire) or [Jest](https://jestjs.io/) mock functions to provide test doubles for modules. 

## How many tests to write

Don't get hung up on code coverage
Start testing your primary flows
Want could fail and how important is it to the company?

### III: Where to get started with testing JavaScript

There are a lot of libraries that make it easy to write tests for JavaScript. Some of the most popular libraries are:

Jasmine - The official testing library for JavaScript.

Mocha - A popular library for testing in JavaScript. It is used by a lot of popular libraries including React and Node.js.

Chai - A library for TDD in JavaScript.

Jest - A popular library for testing in JavaScript. It is used by a lot of popular libraries including React and Node.js.

Aurelia - Similar to the Aurelia framework.

Although there are a lot of options, the most popular library for testing in JavaScript is Jasmine. I recommend using Jasmine to get started with testing in JavaScript.



It is possible to do unit testing in plain JavaScript, but it is not very convenient. Still, it can be done.



To get started with unit testing in plain JavaScript, read this article:

## How much coverage

## What to mock

## Common pitfalls

## Conclusion

Testing is a useful practice that helps us ensure that our software works as expected. It is important to remember that testing is not only about finding bugs but also about making sure that our code behaves as expected.



In this post, I have tried to give a short introduction to the concept of testing and what it means. I have also outlined the advantages of testing. After that, I have explained how to write tests for JavaScript.
