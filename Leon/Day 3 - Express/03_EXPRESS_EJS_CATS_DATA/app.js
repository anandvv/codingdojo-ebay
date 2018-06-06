const express = require('express');
const app = express();

// mock database
let catData = require(__dirname+'/data/catsData.json');

// This sets the location where express will look for the ejs views
app.set('views', __dirname + '/views');
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/public"));

app.get('/cats', (req, res) => {
  res.render('cats', { cats: catData });
});

app.get('/cat/:id', (req, res) => {
  let index = req.params.id;
  res.render('catsData', { catData: catData[index] });
});

app.get('*', (req, res) => {
  res.render('404');
})

app.listen(3000, () => {
  console.log('Server started on port 3000');
})
