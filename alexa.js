var http = require('http');
var youtube = require('./youtube.js');

var port = 3000;

var currMessage = "";

function SetCurrMessage(message){
  currMessage = message;
  console.log(message);
}

//create a server object:
http.createServer(function (req, response) {
  //first get header to figure out if message is from unity or alexa
  var header = req.headers['head'];
  //next get message from post request
  var message = '';
  req.on('data', function (data) {
    message += data;
  });
  req.on('end', function () {
      message = unescape(message);
      if (header == 'unity'){
          //deal with unity messages
          if (message == 'clear'){
            currMessage = '';
          }
          response.end(currMessage);
      } else if (header == 'alexa'){
          //deal with alexa messages
          var words = message.split(':');
          if (words[0] == 'youtube'){
            var query = words[1] + " " + words[2];
            youtube.GetYouTubeLink(query,SetCurrMessage);
          } else {
            currMessage = message;
          }
          response.end();
      } else {
          response.end();
      }
  });
}).listen(port);

console.log('Starting Node Server');