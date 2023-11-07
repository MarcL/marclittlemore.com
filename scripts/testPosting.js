const postToMastodon = require('./mastadon');
const postToBluesky = require('./bluesky');

// (async () => {
//   try {
//     await postToMastodon(
//       'Hello from my blog! #testing @marclittlemore@indieweb.social'
//     );
//   } catch (error) {
//     console.error(error);
//   }
// })();

(async () => {
  try {
    await postToBluesky('Hello from my blog! #testing @marclittlemore.com');
  } catch (error) {
    console.error(error);
  }
})();
