var http = require('http');
var fs = require('fs');

var server = http.createServer(function(request, response){
  console.log(`Client Request: ${request.url}`);

  if(request.url === '/') {
    fs.readFile('index.html', 'utf-8', function(err, contents){
      if(err){
        response.end('Error on page.');
      }
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write(contents);
      response.end();
    })
  } else if(request.url === '/ninjas') {
    fs.readFile('ninja.html', 'utf-8', function(err, contents){
      if(err){
        response.end('Error on page.');
      }
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write(contents);
      response.end();
    })
  } else if(request.url === '/dojos/new') {
    fs.readFile('dojos.html', 'utf-8', function(err, contents){
      if(err){
        response.end('Error on page.');
      }
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write(contents);
      response.end();
    })
  } else {
    response.end('File not found!!!');
  }
});

server.listen(8787, function(){
  console.log('listening on port 8787');
});
