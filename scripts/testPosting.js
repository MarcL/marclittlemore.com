const postToMastodon = require('./mastadon');

(async () => {
  try {
    await postToMastodon(
      'Hello from my blog! #testing @marclittlemore@indieweb.social'
    );
  } catch (error) {
    console.error(error);
  }
})();
