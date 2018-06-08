// Load the express module and store it in the variable express (Where do you think this comes from?)
var express = require("express");
console.log("Let's find out what express is", express);
// invoke express and store the result in the variable app
var app = express();
console.log("Let's find out what app is", app);


app.use(express.static(__dirname + "/static"));

app.set("views", __dirname + "/views");
app.set("view engine", 'ejs');

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(request, response){
    response.render('index');
});

app.post('/result', function(request, response){
    console.log(request.body);
    response.render('result', {info:request.body});
});

var arr = [];
let users = new Set();

// tell the express app to listen on port 8000, always put this at the end of your server.js file
const server = app.listen(1337, function(){
    console.log('listening on port 1337');
});

const io = require('socket.io')(server);

io.on('connection', function(socket){
    socket.emit('greeting', {msg: 'Greetings, from server Node, brought to you by Sockets! -Server'});
    socket.on('join_user', function(data){
        users.add(data);
        arr.push(data + " joined the chat");
        socket.emit('server_response', arr);
        socket.broadcast.emit('server_response', data + " joined the chat");
    });
    socket.on('cancel_user', function(data){
        users.delete(data);
        arr.push(data + " left the chat");
        socket.broadcast.emit('server_response', data + " left the chat");

    });
    socket.on('send_message', function(data){
        arr.push(data);
        io.emit('server_response', data);
    });
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
