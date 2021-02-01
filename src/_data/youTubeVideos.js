const {google} = require('googleapis');
const {AssetCache} = require("@11ty/eleventy-cache-assets");

const youTubeService = google.youtube({
    version: 'v3',
    auth: process.env.YOUTUBE_API_KEY
});

const MESSENGER_MARKETING_PLAYLIST_ID = 'PLDvWRKT9Cd2g-L4_hStYOcmOfTF87U8FM';

const getCachedPlaylist = async (id) => {
    const asset = new AssetCache(`youtube-playlist-${id}`);
    
    if (asset.isCacheValid('1d')) {
        console.log(`Loading YouTube playlist '${id}' from cache`)
        return asset.getCachedValue();
    }

    console.log(`Loading YouTube playlist '${id}' from API`)
    const response = await youTubeService.playlistItems.list({
        playlistId: id,
        part: 'id,snippet',
        maxResults: 50
    });

    await asset.save(response, 'json');

    return response;
};

const getYouTubeVideos = async () => {

    try {
        const response = await getCachedPlaylist(MESSENGER_MARKETING_PLAYLIST_ID);
        
        return {
            marketing: response.data
        };
    }
    catch(error) {
        console.log(error.toString());

        return {
            marketing: {
                items: []
            }
        };
    }
};

module.exports = getYouTubeVideos;
