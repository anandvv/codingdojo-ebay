// get the http module:
var http = require('http');
// fs module allows us to read and write content for responses!!
var fs = require('fs');
// creating a server using http module:
var server = http.createServer(function (request, response){
    // see what URL the clients are requesting:
    console.log('client request URL: ', request.url);
    // this is how we do routing:
    if(request.url === '/cars') {
        fs.readFile(__dirname+'/views/index.html', 'utf8', function (errors, contents){
            response.writeHead(200, {'Content-Type': 'text/html'});  // send data about response
            response.write(contents);  //  send response body
            response.end(); // finished!
        });
    } else if (request.url === "/images/car1.jpeg") { // request.url.indexOf('.jpeg') >= 0
        fs.readFile(__dirname+'/images/car1.jpeg', function (errors, contents){ // __dirname + request.url
            response.writeHead(200, {'Content-type': 'image/jpeg'});
            response.write(contents); 
            response.end();
        });
    } else if (request.url === "/images/car2.jpeg") {
        fs.readFile(__dirname+'/images/car2.jpeg', function (errors, contents){
            response.writeHead(200, {'Content-type': 'image/jpeg'});
            response.write(contents);   
            response.end();   
        });
    } else if (request.url === "/styles.css") {
        fs.readFile(__dirname+'/styles.css', 'utf8', function (errors, contents){
            response.writeHead(200, {'Content-type': 'text/css'});
            response.write(contents); 
            response.end();
        });
    } else if (request.url === "/cats") {
        fs.readFile(__dirname + '/views/index_cats.html', 'utf8', function(erros, contents) {
            response.writeHead(200, {'Content-type': 'text/html'});
            response.write(contents);
            response.end();
        });
    } else if (request.url.indexOf('.jpeg') >= 0) {
        fs.readFile(__dirname + request.url, function(erros, contents) {
            response.writeHead(200, {'Content-type': 'image/jpeg'});
            response.write(contents);
            response.end();
        });
    } else if (request.url == "/cars/new") {
        fs.readFile(__dirname + "/views/index_form.html", "utf8", function(erros, contents) {
            response.writeHead(200, {'Content-type': 'text/html'});
            response.write(contents);
            response.end();
        });
    }
    // request didn't match anything:
    else {
        response.writeHead(404);
        response.end('File not found!!!');
    }
});
// tell your server which port to run on
server.listen(7077);
// print to terminal window
console.log("Running in localhost at port 7077");

