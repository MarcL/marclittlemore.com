---
layout: post
title:  "Different types of software tests"
subtitle: "What are the different types of tests we can write for our software?"
permalink: /different-types-of-software-tests/
header-img: images/posts/heart-code.jpg
categories:
    - express
    - javascript
    - development
    - unit-testing
thumbnail: /images/thumbnails/social/different-types-of-software-testing-thumb.jpg
---

{% include testingGuide.html %}

## Understanding types of software testing

One of the first things that I asked everyone on this list was "What is your biggest struggle when it comes to learning about JavaScript testing?" and I got some fantastic replies. If you haven't answered this question and want to then hit reply and I'm here to help and answer your questions.

The two most common issues that people had were:

* Understanding the different types of testing and what they all mean.
* The tools needed to set up a testing environment for JavaScript code.

In today's lesson, you're going to learn more about both of these. I'll help you to understand the differences in testing types and introduce you to some libraries and frameworks you can use to make JavaScript testing really easy. So let's get started.

## What is a test?

This seems like a really simple question right but a lot of people get scared when you mention testing of JavaScript code, or software tests in general. There's a very simple pattern which you can follow which will really simplify how you think about writing a test. It's known as **Arrange, Act and Assert (AAA)** and it's a really common way of writing tests.

Firstly, we need to set up our **pre-conditions** for the function under test. This is your **Arrange** section. Here you will initialise any objects, or data we need for our test. You can also define the output value you expect from your code after it has been executed.

Next, you can **call your code** with the specified inputs for your test. This is your **Act** section. Simply call your code with the given input as though you were calling the code in production.

Lastly, you will **verify your expectations** based upon either the output value, or the code paths executed. This is your **Assert** section. You know what you expect your code to do so you can now check that it happened. If it didn't, then the test has failed and your code (or test) is incorrect.

## Unit tests

Most of the code that you write will need to interact with other code. It'll call another function or class method in some way. We want to split up our code into the smallest **unit** that it makes sense to test. In JavaScript this is normally a function. We then test this small piece of code. This is known as a **unit test**. If your test uses an external service, for example an API request or database call, then it's not a unit test.

A **unit test** should be one of the most basic tests you have. As you only want to test the code in isolation, you might have to stub or mock some external dependencies to define specific scenarios. You'll find that writing unit tests often helps to define the structure and design of your code. If it's difficult to test, it's often a code smell that means you could refactor your code to make it easier to test.

One major factor which defines a **unit test** is its speed. Due to the isolation of the code from its other dependencies, you expect these tests to be really fast. You'll end up writing a lot more unit tests than you will the other test types. A typical unit test suite may have thousands of tests and you'd expect a single test to take less than a second to run.

## Integration tests

While your unit tests aim to be simple and test a single module or function, **integration tests**, as their name suggest, tests how multiple code modules fit together in your application (i.e. how they integrate). In your unit tests, the aim is to isolate the external dependencies but for your integration tests, you can may allow your code to communicate with data sources like your database, or also external APIs.

Integration tests allow you to test the full flow of your application and how multiple code modules interface with each other. The classic gif below shows what could happen if you only have unit tests for your project. Both unit tests appear to pass correctly, but when the code for both is combined, it's actually incorrect.

![Unit vs integration tests](https://gallery.mailchimp.com/72d3502c470827973d3e8dd63/images/3f98393a-27c9-4576-ba70-38a464d2f8ae.gif)

Integration tests are generally slower than your unit tests so you'll often need fewer of them to test complete code paths. You may need additional configuration of external applications, like databases or HTTP requests to external APIs, if they're not mocked out. These types of tests are great for testing higher level logic and data flow through your application.

An example of an **integration test** is to test the full flow of an API on a server. This may involve starting a server which runs your application code, responding to HTTP requests, authorising a client or user, validating query parameters or body data, connecting to a database and additional APIs, converting data to JSON, and finally returning the data.

One thing to consider is that you can still mock external dependencies if you want to. It's often better to have a thin wrapper around an external service which can return fake data in your integration tests. This still allows you to test your complete application flow as an **integration test**, but not talk to a production API or database. A good example would be an application which uses the Twitter API to send tweets. You wouldn't want it to send a tweet every time you ran your test suite!

## Functional / End-to-end tests

**Function tests** are also know as **end-to-end (E2E) tests** and are used to test the complete functionality of your code. They are performed by running the complete application, normally in a browser, without mocking any external dependencies at all. These types of tests are the slowest to run so you'll generally have a lot less of these than integration or unit tests.

An example of a **functional test** is to verify that a user can sign into a website and that the expected dashboard is displayed once they have done so. This would be performed by automating browser interaction to enter the username and password and click on the sign-in button. The test would then verify that the title of the next page is as expected and the user's details are displayed on the page. This is often done by querying the DOM to determine if elements are present. Obviously there are a lot of pre-conditions for this test, such as having a valid username and password combination, and known DOM elements. This means that functional tests are often more brittle and prone to breaking than unit or integration tests. Be wary of relying on user interface data for test expectations as developers or designers often change it!

## Test doubles

When writing tests, there are very few functions or classes that operate in isolation. Most code interacts with other modules in some way. If you want to isolate your function for testing you can use a **test double**. This is the generic term for when you replace a production object for testing purposes with a fake. Think of it like a film where a *stunt double* replaces the actual actor for the dangerous scenes.

There are various kinds of test doubles that you can use in your tests and there will be different uses for each of them. 

* **Dummy** - A dummy object can be used in place of your production object and will match the interface of the thing it replaces. However, you don't care what it does. Think of it as a simple placeholder which you'll need as one of your function parameters.
* **Stub** - A stub is an object or function which responds with a pre-programmed response. It normally only responds to what has been programmed for the test.
* **Spy** - A spy is a function which wraps an object and can record information about how the object is used. This is useful for avoiding altering the behaviour of the function, but still determining how it was interacted with.
* **Mock** - Mocks are fake objects which have fake methods. They also have pre-programmed responses like stubs. However, the main difference to spies and stubs is that they also have pre-programmed expectations. If the mock is not used as expected by your code, the test will fail.
* **Fake** - A fake object is similar to a stub and it will return some expected values. However, it also implements some of the functionality of the object it's replacing. An example would be an in-memory data store which replaces the production database.

## What you'll need for your test environment

During the course we're going to be installing some JavaScript frameworks and libraries in order to help you to write the tests. Here's what you're going to be using:

* https://mochajs.org/[Mocha] - A testing framework which will help you to write quick and easy tests using NodeJS.
* https://www.chaijs.com/[Chai] - An assertion library which will make your test expectations easy to understand.
* https://sinonjs.org/[Sinon] - A library used to create our stub and spy test doubles.

## Watch the video

Although there's no code in today's lesson, I've also recorded a video which summarises what you've learnt. I talk about the different types of tests you might write as a developer and give some information on test doubles and the tools that we're going to use in tomorrow's lesson. You can watch it here:

{% include cards/youTubeEmbed.html id="pMmXJcDLUFA" %}

## Want to learn more?

{% include testingGuide.html %}
