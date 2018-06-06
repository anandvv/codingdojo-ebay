var express = require('express');
var app = express();

var counter = 0;
// This sets the location where express will look for the ejs views
app.set('views', __dirname + '/views');
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.render('index', { counter: counter });
});

var server = app.listen(3000);
var io = require('socket.io')(server);

io.on('connection', function(socket) {
  socket.emit('greeting', { msg: 'Greetings, from server Node, brought to you by Sockets! -Server' }); //3

  socket.on('resetCounter', function () { //7
    counter = 0;
    socket.emit('counterUpdated', { msg: counter });
  });

  socket.on('pushButton', function() {
    counter++;
    socket.emit('counterUpdated', { msg: counter })
  })
})
