const {google} = require('googleapis');

const youTubeService = google.youtube({
    version: 'v3',
    auth: process.env.YOUTUBE_API_KEY
});

const MESSENGER_MARKETING_PLAYLIST_ID = 'PLDvWRKT9Cd2g-L4_hStYOcmOfTF87U8FM';

const getYouTubeVideos = async () => {
    const response = await youTubeService.playlistItems.list({
        playlistId: MESSENGER_MARKETING_PLAYLIST_ID,
        part: 'id,snippet',
        maxResults: 50
    });

    return {
        marketing: response.data
    };
};

module.exports = getYouTubeVideos;
