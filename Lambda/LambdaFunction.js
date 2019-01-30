var https = require('https')

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
             buildSpeechletResponse("Jarvis initialized", false),
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
             context.succeed(generateResponse(buildSpeechletResponse("Jarvis YouTube", false),{}))
             break;
          case "Display":
             var displayNum = intent.slots.displayNum.value
             context.succeed(generateResponse(buildSpeechletResponse('Jarvis Selecting display ' + displayNum, false),{}))
             break;
          case "AMAZON.PlaybackAction<object@MusicCreativeWork>":
             context.succeed(generateResponse(buildSpeechletResponse('Jarvis Music', false),{}))
             break;
          default:
            context.succeed(generateResponse(buildSpeechletResponse("Jarvis Command not Found", false),{}))
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
var buildSpeechletResponse = (outputText, shouldEndSession) => {
  return {
    outputSpeech: {
      type: "PlainText",
      text: outputText
    },
    shouldEndSession: shouldEndSession
  }
}
var generateResponse = (speechletResponse, sessionAttributes) => {
  return {
    version: "1.0",
    sessionAttributes: sessionAttributes,
    response: speechletResponse
  }
}