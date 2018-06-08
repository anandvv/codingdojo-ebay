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
var AnimalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});
mongoose.model('Animal', AnimalSchema); // SET
const Animal = mongoose.model('Animal'); // GET

//  ============ STATIC ============ 
app.use(express.static(__dirname + "/static"));

// ============ SERVER ============ 
server = app.listen(7000, function() {
    console.log("listening on port 7000");
});

// ============ SOCKETS ============ 
const io = require('socket.io')(server);

//following did not work as it's not able to get the id from the request params
app.post('/animals/:id', (request, response) => {
  console.log("Server - request.body.name "+ request.body.name);
  console.log("Server - request.body.type "+ request.body.type);
  console.log("Server - request.params.id " + request.params.id);
  
  Animal.update({ _id:request.params.id}, request.body, function(err) {
    if(err) { 
      console.log("/animals/edit/:id something went wrong", err)
      throw err; 
    }
    response.redirect("/");
  })

})

app.post('/animals', (request, response) => { // /animals/new
  console.log("Server - request.body.name"+ request.body.name);
  console.log("Server - request.body.type"+ request.body.type);
  
  animalInstance = new Animal(request.body);
  animalInstance.save(function(err){
      //if (err) return response.json(false);
      if (err) {console.log("something went wrong", err)}
      response.redirect("/");
  })
})

//change the /animals/:id to following 

app.post('/updateanimal', (request, response) => {
  console.log("Server - /updateanimal - request.body.name "+ request.body.name);
  console.log("Server - /updateanimal - request.body.type "+ request.body.type);
  
  Animal.findOneAndUpdate({name: request.body.name}, 
      {$set:{type:request.body.type}},
      {upsert:true}, function(err, animal) {
        if(err) { 
          console.log("Server /updateanimal something went wrong", err)
          response.json(err);
        } 
    console.log("Successfully updated animal", animal);
    response.redirect('/');
  })

})

app.get('/animals/destroy/:id', (request, response) => {
  // request.body.name
  //console.log("Server - animals/destroy/:id - request.body.name ", request.body.name);
  //console.log("Server - animals/destroy/:id - request.body.type ", request.body.type);
  console.log("Server - animals/destroy/:id", request.params.id);

  Animal.deleteOne({_id: request.params.id}, function(err, animal) {
        if(err) { 
          console.log("Server /updateanimal something went wrong", err)
          response.json(err);
        } 
    console.log("Successfully deleted animal", animal);
    response.redirect('/');
  })

})

app.get('/', (request, response) => {
  Animal.find({}, (err, animals) => { // Returns an Array
      if(err) {
        console.log("/ something went wrong!!"+err);
      }
      response.render("index", {animals:animals});
  });
});

app.get('/animals/new', (request, response) => {
  response.render("addanimal");
});

app.get('/animals/edit/:id', (request, response) => {
  var id=request.params.id;
  Animal.findOne({_id:id}, function(err, animal) {
    if(err) {
      console.log("/ something went wrong!!"+err);
    }
    response.render("editanimal", {animal:{name:animal.name, type:animal.type, id:id}});
  });
});

app.get('/animals/:id', (request, response) => {
     Animal.findOne({_id:request.params.id}, (err, animal) => { // Returns 1 Object
      if(err) {
        console.log("/animals/:id something went wrong!!",err);
      }
      console.log("/animals/:id", animal);
      response.render("animal", {animal:animal});
     });
})