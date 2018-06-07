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



app.use(()=>{
    console.log("Hello World")
})

var userData;

// ROUTES
app.get('/setSession', (request, response) => {
    if(request.session.counter){
        request.session.counter++;
    } else {
        request.session.counter = 1;
     }
    response.send("<h1>setSession</h1>");
})

app.get('/getSession', (request, response) => {
    response.json(request.session.counter);
})
app.get('/sample', (request, response) => {
    userData = [
        {id:1 ,name: "Michael", email: "michael@codingdojo.com"}, 
        {id:2 ,name: "Jay", email: "jay@codingdojo.com"}, 
        {id:3 ,name: "Brendan", email: "brendan@codingdojo.com"}, 
        {id:4 ,name: "Andrew", email: "andrew@codingdojo.com"}
    ];
    response.render('sample', {users: userData} );
})

app.get('/users/:id', (request, response) => {
    userInfo = userData[request.params.id-1]
    response.render('userDetails', {
        user: userInfo,
        x: 5,
        y:10
    })
})

app.post('/sessions', (request, response)=>{
    request.body.email
    request.body.password
    // API MongoDB
    // response.redirect('/')
    // response.render
})

app.post('/users', (request, response)=>{
    
    // request.body.first_name
    // request.body.last_name
    // request.body.email
    // request.body.password
    console.log("in users");
    response.redirect('/');
    // response.render('/sample')
})


// SERVER
app.listen(8000, function() {
  console.log("listening on port 8000");
})
