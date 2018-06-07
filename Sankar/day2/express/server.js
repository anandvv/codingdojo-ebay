// Load the express module and store it in the variable express (Where do you think this comes from?)
var express = require("express");
console.log("Let's find out what express is", express);
// invoke express and store the result in the variable app
var app = express();
console.log("Let's find out what app is", app);
app.set("views", __dirname + "/views");
app.set("view engine", 'ejs');

app.use(express.static(__dirname + "/static"));




app.get('/cats', function(request, response){
    var users_array = [
        {name: "Michael", email: "michael@codingdojo.com"}, 
        {name: "Jay", email: "jay@codingdojo.com"}, 
        {name: "Brendan", email: "brendan@codingdojo.com"}, 
        {name: "Andrew", email: "andrew@codingdojo.com"}
    ];
    
    response.render('cats', {users: users_array});
});

app.get('/cars', function(request, response){
    var users_array = [
        {name: "Michael", email: "michael@codingdojo.com"}, 
        {name: "Jay", email: "jay@codingdojo.com"}, 
        {name: "Brendan", email: "brendan@codingdojo.com"}, 
        {name: "Andrew", email: "andrew@codingdojo.com"}
    ];
   
    response.render('cars', {users: users_array});
});

app.get('/cat/:catid', function(request, response){
    var cats = [{id: "cat1", food: "Spaghetti1", age: 3, spots: "under the bed, in a sunbeam"},
    {id: "cat2", food: "Spaghetti2", age: 6, spots: "under the bed, in a sunbeam"},
    {id: "cat3", food: "Spaghetti3", age: 9, spots: "under the bed, in a sunbeam"}];
         
    response.render('details', {detail: cats[request.params.catid - 1]});
});





// use app's get method and pass it the base route '/' and a callback
app.get('/', function(request, response) {
    // just for fun, take a look at the request and response objects
   console.log("The request object", request);
   console.log("The response object", response);
   // use the response object's .send() method to respond with an h1
   response.send("<h1>Hello Express</h1>");
})

app.get('/cars.html', function(request, response){
    response.sendFile(__dirname + "/cars.html");
});

app.get('/cats.html', function(request, response){
    response.sendFile(__dirname + "/cats.html");
});
// tell the express app to listen on port 8000, always put this at the end of your server.js file
app.listen(8000, function() {
  console.log("listening on port 8000");
})