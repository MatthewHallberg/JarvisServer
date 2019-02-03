var http = require('http');

var port = 3000;

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
          console.log("UNITY: " + message);





         //response.end('data to send');
         response.end();
      } else if (header ==  'alexa'){
          //deal with alexa messages
          console.log("ALEXA: " + message);





          response.end();
      } else {
          response.end();
      }
  });
}).listen(port);

console.log('Starting Node Server');