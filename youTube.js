
var constants = require('./Constants/constants.js');

var {google} = require('googleapis'),
    youtubeV3 = google.youtube( { version: 'v3', auth: constants.YOUTUBE_KEY } );

module.exports = {
   GetYouTubeLink : function (query,callback){   
      var request =  youtubeV3.search.list({
          part: 'snippet',
          type: 'video',
          q: query,
          maxResults: '1',
      }, (err,response) => {
          if (err) {
             console.log(err);
          } else {
            var videoId = response.data.items[0].id.videoId;
            var videoURL = 'https://www.youtube.com/watch?v=' + videoId;
            callback(videoURL);
          }
      });
    }
};