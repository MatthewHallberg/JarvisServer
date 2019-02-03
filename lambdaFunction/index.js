var http = require('http')

exports.handler = (event, context, callback) => {
    if (event.request.type === 'LaunchRequest') {
        callback(null, buildResponse('initialized'));
    } else if (event.request.type === 'IntentRequest') {
        const intentName = event.request.intent.name;
        if (intentName === 'AMAZON.SearchAction<object@WeatherForecast>') {
 

                ForwardRequest('weather',function () {
                       callback(null, buildResponse("blah"));
                });

 
        } else {
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
