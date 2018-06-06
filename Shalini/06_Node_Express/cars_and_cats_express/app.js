// Load the express module and store it in the variable express (Where do you think this comes from?)
var express = require("express");
var app = express();
app.use(express.static(__dirname + "/static"));

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/views/index.html');
 });

app.get('/cars.html', function(request, response) {
   response.sendFile(__dirname + '/views/cars.html');
});

app.get('/cats.html', function(request, response) {
    response.sendFile(__dirname + '/views/cats.html');
 });

 app.get('/form.html', function(request, response) {
    response.sendFile(__dirname + '/views/form.html');
 });
// tell the express app to listen on port 8000, always put this at the end of your server.js file
app.listen(8000, function() {
  console.log("listening on port 8000");
})