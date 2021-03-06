var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "application/json"
};

exports.sendResponse = function(response, data, statusCode, contentType) {
  statusCode = statusCode || 200;
  headers['Content-Type'] = contentType || headers['Content-Type'];
  response.writeHead(statusCode, headers);
  if (headers['Content-Type'] === 'application/json') {
    response.end(JSON.stringify(data));
  } else {
    response.end(data);
  }
};

exports.collectData = function(request, callback) {
  var data = '';
  request.on('data', function(chunk) {
    data += chunk;
  }).on('end', function() {
    callback(JSON.parse(data));
  });
};

exports.makeActionHandler = function(actionMap) {
  return function(request, response, pathname) {
    var action = actionMap[request.method];
    if (action) {
      action(request, response, pathname);
    } else {
      exports.sendResponse(response, '', 404);
    }
  };
};