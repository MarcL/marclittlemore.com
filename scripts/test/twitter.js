require('dotenv').config();
const { TwitterApi, TwitterApiV2Settings } = require('twitter-api-v2');

//To debug set: TwitterApiV2Settings.debug = true;
TwitterApiV2Settings.debug = true;

const createClient = (bearerToken) => {
    return new TwitterApi(bearerToken);
};

const createClient2 = (appKey, appSecret, accessToken, accessSecret) => {
    return new TwitterApi({
      appKey,
      appSecret,
      accessToken,
      accessSecret,
    });
};
  
const getTimeline = async (bearerToken, username) => {
    // const client = createClient(bearerToken);
    
    const client = createClient2(
        process.env.TWITTER_API_KEY,
        process.env.TWITTER_API_KEY_SECRET,
        process.env.TWITTER_ACCESS_TOKEN,
        process.env.TWITTER_ACCESS_TOKEN_SECRET
    );
    
    // const twitterClient = client.readWrite;

    // const user = await twitterClient.v2.userByUsername(username);
    const tweet = await client.v2.tweet('Testing the API!');

    console.log(tweet);
};

(async () => {
    // await getTimeline(process.env.TWITTER_BEARER_TOKEN, 'marclittlemore');
    await getTimeline(process.env.TWITTER_BEARER_TOKEN, 'marclittlemore');
})();