---
title:  "How To Unit Test Express Routes"
subtitle: "Unit testing of Express routes is often tricky but it can be done. Here's how to do it and why you probably should."
permalink: /how-to-unit-test-express-routes/
headerImage: images/banners/unit-testing-express-routes.jpg
social-img: images/social/how-to-unit-test-express-routes.jpg
thumbnail: /images/thumbnails/social/how-to-unit-test-express-routes-thumb.jpg
tags:
    - unit-testing
    - development
description: How to unit test Express routes and some reasons why you should do it.
---

I was swiping through my Twitter timeline the other night when I saw a really interesting tweet from [Kent C Dodds](https://kentcdodds.com/), a great JavaScript developer who works at PayPal, and someone you should really follow on Twitter if you don't already. He asked the following question.


<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">[POLL]: Is it reasonable to *unit* test express routes? Or is it better to do an *integration* test of your server (with supertest for ex.)?</p>&mdash; Kent C. Dodds (@kentcdodds) <a href="https://twitter.com/kentcdodds/status/794251165844185088">November 3, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

I thought the poll posed an interesting question as to whether you should test Express routes or not. As I'm quite an evangelist of test driven development at the BBC, and I like a challenge and love writing code, I thought I'd have a think about it. I like to aim for as much test coverage as possible but I'm pragmatic enough to understand that 100% code coverage doesn't necessarily mean you're always testing the right things.

> "Yes, you should unit test Express routes"

My answer to the poll was "Yes, you should unit test Express routes", which I appreciate goes against the majority who said unit tests weren't reasonable. At the minimum, I think that you should **definitely** test Express routes with some solid integration testing. In our team, we use [supertest](https://github.com/visionmedia/supertest) for our HTTP expectations and also [nock](https://github.com/node-nock/nock) to mock responses from API calls and it works really well for testing full flows on Express routes. I'll be honest and say that we don't currently have full unit testing for the Express routes on the three main Node.js projects that our team work on, but having thought about it, I think there are some reasons why we probably should consider it.

## Reasons you should unit test Express routes

### Better code coverage
Firstly, it should give you better code coverage. Having 100% code coverage should never be the end goal of your testing efforts, but writing the best tests to assert your expectations of what your code should be doing is. I feel that aiming towards full coverage of your code means that you have complete confidence in it at the unit level, and you can reason that your modules should perform the functions you expect them to.

### Explicit expectations of middleware used

Next, I think it helps that you're being explicit in the middleware you think you are calling for each route. It's always a good idea to split your middleware out into separate modules as this makes unit testing of each middleware much clearer by reading the test asserts and it makes writing the code much simpler. By subsequently adding tests for each route, you can also then assert that you're calling the right middleware. A good example of this would be to verify that you're adding your authentication layer to the expected routes. You want to know that you need to authenticate your user before they can see your administration, or per-user, routes and this is simple to do with an expectation that the authentication middleware is called on those specific routes.

### Security best practices
Lastly, I've recently taken up the role as security champion of our team and have been working with [Dinis Cruz](http://blog.diniscruz.com/), a developer and application security expert, to ensure that our applications are more secure and adhere to [OWASP](https://www.owasp.org/index.php/Main_Page) best practices. One of Dinis' suggestions is to write tests which assert the security expectations of your application. In this case, writing tests which assert that the specified routes apply your security middleware feel like an ideal use case for writing unit tests for Express routes in addition to your integration testing. In doing so it gives you much better confidence that you're writing secure code and that those specified routes are protected.

## How to write Express route unit tests

So it's easy to say that we should unit test Express routes, but how do you do it in practice? As Kent said in his later tweets, there don't seem to be any good examples of how to do it so I've written a basic Express application and some corresponding tests in this [project on GitHub](https://github.com/MarcL/unit-test-express-routes) which show you a good way to set these tests up. We'll be using [mocha](https://mochajs.org/), [chai](http://chaijs.com/), [sinon](http://sinonjs.org), [sinon-chai](https://github.com/domenic/sinon-chai) (for some syntactic sugar) and [proxyquire](https://github.com/thlorenz/proxyquire).

Install the project as follows:

``` bash
git clone git@github.com:MarcL/unit-test-express-routes.git
cd unit-test-express-routes
npm install
```

Now you should see a basic Express application in the `src/launch.js` module and the corresponding tests in the `test/launch.test.js` module. The application starts an Express server on port 7080 and exposes three example routes: `/`, `/login` and `/dashboard`. These are meant to mimic a homepage, a login page and a dashboard page which is only exposed after authentication.

``` js
import express from 'express';

import homepage from './middleware/homepage';
import login from './middleware/login';
import authenticate from './middleware/authenticate';
import dashboard from './middleware/dashboard';

function setupRoutes(app) {
    app.get('/', homepage);
    app.get('/login', login);
    app.get('/dashboard',
        authenticate,
        dashboard
    );
}

function start(port = 7080) {
    const app = express();

    setupRoutes(app);

    const server = app.listen(port, () => {
        console.log(`Server running on: ${port}`);
    });

    return server;
}

export {
    start
};
```

You can see from the code above, there are four example middlewares which have been split into their own modules. Splitting up your middleware like this is always a good idea as it allows you to separate the unit tests for the middeware from the route code. This makes the code much simpler and easy to read and allows you to write clean and understandable tests.

> Splitting up your middleware like this is always a good idea as it allows you to separate the unit tests for the middeware from the route code.

We need to set up our tests so that we can stub the Express application that is created and then we can return a fake server that we can use in our test expectations. As each test needs this fake server to be initialised, I chose to do this using Mocha's `beforeEach` pre-condition block. As we don't need to return anything when we perform an `app.get` to set up our routes which respond to the GET request, we can use `sinon` spy. However, we want to return a fake HTTP server for the `app.listen` call, so we make this a `sinon` stub. We can then set up a fake Express server which is return via a `sinon` stub.

``` js
beforeEach(() => {
    // Initialise our spy and stub
    spyExpressGet = sinon.spy();
    stubExpressListen = sinon.stub();

    // Create fake express application with our spy and stub methods
    fakeExpress = {
        get: spyExpressGet,
        listen: stubExpressListen
    };

    // Return our fake express application when express() is called
    stubExpress = sinon.stub().returns(fakeExpress);

    ...
});
```

Next, we can set up a fake HTTP server which is what we'd expect `app.listen` to return. We do this so we can compare it in our test which checks that the app is listening as we expect.

``` js
// We never use the fake HTTP server but we want to compare it
const fakeHttpServer = {};

// app.listen returns a fake HttpServer
stubExpressListen.returns(fakeHttpServer);
```

It's easy to spy on each of the middlewares used for our routes by creating `sinon` spies. We don't need to test any of these middlewares here, so we don't need to use a stub. You should test each middleware separately from this route code.

``` js
spyHomepage = sinon.spy();
spyLogin = sinon.spy();
spyAuthenticate = sinon.spy();
spyDashboard = sinon.spy();
```

We now use `proxyquire` to override the module dependencies. This will allow us to inject our fake Express server and to spy on all of the middleware. All of these spies and stubs will be used in our test expectations. The `proxyquire` initialisation looks complex, but we're simply stubbing the call to `app.express` so that it returns our `stubExpress` and making sure that the calls to `import` or `require` the middleware modules in the real code will now be using our spies.

``` js
// Use proxyquire to stub required modules and return
// our spies so we can check assertions
server = proxyquire('../../src/launch', {
    express: stubExpress,
    './middleware/homepage' : {default: spyHomepage},
    './middleware/login': {default: spyLogin},
    './middleware/authenticate': {default: spyAuthenticate},
    './middleware/dashboard': {default: spyDashboard}
});
```

The hard part has now been done as we've set up our server before each test. We can now inspect the routes and make expectations on them  so let's take a look at our tests for that.

## Express route tests

### Assertion that our server is listening
First, we can write tests to check that our server is returning the expected HTTP server and runs on either the default port or a port we pass when initialising. We have stubbed `app.listen` to return a fake HTTP server so we can check that our call to `server.start()` returns it correctly. We can also confirm that it is called with either the default port of 7080, or another port that we pass through to the function call. The expectations are simple and readable so our fellow developers know exactly what the code should do. Note, for simplicity I'm using the general `sinon.match.func` matcher to match *any* function for the second parameter to `app.listen`.

``` js
    it('should return expected http server', () => {
        const returnedServer = server.start();
        expect(returnedServer).to.eql(fakeHttpServer);
    });

    it('should listen on default port 7080', () => {
        server.start();
        stubExpressListen.should.have.been.calledWithExactly(7080, sinon.match.func)
    });

    it('should listen on expected port if passed', () => {
        const expectedPort = 8888;
        server.start(expectedPort);
        stubExpressListen.should.have.been.calledWithExactly(expectedPort, sinon.match.func)
    });
```

We can then check each route using our `spyExpressGet` which spies on `app.get` for our routes. This is a simple case of confirming that each call sets the expected route string and the corresponding middleware(s).

``` js
it('should setup default route', () => {
    server.start();
    spyExpressGet.should.have.been.calledWithExactly('/', spyHomepage);
});

it('should setup login route', () => {
    server.start();
    spyExpressGet.should.have.been.calledWithExactly('/login', spyLogin);
});

it('should setup dashboard route', () => {
    server.start();
    spyExpressGet.should.have.been.calledWithExactly(
        '/dashboard',
        spyAuthenticate,
        spyDashboard
    );
});
```

We use sinon's `calledWithExactly`, albeit using the syntactic sugar of `sinon-chai`, to assert that we're setting the exact middleware for each route. This now gives us complete confidence that each route is only using the middleware that it should.

Notice that I've only stubbed the GET requests in my example project. If you wanted to validate the other routes which use other HTTP verbs then you should create a spy or stub for it and pass it into the fake Express application `fakeExpress`. You can then assert your expectations that `app.post`, `app.put` or `app.delete` are called with the expected route string and middleware.

## tl;dr

Hopefully this was an easy-to-read explanation of how to create unit tests for Express routes. In case there is too much text to read above, my opinion is that, yes, I think you can easily unit test your Express routes and you probably should. You should do the following if you're planning to do so:

* Use `proxyquire` to override dependencies so that you can stub/spy your express application and middleware functions
* Use `sinon` to stub your middleware, which you should have already extracted to their own modules
* Use these stubs to assert your expectations that the Express application routes use the correct middleware
* These tests are an additional layer of confidence and are especially useful for security concerns
* You should **always** have additional integration tests which test the full flow of the routes

If you've got any questions, need any clarification or have any comments on this then please [contact me](/contact) or tweet at me.
