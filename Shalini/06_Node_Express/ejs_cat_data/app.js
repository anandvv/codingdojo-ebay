// Load the express module and store it in the variable express (Where do you think this comes from?)
var express = require("express");
var app = express();
app.use(express.static(__dirname + "/static"));
// This sets the location where express will look for the ejs views
app.set('views', __dirname + '/views'); 
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
app.set('view engine', 'ejs');

app.get('/cuddles/:id', function(request, response) {
  var id = request.params.id;
  console.log("id:" + id);
  var catData = [
    {id:0, src:"cat1.png", url:"cuddles/0", food: "Spaghetti", age: 3, sleeping: "under the bed. \n In a sunbeam"},
    {id:1, src:"cat2.png", url:"cuddles/1", food: "Milk", age: 4, sleeping: "under the bed. \n In a sunbeam"},
    {id:2, src:"cat3.png", url:"cuddles/2", food: "Pasta", age: 5, sleeping: "under the bed. \n In a sunbeam"},
    {id:3, src:"cat4.png", url:"cuddles/3", food: "Ice cream", age: 2, sleeping: "under the bed. \n In a sunbeam"},
  ]
  console.log(catData[id]);
   response.render('cuddles', {data : catData[id]});
});

app.get('/cats', function(request, response) {
  var catData = [
    {id:0, src:"cat1.png", url:"cuddles/0", food: "Spaghetti", age: 3, sleeping: "under the bed. \n In a sunbeam"},
    {id:1, src:"cat2.png", url:"cuddles/1", food: "Milk", age: 4, sleeping: "under the bed. \n In a sunbeam"},
    {id:2, src:"cat3.png", url:"cuddles/2", food: "Pasta", age: 5, sleeping: "under the bed. \n In a sunbeam"},
    {id:3, src:"cat4.png", url:"cuddles/3", food: "Ice cream", age: 2, sleeping: "under the bed. \n In a sunbeam"},
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