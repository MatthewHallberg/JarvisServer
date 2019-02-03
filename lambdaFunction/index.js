var http = require('http')

exports.handler = (event, context) => {

  try {

    if (event.session.new) {
      // New Session
      console.log("NEW SESSION")
    }

    switch (event.request.type) {

      case "LaunchRequest":
        // Launch Request
        console.log(`LAUNCH REQUEST`)
          context.succeed(
            generateResponse(
             buildSpeechletResponse("Jarvis initialized"),
             {}
            )
          )
        break;
        
      case "IntentRequest":
        // Intent Request
        console.log(`INTENT REQUEST`)
        var intent = event.request.intent;
        //context.succeed(generateResponse(buildSpeechletResponse(intent.name, false),{}))
        switch(intent.name){
          case "YouTubeVideo":
             context.succeed(generateResponse(buildSpeechletResponse("Jarvis YouTube"),{}))
             break;
          case "Display":
             var displayNum = intent.slots.displayNum.value
             context.succeed(generateResponse(buildSpeechletResponse('Jarvis Selecting display ' + displayNum),{}))
             break;
          case "AMAZON.SearchAction<object@WeatherForecast>":
            
            ForwardRequest('weather');
            
             //context.succeed(generateResponse(buildSpeechletResponse(intent.slot.location.name.value),{}))
             break;
          default:
            context.succeed(generateResponse(buildSpeechletResponse("Jarvis Command not Found"),{}))
          }
        break;
        
      case "SessionEndedRequest":
        // Session Ended Request
        console.log(`SESSION ENDED REQUEST`)
        break;

      default:
        context.fail(`INVALID REQUEST TYPE: ${event.request.type}`)

    }

  } catch(error) { context.fail(`Exception: ${error}`) }

}

// Helpers
function ForwardRequest(request){
  const options = {
    hostname: 'www.matthewhallberg.com',
    port: 3000,
    method: 'POST',
    headers: {
      'head': request
    }
  }
  const req = http.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`)
  })
  req.on('error', (error) => {
    console.error(error)
  })
  req.write('')
  req.end()
}

var buildSpeechletResponse = (outputText) => {
  return {
    outputSpeech: {
      type: "PlainText",
      text: outputText
    },
    shouldEndSession: false
  }
}

var generateResponse = (response, sessionAttributes) => {
  return {
    version: "1.0",
    sessionAttributes: sessionAttributes,
    response: response
  }
}
  