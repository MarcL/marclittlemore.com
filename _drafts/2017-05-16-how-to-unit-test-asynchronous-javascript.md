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


## Asynchronous function callbacks

### Remember to call your `done` callback

When calling a function that is asynchronous, remember to call the callback function to inform the test runner that the test has finished. With Mocha this can be performed be explicitly calling the `done` callback function after the test expectation.

```javascript
it('should timeout because the done callback is not called', (done) => {
    setTimeout(() => {
        expect(true).to.be.true;
    }, 1000);
});
```

We can fix this simply by calling the `done` callback function but it's still not quite right. It'll take as long as the asynchronous function takes to run, which isn't ideal for a unit test.

```javascript
it('should pass but takes too long (~1000ms) to run', (done) => {
    setTimeout(() => {
        expect(true).to.be.true;
        done();
    }, 1000);
});
```

### Remember to stub your asynchronous function for immediate execution

The above test passed but if you run it, you'll notice that the test takes as much time as the timeout. Obvious really as we're waiting for a timeout to finish and call it's callback before we tell `Mocha` that we're finished. By default `Mocha` has a test timeout of 2000ms. If your test takes longer than this, it will be seen to have failed. Using the real timeout may be ok for integration testing, and we could increase the `Mocha` timeout if necessary. However, for unit testing, we'd like things to be quicker. Instead we can stub the timeout using `Mocha` fake timers. We can improve the test above by initialising a JavaScript timer and then "ticking" it by 1000 milliseconds, the length of time after which our callback will be called. By doing this we've simulated what would happen in real life and we can check our expectation immediately.

```javascript
describe('better asynchronous test that stubs timer', () => {
    let fakeClock;

    beforeEach(() => {
        fakeClock = sinon.useFakeTimers();
    });

    afterEach(() => {
        fakeClock.restore();
    });

    it('should stub clock to allow quick resolution of asynchronous function', (done) => {
        setTimeout(() => {
            expect(true).to.be.true;
            done();
        }, 1000);

        // Simulate the timer incrementing by 1 second
        // then the callback above will be called
        fakeClock.tick(1000);
    });
});
```

### Remember to handle your error conditions

We've got the asynchronous test passing now and it runs nice and quickly. However, imagine that we're calling a service which throws an error and we want to have a test for this. If we don't call the `dpne` callback function when an error occurs, the test will timeout as `Mocha` doesn't know that it has finished.

```javascript
it('should timeout because the done callback is not called when function has errors', (done) => {
    setTimeout(() => {
        throw new Error('Something has gone wrong');

        expect(true).to.be.true;
    }, 10);
});
```

In this case, it's a simple case of catching the error and calling `done` to tell `Mocha` that we've finished with the test as expected.

```javascript
it('should call the done callback when error occurs', (done) => {
    setTimeout(() => {
        try {
            throw new Error('Something has gone wrong');

        } catch(error) {
            // Catch the error and then call "done"
            expect(true).to.be.true;
            done();
        }
    }, 10);
});
```

* Remember to call the done callback function with any failure conditions too or your test will timeout if it fails.


* When calling a function that is promise-based, remember to return the promise explicitly with a return statement. If you don’t do this, the test will execute as thought it is synchronous and will appear to pass because you haven’t yet hit the expectation within your then function.

* For unit testing, ensure you fake or stub any function which will take a long time to execute. With JavaScript testing you can use sinon to fake timers and you can also stub promises, or yield to callbacks to quickly return the mocked data.

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
