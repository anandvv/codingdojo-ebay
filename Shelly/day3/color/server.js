var express = require("express");
var app = express();

var bodyParser = require('body-parser');
//server
const server = app.listen(8000, function(){
    console.log("server on");
});

const io = require('socket.io')(server);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');

var counter = 0;
var color='pink';

app.get('/', function(request, response) {
    console.log(request.body);
    response.render('client');
})

io.on('connection', function (socket) { //2
  
    socket.emit('greeting', { msg: 'Greetings, from server Node, brought to you by Sockets! -Server', color:color}); //3
    socket.on('thankyou', function (data) { //7
      console.log(data.msg); //8 (note: this log will be on your server's terminal)
    });
    socket.on('pushed', function(data) {
        counter++;
        io.emit('update notifications', {msg: counter});
    });
    socket.on('reset', function(data) {
        counter = 0;
        io.emit('update notifications', {msg: counter});
    });
    socket.on('color', function(data) {
        color = data.color;
        console.log("reset color");
        io.emit('update background color', {color:color});
    });
});