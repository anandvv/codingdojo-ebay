const express = require("express");
const app = express();

app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');

var currentUser = 'Nirmala';
app.use(express.static(__dirname + "/static"));

app.get('/cats', function(request, response) {
  var catData = [
    {id:0, src:"/images/cat1.jpeg", url:"cuddles/0", food: "Meow mix", age: 1, sleeping: "under the bed. \n In a sunbeam"},
    {id:1, src:"/images/cat2.jpeg", url:"cuddles/1", food: "Cat Chow", age: 2.5, sleeping: "under the sofa. \n In a sunbeam"},
    {id:2, src:"/images/cat3.jpeg", url:"cuddles/2", food: "Friskies", age: 2, sleeping: "under the chair. \n In a sunbeam"}
  ];
  response.render('cats', {cdata : catData});
 });

 app.get('/cuddles/:id', function(request, response) {
  var id = request.params.id;
  console.log("id:" + id);
  var catData = [
    {id:0, src:"/images/cat1.jpeg", url:"cuddles/0", food: "Meow mix", age: 1, sleeping: "under the bed. \n In a sunbeam"},
    {id:1, src:"/images/cat2.jpeg", url:"cuddles/1", food: "Cat Chow", age: 2.5, sleeping: "under the sofa. \n In a sunbeam"},
    {id:2, src:"/images/cat3.jpeg", url:"cuddles/2", food: "Friskies", age: 2, sleeping: "under the chair. \n In a sunbeam"}
  ];
  console.log(catData[id]);
  response.render('cuddles', {cdata : catData[id]});
});

app.listen(8000, function() {
  console.log("listening on port 8000");
});

