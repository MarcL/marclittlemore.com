---
layout: post
title:  "What Are The Qualities of Good Unit Tests?"
permalink: /what-are-the-qualities-of-good-unit-tests/
header-img: images/banners/qualities-of-good-unit-tests.jpg
categories:
    - unit-testing
    - development
enableComments: true
description: What are the qualities of good unit tests? We discuss some best practices of writing solid unit tests which you should use in your everyday testing.
---

One of the often asked questions about unit testing is "how do I ensure I'm writing good quality unit tests?" It's easy to start of down the path of writing unit tests for your code but you need to make sure you're writing dependable tests which are easy to maintain. In this article, I talk about the defining characteristics of solid unit tests and how to ensure that the quality is high.

### What is a unit?

One of the first questions asked when beginning to write unit tests is "what is a unit?" There are often differing definitions of what a unit actually is but it's often defined as "the smallest component that it makes sense to test". For object-oriented programming, this could be a whole class or an interface but, as with a functional programming approach, it could also be a single method or function. To test the unit you have to define your expectations of what the unit does, given any inputs you give it. If you're the developer in charge of writing the code then the test defines what you know **will happen**. If you didn't write the code under test, you can write your tests based upon your expectations of what **should happen**. If either of these things change then you want your tests to fail. Your unit tests then define a solid contract with your code.

### What are good qualities of unit tests?

Ensure best quality - FINISH THIS BIT!

### Human readable and understandable test names

As silly as this may sound, you should spend some time ensuring that your test names are of a high quality. This means that they should show the developers exactly what the code under test does. The tests are for you and your team and not for a computer. Make sure they're easy to read and make sense as an English, or whatever language you speak, sentence. An example could be *"should add a new user to the database"* or *"should call the authentication API with the expected user credentials"*.

An advantage of writing good test names is that you should be able to scan through each test module and tell what the code under test will actually do. This suite of tests should then be treated as living documentation for your project. If your code's functionality changes then update your test names accordingly.

### Isolation of dependencies

One of the most important feature of a unit test is that it's isolated from any other external influences. This ensures that you're only testing the code that you're written and aren't dependent on other modules. In order to do this you should write [test doubles](http://martinfowler.com/bliki/TestDouble.html) to replace your production object for testing purposes. These generally take the form of a stub or mock object which returns the data you specify in order to fulfil your test expectation.

Things that you should ensure that you isolate are:

* **Calls to services** - these could be external 3rd party API calls, for example the Twitter API, or simply function calls to your own services.
* **Serialisation calls** - avoid actually serialising your data to real data stores by stubbing these function calls or mocking them with fake objects.
* **State** - ensure that any state of the system under test has pre-conditions which are initialised in your tests. This could involve stubbing your configuration, initialising structures or objects with expected data or again mocking or stubbing external code.

### Provide just one reason to fail

A unit test should only have one reason to fail. Avoid putting multiple expectations into one test. You want to know exactly why the test fails and you shouldn't have to determine which of the expectations has failed. By keeping it simple, it allows you to quickly see **why** a test has failed. This will mean that you write more tests but it makes the code much easier to reason about.

### Make them speedy

Your unit tests should execute as quickly as possibly. Each test should have a small scope and should have all of its dependencies stubbed. By avoiding executing production code, such as that which serialises data to a database or uses 3rd party API calls, you can ensure that the whole of your unit test suite runs in a matter of seconds. This gives the team the confidence to run the tests often and will result in much better code quality.

### Independent of environment

Your unit tests should always be independent of environment. This means that the tests pass on your tests as well as on your colleagues machine and any continuous build server. You definitely want to avoid the "it works on my machine" syndrome!

Ensure that the unit tests execute the same on all environments by correctly stubbing or mocking any depdencies. Make sure that there are no dependencies on external data by setting pre-programmed expectations with mocks or stubs. Also ensure that there are no dependency on other tests. Each test should run in isolation and should need the result of a previous test in order to execute correctly. In the same vein, make sure that a test doesn't have any side effects, for example adding data to a database. You need identical data inputs each time the test suite runs. If the tests don't have consistency, and tests begin to fail, your team will lose faith in unit testing and they will quickly be ignored.

### Tests unit completely

While some tests are better than none, the best quality unit tests ensure that all of the code paths are covered. This is often done in combination with test-driven development practices which mean you never write any code without a corresponding test. Even if you write your tests after you've written your code, you should try and test every route through your code. The other thing to do is to attempt to cover all edge cases for your code if you can. This can sometimes become more difficult to ensure that every crazy edge case you haven't thought of is tested. However, it's incredibly satisfying to find a new bug, add a test for it that fails as you expect, and then to fix it to pass the edge case test and ensure that all of your previous tests still pass.

### Ultimately, make unit testing easy

You should always aim to make your unit tests easy. They should be easy to run, either from a simple terminal command or from your task runner or dependency manager. They should be easy to maintain such that refactoring the internals of your code should result in little work to update your tests as your test expectations will still be met.

### Simple questions to ask for each unit test

The best way to write high quality unit tests is to write the test with these questions in mind:

1. What are you testing?
2. What should the code you're testing do?
3. What is the actual output of the code under test?
4. What is the expected output of the code under test?

If you answer all of those questions, you'll find you quickly have a higher quality unit test suite with high code coverage and you and your team can have much better confidence when deploying to your production environment.

If you spot any errors or have and questions then please comment below.