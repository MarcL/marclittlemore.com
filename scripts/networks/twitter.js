require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');

// To debug set: TwitterApiV2Settings.debug = true;

const createClient = (appKey, appSecret, accessToken, accessSecret) => {
  return new TwitterApi({
    appKey,
    appSecret,
    accessToken,
    accessSecret,
  });
};

const transformResponse = (response) => {
  // ensure we get a consistent id for each platform
  // and the original response
  const {
    data: { id },
  } = response;
  const url = `https://twitter.com/MarcLittlemore/status/${id}`;

  https: return {
    id,
    url,
    original: response,
  };
};

const MAX_MESSAGE_LENGTH = 280;
const validateMessageLength = (message) => {
  if (message.length > MAX_MESSAGE_LENGTH) {
    throw new Error(
      `Tweet is too long for Twitter: ${message.length} characters`
    );
  }

};

const postToTwitter = async (message) => {
  try {
    validateMessageLength(message);

    const client = createClient(
      process.env.TWITTER_API_KEY,
      process.env.TWITTER_API_KEY_SECRET,
      process.env.TWITTER_ACCESS_TOKEN,
      process.env.TWITTER_ACCESS_TOKEN_SECRET
    );

    const twitterClient = client.readWrite;

    const options = {
      text: message,
    };
    const response = await twitterClient.v2.tweet(options);

    const transformedResponse = transformResponse(response);

    console.debug(`Posted to Twitter: ${transformedResponse.url}`);

    return transformedResponse;
  } catch (error) {
    console.error(`Error posting to Twitter: ${error}`);
  }
};

module.exports = postToTwitter;
