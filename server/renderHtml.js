var utils = require("./utils");
var fs = require('fs');

var requestHandler = function(request, response, pathname) {
  var actions = {
    'GET': function (request, response) {
      var fileContents = fs.readFileSync('../client' + pathname);
      utils.sendResponse(response, fileContents, 200, 'text/html');
    }, 
    'POST': function(request, response) {
      utils.sendResponse(response, null, 403);
    },
    'OPTIONS': function(request, response) {
      utils.sendResponse(response, null);
    }  
  };
};