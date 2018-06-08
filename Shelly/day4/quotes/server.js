// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
// Routes
// Root Request
mongoose.connect('mongodb://localhost/quotesdb');
mongoose.Promise = global.Promise;
var allQuotes;
var UserSchema = new mongoose.Schema({
    name: {type: String},
    msg: {type: String}
   }, {timestamps: true})
   mongoose.model('Quotes', UserSchema); // We are setting this Schema in our Models as 'User'
   var Quote = mongoose.model('Quotes') // We are retrieving this Schema from our Models, named 'User'
   
app.get('/', function(req, res) {
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
    res.render('form');
})
// 

app.get('/quotes', function(req, res) {
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
    allQuotes = "";
    Quote.find({}, function(err,quotes) {
        for(q in quotes) {
            allQuotes += quotes[q].name + " said" + quotes[q].msg;
        }
        console.log(" Here are the quoets" + allQuotes);
        res.render('quotes',{allQuotes:allQuotes});
    })
    
})
app.post('/quotes', function(req, res) {
    console.log("POST DATA", req.body);
    // create a new User with the name and age corresponding to those from req.body
    console.log("your quotes", req.body);
    var  q = new Quote({name: req.body.name, msg: req.body.msg});
    // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
    q.save(function(err) {
      // if there is an error console.log that something went wrong!
      if(err) {
        console.log('something went wrong');
      } else { // else console.log that we did well and then redirect to the root route
        console.log('successfully added a quote from a user!');
        res.redirect('/quotes');
      }
    })
  })
// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})

