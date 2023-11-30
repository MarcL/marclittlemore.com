require('dotenv').config();
const { Client } = require('@threadsjs/threads.js');

const THREADS_URL = 'https://threads.net';
const THREADS_USERNAME = '@marclittlemore';

const createClient = async (username, password) => {
  const client = new Client();
  await client.login(username, password);

  return client;
};

const transformResponse = (response) => {
  // ensure we get a consistent id for each platform
  // and the original response
  const id = response.media.code;
  const url = `${THREADS_URL}/${THREADS_USERNAME}/post/${id}`;

  return {
    id,
    url,
    original: response,
  };
};

const MAX_MESSAGE_LENGTH = 500;
const validateMessageLength = (message) => {
  if (message.length > MAX_MESSAGE_LENGTH) {
    throw new Error(
      `Message is too long for Threads: ${message.length} characters`
    );
  }
};

const postToThreads = async (message) => {
  try {
    validateMessageLength(message);

    const client = await createClient(
      process.env.THREADS_USERNAME,
      process.env.THREADS_PASSWORD
    );

    const options = {
      contents: message,
    };
    const response = await client.posts.create(client.userId, options);

    const transformedResponse = transformResponse(response);

    console.debug(`Posted to Threads: ${transformedResponse.url}`);
    return transformedResponse;
  } catch (error) {
    console.error(`Error posting to Threads: ${error}`);
  }
};

module.exports = postToThreads;
