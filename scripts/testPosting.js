const postToMastodon = require('./mastodon');
const postToBluesky = require('./bluesky');

const message =
  'Hello from my blog! Does Open Graph unfurling work?: Testing it via an API call and here is a link to my blog. https://www.marclittlemore.com/ #api #testing #mastodon';

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
