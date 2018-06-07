// CONFIG
var express = require("express");
var app = express();

// EJS TEMPLATING SETUP
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');

// BODY PARSER
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// SESSION
var session = require('express-session');
app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 6000000 }
}))

// STATIC
app.use(express.static(__dirname + "/static"));

app.use((request, response, next)=>{
    console.log("Hello World")
    next();
})


app.get('/', (request, response)=>{
  console.log("In root route")
  response.redirect('/hello');
})

app.get('/hello', (request, response)=>{
  response.send("In Hello")
})

// SERVER
app.listen(8000, function() {
  console.log("listening on port 8000");
})
