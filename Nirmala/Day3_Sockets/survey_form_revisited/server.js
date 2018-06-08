const express = require('express');
const app = express();
app.use(express.static(__dirname + "/static"));

const server = app.listen(1337);
const io = require('socket.io')(server);
var counter = 0;
var num = Math.random();

io.on('connection', function (socket) { //2
  
  //socket.emit('greeting', { msg: 'Greetings, from server Node, brought to you by Sockets! -Server' }); //3
  socket.on('posting_form', function (data) { //7
    console.log(data.name); //8 (note: this log will be on your server's terminal)
    console.log(data.email);
    socket.emit('updated_message', { msg: data }); 
    socket.emit('random_number', { rnum: num }); 
  });
  
});
