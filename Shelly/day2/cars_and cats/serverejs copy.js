var express = require("express");
var app = express();

app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
 
   response.send("<h1>Hello Express</h1>");
})
app.get('/cars.html', function(request, response) {

   response.sendFile(__dirname + '/cars.html');
})

app.get('/cats.html', function(request, response) {
   response.sendFile(__dirname + '/cats.html');
})

app.get('/form.html', function(request, response) {
    
    response.sendFile(__dirname + '/cats.html');
 })

app.get("/users", function (request, response){
    // hard-coded user data
     users_array = [
        {catID:1,name: "Michael", pic: "cat1.jpg"}, 
        {catID:2,name: "Jay", pic: "cat2.jpg"}, 
        {catID:3,name: "Brendan", pic: "cat3.jpg"}, 
        {catID:4,name: "Andrew", pic: "cat1.jpg"}
    ];
    response.render('users', {users: users_array});
})

app.get("/cars", function (request, response){
    // hard-coded user data
    var cars_array = [
        {name: "Michael", email: "michael@codingdojo.com"}, 
        {name: "Jay", email: "jay@codingdojo.com"}, 
        {name: "Brendan", email: "brendan@codingdojo.com"}, 
        {name: "Andrew", email: "andrew@codingdojo.com"}
    ];
    response.render('cars', {users: cars_array});
})

app.get('/cats', function(request, response) {
    users_array = [
        {catID:1,name: "Michael", pic: "cat1.jpg"}, 
        {catID:2,name: "Jay", pic: "cat2.jpg"}, 
        {catID:3,name: "Brendan", pic: "cat3.jpg"}, 
        {catID:4,name: "Andrew", pic: "cat1.jpg"}
    ];

    response.render('cats', {users: users_array});
})
app.get('/cats/:catID', (request, response) => {
    //response.send(request.params.catID);
    var userInfo = users_array[request.params.catID - 1];
    console.log(userInfo);
    response.render('userDetails', {user:userInfo});
})
app.listen(8000, function() {
  console.log("listening on port 8000");
})