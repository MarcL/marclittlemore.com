---
layout: post
title:  "How to add time and date to your Messenger chatbot using the Chatfuel JSON API"
subtitle: "Can your chatbot tell the time? Let's look at how we can make your chatbot aware of a user's time and date to improve your chatbot flows."
permalink: /how-to-add-time-and-date-to-your-messenger-chatbot-using-the-chatfuel-json-api/
header-img: images/banners/time-and-date.jpg
tags:
    - chatbot
    - chatfuel
    - json
    - post
thumbnail: /images/thumbnails/social/time-and-date.jpg
---

{% include jsonGuide.html %}

## Watch the video

{% include cards/youTubeEmbed.html id="UDrGpc4Dp8w" %}

One of the main benefits of creating a Facebook Messenger chatbot is that you don't have to be present to answer messages for 24 hours per day. Your chatbot should be on hand to do this while you're fast asleep. What would be even better is if it could understand where your user lives and give them relevant content for their time of day. It could let them know whether your shop is open for business. Or it could send your users the breakfast menu rather than the dinner menu because it knows it's 9am where they are. This functionality doesn't exist in Chatfuel by default so let me teach you how to build an API which adds time and date functions to your chatbot.

## Timezones & Coordinated Universal Time

When your users talk to you on Facebook Messenger, they may live anywhere around the world. This means we need to know what the time is where they live. Each user can potential live in a different [time zone](https://en.wikipedia.org/wiki/Time_zone). This means we may need to add or subtract a number of hours to the time where your server is to allow for this time difference. Although you might think that it's always a whole number of hours, there are time zones which have half hours too. But what time is it where your API server is hosted? Well, this depends on where the data centre is that is storing and executing your code. What happens if your server is in New York, which is 5 hours behind [Greenwich Mean Time](https://en.wikipedia.org/wiki/Greenwich_Mean_Time) (GMT), but your user is Germany, which is 1 hour ahead of GMT. And what happens if [daylight saving time](https://en.wikipedia.org/wiki/Daylight_saving_time) has happened in one of those countries? Calculating the time is hard and things can get even more complicated. That's why we have a time standard which everyone uses. It's called [Coordinated Universal Time](https://en.wikipedia.org/wiki/Coordinated_Universal_Time) or UTC. The Wikipedia page will explain why it's not an acronym of CUT! Using UTC allows us to define all times as relative to this standard. If we store all of our times in UTC, life becomes a bit easier.

## Calculating a user's time

I've set up an [example Node.js Express server using Glitch](https://glitch.com/edit/#!/chatfuel-demo-bot?path=routes/timeDate.js:1:0) which exposes an API for all of my Chatfuel demos. The API for this article is available on the following endpoint:

[https://chatfuel-demo-bot.glitch.me/timedate](https://chatfuel-demo-bot.glitch.me/timedate)

The first thing we need to do is to calculate the user's local time using UTC. JavaScript (and Node.js) has a global object called `Date` which expose a set of methods we can use to determine and manipulate the date and time. First, we need to determine the time right now. We can use the `Date.now()` function which will return us the UTC [epoch time](https://en.wikipedia.org/wiki/Unix_time). This is the number of milliseconds since the start of UNIX time (at 00:00 on January 1st, 1970). We can then use this to calculate how many milliseconds difference between the user's timezone and the time now. Using JavaScript's `Date` object, we can then inspect this and pull out the date and time to use in our chatbot. Let's look at some code to do this:

```javascript
// Calculate the number of milliseconds in an hour
// - 1000 milliseconds in a second,
// - 60 seconds in a minute
// - 60 minutes in an hour
const ONE_HOUR_IN_MILLISECONDS = 60 * 60 * 1000;

// Pass in an offset in hours which we use to calculate the user's time
const getUserDateInTimezone = offsetInHours => {
    // Calculate the UNIX timestamp in UTC
    const utcDate = Date.now();
  
    // Get the user's offset in milliseconds
    // The offsetInHours could be a negative number if
    // the user's timezone is behind UTC
    const offsetInMilliseconds = ONE_HOUR_IN_MILLISECONDS * offsetInHours;
  
    // Create a new Date object which adds the time offset to the time now
    return new Date(utcDate + offsetInMilliseconds);
};
```

Once we've written a function to calculate a new `Date` object, we can use the built in functions to inspect the data and return it to our user. As we're using Express to expose an API, we'll use its routing methods to expose a HTTP GET endpoint which allows our Chatfuel chatbot to make a request using the JSON API. We will allow it to pass through a timezone as a query parameter which Facebook Messenger can provide us. We can then set some user attributes which are returned to Chatfuel and can be used in our chatbot flows. Let's look at how we can do this:

```javascript
const express = require('express');
const router = express.Router();

// ... add the time calculation code from above here

router.get('/', (request, response) => {
    // Allow a query parameter called "timezone" to be passed with the GET request
    // Default it to zero if we don't send one
    const {timezone = 0} = request.query;

    // Calculate the user's current Date in UTC using our code from above
    const userDateInTimezone = getUserDateInTimezone(timezone);
  
    // Inspect the Date object and pull out the data we need
    // Build an object which we can return to Chatfuel
    const dateObject = {
        // Get the day
        day: userDateInTimezone.getDate(),
        
        // Note that month is zero-indexed (from 0 for January to 11 for December)
        // For it to make sense for an actual month number, add one to it!
        month: userDateInTimezone.getMonth() + 1,
        
        // Get the full 4-digit year e.g. 2020
        year: userDateInTimezone.getFullYear(),

        // Get the number of hours
        hours: userDateInTimezone.getHours(),

        // Get the number of minutes
        minutes: userDateInTimezone.getMinutes(),

        // Get the number of seconds
        seconds: userDateInTimezone.getSeconds(),

        // Get a standard ISO-8601 formatted string
        isoTime: userDateInTimezone.toISOString()
    };

    // Format the data so that Chatfuel can set user attributes
    const userAttributes = {
        set_attributes: dateObject
    };

    // Return a JSON response that Chatfuel can understand
    response.json(userAttributes);
});

// If we're putting our routes into separate modules for clarity
// then we need to export the routes for use in the Express application
module.exports = router;
```

The last thing you need to do is to use this code in your Chatfuel chatbot. You can use the redirect blocks to check the value of "hours" returned after calling your API. If they are greater than 18, or 6pm, you could consider it to be evening and change the user responses accordingly. In a similar way, you can check if the value is greater than 6, or 6am, and then consider it to be breakfast time. Once you've got the user's time and date, you can give timely responses to your user. Watch [my video](https://www.youtube.com/watch?v=UDrGpc4Dp8w) for more examples.

All of the code is available on my [Chatfuel demo Glitch project](https://glitch.com/~chatfuel-demo-bot). Feel free to clone it and use it for your own APIs. If you spot any errors, or have any questions, then please [send me a message](/contact). I love to hear from people and I'm always happy to answer your questions.

{% include jsonGuide.html %}
