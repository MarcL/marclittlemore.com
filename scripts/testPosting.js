const postToMastodon = require('./networks/mastodon');
const postToBluesky = require('./networks/bluesky');
const postToThreads = require('./networks/threads');

const message =
  'Hello from my blog! Does Open Graph unfurling work?: Testing it via an API call and here is a link to my blog. https://www.marclittlemore.com #api #testing';

// (async () => {
//   try {
//     await postToMastodon(message);
//   } catch (error) {
//     console.error(error);
//   }
// })();

(async () => {
  try {
    await postToBluesky(message);
  } catch (error) {
    console.error(error);
  }
})();

// (async () => {
//   try {
//     await postToThreads(message);
//   } catch (error) {
//     console.error(error);
//   }
// })();
