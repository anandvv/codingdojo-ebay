// get the http module:
var http = require('http');
// fs module allows us to read and write content for responses!!
var fs = require('fs');
// creating a server using http module:
var server = http.createServer(function (request, response){
    // see what URL the clients are requesting:
    console.log('client request URL: ', request.url);
    // this is how we do routing:
    if(request.url === '/') {
        response.writeHead(302, {'Location': '/cats'})
        response.end();
    } else if (request.url === "/cats") {
      fs.readFile(__dirname + '/views/cats.html', function(errors, contents){
        response.writeHead(200, {'Content-type': 'text/html'});
        response.write(contents);
        response.end();
      });
    } else if (request.url === "/cars") {
      fs.readFile(__dirname + '/views/cars.html', function(errors, contents){
        response.writeHead(200, {'Content-type': 'text/html'});
        response.write(contents);
        response.end();
      })
    } else if (request.url === '/cars/new') {
        fs.readFile(__dirname + '/views/index.html', function(errors, contents){
          response.writeHead(200, {'Content-type': 'text/html'});
          response.write(contents);
          response.end();
        })
    } else if(request.url === '/public/stylesheets/style.css'){
      fs.readFile(__dirname + '/public/stylesheets/style.css', 'utf8', function(errors, contents){
        response.writeHead(200, {'Content-type': 'text/css'});
        response.write(contents);
        response.end();
      })
    } else if(request.url === '/public/javascripts/index.js'){
      fs.readFile(__dirname + '/public/javascripts/index.js', function(errors, contents){
        response.writeHead(200, {'Content-type': 'text/javascript'});
        response.write(contents);
        response.end();
      })
    } else if (request.url.indexOf(".jpg") >= 0) {
         fs.readFile(__dirname + request.url, function (errors, contents){
             response.writeHead(200, {'Content-type': 'image/jpg'});
             response.write(contents);
             response.end();
         });
    } else {
        response.end('File not found!!!');
    }
});
// tell your server which port to run on
server.listen(6789, function(){
  // print to terminal window
  console.log("Running in localhost at port 6789");
});
