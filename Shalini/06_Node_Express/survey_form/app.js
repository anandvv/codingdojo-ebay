// Load the express module and store it in the variable express (Where do you think this comes from?)
var express = require("express");
var app = express();
app.use(express.static(__dirname + "/static"));
// This sets the location where express will look for the ejs views
app.set('views', __dirname + '/views'); 
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
app.set('view engine', 'ejs');

// require body-parsercopy
var bodyParser = require('body-parser');
// use it!
app.use(bodyParser.urlencoded({extended: true}));

 app.get('/', function(request, response) {
    response.render('index', {});
 });

app.post('/result', function(request, response) {
    console.log(request.body);
    response.render('result', {data: request.body});
});

// tell the express app to listen on port 8000, always put this at the end of your server.js file
app.listen(8000, function() {
  console.log("listening on port 8000");
});