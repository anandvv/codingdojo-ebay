const express = require('express');
const app = express();

// This sets the location where express will look for the ejs views
app.set('views', __dirname + '/views');
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.get('/cats', (req, res) => {
  res.sendFile(__dirname + '/views/cats.html');
});

app.get('/cars', (req, res) => {
  res.sendFile(__dirname + '/views/cars.html');
});

app.get('/cars/new', (req, res) => {
  res.sendFile(__dirname + '/views/new.html');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
})
