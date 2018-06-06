
var session = require("express-session");
var express = require("express");
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))



app.get('/', function(request, response) {
    if(request.session.count) {
        request.session.count = request.session.count + 2;
    } else {
        request.session.count = 1;
    }
   var cnt = request.session.count;
   response.render('counters', {cnt:cnt});
})

app.get('/increment', function(request, response) {
    if(request.session.count) {
        request.session.count = request.session.count + 2;
    } else {
        request.session.count = 1;
    }
   var cnt = request.session.count;
   response.redirect('/');
})

app.get('/reset', function(request, response) {
    request.session.count = 1;
   var cnt = request.session.count;
   response.redirect('/');
})

app.get('/form', function(request, response) {
    console.log(request.body)
    response.render('form');
})
app.post('/result', function(request, response) {
    console.log(request.body);
    var user = {name:request.body.name, email:request.body.email};
    response.render('result', {user:user});
})

app.listen(8000, function() {
  console.log("listening on port 8000");
})