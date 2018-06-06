const express = require("express");
const app = express();

app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');

var currentUser = 'Nirmala';
app.use(express.static(__dirname + "/static"));

app.get("/cars", function (request, response){
    response.render('cars', {user: currentUser});
})

app.get("/cars/new", function (request, response){
  response.render('form', {user: currentUser});
})

app.get("/cats", function (request, response){
  response.render('cats', {user: currentUser});
})

app.listen(4000, function() {
  console.log("listening on port 4000");
})

