---
layout: post
title:  "Unit Testing JavaScript Promises In Express Middleware"
subtitle: "Unit testing JavaScript Promises is much easier than you think."
permalink: /unit-testing-javascript-promises-in-a-node-js-express-middleware/
header-img: images/banners/unit-testing-javascript-promises-in-a-node-js-express-middleware.jpg
social-img: images/posts/unit-testing-javascript-promises-in-a-node-js-express-middleware.jpg
categories:
    - express
    - javascript
    - development
    - unit-testing
description: Unit testing JavaScript Promises is much easier than you think.
---

**Unit testing of code within the resolved or rejected Promise is actually quite easy although initially it may seem tricky to do.**

Using Promises within an Express server middleware is quite a common task. For example, you may call your own services to serialise your data to a database, or you might be using a 3rd party API such as Twitter in order to retrieve data.  Either of these should be an asynchronous task and so using a Promise is the ideal way to eventually receive your response or to handle an error.

I use mocha (https://mochajs.org/) as my test runner as it supports asynchronous tests without any additional packages. There are two ways that you can finish an asynchronous tests - either call the *done* callback or by simply returning a promise:

```javascript
it('should finish an asynchronous test with a callback', (done) => {
	done();
});

it('should finish an asynchronous test with a Promise', () => {
	return codeWhichReturnsAPromise();
});
```

I’m assuming that the code you want to test is some middleware which acts upon a Promise which could *resolve* or *reject*. Setting up an example for Express would be something like this:

```javascript
// Example wrapper which acts like an external API call
// which returns a Promise which resolves or rejects
function promiseWrapper(shouldFail) {
    return shouldFail ?
        Promise.reject() :
        Promise.resolve();
}

function promiseTestMiddleware(request, response) {
	// Pass a query parameter which causes this
	// Promise to fail if it is true
    const {fail: shouldFail = false} = request.query;

    return promiseWrapper(shouldFail)
        .then(() => {
			// If we get here then it's a success
            response.json({
                message: 'resolved Promise',
                error: false
            });
        })
        .catch(() => {
			// If we get here then it's an error
            response.json({
                message: 'rejected Promise',
                error: true
            });
        });
}
```

**IMPORTANT:** Notice that the middleware *returns a Promise*. If you don’t return a Promise from the middeware then you can’t wait for it to *resolve* or *reject*.

```javascript
// Your Express application setup
const app = express();

app.get('/promises', promiseTestMiddleware);

const server = app.listen(port, () => {
	console.log(`Server running on: ${port}`);
});
```

Now that the application is set up, how do we test that the JSON response is rendered as expected? I normally use node-http-mocks (https://github.com/howardabrams/node-mocks-http) to create a fake request and fake response which can be passed to the middleware without having to create an actual server. We want to do this so we can keep our test as a **unit test** rather than an **integration test**. I also use sinon (http://sinonjs.org/) to stub the *response.**json* function so we can verify what was passed to it using chai (http://chaijs.com/) for my expectations.
So setting up your tests look something like this:

```javascript
describe('promiseTest middleware', () => {
    let fakeRequest;
    let fakeResponse;
    let stubResponseJson;

    beforeEach(() => {
        fakeRequest = createRequest();
        fakeResponse = createResponse();

        stubResponseJson = sinon.stub(fakeResponse, 'json');
    });

    afterEach(() => {
        stubResponseJson.restore();
    });

    it('should render expected json when Promise resolves', () => {
        const expectedJson = {
            message: 'resolved Promise',
            error: false
        };

        return promiseTest(fakeRequest, fakeResponse)
            .then(() => {
				// Wait until the promise resolves until
				// checking your expectation
                expect(stubResponseJson)
                    .to.have.been.calledWithExactly(expectedJson);
            });
    });

    it('should render expected json when Promise rejects', () => {
        fakeRequest.query.fail = true;
        const expectedJson = {
            message: 'rejected Promise',
            error: true
        };

        return promiseTest(fakeRequest, fakeResponse)
            .then(() => {
				// Wait until the promise resolves until
				// checking your expectation
                expect(stubResponseJson)
                    .to.have.been.calledWithExactly(expectedJson);
            });
    });
});
```

chai-as-promised

Notice that you have to return a Promise from inside the test **and** you need to wait until the Promise has resolved, i.e. after the **then()** function has been called, until you can check your expectation.

https://github.com/MarcL/js-unit-testing-framework