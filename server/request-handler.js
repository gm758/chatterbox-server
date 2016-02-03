var utils = require("./utils");

var requestHandler = function(request, response) {
  var messages = require('./messages.js');

  var actions = {
    'GET': function (request, response) {
      utils.sendResponse(response, {results: messages});
    }, 
    'POST': function(request, response) {
      utils.collectData(request, function(message) {
        message.objectId = messages.length;
        messages.push(message);
        utils.sendResponse(response, {objectId: message.objectId}, 201);
      });
    },
    'OPTIONS': function(request, response) {
      utils.sendResponse(response, null);
    }  
  };
};

module.exports.requestHandler = utils.makeActionHandler(actions);