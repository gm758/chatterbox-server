var requestHandler = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);
  var url = require('url');
  var path = require('path');
  var fs = require('fs');
  var messages = require('./messages.js');
  var headers = defaultCorsHeaders;
  var filePath = '../client' + url.parse(request.url).pathname;
  if (filePath === '../client/') {
    filePath = '../client/index.html';
  }
  var extname = path.extname(filePath);
  var contentType = 'text/html';
  var body;
  var query = url.parse(request.url, true).query;
  var username = query.username || 'anonymous';
  var roomname = query.roomname || 'lobby';

  if (extname === '.js') {
    contentType = 'application/javascript';
  } else if (extname === '.css') {
    contentType = 'text/css';
  }
  //ajax get request
  if (request.method === 'GET' && filePath.indexOf('classes') !== -1) {
    response.end(JSON.stringify(messages));
    // body = [];
    // response.writeHead(200, {'Content-Type': 'application/json'});
    // request.on('data', function(chunk) {
    //   body.push(chunk);
    // }).on('end', function() {
    //   body = Buffer.concat(body).toString();
    //   response.end(body);
    // });
  //page load
  } else if (request.method === 'GET') {
    var fileContent = fs.readFileSync(filePath);
    response.writeHead(200, {'Content-Type': contentType});
    response.end(fileContent);
  //ajax post request
  } else if (request.method === 'POST') {
    headers['Content-Type'] = contentType;
    body = '';
    request.on('data', function(chunk) {
      body += chunk.toString();
    }).on('end', function(){
      messages.push(JSON.parse(body));
      response.writeHead(201, headers);
      response.end(body);
    });
  } else {
    response.statusCode = 404;
    response.end();
  }

};

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

module.exports.requestHandler = requestHandler;

