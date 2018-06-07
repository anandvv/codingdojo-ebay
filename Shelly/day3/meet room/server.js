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
var color='white';
var users=[];
var messages=[];
app.get('/', function(request, response) {
    console.log(request.body);
    response.render('client');
})

io.on('connection', function (socket) { //2
  
    socket.emit('greeting', { msg: 'Greetings, from server Node, brought to you by Sockets! -Server', color:color}); //3
    socket.on('thankyou', function (data) { //7
      console.log(data.msg); //8 (note: this log will be on your server's terminal)
    });

    socket.on('add user', function(data) { //add user and start
        console.log("add user " + data.user);
        if (users.includes(data.user)) {

        } else {
            users.push(data.user);
        }
        console.log(users.length);
        io.emit('update chats',{messages : messages});
        //io.emit('update background color', {color:color});
    });

    socket.on('chat', function(data) {
        
        messages.push(data);
        io.emit('update chats',{messages : messages});
        console.log(data);
        console.log(messages);
    });
});