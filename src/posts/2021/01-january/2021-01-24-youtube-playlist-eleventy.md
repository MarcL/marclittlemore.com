---
title:  "Add YouTube playlists to your Eleventy site"
permalink: /add-youtube-playlists-to-eleventy-site/
headerImage: /images/banners/youtube-playlist-eleventy.png
description: "Want to add a YouTube playlist to your Eleventy website? Read on to find out how."
tags:
    - writing
---

Over the past couple of years I've been moving my personal websites from using WordPress to simple static HTML sites. WordPress is fantastic but I spent too much time being concerned about security risks, updating to new versions, and worrying about managing PHP versions on a server. These are things I didn't want to have to concern myself with so I wanted to use a [static site generator](https://www.netlify.com/blog/2020/04/14/what-is-a-static-site-generator-and-3-ways-to-find-the-best-one/) to build plain HTML, CSS, and a little bit of client-side JavaScript where necessary. I discovered [Eleventy](https://www.11ty.dev/) back in early 2020 and this has quickly become my tool of choice.

My [chatbots](/bots/) page has a list of YouTube videos on it. Initially this was a static list of YouTube video IDs that I iterated over to generate the markup. I realised that using Eleventy's great data flow, I could automate this using the YouTube API. This means that I only need to regenerate the site when I add new videos to the playlist and I don't have to cut and paste a YouTube video ID into a markdown file each time. This makes things much simpler.

Let's look at how to do this using Eleventy's data files.

## Obtaining YouTube API credentials

I'm assuming that you have a [Google account](https://www.google.com/accounts/NewAccount). Without this you can't access the developer console to register an application or generate a new API key for the YouTube API.

Sign into your account and head to the [Google Developers Console](https://console.developers.google.com/). Create a new project for your website, or use an existing project if you have one.

You must [obtain authorisation credentials](https://developers.google.com/youtube/registering_an_application) in order to generate an API key. Open the [credentials page](https://console.developers.google.com/apis/credentials) in the Google console and click "Create credentials" to create a new API key.

![API key](/images/posts/google-api-key.jpg)

After creating the key you must enable the YouTube Data API (v3) for this API key. Go to the [developer console here](https://console.developers.google.com/apis/library) and enable it. Ensure that you save your API key somewhere safe so we can use it to access the YouTube API later.

{% callout %}
The playlist we will attempt to read is public and so we can use an API key to retrieve this data. If you require a user's private data, such as a private YouTube playlist, then you need to use an [OAuth 2.0](https://developers.google.com/identity/protocols/oauth2) token with your request.
{% endcallout %}

## Add your API key locally

API keys should always be kept safe. If you expose it publicly then others can use it to make requests against your Google account. To avoid this, we're going to store the API key as an [environment variable](https://en.wikipedia.org/wiki/Environment_variable). We can then use this in our YouTube playlist fetcher without exposing the key to anyone.

In Node.js, a great way to expose environment variables to your application is using the [dotenv](https://www.npmjs.com/package/dotenv) `npm` package. This allows us to create a `.env` file which contains all of our secret keys.

Install `dotenv` as a development dependency for your Eleventy project:

```bash
npm install -D dotenv
```

You should attempt to require `dotenv` as early as you can in your JavaScript project. For Eleventy, this means you can add to the top of your `.eleventy.js` coniguration file.

```js
require('dotenv').config();

// The rest of your Eleventy configuration goes below
module.exports = (eleventyConfig) => {
    // Your Eleventy plugins and so on
};
```

Create a `.env` file in the root of your project and add in your YouTube API key.

```ruby
# Add your secret API key
YOUTUBE_API_KEY=my-secret-youtube-api-key
```

When your Eleventy build is executed, you'll have access to the API key using the Node process environment variables like this:

```js
const myApiKey = process.env.YOUTUBE_API_KEY;
```

We can now use this exposed API key inside our data files to read a YouTube playlist.

{% callout "warning" %}
Make sure you add the `.env` file to your `.gitignore` file so that you don't accidentally add secret keys to your git repository.
{% endcallout %}

## Eleventy data files

One of the super powers of Eleventy is that it allows you to retrieve data in multiple ways. This can be data in your markdown frontmatter, data in a layout directory, template data, data directories, and [more](https://www.11ty.dev/docs/data/).

I often use static global data as JSON files in my `_data` directory but you can also use [JavaScript files](https://www.11ty.dev/docs/data-js/) to generate it programatically. Using this method, we export a single function which gets called by Eleventy as it builds are site. One of the great features of using this method is that we can use asynchronous functions to retrieve data from external sources. Let's look at how we can use this to load a public playlist using the YouTube API.

Install the Google APIs Node.js package as a development dependency. We'll use this to call the YouTube API without having to write our own HTTP requests and authentication.

```bash
npm install -D googleapis
```

Create a file in your `_data` directory called `youTubeVideos.js`. The name of the file will match the name of the global object available to your Eleventy build.

We'll require the Google APIs package and create a YouTube client to use to retrieve the data we want from the YouTube API. It can be used for any public API call and not just for playlists.

```js
// Require the Google API package
const {google} = require('googleapis');

// Create a YouTube service
const youTubeClient = google.youtube({
    // Use the v3 API
    version: 'v3',

    // Don't hardcode your API key
    // Read it from an environment variable
    auth: process.env.YOUTUBE_API_KEY
});
```

Now that we have the YouTube client, let's create a function which retrieves the data we want from our playlist. We can then expose it to Eleventy using `module.exports`. We will use the YouTube client we created earlier to calll the YouTube [playlistItems endpoint](https://developers.google.com/youtube/v3/docs/playlistItems/list) and list all of the videos for a specified playlist. The API expects you to tell it what fields you want to retrieve. For this example we'll retrieve the `id` and the `snippets` (title, description, position, resourceId).

```js
// Note that we're exposing an asynchronous function
// Eleventy will wait for this to finish before exposing the data
// to the rest of our code
module.exports = async () => {
    try {
        // Call the YouTube API using the client we created earlier
        const response = await youTubeClient.playlistItems.list({
            // Pass your own public playlist ID here
            playlistId: 'your-public-playlist-id',

            // Tell it what data you want to retrieve
            part: 'id,snippet',

            // Maximum results you require from 0 to 50
            maxResults: 50
        });

        // Return an array of video items
        return response.data.items;
    }
    catch(error) {
        // Log any errors so we can see them
        console.log(error.toString());

        // Allow the build to work but without video data
        return [];
    }
};
```

If the API call is successful then we'll be given the playlist data in `response.data`. This will contain an array of `items` which we'll return to Eleventy. Notice that I've added error checking to the code. If there's an error then we can log it out so we'll see it on our command line. I also return an empty array so that our Eleventy build won't just stop due to an error referencing `null` data.

In the example, I'm only attempting to read the first 50 videos in the playlist. This is the maximum you can retrieve in 1 call. The response will return you a `nextPageToken` if more results are available. In that case, you can call the API again and pass a `page: nextPageToken` key-value pair in the options passed to the API. Keep repeating this process to retrieve all of the results until you no longer receive a `nextPageToken` which means you've received all results.

{% callout %}
Note that the YouTube API has a quota of 10,000 units per day and each operation has a different cost associated with it, depending on what operation you're doing it. For most uses, this is more than enough but [read more here](https://developers.google.com/youtube/v3/getting-started#quota) in case you think you might have a high volume use case.
{% endcallout %}

## Using the data in your template

Now that we've retrieved the data, how do we use it?

As we named the data file `youTubeVideos.js`, we now have a global variable called `youTubeVideos` which matches the name of the data file. This variable is exposed to our templates so we can iterate over the data in it to render each YouTube video link from the playlist.

Here's an example using a [Liquid](https://www.11ty.dev/docs/languages/liquid/) template.

{% raw %}
```html
{% for video in youTubeVideos %}
<article>
    <a href="https://www.youtube.com/watch?v={{video.snippet.resourceId.videoId}}" target="_blank" rel="noreferrer">
        <img src="{{video.snippet.thumbnails.high.url}}" alt="{{video.snippet.title}}" />
        <dl>
            <dt>Title</dt>
            <dd>{{video.snippet.title}}</dd>
        </dl>
    </a>
</article>
{% endfor %}
```
{% endraw %}

Take a look at the [chatbots](/bots/) page to see it in action.

## Deployment to your environment

Now that we've generated the YouTube playlist as a data file and used it in our local build, we mustn't forget to add the `YOUTUBE_API_KEY` environment variable to our production environment. I use [Netlify](https://www.netlify.com/) for my production builds and you add this easily using their [site settings](https://docs.netlify.com/configure-builds/environment-variables/). For other deployment platforms, such as [Vercel](https://vercel.com/) or [GitHub pages](https://pages.github.com/) you can add enviroment variables in their settings too. Just ensure you've added the key prior to the build process or you won't see your videos.

Hopefully that's given you a good idea of how to use the YouTube API with Eleventy. To speed up your development build, and avoid calling the API repeatedly, you could look to add a [cache](https://www.11ty.dev/docs/quicktips/cache-api-requests/) to save the playlist data locally. This isn't a necessity but it will speed up the build.
