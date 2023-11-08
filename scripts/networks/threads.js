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

const postToThreads = async (text) => {
  try {
    const client = await createClient(
      process.env.THREADS_USERNAME,
      process.env.THREADS_PASSWORD
    );

    const options = {
      contents: text,
    };
    const response = await client.posts.create(client.userId, options);

    const transformedResponse = transformResponse(response);

    return transformedResponse;
  } catch (error) {
    console.log(error);
  }
};

module.exports = postToThreads;
