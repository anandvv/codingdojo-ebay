// Load the express module and store it in the variable express (Where do you think this comes from?)
var express = require("express");
var app = express();
app.use(express.static(__dirname + "/static"));
// This sets the location where express will look for the ejs views
app.set('views', __dirname + '/views'); 
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
app.set('view engine', 'ejs');

var session = require('express-session');
// more new code:
app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

 app.get('/', function(request, response) {
  console.log(request.session.counter);
   if(request.session.counter) {
      request.session.counter = request.session.counter + 1;
   } else {
      request.session.counter = 1;
   }
   console.log(request.session.counter);
    response.render('counter', {counter: request.session.counter});
 });


 app.post('/addTwo', function(request, response) {
  if(request.session.counter) {
     request.session.counter = request.session.counter + 2;
  } else {
     request.session.counter = 2;
  }
   response.render('counter', {counter: request.session.counter});
});

app.post('/reset', function(request, response) {
    request.session.counter = 0;
    response.render('counter', {counter: request.session.counter});
});

// tell the express app to listen on port 8000, always put this at the end of your server.js file
app.listen(8000, function() {
  console.log("listening on port 8000");
});