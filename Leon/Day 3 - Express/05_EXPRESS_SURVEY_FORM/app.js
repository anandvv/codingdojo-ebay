var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser')
var app = express();

// This sets the location where express will look for the ejs views
app.set('views', __dirname + '/views');
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
app.set('view engine', 'ejs');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(express.static(__dirname + "/public"));

app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

app.get("/", (req, res) => {
    res.render('index');
});

app.post('/results', (req, res) => {
  var body = req.body;
  res.render('results', { body: body });
})


app.listen(3000, () => {
  console.log('Server started on port 3000');
})
