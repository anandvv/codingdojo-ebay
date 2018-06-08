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
mongoose.connect('mongodb://localhost/mongo_db');
var QuoteSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quote: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});
mongoose.model('Quote', QuoteSchema); // SET
const Quote = mongoose.model('Quote'); // GET

//  ============ STATIC ============ 
app.use(express.static(__dirname + "/static"));

// ============ SERVER ============ 
server = app.listen(8000, function() {
    console.log("listening on port 8000");
});

// ============ SOCKETS ============ 
const io = require('socket.io')(server);

//=======
app.get("/", function (request, response){
  response.render('index');
});

// ============ ROUTES ============ 
//app.get('/', (request, response) => {
    // io.emit('updateAllClients');
//    User.find({}, (err, users) => { // Returns an Array
//        // if (err) // return response.json(err);
//        return response.render('index', { users: users });
//    })
    // return response.render('index');
//})

app.post('/quotes', (request, response) => {
  // request.body.name
  console.log("Server - request.body.name"+ request.body.name);
  console.log("Server - request.body.quote"+ request.body.quote);
  
  quoteInstance = new Quote(request.body);
  quoteInstance.save(function(err){
      //if (err) return response.json(false);
      if (err) {console.log("something went wrong")}
      response.redirect("/quotes");
      //return response.json(true);
  })
})

app.get('/quotes', (request, response) => {
  Quote.find({}, (err, quotes) => { // Returns an Array
      //if (err) return response.json(err);
      if(err) {
        console.log("something went wrong!!");
      }
      //var q = response.json(quotes);
      //console.log("Server - name:" + q.name);
      //console.log("Server - quote:" + q.quote)
      //window.location.href = "http://localhost/quotes";
      response.render("quotes", {quotes:quotes});
      //return response.json(quotes);
  })
  // return response.json([{id:1, name:'Tina'},{id:2, name:'Jim'}]);
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