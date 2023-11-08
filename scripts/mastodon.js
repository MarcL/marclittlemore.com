require('dotenv').config();
const { createRestAPIClient } = require('masto');

const createClient = (url, accessToken) => {
  return createRestAPIClient({
    url,
    accessToken,
  });
};

const postToMastodon = async (content, visibility = 'public') => {
  const client = createClient(
    process.env.MASTODON_INSTANCE_URL,
    process.env.MASTODON_ACCESS_TOKEN
  );

  try {
    const options = {
      status: content,
      visibility,
    };
    const response = await client.v1.statuses.create(options);

    console.log(response);

    return response;
  } catch (error) {
    console.log(error);
  }
};

module.exports = postToMastodon;
