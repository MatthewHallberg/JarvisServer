const express = require('express');
const app = express();
var http = require("http");
var https = require("https");

//run instructions:
//lt --port 3000 &
//disown


app.post('/', (req, res) =>

    res.send({
        version: '1.0',
        response: {
        shouldEndSession: false,
        outputSpeech: {
            type: 'SSML',
            text: 'Hello World!',
            ssml: '<speak>matt is the best</speak>'
            }
        }
    }));




app.listen(3000, () => console.log('Example app listening on port 3000!'));