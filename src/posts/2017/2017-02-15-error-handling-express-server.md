---
title:  "Simple Error Handling For Your Production Express Server"
subtitle: "Adding error handling to your Express server doesn't have to be confusing."
permalink: /simple-error-handling-for-your-production-express-server/
headerImage: /images/banners/simple-error-handling-for-your-production-express-server.jpg
tags:
    - development
description: Adding error handling to your Express server doesn't have to be confusing. Follow this simple guide to add production ready error handling to your Node.js Express application.
---

Error handling is a big part of writing code and it's something that every developer should think about. When starting to write code, it's easy to overlook what happens when your code fails. As developers we like to assume we write perfect code. We never do though do we?! If you're writing a customer facing application then you should always try and gracefully catch any errors and return human-friendly error messages to give a better user experience. This is especially true if you have an application which deals with 3rd party APIs or other external dependencies, like a database server. In these cases, you can't guarantee that the services will be available and you should be ready to handle this.

In my current job I write a lot of server-side JavaScript and we have a few [Express](http://expressjs.com/) applications running with Node.js. While checking out Twitter this evening I saw an interesting question from top JavaScript afficianado [Wes Bos](http://wesbos.com/). He asked an interesting question about error handling with Express servers:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Talk to me about your Express error handling strategy. How (not what package) do you handle app errors as well as model validation fails?</p>&mdash; Wes Bos (@wesbos) <a href="https://twitter.com/wesbos/status/831930095967358989">February 15, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Our [applications](https://www.bbc.com/signin) are used by millions of people each day so we have quite robust error handling for our Express servers. Hence this was a question I am qualified to answer. I'll explain our approach to error handling using a simple example with some basic Express middleware functions and error handlers. The code uses ES6 syntax and Promises so if you're not familiar with these, then check out Wes Bos' excellent [ES6 course](https://es6.io/) and read up on [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). I've not shown the code for the service calls as it's not important to know what that code does. What is important is that we ensure that our Express application correctly handles the errors which may occur after we execute the function.

## Setting Up A Simple Express Application

Firstly, we can set up a basic user-facing Express application. It'll expose a few routes for us:

* `/login` - this will display the user login page on a GET request and allow us to POST user credentials to it
* `/user` - this will display the user's data (whatever that may be)

The Express server and routing code could look something like this.

```javascript
function startServer(port = 3000) {
    const app = express();

    // Display the user login page
    app.get('/login',
        showLoginMiddleware
    );

    // Allow the user to submit their credentials
    app.post('/login',
        validateLoginMiddleware,
        showLoginMiddleware
    );

    // Assume that the user is validated before we hit this
    app.get('/user', (request, response) => {
        return response
            .status(200)
            .render('pages/success');
    });

    // Mount 404 handler as penultimate middleware
    app.use(notFoundHandler);

    // Final middleware is our catch-all error handler
    app.use(defaultErrorHandler);

    return app.listen(port, () => {
        logger.info(`Server started on port ${port}`);
    });
}
```

You can see that I've added two error handlers and these are simple Express middleware functions. The first is `notFoundHandler`. This will handle any requests which are application isn't set up to handle, for example if somebody hits a URL which we haven't defined. The second is `defaultErrorHandler`. This is the most important middleware as it allows us to catch any application errors that we aren't sure what to do with. I'll explain how these are implemented shortly.

## Handling Known Errors

The first question Wes asked was what error handling pattern should be used by an Express server in order to handle known developer errors, such as model validation failure or documented API failures. In the server setup above, we declared a GET and POST route for our `/login` URL so let's define some middleware functions for them.

The first is for the GET request and it simply renders our login page. We can assume that this is a Jade or Pug template which renders a form allowing the user to enter their username and password.

```javascript
function showLoginMiddleware(request, response) {
    response.render('pages/login');
}
```

The next middleware is used by our POST route and retrieves the `username` and `password` properties from our request body. We then pass these to our authentication service which validates that we have a user we know about. Notice that it's promise based so we can nicely catch our errors but you can achieve the same with a callback if you're more familiar with them. If our `authenticateUser` service succeeds, then we simple redirect the application to our `/user` endpoint.

If the user's credentials are not valid then we know that our service throws a `InvalidCredentialsError` typed `Error`. This is because we either wrote the service or we know this from 3rd party API documentation. This typed error contains a `message` property which we can show to the user so it's now a simple case of remembering the error for use in our re-rendered page. In my example, I'm using the `response.locals` object to assign an error property which gets used in the subsequent page re-render. I call `next()` in order to call the next middleware and this just uses `showLoginMiddleware` again which renders the same login page but shows the error message if it exists.

```javascript
function validateLoginMiddleware(request, response, next) {
    const {username, password} = request.body;

    // Authenticate the user credentials with our service
    return authenticateUser(username, password)
        .then(() => {
            // User credentials were correct
            response.redirect('/user');
        })
        .catch(InvalidCredentialsError, (loginError) => {
            // User credentials were incorrect
            // Set an error message
            response.locals.error = loginError.message;

            // Re-render the same page where we display our error message
            next();
        })
        .catch((unknownError) => {
            // Woah! Something bad happened but we don't know what
            next(unknownError);
        });
}
```

**Note:** I'm using [Bluebird's typed promise catch method](http://bluebirdjs.com/docs/api/catch.html) in the above example.

Using a Promise returned from our authentication service also allows us to add a final `catch` function to our middleware. *But why do we need to add this final catch block?* Well our authentication service needs to determine if our user credentials are correct so it could do this by checking with a 3rd party API, such as an OAuth service, or it could be using a database query. What happens if either of these resources is unavailable? They may have heavy load. They might just fail due to unexpected server downtime. Either of these could cause a request timeout or an unknown response. Our `catch` block can now handle this more gracefully by passing the error on to the generic Express error handling middleware.

## Handling Unexpected Application Errors

Express allows us to define middleware functions which have access to the request, response and next middleware in the applications request-response cycle. It also gives us the ability to define a default middleware for our error handler. This makes it simple for us to handle two different general error conditions: an error handler for when we don't match any of our routes (i.e. a 404 handler) and a default error handler for all other Express errors.

To use a 404 error middleware, we just use the same `(request, response, next)` middleware function signature but **we need to ensure it is the last normal middleware in the application**. This means that it'll match any route that we don't already handle with the previous middleware. In the example below, I create a `notFound` middleware which displays a "page not found" template. I also add a logger warning. It may not be an error as such but if you're logging events in your application, and you should be in some form, then it's useful to see what resource the user is attempting to access.

```javascript
function notFoundHandler(request, response) {
    logger.warn(
        'Unhandled resource',
        {
            statusCode: 404,
            error: 'Unknown resource',
            resource: request.originalUrl
        }
    );

    return response
        .status(404)
        .render('pages/notFound');
}
```

Finally, we have the special Express middleware which allows us to handle errors. In my user authentication middleware above, called `validateLoginMiddleware`, you'll notice that I catch any unknown errors and then call the `next` middleware but also pass an error to it i.e. `next(uknownError)`. By calling the next middleware with an error parameter, it allows Express to bypass all of the other middleware functions for the current route and instead calls our special error middleware. In the example below, we log the error and also return a 500 error and specific error page. In this we can warn the user that we're having some problems without letting our application crash. This greatly improves our users experience even if there's nothing we can do about the error itself.

**IMPORTANT:** The Express error middleware has a specific signature with the parameters `(error, request, response, next)`. If you're using a linter such as ESLint, it will complain that you have an unused parameter in `next` if you don't call it. **If you remove it then the middleware will no longer be called via `next(error)` as it no longer matches.** Ensure that you add an ignore rule for your linter but don't remove the unused parameter. I learnt this the hard way by fixing the lint warning and wondered why the error middleware wasn't called! You must also register this error handling middleware **as the last middleware in the application**.

```javascript
// eslint-disable-next-line no-unused-vars
function defaultErrorHandler(error, request, response, next) {
    logger.error('Uncaught error', {statusCode: 500, error});

    return response
        .status(500)
        .render('pages/error');
}
```

## Conclusion

Hopefully this has given you a useful insight how to properly use Express middleware for your error handling. In short, make sure you do the following:

* add a standard middleware for any routes which you don't handle specifically - assign this to the Express application **as the penultimate route** and it will act as your 404 error handler
* add an Express error middleware with the additional error parameter as your default error - assign this to the Express application **as the last middleware after all other middleware functions have been registered** and it will act as your default error handler
* attempt to catch any other model or service errors by using `Promise.catch` functions or `try/catch` blocks to gracefully handle known errors.
