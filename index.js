"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/echo", function(req, res) {
//   var speech =
//     req.body.queryResult &&
//     req.body.queryResult.parameters &&
//     req.body.queryResult.parameters.echoText
//       ? req.body.queryResult.parameters.echoText
//       : "Seems like some problem. Speak again.";
   var speech =
    req.body.queryResult &&
    req.body.queryResult.parameters &&
    req.body.queryResult.parameters.echoText
      ? "It is turned" + req.body.queryResult.parameters.state;
      : "Seems like some problem. Speak again.";
  
  var req_d = Object.entries(req);
//   console.log(typeof(req));
//   console.log(req_d)
//   var entries = Object.entries(req.body);
//   var header = Object.entries(req.header);
//   console.log('req header: '+ header);
//   console.log('req body: '+ entries);
  console.log('req Query:' + Object.entries(req.body.queryResult));
  console.log('Query param ' + Object.entries(req.body.queryResult.parameters));
//   console.log('req responseID:' + req.body.responseId);
//   console.log('req queryResult:' + Object.entries(req.body.queryResult));
//   console.log('req originalDetectIntentRequest:' + Object.entries(req.body.originalDetectIntentRequest));
//   console.log('req session: ' + req.body.session);
//   var text = req.body.queryResult.parameters.echoText
//   console.log(text)
  
  var speechResponse = {
    google: {
      expectUserResponse: true,
      richResponse: {
        items: [
          {
            simpleResponse: {
              textToSpeech: speech
            }
          }
        ]
      }
    }
  };
  
  return res.json({
    payload: speechResponse,
    //data: speechResponse,
    fulfillmentText: "Sample text response",
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });
});

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
