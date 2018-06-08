const express = require("express");
const app = express();

const server = app.listen(4000, function() {
  console.log("listening on port 4000");
});

const io = require('socket.io')(server);

app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');

//var currentUser = 'Nirmala';
var users = [];
var messages = [];
app.use(express.static(__dirname + "/static"));

app.get("/index", function (request, response){
    response.render('index');
});

var counter = 0;
io.on('connection', function (socket) { //2
  
  socket.on('userEntered', function (data) { 
    console.log('User'+ data.user);
    users.push(data.user);
    console.log('users so far' + users);
    // io.emit will message all socket clients 
    io.emit('updateAllUsers', { userdata: users });
  });

  socket.on('messageEntered', function (data) { 
    console.log("Server: message entered"+ data)
    console.log('Server: User'+ data.user);
    console.log('Server: Message'+ data.message);
    //messages.push(data.message);
    messages.push(data);
    console.log('Server: users so far' + users);
    console.log("Server: messages so far"+ messages);
    // io.emit will message all socket clients 
    io.emit('updateAllUsersMessages', { msgdata: messages });
  });

});


