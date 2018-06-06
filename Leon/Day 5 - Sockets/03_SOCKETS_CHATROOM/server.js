var express = require('express');
var app = express();
var session = require('express-session');

// variable to hold all of the unique user names and their socket_id
var users = [];
var messages = [];
var randomAnimal = ['Rat', 'Ox', 'Tiger', 'Bunny', 'Dragon', 'Snake', 'Horse', 'Sheep', 'Monkey', 'Chicken', 'Dog', 'Pig']

// This sets the location where express will look for the ejs views
app.set('views', __dirname + '/views');
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/public"));

app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

app.get("/", (req, res) => {
  var exists = false;
  var user = `Anonymous ${randomAnimal[Math.floor(Math.random() * 11)]}`;
  for(var i = 0; i < users.length; i++){
    if(users[i].session == req.session.id){
      exists = true;
      user = users[i].name;
    }
  }
  res.render('index', { sessionID: req.session.id, user: user, exists: exists, messages: messages });
});

var server = app.listen(3000);
var io = require('socket.io')(server);

io.on('connection', function(socket) {
  socket.emit('greeting', { msg: 'Greetings, from server Node, brought to you by Sockets! -Server' }); //3

  socket.on('thankyou', function(data) {
    socket.user = data.user;
  })

  socket.on('got_a_new_user', function(data) {
    var userObj = {
      name: data.name,
      socket_id: socket.id,
      session: data.session
    }
    
    var exists = false;
    for(var i = 0; i < users.length; i++){
      if(users[i].session == data.session){
        exists = true;
      }
    }
    if(!exists){
      users.push(userObj);
      socket.broadcast.emit('new_user', { user: data.name, socket_id: socket.id });
    }

  })

  socket.on('submit_new_message', function(data) {
    var user = data.user;
    for(let idx in users){
      if(users[idx].socket_id == socket.id){
        user = users[idx].name;
      }
    }
    var messageObj = {
      name: user,
      message: data.message
    }
    messages.push(messageObj);
    io.emit('new_message', messageObj);
  })

  socket.on('disconnect', (reason) => {
    io.emit('disconnect_user', { socket_id: socket.id, user: socket.user });
  });
})
