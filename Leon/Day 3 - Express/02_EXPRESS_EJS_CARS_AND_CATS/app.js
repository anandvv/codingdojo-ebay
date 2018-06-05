const express = require('express');
const app = express();

var thisUser = "Leon";
// This sets the location where express will look for the ejs views
app.set('views', __dirname + '/views');
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/public"));

app.get('/cats', (req, res) => {
  res.render('cats', { user: thisUser });
});

app.get('/cars', (req, res) => {
  res.render('cars', { user: thisUser });
});

app.get('/cars/new', (req, res) => {
  res.render('form', { user: thisUser });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
})
