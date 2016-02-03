var express = require('express');
var app = express();
var http = require("http");
var url = require("url");
var handleRequest = require("./request-handler");
var serveStaticFile = require("./serveStaticFile");
var renderHtml = require("./renderHtml");
var utils = require("./utils");
var path = require('path');

var port = 3000;

var ip = "127.0.0.1";

console.log(path.join(__dirname, '/../client'));
app.use(express.static(__dirname + '/../client'));

app.get(['/', '/index.html'], function(request, response) {
  renderHtml.requestHandler(request, response, '/');
});

app.get('/classes/chatterbox', function(request, response) {
  handleRequest.requestHandler(request, response);
});

app.post('/classes/chatterbox', function(request, response) {
  handleRequest.requestHandler(request, response);
});

app.listen(3000, function() {
  console.log('App is listening on port 3000');
}); 
