// Require the Express/Mongoose Modules
var express = require('express');
var mongoose = require('mongoose')


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

// This is how we connect to the mongodb database using mongoose -- "basic_mongoose" is the name of
//   our db in mongodb -- this should match the name of the db you are going to use for your project.
mongoose.connect('mongodb://localhost/basic_mongoose');
var AnimalSchema = new mongoose.Schema({
    name: String,
    age: Number,
    sex: String,
    eyeColor: String,
    imageURL: String
   });
mongoose.model('Animal', AnimalSchema); // We are setting this Schema in our Models as 'User'
var Animal = mongoose.model('Animal') // We are retrieving this Schema from our Models, named 'User'
   
// Routes
// Root Request
app.get('/', function(req, res) {
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
    res.render('index');
})

app.get('/animals', function(req, res) {
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
    Animal.find({}, function(err, animals){
        if(err){
            console.log("An error occurred retreiving quotes!");
        }else{
            res.render('animals', {animals: animals});
        }
    });
})

// Add User Request 
app.post('/create', function(req, res) {
    console.log("POST DATA", req.body);
    // This is where we would add the user from req.body to the database.
    console.log("Name: " + req.body.name);
    console.log("Quote: " + req.body.age);
    var animal = new Animal({   
                    name: req.body.name, 
                    age: req.body.age,
                    sex: req.body.sex,
                    eyeColor: req.body.eyeColor,
                    imageURL: req.body.imageURL
                })
    animal.save(function(err){
        if(err){
            console.log("Error occurred inserting animal record")
        }else{
            res.redirect('/');
        }
    });
})

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})
