var utils = require("./utils");
var fs = require('fs');

var actions = {
  'GET': function (request, response, pathname) {
    if (pathname === '/') {
      pathname = '/index.html';
    }
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

module.exports.requestHandler = utils.makeActionHandler(actions);