// Create web server
// Run: node comments.js
// View at: http://localhost:3000
// To stop: Ctrl+C

var http = require('http');
var fs = require('fs');

// Load comments from file
var comments = JSON.parse(fs.readFileSync('comments.json'));

// Create server
var server = http.createServer(function (request, response) {
  console.log('Request: ' + request.url);

  // Get path
  var path = request.url.toLowerCase();

  // Get method
  var method = request.method.toLowerCase();

  // Get query string
  var query = require('url').parse(request.url, true).query;

  // Get body
  var body = '';
  request.on('data', function (data) {
    body += data;
  });

  // Send response
  request.on('end', function () {
    // Respond to GET requests
    if (method == 'get') {
      // GET /comments
      if (path == '/comments') {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(comments));
      }
      // GET /comment/:id
      else if (path.substring(0, 9) == '/comment/') {
        var id = parseInt(path.substring(9));
        if (id >= 0 && id < comments.length) {
          response.writeHead(200, { 'Content-Type': 'application/json' });
          response.end(JSON.stringify(comments[id]));
        }
        else {
          response.writeHead(404, { 'Content-Type': 'text/plain' });
          response.end('Comment not found');
        }
      }
      // GET /hello
      else if (path == '/hello') {
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.end('Hello, world!');
      }
      // GET /goodbye
      else if (path == '/goodbye') {
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.end('Goodbye, world!');
      }
      // GET /echo?message=Hello
      else if (path.substring(0, 6) == '/echo?') {
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.end('Echo: ' + query.message);
      }
      // GET /add?x=1&y=2
      else if (