const glob = require('fast-glob');
const fs = require('fs/promises');
const markdownToTxt = require('./markdown/markdownToText');
const postToMastodon = require('./networks/mastodon');
const postToBluesky = require('./networks/bluesky');
const postToThreads = require('./networks/threads');
const publishedNotes = require('../src/_data/publishedNotes.json');

// Post notes to social platforms

const shouldPost = (metadata) => {
  // Assume that we post if there's no metadata
  // or if there is metadata and syndicate is true
  // i.e. we explicitly set syndicate to false to prevent posting
  return !metadata || metadata?.syndicate;
};

const hasBeenPosted = (path) => {
  return publishedNotes[path];
};

// TODO: Pass in image and post image if it exists
// TODO: Check each platform separately
const postToPlatforms = async (text) => {
  try {
    const mastodon = await postToMastodon(text);
    const bluesky = await postToBluesky(text);
    const threads = await postToThreads(text);

    return {
      mastodon: {
        id: mastodon.id,
        url: mastodon.url,
      },
      bluesky: {
        id: bluesky.id,
        url: bluesky.url,
      },
      threads: {
        id: threads.id,
        url: threads.url,
      },
    };
  } catch (error) {
    console.error(`Error posting to platforms: ${error}`);
  }
};

const updatedPublishedNotes = async (path, urls) => {
  if (!urls) {
    console.error(`Error updating published notes: no URLs provided`);
  }

  try {
    publishedNotes[path] = urls;
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
    console.log({ path, metadata, content, text });

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
