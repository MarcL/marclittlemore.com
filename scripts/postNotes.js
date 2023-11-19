const glob = require('fast-glob');
const fs = require('fs/promises');
const markdownToTxt = require('./markdown/markdownToText');
const postToMastodon = require('./networks/mastodon');
const postToBluesky = require('./networks/bluesky');
const postToThreads = require('./networks/threads');
const postToTwitter = require('./networks/twitter');
const publishedNotes = require('../src/_data/publishedNotes.json');

const socialPlatforms = {
  bluesky: postToBluesky,
  mastodon: postToMastodon,
  threads: postToThreads,
  twitter: postToTwitter,
};

// TODO: Add threads once the API is official
const DEFAULT_PLATFORMS_TO_POST_TO = ['mastodon', 'bluesky', 'twitter'];

const shouldPost = (metadata) => {
  // Assume that we post if there's no metadata
  // or if there is metadata and syndicate is true
  // i.e. we explicitly set syndicate to false to prevent posting
  return !metadata || metadata?.syndicate;
};

const getUrlFromPath = (path) => path.replace('src/', '').replace('.md', '');

const hasBeenPosted = (path) => {
  return publishedNotes[getUrlFromPath(path)];
};

// TODO: Pass in image and post image if it exists
// TODO: Check each platform separately
const postToPlatforms = async (
  text,
  platformsToPostTo = DEFAULT_PLATFORMS_TO_POST_TO
) => {
  const socialApiCalls = platformsToPostTo.map((platform) => {
    return socialPlatforms[platform](text);
  });

  try {
    const all = await Promise.allSettled(socialApiCalls);

    let results = {};
    all.forEach((result, index) => {
      if (result.status === 'rejected') {
        const platform = platformsToPostTo[index];
        console.error(`Error posting to ${platform}: ${result.reason}`);
      } else {
        const platform = platformsToPostTo[index];
        results[platform] = result.value;
      }
    });

    return results;
  } catch (error) {
    console.error(`Error posting to platforms: ${error}`);
  }
};

const updatedPublishedNotes = async (path, urls) => {
  if (!urls) {
    console.error(`Error updating published notes: no URLs provided`);
  }

  try {
    publishedNotes[getUrlFromPath(path)] = urls;

    await fs.writeFile(
      'src/_data/publishedNotes.json',
      JSON.stringify(publishedNotes, null, 2)
    );
  } catch (error) {
    console.error(`Error updating published notes: ${error}`);
  }
};

const postLatestNotes = async () => {
  const { default: parseMd } = await import('parse-md');

  const notePaths = await glob(['src/notes/**/*.md'], {
    cwd: process.cwd(),
  });

  // Read each file
  notePaths.map(async (path) => {
    const fileContent = await fs.readFile(path, 'utf-8');

    const { metadata, content } = parseMd(fileContent);
    const text = markdownToTxt(content);

    // TODO: Check content length against the platform
    // and split accordingly - perhaps link back to the note post?

    if (shouldPost(metadata)) {
      if (!hasBeenPosted(path)) {
        console.debug(`Posting ${path} to social platforms`);
        const urls = await postToPlatforms(text);
        await updatedPublishedNotes(path, urls);
      } else {
        console.debug(`Skipping ${path} as it's already been posted`);
      }
    } else {
      console.debug(`Skipping ${path} as it's not marked for syndication`);
    }
  });
};

(async () => {
  await postLatestNotes();
})();
