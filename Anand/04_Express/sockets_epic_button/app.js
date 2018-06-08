import { request } from "http";

// Load the express module and store it in the variable express (Where do you think this comes from?)
var express = require("express");
var session = require("express-session")

// invoke express and store the result in the variable app
var app = express();
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))

// this is the line that tells our server to use the "/static" folder for static content
app.use(express.static(__dirname + "/static"));
// two underscores before dirname
// try printing out __dirname using console.log to see what it is and why we use it

// This sets the location where express will look for the ejs views
app.set('views', __dirname + '/views'); 
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
app.set('view engine', 'ejs');

//setup sockets
const server = app.listen(8000);
const io = require('socket.io')(server);
var counter = 0;
    
io.on('connection', function (socket) { //2
  
//   socket.emit('greeting', { msg: 'Greetings, from server Node, brought to you by Sockets! -Server' }); //3
//   socket.on('thankyou', function (data) { //7
//     console.log(data.msg); //8 (note: this log will be on your server's terminal)
//   });

  socket.on('incrementCounter', function (data){
      console.log("incrementCounter received!");

      var magicNumber = Math.random() * 1000;
    var stringToDisplay = "You emitted the following information to the server: " +
        JSON.stringify(data) + "Your lucky number emitted by the server is: " + magicNumber;
    console.log(stringToDisplay);
    socket.emit('surveyMessageServerResponse', {msg: stringToDisplay});
  });
});

// use app's get method and pass it the base route '/' and a callback
app.get('/', function(request, response) {
    // just for fun, take a look at the request and response objects
//    console.log("The request object", request);
//    console.log("The response object", response);
   // use the response object's .send() method to respond with an h1
   if(request.session.counter){
       sessionData = {counter: request.session.counter}
   }else{
       request.session.counter = 1;
       sessionData = {counter: request.session.counter}
   }
   response.render("index", sessionData)
   //response.sendFile(__dirname + "/index.html");
})

