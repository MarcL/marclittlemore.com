require('dotenv').config();
const { createRestAPIClient } = require('masto');

const createClient = (url, accessToken) => {
  return createRestAPIClient({
    url,
    accessToken,
  });
};

const postToMastodon = async (content) => {
  const client = createClient(
    process.env.MASTODON_INSTANCE_URL,
    process.env.MASTODON_ACCESS_TOKEN
  );

  try {
    const options = {
      status: content,
      visibility: 'private',
    };
    await client.v1.statuses.create(options);
  } catch (error) {
    console.log(error);
  }
};

module.exports = postToMastodon;
