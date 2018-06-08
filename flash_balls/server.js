// Load the express module and store it in the variable express (Where do you think this comes from?)
var express = require("express");
console.log("Let's find out what express is", express);
// invoke express and store the result in the variable app
var app = express();
console.log("Let's find out what app is", app);
var count = 0;
let users = new Set();
let user_color = {};
let dict = {};

app.use(express.static(__dirname + "/static"));

app.set("views", __dirname + "/views");
app.set("view engine", 'ejs');

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function(request, response){
    response.render('player_join',{userName:''});
});


app.post('/join', function(request, response){
    let userName = request.body.user_name;
    joinUser(userName);

    response.render('player_join', {userName: userName,users:users,colorArr:null});
});

app.post('/result', function(request, response){
    console.log(request.body);
    response.render('result', {info:request.body});
});




// tell the express app to listen on port 8000, always put this at the end of your server.js file
const server = app.listen(1337, function(){
    console.log('listening on port 1337');
});

const io = require('socket.io')(server);

 function joinUser(user){
        count++;
            users.add(user);
            dict[user] = 0;
            io.emit('joined_user', {userName:user});
            if (count === 1) user_color[user] = 'Green';
            else if (count === 2) user_color[user] = 'Yellow';
            else if (count === 3) {
                user_color[user] = 'Blue';
                //count = 0;
                io.emit('start_game', user_color);
            }      
 }

    io.on('connection', function(socket){
        socket.emit('greeting', {msg: 'Greetings, from server Node, brought to you by Sockets! -Server'});
        

        socket.on('user_leave', function(user){
            users.delete(user);
            delete dict[user];
            io.emit('user_left', user);
        });

        socket.on('ball_hit', function(response){
            dict[response.user] = dict[response.user] + response.score;
            io.emit('score_data', dict);
        });

        socket.on('wrong_hit', function(response){
            dict[response.user] = dict[response.user] - response.score;
            io.emit('score_data', dict);
        });
    
});

