//  ============ EXPRESS ============ 
const express = require("express");
const app = express();

//  ============ EJS ============ 
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');

//  ============ BODY PARSER ============ 
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

//  ============ SESSION ============ 
const session = require('express-session');
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 6000000 }
}))

//  ============ MONGOOSE ============ 
mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sampleSchema');
var UserSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});
mongoose.model('User', UserSchema); // SET
const User = mongoose.model('User'); // GET

//  ============ STATIC ============ 
app.use(express.static(__dirname + "/static"));

// ============ SERVER ============ 
server = app.listen(8000, function() {
    console.log("listening on port 8000");
});

// ============ SOCKETS ============ 
const io = require('socket.io')(server);

// ============ ROUTES ============ 
app.get('/', (request, response) => {
    // io.emit('updateAllClients');
    User.find({}, (err, users) => { // Returns an Array
        // if (err) // return response.json(err);
        return response.render('index', { users: users });
    })
    // return response.render('index');
})
app.get('/users', (request, response) => {
    User.find({}, (err, users) => { // Returns an Array
        if (err) return response.json(err);
        return response.json(users);
    })
    // return response.json([{id:1, name:'Tina'},{id:2, name:'Jim'}]);
})
app.get('/users/:id', (request, response) => {
    // User.findOne({_id:request.params.id}, (err, user) => { // Returns 1 Object
    //     if (err) return response.json(err);
    //     return response.json(user);
    // })
    // request.params.id
    return response.json({id:1, name:'Tina'});
})
app.post('/users', (request, response) => {
    // request.body.name
    userInstance = new User(request.body);
    userInstance.save(function(err){
        if (err) return response.json(false);
        return response.json(true);
    })
})

// ============ SERVER WIDE VARIABLES ============ 
var counter = 0;

io.on('connection', function (socket) { //2
    
  socket.on('alpha', function (data) { 
    // socket.emit will respond back to the socket client that triggered this 'alpha' listener
    // socket.emit('serverMessage');
  });
  socket.on('beta', function (data) { 
    // io.emit will message all socket clients 
    // io.emit('serverMessage');
  });
  socket.on('gamma', function (data) { 
    // socket.broadcast will message all socket clients except the one that triggered the 'gamma' listener
    // socket.broadcast.emit('serverMessage');
  });  
  
  // Reserved Event Name
  socket.on('disconnect', function(){
        users.splice(socket.id, 1);
  });
    
});
