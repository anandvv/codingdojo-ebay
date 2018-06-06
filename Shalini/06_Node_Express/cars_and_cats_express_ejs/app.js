// Load the express module and store it in the variable express (Where do you think this comes from?)
var express = require("express");
var app = express();
app.use(express.static(__dirname + "/static"));
// This sets the location where express will look for the ejs views
app.set('views', __dirname + '/views'); 
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
app.set('view engine', 'ejs');

app.get('/cars', function(request, response) {
    var carData = [
      {id:1, src:"car1.png"},
      {id:1, src:"car4.png"},
      {id:1, src:"car3.png"},
      {id:1, src:"car1.png"},
    ]
   response.render('cars', {data : carData});
});

app.get('/cats', function(request, response) {
  var catData = [
    {id:1, src:"cat1.png"},
    {id:1, src:"cat2.png"},
    {id:1, src:"cat3.png"},
    {id:1, src:"cat4.png"},
  ]
  response.render('cats', {data : catData});
 });

 app.get('/cars/new', function(request, response) {
    response.render('new', {});
 });
// tell the express app to listen on port 8000, always put this at the end of your server.js file
app.listen(8000, function() {
  console.log("listening on port 8000");
})