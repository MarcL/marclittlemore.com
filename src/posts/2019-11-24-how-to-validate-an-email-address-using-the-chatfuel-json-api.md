---
title:  "How to validate an email adress using the Chatfuel JSON API"
subtitle: "When asking your chatbot user for an email address, how do you know if it's valid? Let's look at how you can validate an email address using the Chatfuel JSON API and a Node.js web server."
permalink: /how-to-validate-an-email-address-using-the-chatfuel-json-api/
headerImage: /images/banners/gmail-interface.jpg
tags:
    - chatbot
    - chatfuel
    - json
description: "When asking your chatbot user for an email address, how do you know if it's valid? Let's look at how you can validate an email address using the Chatfuel JSON API and a Node.js web server."
socialImage: /images/social/how-to-validate-an-email-address-using-the-chatfuel-json-api.jpg
thumbnail: /images/thumbnails/social/how-to-validate-an-email-address-using-the-chatfuel-json-api.jpg
---

Facebook Messenger chatbots are a great addition to your marketing toolbox but they have one big problem.

_Facebook controls the platform and can change its rules when it wants to._

Their [recent changes to their broadcast and subscription messaging rules](https://developers.facebook.com/docs/messenger-platform/policy/policy-overview/#current_policy) means it's more difficult to contact users after 24 hours if they're not engaging with your bot. While stopping people from abusing Messenger messages is the right thing, how to you keep your user's engaged?

I always recommend that you should consider Facebook Messenger as one of your marketing channels but you always need a multi-channel marketing approach. That's why it's useful to ask your chatbot users for their email address and add them to an email list in your Email Service Provider (ESP) like [Mailchimp](https://mailchimp.com/) or [ConvertKit](https://convertkit.com/). Messenger allows you to ask for an email address using one of its quick replies but if the email isn't available, or the user chooses to type it in, how do we make sure we've got valid data?

## Validating an email using Chatfuel

Let's take a look at how we can validate a given user email using Chatfuel as our chatbot platform. Chatfuel allows you to ask for a user's email using it's "Save User Email" element. Adding this to your chatbot flow allows you to send a quick reply to your and ask for an email address which is then stored in a Chatfuel user attribute. If you pass this to your server side API using the JSON API plugin, you can't validate it on the server to determine if it's valid.

## Watch The Video

Take a look at how I build this email validation using [Glitch](https://glitch.com) and a Node.js Express web server together with Chatfuel's JSON API.

{% include cards/youTubeEmbed.html, youTubeId: "r4h4DD1DNE8" %}

### How to validate an email address?

#### Using a regular expression

Validating email addresses correctly can be tricky. One way is to use something called a [regular expression](https://en.wikipedia.org/wiki/Regular_expression). This is a sequence of characters that define a search pattern that you attempt to match against. You'll find hundreds of different email regular expressions on the internet which give you various queries to validate against. However, they often come with caveats that they make a trade-off between speed and accuracy. You can use one of these to match the given email address with a specific pattern but you may incorrectly accept or reject some email addresses. The official regular expression which matches all email addresses is [ridiculously big](http://www.ex-parrot.com/~pdw/Mail-RFC822-Address.html). I can't imagine attempting to debug this if it doesn't work as expected in your programming language. While a regular expression will confirm if your email matches a specific pattern, we can't confirm whether we can send an email to it.

#### Send the user an email

A nicer way is to determine if you can [send an email to the given email address](https://medium.com/hackernoon/the-100-correct-way-to-validate-email-addresses-7c4818f24643). This works really well for verifying an email address when signing up for an online service, but it's not that easy when you need to validate an email in a chatbot flow. Flows in Messenger or WhatsApp can't wait for your user to check their email and click on a link.

#### Checking the MX record

However, we can do something better by checking that the email has a valid domain to send email to. If we find a domain name in the given email address, we can check the DNS (Domain Name Server) records for the domain. These records can tell us the IP address on which the domain is hosted. They can also be used to see if email can be sent to the domain. For this we can check if the domain has an MX (Mail eXchange) record. If it does, we can send email to it.

#### Writing an API service to check for a valid email domain

Checking for an MX record does take some time so first we can verify that the email address has the format of an email address. For this you can check for the presence of an @ symbol. If it exists then the user has at least attempted to give us something which is similar to an email address! If you retrieve the rest of the string after the @ symbol, this represents the domain name. In my video below, I use Node.js and the standard [dns library](https://nodejs.org/docs/latest/api/dns.html) to determine if an MX record exists for that domain. If it does, then you should be able to send email to that address and we can consider it valid.

Here's some example code to retrieve an email address and validate it.

```javascript
const dns = require('dns');

// The dns library will return:
// ENOTFOUND - if no records exist at all for the domain
// ENODATA - if no MX record was found for the domain,
// or if the user data was invalid
const hasMxRecordError = error => (
    error && (error.code === 'ENOTFOUND' || error.code === 'ENODATA')
);

// A promise-based method to determine if the
// MX record exists for the given email
const checkValidMxRecord = email => (
    new Promise((resolve, reject) => {
        // Determine if email is in the correct format
        const isEmail = email.includes('@');
        if (!isEmail) {
            return reject(
                new Error('Invalid email address does not contain @ symbol')
            );
        }

        // Split the email address and destructure to find the domain
        // TODO: You could also validate the username if you wanted to
        const [username, domain] = email.split('@');

        // Read the DNS records and see if an MX record exists for the domain
        return dns.resolveMx(domain, (error, addresses) => {
            // Check if any errors occurred
            if (hasMxRecordError(error)) {
                return reject(new Error('Email has invalid MX record'));
            }
    
            // You may not need the records but we can return them in case
            return resolve(addresses);
        });
    }));
```

To make my APIs more robust, I always return user attributes back to Chatfuel to inform it whether an API has succeeded or not. This allows us to avoid hard coding any messages in the API and gives back control to Chatfuel, or whichever chatbot platform you use, and use that to display the correct user messaging. It's a good way to inform the user that they've potentially typed in their email incorrectly. You can also use this validation check to gate your content to only allow access to people who supply their email address.

Of course, this method has a flaw in that we can't confirm that the username is valid without sending an email to it. We'll find this out when we send an email to them from our mailing list but at least we got halfway there.

I hope you found this useful. All of the code is available on my [Chatfuel demo Glitch project](https://glitch.com/~chatfuel-demo-bot). Feel free to clone it and use it for your own APIs. If you spot any errors, or have any questions, then please [send me a message](/contact). I love to hear from people and I'm always happy to answer your questions.

{% callout "info" %}
Want to learn more about JSON? Want to learn about the magic of JSON without being a developer? Get my [FREE JSON guide](/bots/sign-up-bot-building-for-beginners/) and you'll have JSON skills in no time!
{% endcallout %}