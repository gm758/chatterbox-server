var requestHandler = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);
  var path = require('path');
  var fs = require('fs');
  var headers = defaultCorsHeaders;
  var filePath = '../client' + request.url;
  if (filePath === '../client/') {
    filePath = '../client/index.html';
  }
  var extname = path.extname(filePath);
  var contentType = 'text/html';
  var body;

  if (extname === '.js') {
    contentType = 'application/javascript';
  } else if (extname === '.css') {
    contentType = 'text/css';
  }


  //get request from ajax
  if (request.method === 'GET' && filePath.indexOf('classes') !== -1) {
    body = [];
    response.statusCode = 200;
    request.on('data', function(chunk) {
      body.push(chunk);
    }).on('end', function() {
      body = Buffer.concat(body).toString();
      response.end(body);
    });
  //get request from page load
  } else if (request.method === 'GET') {
    var html = fs.readFileSync(filePath);
    response.writeHead(200, {'Content-Type': contentType});
    response.end(html);
  //post request from ajax
  } else if (request.method === 'POST') {
    response.statusCode = 201;
    body = '';
    request.on('data', function(chunk) {
      body += chunk.toString();
      console.log('on data');
    }).on('end', function(){
      response.writeHead(statusCode, headers);
      response.end(body);
    });
  //illegal page
  } else {
    response.statusCode = 404;
    response.end();
  }

  
  // var statusCode;
  // var headers = defaultCorsHeaders;
  // var url = require('url');
  // var fs = require('fs');

  // var pathname = url.parse(request.url).pathname;
  // var roomName;

  // headers['Content-Type'] = "application/json";

  // if (pathname.split('/')[1] !== 'classes') {
  //   statusCode = 404;
  //   response.writeHead(statusCode, headers);
  //   response.end('');
  // } else {
  //   roomName = pathname.split('/')[2];

  //   var _data = require('./messages.js');

  //   if (request.method === 'POST') {
  //     statusCode = 201;

  //     var fullBody = '';
      
  //     request.on('data', function(chunk) {
  //       fullBody += chunk.toString();
  //     });

  //     request.on('end', function() {
  //       _data.push(JSON.parse(fullBody));
  //       response.writeHead(statusCode, headers);
  //       response.end(JSON.stringify(_data));
  //     });
  //   } else if (request.method === 'GET') {
  //     statusCode = 200;
  //     response.writeHead(statusCode, headers); 
  //     response.end(JSON.stringify({results: _data}));

  //   } 

  // }

};

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

module.exports.requestHandler = requestHandler;

