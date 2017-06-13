---
layout: post
title:  "How To Unit Test Asynchronous JavaScript"
subtitle: "Quick tips, tricks and gotchas for testing asynchronous JavaScript with Mocha"
permalink: /how-to-unit-test-asynchronous-javascript-tips-and-tricks/
header-img: images/banners/computer-code.jpg
social-img: images/social/how-to-unit-test-asynchronous-javascript-tips-and-tricks-fb.jpg
thumbnail: /images/thumbnails/social/how-to-unit-test-asynchronous-javascript-tips-and-tricks-fb-thumb.jpg
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

We've got the asynchronous test passing now and it runs nice and quickly. However, imagine that we're calling a service which throws an error and we want to have a test for this. If we don't call the `done` callback function when an error occurs, the test will timeout as `Mocha` doesn't know that it has finished.

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

## Promises

If you've not used Promises in your JavaScript then you really should. They allow you to remove some of the complexity of callback functions, especially when nesting multiple calls. In case you've never used them, a `Promise` is an object which represents the eventual completion or failure of an asychronous operation, and its resulting value. For more information, take a look at Jake Archibald's great article, [JavaScript Promises: an introduction](https://developers.google.com/web/fundamentals/getting-started/primers/promises).

`Mocha` makes using Promises really simple in that its tests allow you to either call the `done` callback function to indicate that the test has finished, as we did above for the callback functions. Alternatively, you can just return a `Promise` and Mocha will wait for the resolution or rejection of the Promise.

### Forgetting to return the Promise

When calling a function that is promise-based, you must remember to return the promise explicitly with a return statement. If you don’t do this, the test will execute as though it is synchronous and will appear to pass, even though you haven’t yet hit the expectation within your `then` function. You won't believe the number of times I have done this and been happy that all of my tests pass when none of the assertions would have ever been executed.

```javascript
it('test will pass but it never checks expectation', () => {
    const givenString = 'finished';
    Promise.resolve(givenString)
        .then((data) => {
            expect(data).to.equal(givenString);
        });
});
```

There are a few ways we can fix this issue, and I'll talk about each of them below.

The easiest fix is to simply remember to return the `Promise` which will inform `Mocha` that it needs to wait for it to resolve or reject.

```javascript
it('should pass because it returns the promise and the expectation is met', () => {
    const givenString = 'finished';
    return Promise.resolve(givenString)
        .then((data) => {
            expect(data).to.equal(givenString);
        });
});
```

Alternatively, you can fix this by calling the `done` callback as we did earlier. In this case we **don't** return the Promise. We simply wait for it to resolve and then call the `done` callback as before.

```javascript
it('should pass because it calls the done callback when Promise has resolved', (done) => {
    const givenString = 'finished';
    Promise.resolve(givenString)
        .then((data) => {
            expect(data).to.equal(givenString);
            done();
        });
});
```

A slightly clearer way involves using `chai-as-promised` which allows you to use the `should.notify(done)` syntax to call the `done` callback when the promise has resolved. This is essentially the same as the above call but with some syntactic sugar.

```javascript
it('should pass because it calls the done callback when Promise has resolved', (done) => {
    const givenString = 'finished';

    // Using chai-as-promised syntax to call "done" callback
    Promise.resolve(givenString)
        .then((data) => {
            expect(data).to.equal(givenString);
        })
        .should.notify(done);
});
```

Personally, I prefer returning the `Promises` from inside the `Mocha` tests as it feels a lot clearer but use one of the other methods if you feel it doesn't suit.

### Promise : rejecting
- Test passes incorrectly because Promise isn't returned
- Failing test because rejected Promise error isn't caught
- Passing test because Promise is returned and rejection is caught
- Passing test because Promise rejection is caught and `done` callback is called
- Passing test because Promise rejection is caught and `done` callback is called using `chai-as-promised` syntax

### Slow tests
- Passing test but is slow due to Promise function in chain taking a long time
- Passing test and much faster as longer function is now stubbed to execute immediately

// Cheat sheet download?

```javascript
it.skip('[FAILING TEST] should fail because it does not catch the rejection when returning the Promise', () => {
    const givenString = 'error';
    return Promise.reject(givenString);
});

it('[PASSING TEST] should pass because it catches the rejection and returns the Promise', () => {
    const givenString = 'error';
    return Promise.reject(givenString)
        .catch((error) => {
            expect(error).to.equal(givenString);
        });
});

it('[PASSING TEST] should pass because it catches the rejection and calls the done callback', (done) => {
    const givenString = 'error';
    Promise.reject(givenString)
        .catch((error) => {
            expect(error).to.equal(givenString);
            done();
        });
});

it('[PASSING TEST] should pass because it catches the rejection and calls the done callback using chai-as-promised syntax', (done) => {
    const givenString = 'error';
    Promise.reject(givenString)
        .catch((error) => {
            expect(error).to.equal(givenString);
        })
        .should.notify(done);
});
```

```javascript
describe('while testing function with internal function which takes some time', () => {
    const moduleUnderTest = {
        longFunction(data) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(data);
                }, 1000);
            });
        }
    };

    it('[BAD TEST] should pass but takes too long (~1000ms) to run', () => {
        const givenString = 'finished';

        return Promise.resolve(givenString)
            .then(data => moduleUnderTest.longFunction(data))
            .then((data) => {
                expect(data).to.equal(givenString);
            });
    });

    describe('when long function is stubbed to execute immediately', () => {
        let stubLongFunction;

        beforeEach(() => {
            stubLongFunction = sinon.stub(moduleUnderTest, 'longFunction');
        });

        afterEach(() => {
            stubLongFunction.restore();
        });

        it('[FIXED TEST] should pass and long function will execute immediately', () => {
            const givenString = 'finished';

            // Stub our long function so it returns immediately
            // with the data we expect it to return
            stubLongFunction.resolves(givenString);

            return Promise.resolve(givenString)
                .then(data => moduleUnderTest.longFunction(data))
                .then((data) => {
                    expect(data).to.equal(givenString);
                });
        });
    });
});
```