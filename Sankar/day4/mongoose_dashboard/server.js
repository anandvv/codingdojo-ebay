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
var mongooseSchema = new mongoose.Schema({
    name : String,
    color : String,
    food: String
}, {timestamps : true});
mongoose.model('Mongoose', mongooseSchema);
var Mongoose = mongoose.model('Mongoose');


// Routes
// Root Request
app.get('/', function(req, res) {
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
    Mongoose.find({}, function(err, mongooses){
        res.render('quotes', {data : mongooses});
    });
});

app.get('/mongooses/new', function(req, res){
    res.render('index');
});


app.get('/mongooses/edit/:id', function(req, res){
    Mongoose.find({"name" : req.params.id}, function(err, mongooses){
        res.render('indexedit', {data : mongooses[0]});
    });
});

app.get('/mongooses/destroy/:id', function(req, res){
    Mongoose.find({"name" : req.params.id}, function(err, mongooses){
        res.render('indexdelete', {data : mongooses[0]});
    });
});


app.get('/mongooses/:id', function(req, res){
    Mongoose.find({name : req.params.id}, function(err, mongooses){
        res.render('quotes', {data : mongooses});
    })
});



app.post('/mongooses', function(req, res){
    var mongooseInstance = new Mongoose();
    mongooseInstance.name = req.body.name;
    mongooseInstance.color = req.body.color;
    mongooseInstance.food = req.body.food;
    mongooseInstance.save(function(err){
        console.log(err);
    });
});



app.post('/mongooses/destroy/:id', function(req, res){
    Mongoose.remove({_id : req.params.id}, function(err){
        console.log(err);
    });
});

app.post('/mongooses/:id', function(req, res){
    Mongoose.update({ _id : req.params.id}, {"name" : req.body.name, "color" : req.body.color, "food" : req.body.food}, function(err){
        console.log(err);
    });
});




// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})
