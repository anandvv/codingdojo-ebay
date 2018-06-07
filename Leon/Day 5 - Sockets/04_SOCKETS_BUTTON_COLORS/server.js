var express = require('express');
var app = express();

var color = 'red';
// This sets the location where express will look for the ejs views
app.set('views', __dirname + '/views');
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.render('index', { color: color });
});

var server = app.listen(3000);
var io = require('socket.io')(server);

io.on('connection', function(socket) {
  socket.emit('greeting', { msg: 'Greetings, from server Node, brought to you by Sockets! -Server' });

  socket.on('set_color', function(data) {
    color = data.color;
    io.emit('change_color', { msg: `Changed color to ${color}`, color: color});
  })
})
