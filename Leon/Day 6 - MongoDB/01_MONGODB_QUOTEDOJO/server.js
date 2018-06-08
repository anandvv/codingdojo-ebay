// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');

var dbConfig = require('./db.js')
/*===========================MONGOOSE===============================*/
var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
 name: String,
 quote: String
},{timestamps: true})
mongoose.model('Quotes', UserSchema); // We are setting this Schema in our Models as 'User'
var Quotes = mongoose.model('Quotes') // We are retrieving this Schema from our Models, named 'User'

/*
You won't be able to connect to my own database. I was unable to install mongodb
on my local, so I used tunnel-ssh to connect to a server that already had mongodb
running.
*/

dbConfig.connectToServer(function(err){
    if(err) console.log('db connection error');
  });
var db = mongoose.connection;
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './public')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
// Routes
// Root Request
app.get('/', function(req, res) {
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
    res.render('index');
})
// Add User Request
app.post('/submit', function(req, res) {
    console.log("POST DATA", req.body);
    var quote = new Quotes({name: req.body.name, quote: req.body.quote, $currentDate: {created: true }});
    // This is where we would add the user from req.body to the database.
    quote.save(function(err) {
    // if there is an error console.log that something went wrong!
    if(err) {
      console.log('something went wrong');
    } else { // else console.log that we did well and then redirect to the root route
      console.log('successfully added a user!');
      res.redirect('/quotes');
    }
  })
})
app.get('/quotes', function(req, res) {
  Quotes.find({}).sort({'createdAt': -1}).exec(function(err, docs) {
    res.render('quotes', { quotes: docs });
  });
})
// Setting our Server to Listen on Port: 8000
app.listen(3000, function() {
    console.log("listening on port 3000");
})
