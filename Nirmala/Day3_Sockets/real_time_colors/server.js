const express = require("express");
const app = express();

const server = app.listen(4000, function() {
  console.log("listening on port 4000");
});

const io = require('socket.io')(server);

app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');

var currentUser = 'Nirmala';
app.use(express.static(__dirname + "/static"));

app.get("/index", function (request, response){
    response.render('index');
});

var counter = 0;
io.on('connection', function (socket) { //2
  
  socket.on('pink', function (data) { 
    // io.emit will message all socket clients 
    io.emit('updateBgColorAllClients', { color: 'pink' });
  });

  socket.on('green', function (data) { 
    // io.emit will message all socket clients 
    io.emit('updateBgColorAllClients', { color: 'green' });
  });

  socket.on('blue', function (data) { 
    // io.emit will message all socket clients 
    io.emit('updateBgColorAllClients', { color: 'blue' });
  });

});


