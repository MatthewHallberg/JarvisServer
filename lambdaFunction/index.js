var http = require('http')

exports.handler = (event, context, callback) => {
    if (event.request.type === 'LaunchRequest') {
        callback(null, buildResponse('initialized'));
    } else if (event.request.type === 'IntentRequest') {
        const currIntent = event.request.intent;
         switch(currIntent.name){
          case "YouTubeVideo":
              try {
                var author = currIntent.slots.author.value;
                var title = currIntent.slots.videoTitle.value;
                 ForwardRequest('youtube:' + author + ":" + title,function () {
                   callback(null, buildResponse("fetching video"));
                });
              }catch(e){
                 callback(null, buildResponse("please specify an author and title"));
              }
             break;
          case "Website":
              try {
                var siteName = currIntent.slots.siteName.value;
                 ForwardRequest('website:' + siteName,function () {
                   callback(null, buildResponse('loading ' + siteName + '.com'));
                });
              }catch(e){
                 callback(null, buildResponse("please specify a website"));
              }
             break;
          case "Display":
              try {
                 var displayNum = currIntent.slots.displayNum.value;
                 ForwardRequest('display:' + displayNum,function () {
                   callback(null, buildResponse("selecting display " + displayNum));
                 });
            }catch(e){
              callback(null, buildResponse("please specify a display number"));
            }
             break;
           case "What":
             ForwardRequest('what',function () {
               callback(null, buildResponse("scanning item"));
             });
             break;
          default:
            callback(null, buildResponse("jarvis command not found"));
          }
    } else if (event.request.type === 'SessionEndedRequest') {
        callback(null, buildResponse('Session Ended'));
    }
 
};

function buildResponse(response) {
    return {
        version: '1.0',
        response: {
            outputSpeech: {
                type: 'PlainText',
                text: response,
            },
            shouldEndSession: false,
        },
        sessionAttributes: {},
    };
}

function ForwardRequest(message,callback){
  const options = {
    hostname: 'www.matthewhallberg.com',
    port: 3000,
    method: 'POST',
    headers: {
      'head': 'alexa'
    }
  }
  const req = http.request(options, (res) => {
    callback()
  })
  
  req.on('error', (error) => {
    callback()
  })
  req.write(message)
  req.end()
}
