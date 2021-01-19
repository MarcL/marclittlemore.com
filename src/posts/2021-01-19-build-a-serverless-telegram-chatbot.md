---
title:  "Build a serverless Telegram chatbot using Vercel"
permalink: /serverless-telegram-chatbot-vercel/
headerImage: /images/banners/telegram-chatbot.jpg
description: ""
tags:
    - writing
    - essay

# From the independent
#image:
#    source: https://www.independent.co.uk/life-style/gadgets-and-tech/whatsapp-privacy-telegram-world-leaders-b1787218.html
---

## Telegram

- Talk to Botfather

`/newbot`

- Ask for name and username
- Generate authorisation token - keep this safe and don't share

https://core.telegram.org/bots#creating-a-new-bot

```markup
The name of your bot is displayed in contact details and elsewhere.

The Username is a short name, to be used in mentions and t.me links. Usernames are 5-32 characters long and are case insensitive, but may only include Latin characters, numbers, and underscores. Your bot's username must end in 'bot', e.g. 'tetris_bot' or 'TetrisBot'.

The token is a string along the lines of 110201543:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw that is required to authorize the bot and send requests to the Bot API. Keep your token secure and store it safely, it can be used by anyone to control your bot.
```

## Vercel account

- Set it up

## Setting up the chatbot

- Webhooks vs long polling

https://en.wikipedia.org/wiki/Push_technology#Long_polling

```markup
Long polling is itself not a true push; long polling is a variation of the traditional polling technique, but it allows emulating a push mechanism under circumstances where a real push is not possible, such as sites with security policies that require rejection of incoming HTTP/S Requests.

With long polling, the client requests information from the server exactly as in normal polling, but with the expectation the server may not respond immediately. If the server has no new information for the client when the poll is received, instead of sending an empty response, the server holds the request open and waits for response information to become available. Once it does have new information, the server immediately sends an HTTP/S response to the client, completing the open HTTP/S Request. Upon receipt of the server response, the client often immediately issues another server request. In this way the usual response latency (the time between when the information first becomes available at the next client request) otherwise associated with polling clients is eliminated.[13]

For example, BOSH is a popular, long-lived HTTP technique used as a long-polling alternative to a continuous TCP connection when such a connection is difficult or impossible to employ directly (e.g., in a web browser);[14] it is also an underlying technology in the XMPP, which Apple uses for its iCloud push support.
```

Create a directory and change into it:

```bash
mkdir test-bot
cd test-bot
```

Create an initial Node.js project using `npm`:

```bash
npm init -y
```

Install `vercel` as a global dependency:

```bash
npm install -g vercel
```

Login to `vercel` so we can deploy our application

```bash
vercel login
```

Will send you an email. Click on the link to verify.

https://vercel.com/docs/serverless-functions/introduction

Create a serverless function. Expects a JavaScript, Go, Ruby or Python exported function which exists as a file in the `/api` directory.

```bash
mkdir api
```

In your editor of choice create a file called `webhook.js` in the `/api` directory.

```javascript
module.exports = (request, response) => {
    response.json({
    body: request.body,
    query: request.query,
    cookies: request.cookies,
    });
};
```
Let's test the code in our browser to see if it works

```bash
vercel dev
```

Answer the questions (image needed):

In your browser visit: `http://localhost:3000/api/webhook?hello=world` and you should see a similar response:

```json
{
  "query": {
    "hello": "world"
  },
  "cookies": {
    "_ga": "GA1.1.10178417.1582143681",
    "__smToken": "2PgmPwvNz7Ss6Os5nQexTPAl",
    "_gid": "GA1.1.327749069.1610568137",
    "io": "WRSUGikIUBDcMAQ_AAAZ"
  }
}
```

It works.

Telegram will expect a webhook and will send us a POST request when a message is sent. Let's build the message handler.

Install `node-telegram-bot-api` to allow us to easily receive and send messages.

```bash
npm install node-telegram-bot-api
```

Update our code to include the new library.
We don't want to hardcode and expose the authorisation token so let's use an environment variable

```javascript
// https://github.com/yagop/node-telegram-bot-api/issues/319#issuecomment-324963294
// Fixes an error with Promise cancellation
process.env.NTBA_FIX_319 = 'test';

// Require our Telegram helper package
const TelegramBot = require('node-telegram-bot-api');

// Export as an asynchronous function
// We'll wait until we've responded to the user
module.exports = async (request, response) => {
    try {
        // Create our new bot handler with the token
        // that the Botfather gave us
        // Use an environment variable so we don't expose it in our code
        const bot = new TelegramBot(process.env.TELEGRAM_TOKEN);

        // Retrieve the POST request body that gets sent from Telegram
        const { body } = request;

        // Ensure that this is a message being sent
        if (body.message) {
            // Retrieve the ID for this chat
            // and the text that the user sent
            const { chat: { id }, text } = body.message;

            // Create a message to send back
            // We can use Markdown inside this
            const message = `✅ Thanks for your message: *"${text}"*\nHave a great day! 👋🏻`;

            // Send our new message back in Markdown
            await bot.sendMessage(id, message, {parse_mode: 'Markdown'});
        }
    }
    catch(error) {
        // If there was an error sending our message then we 
        // can log it into the Vercel console
        console.error('Error sending message');
        console.log(error.toString());
    }
    
    // Acknowledge the message with Telegram
    // by sending a 200 HTTP status code
    response.send('OK');
};
```

Telegram wants to send us a message to a public URL which has SSL. We can test this locally using `ngrok`:

```bash
npm install --save-dev ngrok
```

Run ngrok and map to port 3000 of localhost
```bash
ngrok http 3000
```

Retrieve the HTTPS URL that ngrok gives you.

Set the development webhook for Telegram to point to our local machine:

```bash
curl -X POST https://api.telegram.org/bot<YOUR-BOT-TOKEN>/setWebhook -H "Content-type: application/json" -d '{"url": "https://your-ngrok-subdomain.ngrok.io/api/webhook"}'
```

You'll receive an `ok` response if this has worked:

```json
{"ok":true,"result":true,"description":"Webhook was set"}
```

Vercel dev again but with our Telegram token

```bash
TELEGRAM_TOKEN=<YOUR-TELEGRAM-TOKEN> vercel dev
```

Send a message to the bot in Telegram. You should receive a message back.

## Deploying to Vercel

Now that your bot is working. Let's deploy it to Vercel.
To deploy it's a simple as typing:

```bash
vercel
```

It will build your project and deploy it to Vercel for hosting as a serverless function.

Add the environment variable for the token.

Go to your dashboard for the deployment
https://vercel.com/marcl/test-bot/settings/environment-variables

Redeploy the app to pick up the environment variable.

Update the Telegram webhook

```bash
curl -X POST https://api.telegram.org/bot<YOUR-BOT-TOKEN>/setWebhook -H "Content-type: application/json" -d '{"url": "https://deploy-name.username.vercel.app/api/webhook"}'
```

