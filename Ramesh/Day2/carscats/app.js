// get the http module:
var http = require('http');
// fs module allows us to read and write content for responses!!
var fs = require('fs');
// creating a server using http module:


function getImageResponse(filename,request,response,contentType){
    var currBasePath=__dirname+'/images';
    fs.readFile(currBasePath+'/'+filename,  function (errors, contents){
        response.writeHead(200, {'Content-type': contentType});
        response.write(contents); 
        response.end();
    });
}

function getStyleResponse(filename,request,response,contentType){
    var currBasePath=__dirname+'/stylesheets';
    fs.readFile(currBasePath+'/'+filename,  function (errors, contents){
        response.writeHead(200, {'Content-type': 'text/css'});
        response.write(contents); 
        response.end();
    });
}

function getHtmlResponse(filename,request,response){
    var currBasePath=__dirname+'/views';
    fs.readFile(currBasePath+'/'+filename, 'utf8', function (errors, contents){
        response.writeHead(200, {'Content-type': 'text/html'});
        response.write(contents); 
        response.end();
    });
}
var server = http.createServer(function (request, response){
    // this is how we do routing:
    if (request.url.indexOf("/images/") != -1) {
        let imgFileName = request.url.substring(request.url.indexOf('/images')+8)
        getImageResponse(imgFileName,request,response,'image/jpeg');
    } else if (request.url.indexOf("/stylesheets/") != -1) {
        let cssFileName = request.url.substring(request.url.indexOf('/stylesheets')+13)
        getStyleResponse(cssFileName,request,response);
    } else if (request.url === "/cars/new") {
        getHtmlResponse('carnew.html',request,response);
    } else if (request.url === "/cars") {
        getHtmlResponse('cars.html',request,response);
    }  else if (request.url === "/cats") {
        getHtmlResponse('cats.html',request,response);
    } else if (request.url === "/dojos/new") {
        getHtmlResponse('dojo_new.html',request,response);
    } else if (request.url === '/') {
        getHtmlResponse('index.html',request,response);
    } else {
        response.end('File not found!!!');
    }
});
// tell your server which port to run on
server.listen(7077);
// print to terminal window
console.log("Running in localhost at port 7077");