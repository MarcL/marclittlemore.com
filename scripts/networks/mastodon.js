require('dotenv').config();
const { createRestAPIClient } = require('masto');

const createClient = (url, accessToken) => {
  return createRestAPIClient({
    url,
    accessToken,
  });
};

const transformResponse = (response) => {
  // ensure we get a consistent id for each platform
  // and the original response
  const { uri: id, url } = response;

  return {
    id,
    url,
    original: response,
  };
};

const postToMastodon = async (content, visibility = 'public') => {
  
  try {
    const client = createClient(
      process.env.MASTODON_INSTANCE_URL,
      process.env.MASTODON_ACCESS_TOKEN
    );

    const options = {
      status: content,
      visibility,
    };
    const response = await client.v1.statuses.create(options);

    const transformedResponse = transformResponse(response);

    console.debug(`Posted to Mastodon: ${transformedResponse.url}`);

    return transformedResponse;
  } catch (error) {
    console.error(`Error posting to Mastodon: ${error}`);
  }
};

module.exports = postToMastodon;
