var express = require('express');
var session = require('express-session');

var app = express();

// This sets the location where express will look for the ejs views
app.set('views', __dirname + '/views');
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/public"));

app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

app.get("/", (req, res) => {
  if (req.session.views) {
      req.session.views++
    //  res.write('<p>views: ' + req.session.views + '</p>')
    //  res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    //  res.write('Refresh for more view counts ;)'
    } else {
      req.session.views = 1
    }
    res.render('index', { counter: req.session.views });
});

app.get('/ninja1', (req, res) => {
  req.session.views++;
  res.send('success');
})

app.get('/ninja2', (req, res) => {
  req.session.views = 0;
  res.send('success');
})


app.listen(3000, () => {
  console.log('Server started on port 3000');
})
