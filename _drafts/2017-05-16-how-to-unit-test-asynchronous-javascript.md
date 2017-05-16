---
layout: post
title:  "How To Unit Test Asynchronous JavaScript"
subtitle: "Quick tips, tricks and gotchas for testing asynchronous JavaScript with Mocha"
permalink: /how-to-unit-test-asynchronous-javascript-tips-and-tricks/
header-img: images/banners/computer-code.jpg
social-img: images/social/how-to-unit-test-asynchronous-javascript-tips-and-tricks-fb.jpg
categories:
    - unit-testing
    - development
enableComments: true
description: "Unit testing asynchronous JavaScript isn't as challenging as you think it might be. Here are some quick tips, tricks and gotchas for easy testing of asynchronous functions and Promises using Mocha."
---

This is a great question as there are definitely some gotchas for asynchronous unit testing. I test a lot of JavaScript / Node.js code and we’ve definitely been bitten a couple of times by asynchronous functions appearing to pass tests when in fact, the code has yet to be executed.
I use [Mocha](https://mochajs.org/) which nicely handles asynchronous tests in JavaScript, so the answers are somewhat skewed to that, but they do apply to any test runner framework which expects a response to tell it that the test has finished. Here are some things to consider:


## Remember to call your `done` callback

```javascript
// INCORRECT TEST
it('should pass but does not hit the expectation', () => {
    const givenString = 'finished';
    Promise.resolve(givenString)
        .then((data) => {
            expect(data).to.equal(givenString);
        });
})
```

* When calling a function that is asynchronous, remember to call the callback function to inform the test runner that the test has finished. With Mocha this can be done be explicitly calling the done callback function after the test expectation.


* Remember to call the done callback function with any failure conditions too or your test will timeout if it fails.


* When calling a function that is promise-based, remember to return the promise explicitly with a return statement. If you don’t do this, the test will execute as thought it is synchronous and will appear to pass because you haven’t yet hit the expectation within your then function.

* For unit testing, ensure you fake or stub any function which will take a long time to execute. With JavaScript testing you can use sinon to fake timers and you can also stub promises, or yield to callbacks to quickly return the mocked data.

## Asynchronous function
- Timeout because `done` callback isn't called when function succeeds
- Passing test but slow because timer isn't stubbed
- Passing test and fast because timer is stubbed
- Timeout because `done` callback isn't called when function throws an error
- Passing test to call `done` callback when function throws an error

## Promise : resolving
- Test passes incorrectly because Promise isn't returned
- Passing test because promise is returned
- Passing test because `done` callback is called after resolution
- Passing test because `done` callback is called after resolution using `chai-as-promised` syntax

## Promise : rejecting
- Test passes incorrectly because Promise isn't returned
- Failing test because rejected Promise error isn't caught
- Passing test because Promise is returned and rejection is caught
- Passing test because Promise rejection is caught and `done` callback is called
- Passing test because Promise rejection is caught and `done` callback is called using `chai-as-promised` syntax

## Slow tests
- Passing test but is slow due to Promise function in chain taking a long time
- Passing test and much faster as longer function is now stubbed to execute immediately
