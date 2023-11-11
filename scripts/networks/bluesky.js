require('dotenv').config();
const { BskyAgent, RichText } = require('@atproto/api');

const BLUESKY_SERVICE = 'https://bsky.social';
const BLUESKY_URL = 'https://bsky.app';
const BLUESKY_USERNAME = 'marclittlemore.com';

const createAgent = async (appIdentifier, appPassword) => {
  const agent = new BskyAgent({ service: BLUESKY_SERVICE });

  await agent.login({
    identifier: appIdentifier,
    password: appPassword,
  });

  return agent;
};

const transformResponse = (response) => {
  // ensure we get a consistent id for each platform
  // and the original response
  const { uri: id } = response;

  const postId = id.split('/')[id.split('/').length - 1];
  const url = `${BLUESKY_URL}/profile/${BLUESKY_USERNAME}/post/${postId}`;

  return {
    id,
    url,
    original: response,
  };
};

const postToBluesky = async (text) => {
  try {
    const agent = await createAgent(
      process.env.BLUESKY_APP_IDENTIFIER,
      process.env.BLUESKY_APP_PASSWORD
    );

    const richText = new RichText({ text });
    await richText.detectFacets(agent);

    const response = await agent.post({
      text: richText.text,
      facets: richText.facets,
    });

    const transformedResponse = transformResponse(response);

    console.debug(`Posted to Bluesky: ${transformedResponse.url}`);
    return transformedResponse;
  } catch (error) {
    console.error(`Error posting to Bluesky: ${error}`);
  }
};

module.exports = postToBluesky;
