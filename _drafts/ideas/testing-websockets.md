---
layout: post
title:  "Testing WebSockets"
subtitle: "Ideas for testing websockets"
permalink: /testing-web-sockets/
header-img: images/posts/teach-kids-to-code.jpg
categories:
    - unit-testing
    - development
---

Hey Marc! :)

I see you are into Node and TDD. Can I ask your opinion?

I've been tasked with choosing a testing framework for a company that had not been unit/feature testing anything up till now.

Their current framework is Node for middleware (WebSocket event routing translates REST/GraphQL/RethinkDB pub/sub services on the backend) with an Angular front end that's being ported to Elm and React where possible.

Their situation is a bit unique because they have tiny little “events” that fire over WebSocket to/from Node when a user does something or a server has a message for a user. They have a server version and a client version they pack into single JS objects they call routers, and fire a method from the router using a strategy pattern, sort of like Meteor, that drives most of the business logic of what the app actually does.

It seems very clean in that it's immediately obvious which business logic is in play, and each strategy can pipe others so it seems like something great can be achieved for testing and I'd like to find them a solution that can take advantage of what they've achieved so far but I'm by no means a testing framework expert.

Some people are pushing for Cucumber.js, others MochaJS. Do you have an opinion or any material you would recommend I read?

And what is your opinion of BDD?

========

Hi Nick,
Nice to hear from you.
That sounds like a really interesting app. I hold my hands up and say I have zero WebSocket experience but I have a lot of testing experience with our apps here at the BBC in the UK.
Our testing stack is as follows:
- mocha - test runner
- sinon - stubs/spies
- chai - expectations
- enzyme - React-friendly testing library - helps to avoid full-render of DOM in a lot of cases and speeds up your tests a lot if you’re testing React code.
That will do 80% of the work with regards to normal testing (e.g. Express/Koa middlewares etc) for their server I think. We use a very promise based architecture as our 3 apps sit as a sort of proxy for some back-end APIs. So to help us out with that we also use:
- sinon-as-promised - stubs for resolving/rejecting promises
- chai-as-promised - promise-friendly expectations

Due to the asynchronous nature of WebSockets, I think that it’ll be pretty easy to use the above stack to do what you want and I think it would be my personal preference. I’m obviously biased by familiarity to it though. :) You could just stub the WebSocket instantiation to return you an object which spies on each of the methods that needs testing (e.g. socket.send etc) and confirm that you’re sending the correct things to the server.

For server -> client communication you could write a dummy function which fakes the events being sent to socket.onmessage which confirms the functionality being done inside the callback. This is just from my brief reading of WebSockets (now added to my “need to learn about” list!) but I think it’ll work.
So all of the above I would use for unit testing the various modules of the app. IMHO mocha has a decent BDD-esque language, which is what we use. If the developers are writing the tests then I’d use that myself.
I’d also add in the following to the testing stack do some integration testing, again we use this for my team at the BBC:
- supertest - HTTP assertions
- nock - HTTP mocking library
Using nock allows us to add test-doubles (dummy) responses for API requests so that our tests don’t hammer the external APIs we use. We have specific responses for all of our user flows.
I’ve not used Cucumber.js but it looks like the Ruby/Java Cucumber that we use. However, these tests are done by the QA team and not the development team. I think these tests are useful for end-to-end testing where nothing is stubbed or mocked. I personally think it comes down to who is writing the tests. BDD is really useful if technical-but-not-developers are writing the tests but you’ll still need more technical people to write the code for the features. Our BDD tests are something like:

Given I am on "sign in" page
And I provide an identifier "<unique_identifier>"
And I provide password "<password>"
When I click "sign in" button
Then I am signed in successfully
And I am returned to “<correct return url>” page
They are perfect for the business analysts to use to determine expected user flow but they are less useful for the developers who have to define what “I am signed in successfully” means. Here I’d add unit testing for “signed-in” means “X, Y and Z cookies are set”, “we called the sign-in API” etc
Is the above helpful to you? Shout if you need any more info.
Also, would it be ok (and useful?) to turn the above into a blog post? I’ve been meaning to blog more about testing as I enjoy it. I can take out anything that you don’t want in it although I’m not sure it’s overly specific.
Cheers,
Marc
