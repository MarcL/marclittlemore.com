---
title:  "How To Write High Quality Unit Tests"
subtitle: "Make writing unit tests easy by following some simple ideas for better test quality."
permalink: /how-to-write-high-quality-unit-tests/
headerImage: /images/banners/qualities-of-good-unit-tests.jpg
tags:
    - javascript-testing
description: How do you ensure that you're writing high quality unit tests? Here you'll learn how to write good quality unit tests with some ideas that you can use in your everyday testing.
---

One of the often asked questions about unit testing is "how do I ensure I'm writing good quality unit tests?" It's easy to start of down the path of [writing unit tests](/talks/7-tips-for-writing-great-unit-tests/) for your code but you need to make sure you're writing dependable tests which are easy to maintain. In this article, I talk about the defining characteristics of solid unit testing and how to ensure that the quality is high.

## What is a unit?

The first questions to ask is "what is a unit?" when talking about writing your unit tests. There are differing definitions of what a unit actually is, but it's often defined as "the smallest component that it makes sense to test". For object-oriented programming, this could be a whole class or an interface but, as with a functional programming approach, it could also be a single method or function. To test the unit you simply have to define your expectations of what it does, given any of the specified inputs. That's it! If you're the developer in charge of writing the code then the test defines what you know **will happen**. If you didn't write the code under test, you can write your tests based upon your expectations of what you think **should happen**. If either of these things change then you want your tests to fail. Your unit tests then define a solid contract with your code.

## What are good qualities of unit tests?

Your unit tests should be the first line of defence for your project. As your tests are so important to your code quality, you should always attempt to write high quality unit tests. But what does that actually mean? Let's find out by looking at some of the features of good quality tests.

## Human readable and understandable test names

![Human readable test names](/images/posts/human-readable-test-names.png){: title="Human readable test names" alt="Human readable test names"}

As silly as this may sound, you should spend some time ensuring that your test names make sense. This means that they should show the developer reading them exactly what the code under test does. The tests should be written for you and your team and not for a computer. Make sure that they're easy to read and make sense as a sentence. An example could be *"should add a new user to the database"* or *"should call the authentication API with the expected user credentials"*.

An advantage of writing good test names is that you should be able to scan through each test module and see what the feature requirements for the code. This suite of tests should then be treated as living documentation for your project. If your code's functionality changes then update your test names accordingly.

## Isolation of dependencies

![Stub unit test dependencies](/images/posts/stub-unit-test-dependencies.jpg){: title="Stub unit test dependencies" alt="Stub unit test dependencies"}

One of the most important feature of a unit test is that it's isolated from any other external influences. This ensures that you're only testing the code that you've written and aren't dependent on the state of other modules. In order to do this you should write [test doubles](http://martinfowler.com/bliki/TestDouble.html) to replace your production dependencies for testing purposes. These generally take the form of a stub or mock object which returns the data you specify in order to fulfil your test expectation.

Some examples of things that you should make sure that you isolate are:

* **Calls to services** - these could be external 3rd party API calls, for example the Twitter API, or simply function calls to your own services.
* **Serialisation calls** - avoid actually serialising your data to real data stores by stubbing these function calls or mocking them with fake objects.
* **State** - ensure that any state of the system under test has pre-conditions which are initialised by you in your test setup. This could involve stubbing your configuration, initialising structures or objects with expected data or again mocking or stubbing external code dependencies.

## Provide just one reason to fail

A unit test should only have one reason to fail so you should always avoid putting multiple expectations into one test. You want to know exactly why a test fails and you'll just make it harder if your test contains more than one assertion. By keeping it simple, and using only one test expectation, it allows you to quickly see **why** a test has failed. This will mean that you write more tests but it makes the code much easier to reason about. You'll also find that it guides you to write tests to cover more of your code.

## Make them speedy

![Make Unit Tests Fast](/images/posts/make-unit-tests-fast.png){: title="Make unit tests fast" alt="Make unit tests fast"}

Your unit tests should execute as quickly as possibly. Each test should have a small scope and should have all of its dependencies stubbed. By avoiding executing production code, such as that which serialises data to a database or uses 3rd party API calls, you can ensure that the whole of your unit test suite runs in a matter of seconds. This gives the team the confidence to run the tests often and will result in much better code quality. You can see from the image above that in one of our projects we run 2193 tests in 18 seconds, approximately 122 tests per second. This total includes integration tests as well as unit tests but is still fast enough for us to include those in every test run.

## Independent of environment

Your unit tests should always be independent of environment. This means that the tests suite passes all of the tests on your machine, your colleagues' machine and any continuous build server. You definitely want to avoid the "it works on my machine" problem.

Ensure that the unit tests execute the same on all environments by correctly stubbing or mocking any dependencies and setting any state or external data. Also make sure that there is no dependency on other tests. Each test should run in isolation and should not need the result of a previous test in order to execute correctly. In the same vein, make sure that a test doesn't have any side effects, for example adding data to a database. You need identical data inputs and state each time the test suite runs. If the tests don't have consistency, and tests begin to fail, your team will lose faith in unit testing and they will quickly be ignored.

## Tests unit completely

While some tests are better than none, the best quality unit tests ensure that all of the code paths are covered. This is often done in combination with test-driven development practices which mean you never write any code without a corresponding test. Even if you write your tests after you've written your code, you should try and test every route through your code.

Another good practice is to attempt to cover all edge cases for your code if possible. You'll find that you sometimes forget some obscure inputs, or maybe receive input data that you didn't expect, but try and determine the full requirements of your code and write your tests accordingly. Even if you don't, it's still incredibly satisfying to find a new bug, add an edge case test for it that fails as you expect, and then to fix it while still ensuring that all of your previous tests still pass.

## Ultimately, make unit testing easy

![Make unit testing easy](/images/posts/make-unit-testing-easy.jpg){: title="Make unit testing easy" alt="Make unit testing easy"}

You should always aim to make your unit tests easy. They should be easy to run, either from a simple terminal command or from your task runner or dependency manager. They should be easy to maintain such that refactoring the internals of your code should result in little work to update your tests as your test expectations will still be met.

## Simple questions to ask for each unit test

The best way to write high quality unit tests is to write the test with these questions in mind:

1. What are you testing?
2. What should the code you're testing do?
3. What is the actual output of the code under test?
4. What is the expected output of the code under test?

If you answer all of those questions, you'll find you quickly have a higher quality unit test suite with high code coverage and you and your team can have much better confidence when deploying to your production environment.

If you spot any errors or have and questions then please [contact me](/contact/).