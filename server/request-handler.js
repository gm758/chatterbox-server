/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

var requestHandler = function(request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  console.log("Serving request type " + request.method + " for url " + request.url);
  
  var statusCode;
  var headers = defaultCorsHeaders;
  var url = require('url');
  var fs = require('fs');

  var pathname = url.parse(request.url).pathname;
  var roomName;

  headers['Content-Type'] = "application/json";

  if (pathname.split('/')[1] !== 'classes') {
    statusCode = 404;
    response.writeHead(statusCode, headers);
    response.end('');
  } else {
    roomName = pathname.split('/')[2];

    var _data = require('./messages.js');

    if (request.method === 'POST') {
      statusCode = 201;

      var fullBody = '';
      
      request.on('data', function(chunk) {
        fullBody += chunk.toString();
      });

      request.on('end', function() {
        _data.push(JSON.parse(fullBody));
        response.writeHead(statusCode, headers);
        response.end(JSON.stringify(_data));
      });
    } else if (request.method === 'GET') {
      statusCode = 200;
      response.writeHead(statusCode, headers); 
      response.end(JSON.stringify({results: _data}));

    } 

  }

};

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

module.exports.requestHandler = requestHandler;

