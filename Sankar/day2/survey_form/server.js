// Load the express module and store it in the variable express (Where do you think this comes from?)
var express = require("express");
console.log("Let's find out what express is", express);
// invoke express and store the result in the variable app
var app = express();
console.log("Let's find out what app is", app);


app.use(express.static(__dirname + "/static"));

app.set("views", __dirname + "/views");
app.set("view engine", 'ejs');

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(request, response){
    response.render('index');
});

app.post('/result', function(request, response){
    console.log(request.body);
    response.render('result', {info:request.body});
});


// tell the express app to listen on port 8000, always put this at the end of your server.js file
app.listen(8002, function() {
  console.log("listening on port 8002");
})