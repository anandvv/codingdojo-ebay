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




  
app.get('/', function(request, response) {
    if(request.session.count) {
        request.session.count = request.session.count + 2;
    } else {
        request.session.count = 1;
    }
   var cnt = request.session.count;
   response.render('counters', {cnt:cnt});
})


app.get('/form', function(request, response) {
    console.log(request.body);


    response.render('client');
})

io.on('connection', function (socket) { //2
  
    socket.emit('greeting', { msg: 'Greetings, from server Node, brought to you by Sockets! -Server' }); //3
    socket.on('thankyou', function (data) { //7
      console.log(data.msg); //8 (note: this log will be on your server's terminal)
    });
    socket.on('posting_form', function(data){
        socket.emit('updated_message', {msg:'your name is ' 
        + data.msg.name + ' your email is ' 
        + data.msg.email})
        socket.emit('random_number', {msg: Math.floor(Math.random() * 10)});
    });
    //socket.emit('posting_form', {msg:'form submitted'});   
  });
// app.post('/result', function(request, response) {
//     console.log(request.body);
//     var user = {name:request.body.name, email:request.body.email};
//     response.render('result', {user:user});
// })

// app.listen(8000, function() {
//   console.log("listening on port 8000");
// })




// app.get('/increment', function(request, response) {
//     if(request.session.count) {
//         request.session.count = request.session.count + 2;
//     } else {
//         request.session.count = 1;
//     }
//    var cnt = request.session.count;
//    response.redirect('/');
// })

// app.get('/reset', function(request, response) {
//     request.session.count = 1;
//    var cnt = request.session.count;
//    response.redirect('/');
// })

//middleware
// app.use((request, response,next)=>{
//     console.log("hello world");
//     next();
//     response.redirect('/');
// })