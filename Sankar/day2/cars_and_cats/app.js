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
        fs.readFile('views/index.html', 'utf8', function (errors, contents){
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(contents); 
            response.end();
        });
    }
    else if (request.url === '/ninjas'){
        fs.readFile('views/ninjas.html', 'utf8', function(errors, contents){
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(contents);
            response.end();

        });
    }
    else if (request.url === "/dojos/new") {
         fs.readFile('views/dojos.html', 'utf8', function (errors, contents){
             response.writeHead(200, {'Content-type': 'text/html'});
             response.write(contents); 
             response.end();
         });
    }
    else if (request.url === "/cars"){
        fs.readFile('views/cars.html', function (errors, contents){
            response.writeHead(200, {'Content-type': 'text/html'});
            response.write(contents); 
            response.end();
        });
    } 
    else if (request.url === "/cats"){
       
        fs.readFile('views/cats.html', function (errors, contents){
            response.writeHead(200, {'Content-type': 'text/html'});
            response.write(contents); 
            response.end();
        });
    }
    else if (request.url.indexOf("/images/cat") === 0 || request.url.indexOf("/images/car") === 0){
        
        fs.readFile(request.url.substring(1), function (errors, contents){
            response.writeHead(200, {'Content-Type': 'image/jpeg'});
            response.write(contents); 
            response.end();
        });
    }
    else if (request.url === "/cars/new"){
        fs.readFile('views/newcar.html', function(errors, contents){
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(contents);
            response.end();
        });
    } 
    else if (request.url.indexOf("/newcarinfo") === 0){
       
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write("Registration Successfull!!!");
        response.end();
    }
    // request didn't match anything:
    else {
        response.end('File not found!!!');
    }
});
// tell your server which port to run on
server.listen(6789, function(){
   //print to terminal window
    console.log("Running in localhost at port 6789");
});
// print to terminal window
//console.log("Running in localhost at port 6789");