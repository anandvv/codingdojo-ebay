// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
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

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quotes');
var quoteSchema = new mongoose.Schema({
    name : String,
    quote : String
}, {timestamps : true});
mongoose.model('Quote', quoteSchema);
var Quote = mongoose.model('Quote');


// Routes
// Root Request
app.get('/', function(req, res) {
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
    res.render('index');
})
// Add User Request 
app.post('/quotes', function(req, res) {
    console.log("POST DATA", req.body);
    console.log(req.body.name);
    console.log(req.body.quote);
    var quoteInstance = new Quote();
    quoteInstance.name = req.body.name;
    quoteInstance.quote = req.body.quote;
    quoteInstance.save(function(err){

    });
    res.redirect('/');
});

app.get('/quotes', function(req, res){
    Quote.find({}, function(err, quotes){
        res.render('quotes', {data:quotes});
        //res.json(quotes);
    });
});


// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})
