// CONFIG
var express = require("express");
var app = express();
var session = require("express-session");
var bodyParser = require('body-parser');
var socketIO = require('socket.io');
var catData = [
    {name:"cuddle1",favoriteFood: "CornFlakes", age: 2,"sleepingSpot":'Under the bed','image':'cat1.jpg','endpoint':'/cuddle1'}, 
    {name:"cuddle2",favoriteFood: "Milk", age: 5,"sleepingSpot":'Couch','image':'cat2.jpg','endpoint':'/cuddle2'}, 
];
var catImageData = [
    'cat1.jpg',
    'cat2.jpg'
];
var epicCount = 0;
var color='green';
var messageId = 0;
var messages = [];

// SERVER
var server = app.listen(8000, function() {
    console.log("listening on port 8000");
  })
  
const io= socketIO(server);

io.on('connection', function (socket) { //2
  console.log(socket.id);
  console.log('socket connected');

  /*socket.on('submitData', function (data) { 
    // socket.emit will respond back to the socket client that triggered this 'alpha' listener
    console.log('--data--'+data);
    socket.emit('result',data);
  });
  socket.on('epicClick', function (data) { 
    // io.emit will message all socket clients 
    epicCount++;
    io.emit('epicCountUpdate',{epicCount:epicCount});
  });
  socket.on('epicReset', function (data) { 
    // io.emit will message all socket clients 
    epicCount=0;
    io.emit('epicCountUpdate',{epicCount:epicCount});
  });
  socket.on('updateColor', function (data) { 
    // io.emit will message all socket clients 
    color=data.color;
    io.emit('colorChange',{color:color});
  });
  */
  socket.on('chat', function (data) { 
    // io.emit will message all socket clients
    messageId++;
    data.id=messageId;
    messages.push(data);
    socket.broadcast.emit('messageUpdate',data);
    //io.emit('colorChange',{color:color});
  });
  socket.on('joinChat', function (data) { 
    // io.emit will message all socket clients
    messageId++;
    var message ={};
    message.userName = data.userName;
    message.message="Joined";
    messages.push(messages);
    io.emit('messageUpdate',{mesaages:messages});
    //io.emit('colorChange',{color:color});
  });
  
  socket.on('gamma', function (data) { 
    // socket.broadcast will message all socket clients except the one that triggered the 'gamma' listener
    socket.broadcast.emit('serverMessage');
  });  
  
  // Reserved Event Name
  socket.on('disconnect', function(){
        console.log('----socket disconnected---');
  })
    
});

// EJS TEMPLATING SETUP
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');


// STATIC
app.use(express.static(__dirname + "/static"));

// use it!
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))

function getCuddleData(idx){
    var arr = [];
    arr.push(catData[idx]);
    return {catData:arr};
}


// ROUTES
//EJS routes
app.get('/chat', (request, response) => {
    response.render("chat",{color:color});
 })
app.get('/color', (request, response) => {
    response.render("color",{color:color});
 })
app.get('/epic', (request, response) => {
    response.render("epic",{epicCount:epicCount});
 })
app.get('/survey', (request, response) => {
    response.render("survey",{showResult:false});
 })
 app.post('/result', (request, response) => {
    console.log("POST DATA \n\n", request.body);
    io.emit('serverMessage',{test:'test'});
    //response.render("survey",{showResult:true,data:request.body});
    //response.redirect('/re');
 })
app.get('/counter', (request, response) => {
    let count = request.session.count;
    if(!count){
        count=1;
    }
    request.session.count = count+1;
    response.render("counter",{count:count});
 })
 app.get('/counter2', (request, response) => {
    let count = request.session.count;
    request.session.count = count+2;
    response.render("counter",{count:count});
 })
 app.get('/reset', (request, response) => {
    request.session.count = 1;
    response.render("counter",{count:1});
 })
 
app.get('/cars', (request, response) => {
    response.render("cars");
 })
 app.get('/cats', (request, response) => {
    response.render("cars");
 })
 app.get('/cars/new', (request, response) => {
    response.render("carnew");
 })
 app.get('/ejscats', (request, response) => {
    response.render("ejscats",{catData:catData,showInfo:false});
 })
 app.get('/cuddle1', (request, response) => {
    var cuddleData = getCuddleData(0);
    cuddleData.showInfo = true;
    response.render("ejscats",cuddleData);
 })
 app.get('/cuddle2', (request, response) => {
    var cuddleData = getCuddleData(1);
    cuddleData.showInfo = true;
    response.render("ejscats",cuddleData);
 })
app.get('/cars.html', (request, response) => {
    response.sendFile(__dirname+'/views/cars.html');
 })
 app.get('/cats.html', (request, response) => {
    response.sendFile(__dirname+'/views/cats.html');
 })
 app.get('/form.html', (request, response) => {
    response.sendFile(__dirname+'/views/carnew.html');
 })
 app.get('/sample', (request, response) => {
    var userData = [
        {name: "Michael", email: "michael@codingdojo.com"}, 
        {name: "Jay", email: "jay@codingdojo.com"}, 
        {name: "Brendan", email: "brendan@codingdojo.com"}, 
        {name: "Andrew", email: "andrew@codingdojo.com"}
    ];
    response.render('sample', {users: userData} );

})
app.get('/', (request, response) => {
    response.sendFile(__dirname+'/views/index.html');
})


