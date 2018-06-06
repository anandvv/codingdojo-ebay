// CONFIG
var express = require("express");
var app = express();

// EJS TEMPLATING SETUP
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');

// BODY PARSER
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// SESSION
var session = require('express-session');
app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 6000000 }
}))



// STATIC
app.use(express.static(__dirname + "/static"));

app.get('/', (request, response)=>{
  response.render('index');
})

// SERVER
server = app.listen(8000, function() {
  console.log("listening on port 8000");
})
const io = require('socket.io')(server);

var users = [];
var counter = 0;
io.on('connection', function (socket) { //2
    users.push(
        {socket_id: socket.id}
    )    
  console.log(socket);
  console.log(socket.id);

  socket.on('alpha', function (data) { 
    // socket.emit will respond back to the socket client that triggered this 'alpha' listener
    socket.emit('serverMessage');
  });
  socket.on('beta', function (data) { 
    // io.emit will message all socket clients 
    io.emit('serverMessage');
  });
  socket.on('gamma', function (data) { 
    // socket.broadcast will message all socket clients except the one that triggered the 'gamma' listener
    socket.broadcast.emit('serverMessage');
  });  
  
  // Reserved Event Name
  socket.on('disconnect', function(){
        users.splice(socket.id, 1);
  })
    
});