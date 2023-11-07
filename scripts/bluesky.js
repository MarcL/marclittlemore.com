require('dotenv').config();
const { BskyAgent, RichText } = require('@atproto/api');

const BLUESKY_SERVICE = 'https://bsky.social';

const createAgent = async (appIdentifier, appPassword) => {
  const agent = new BskyAgent({ service: BLUESKY_SERVICE });

  await agent.login({
    identifier: appIdentifier,
    password: appPassword,
  });

  return agent;
};

const postToBluesky = async (text) => {
  try {
    const agent = await createAgent(
      process.env.BLUESKY_APP_IDENTIFIER,
      process.env.BLUESKY_APP_PASSWORD
    );

    const richText = new RichText({ text });
    await richText.detectFacets(agent);

    await agent.post({
      text: richText.text,
      facets: richText.facets,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = postToBluesky;
