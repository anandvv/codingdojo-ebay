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

app.get("/", function (request, response){
  response.render('index');
});

app.post('/quotes', (request, response) => {
  console.log("Server - request.body.name"+ request.body.name);
  console.log("Server - request.body.quote"+ request.body.quote);
  
  quoteInstance = new Quote(request.body);
  quoteInstance.save(function(err){
      if (err) {console.log("something went wrong")}
      response.redirect("/quotes");
  })
})

app.get('/quotes', (request, response) => {
  Quote.find({}, (err, quotes) => { // Returns an Array
      if(err) {
        console.log("something went wrong!!");
      }
      response.render("quotes", {quotes:quotes});
  })
})
