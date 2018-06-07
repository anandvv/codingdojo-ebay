// Load the express module and store it in the variable express (Where do you think this comes from?)
var express = require("express");
console.log("Let's find out what express is", express);
// invoke express and store the result in the variable app
var app = express();
console.log("Let's find out what app is", app);


app.use(express.static(__dirname + "/static"));

app.set("views", __dirname + "/views");
app.set("view engine", 'ejs');

var session = require('express-session');
app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

app.get('/', function(request, response){
    if (request.session.counter){
        request.session.counter = request.session.counter + 1;
    } else{
        request.session.counter = 1;
    }
    response.render('counter', {counter:request.session.counter});
});

app.post('/reset', function(request, response){
    request.session.counter = 0;
    response.render('counter', {counter:request.session.counter});
});

app.post('/inctwo', function(request, response){
    request.session.counter = request.session.counter + 2;
    response.render('counter', {counter:request.session.counter});
});


// tell the express app to listen on port 8000, always put this at the end of your server.js file
app.listen(8001, function() {
  console.log("listening on port 8001");
})