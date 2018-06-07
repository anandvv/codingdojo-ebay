var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser')
var app = express();

// This sets the location where express will look for the ejs views
app.set('views', __dirname + '/views');
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
app.set('view engine', 'ejs');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(express.static(__dirname + "/public"));

app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

app.get("/", (req, res) => {
    res.render('index');
});

var server = app.listen(3000);
var io = require('socket.io')(server);

io.on('connection', function(socket) {
  socket.emit('greeting', { msg: 'Greetings, from server Node, brought to you by Sockets! -Server' }); //3
  socket.on('thankyou', function (data) { //7
    console.log(data.msg); //8 (note: this log will be on your server's terminal)
  });

  socket.on('submitData', function(data) {
    console.log(`Received the client message : ${data.msg}`)
    var msgString = JSON.stringify(data.msg);
    var randNum = Math.floor(Math.random() * 1000);
    socket.emit('dataResponse', { msg: `You emitted the following information to the server: ${msgString}. Your lucky number emitted by the server is: ${randNum}` })
  })
})
