// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');

var dbConfig = require('./db.js')
/*===========================MONGOOSE===============================*/
var mongoose = require('mongoose');
var MessageSchema = new mongoose.Schema({
 name: String,
 message: String
},{timestamps: true})
mongoose.model('Message', MessageSchema); // We are setting this Schema in our Models as 'User'
var Message = mongoose.model('Message') // We are retrieving this Schema from our Models, named 'User'

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
    Message.find({}).sort({'createdAt': 1}).exec(function(err, docs) {
      console.log(docs);
      res.render('index', { messages: docs });
    });
})
// Submit a new animal entry to database
app.post('/post', function(req, res) {
    console.log("POST DATA", req.body);
    var message = new Message({name: req.body.name, message: req.body.message });
    // This is where we would add the user from req.body to the database.
    message.save(function(err) {
    // if there is an error console.log that something went wrong!
    if(err) {
      console.log('something went wrong');
    } else { // else console.log that we did well and then redirect to the root route
      console.log('successfully added a user!');
      res.redirect('/');
    }
  })
})

app.get('/animal/:id', function(req, res){
  var animalName = req.params.id;
  Animal.findOne({name: animalName}).exec(function(err, doc) {
    res.render('animal-info', { animal: doc})
  });
})

app.get('/edit/:id', function(req, res){
  var animalName = req.params.id;
  Animal.findOne({name: animalName}).exec(function(err, doc) {
    res.render('animal', { animal: doc})
  });
})

app.post('/update', function( req, res){

  var condition = { name: req.body.name }
    , update = { $set: { image: req.body.image }};

  Animal.update(condition, update, {}, function(err, numAffected) {
    console.log(numAffected);
    res.redirect('/');
  })
})

app.get('/delete/:id', function( req, res){
  var animalName = req.params.id;
  var condition = { name: animalName }

  Animal.remove(condition, function(err) {
    res.redirect('/');
  })
})

// page render for new animal
app.get('/new', function(req, res) {
  res.render('new');
})
// Setting our Server to Listen on Port: 8000
var server = app.listen(3000)
/*=======================Sockets========================*/

var io = require('socket.io')(server);

io.on('connection', function(socket) {
  socket.emit('greeting', { msg: 'Greetings, from server Node, brought to you by Sockets! -Server' }); //3
  socket.on('thankyou', function (data) { //7
    console.log(data.msg); //8 (note: this log will be on your server's terminal)
  });

  socket.on('submitData', function(data) {
    console.log(`Received the client message : ${data.msg}`)
    var msgString = JSON.stringify(data.msg);
    var randNum = Math.floor(Math.random() * 1000);
    socket.emit('dataResponse', { msg: `You emitted the following information to the server: ${msgString}. Your lucky number emitted by the server is: ${randNum}` })
  })
})
