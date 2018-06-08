// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
var routes = require("./routes/routes.js");
var dbConfig = require('./db.js')
/*===========================MONGOOSE===============================*/
var mongoose = require('mongoose');
var PlayerSchema = new mongoose.Schema({
 name: String,
 about: String,
 image: String
},{timestamps: true})
mongoose.model('Player', PlayerSchema); // We are setting this Schema in our Models as 'User'
var Player = mongoose.model('Player') // We are retrieving this Schema from our Models, named 'User'

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
app.use(routes);

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
