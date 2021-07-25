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

One of the questions people ask when starting their journey into testing their JavaScript code is where to start. What functions should the team test? Do we need to test every function, or should we look at testing the whole API end-to-end? Do we have mock out all of our backend services like databases or cloud storage? 

It can be overwhelming to know where to start.

This paralysis often stops people from adding tests at all.

## Starting to test your code

Testing is often an area that's overlooked when starting to writing code, especially if your team is unfamiliar with the process. You start with with a proof of concept demo project and before you know it, it has become the production code and deployed without any tests.

There's a common misconception that tests are there to find bugs in your code. This is a great side effect, and you can write additional tests to confirm bugs are fixed when you find them, but its not the main reason. The primary goal is to make sure that your code is working as expected and to give you and the whole team confidence in your codebase.

When you write tests, they should be testing one thing: given an input into a function you are checking that you always receive the same output. Tests are there to give you confidence in your code so that you can make changes and ensure that everything still produces the same results as it did before.

Another common worry is that testing will take too much time and effort.

Teams often think it's not worth the time to add tests to your code. It's true that testing takes some upfront thinking about your code, but this often makes your design better. Not being able to test your code well is a ["code smell"](https://en.wikipedia.org/wiki/Code_smell) - something which doesn't feel right and suggests that there are other problems.

While testing your code takes some time and effort, the benefits pay for themselves later when we deploy the code to your production environment. Being able to run all of your tests on your continuous integration server, and confirm the tests all pass, gives you confidence that your end users will see fewer or no issues.

The types of tests you will want to add to your code may differ depending on how much code has already been written.

## Adding tests to an existing codebase

If you've already got an existing project with lots of code, a good approach is to start writing end-to-end tests. These test the functionality that the user will see and don't attempt to mock out any of your dependencies.

For end-to-end tests, you can use a fresh environment that you create to run the tests. This can match your production environment as closely as it can but it's created and intialised when you start running your end-to-end tests. Alternatively, you can initialise your data before your tests run and remove this data at the end of the test cycle. This is often known as the setup and tear-down process in a lot of test frameworks.

Your database could be intialised via fixture files which are loaded from a file and contain the state of your application that you want to test. Your tests can assert that the data changes correctly as you run your test cases. It's good practice to ensure that your tests can run independently. You want to avoid sharing state between tests. You don't want a test to fail because a previous test has run incorrectly.

End-to-end tests are great because they mimic what a real user would do when they use your application. However, they can take longer to run and can take development time to get the data and environment set up correctly.

If you want to start writing some end-to-end tests for your code then take a look at [Cypress](https://www.cypress.io/), [Test Cafe](https://testcafe.io/), or [Codecept](https://codecept.io/). These are all fantastic testing frameworks which will help you to get started.

A good compromise, and a complement to end-to-end tests, are integration tests.

Integration tests can be used to test your code but for these tests you can mock or stub your dependencies with fake data. This means that things like upstream APIs or databases can have mocked data that you control. This allows you to avoid having to depend on parts of your system that you might not easily control. You are able to provide your application with both the happy path, when the code works as expected, and the unhappy paths, when there are errors or upstream APIs don't work as expected.

A good rule of thumb is to mock or stub dependecies which aren't under your control. For example, if you have a database or API that you don't control, you can mock it out to provide fake data.

Integration tests can be harder to get started with as you have to understand how to provide fake data for your systems. You must match the data structure that is returned from your database call or API endpoints and ensure that it is consistent with the real services. How this is done will depend on how your code is architected. A common JavaScript or Node.js pattern is to use mocking libraries such as [Sinon](https://sinonjs.org/), [Proxyquite](https://github.com/thlorenz/proxyquire) or [Jest](https://jestjs.io/) mock functions to provide test doubles for modules. You can also mock HTTP requests with [Nock](https://github.com/nock/nock) and spin up your API locally using [Supertest](https://github.com/visionmedia/supertest).

## How many tests to write

Don't get hung up on your code's test coverage. This is a metric to determine what percentage of your code is covered by tests. The goal is to write tests that are easy to understand and maintain not to test everything. If you're not sure how many tests you need to write, start small and add more as you go.

Start by testing the primary flows of your code and then add more as you continue to add new features. It's more import to get started with small test cases than to have an exhaustive test suite.

Decide on which parts of the flows could fail and how important that would be to the team's applications. If it's important part of your code, then you should write tests for that. For example, if you're developing an e-commerce application, consider testing your code to add and delete items from the shopping cart and ensure that your payment flows work. These would be the key business areas that should rarely fail as you'd lose money if they did.

## Conclusion

It is easier than you think to get started with testing your code. If you're new to the process, it can be a little overwhelming. Don't worry, it's not that hard and you can get started really quickly.

Let me know if you have any questions or comments and I'd be happy to help.

{% callout "info" %}
Want to learn more about testing your JavaScript code but don't know where to start? Get my [FREE 7-day testing course](/javascript-testing-beginners-course/?signup=testing-page) and you'll be a JavaScript testing expert in no time!
{% endcallout %}