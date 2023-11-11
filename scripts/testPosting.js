const postToMastodon = require('./networks/mastodon');
const postToBluesky = require('./networks/bluesky');
const postToThreads = require('./networks/threads');

const message =
  'Testing posting to social media via an API call and here is a link to my blog. <a src="https://www.marclittlemore.com">marclitlemore.com</a> #api #testing';

(async () => {
  try {
    await postToMastodon(message);
  } catch (error) {
    console.error(error);
  }
})();

// (async () => {
//   try {
//     await postToBluesky(message);
//   } catch (error) {
//     console.error(error);
//   }
// })();

// (async () => {
//   try {
//     await postToThreads(message);
//   } catch (error) {
//     console.error(error);
//   }
// })();
