// CONFIG
var express = require("express");
var app = express();
var session = require("express-session");
var bodyParser = require('body-parser');
var catData = [
    {name:"cuddle1",favoriteFood: "CornFlakes", age: 2,"sleepingSpot":'Under the bed','image':'cat1.jpg','endpoint':'/cuddle1'}, 
    {name:"cuddle2",favoriteFood: "Milk", age: 5,"sleepingSpot":'Couch','image':'cat2.jpg','endpoint':'/cuddle2'}, 
];
var catImageData = [
    'cat1.jpg',
    'cat2.jpg'
];

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
app.get('/survey', (request, response) => {
    response.render("survey",{showResult:false});
 })
 app.post('/result', (request, response) => {
    console.log("POST DATA \n\n", request.body);
    response.render("survey",{showResult:true,data:request.body});
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

// SERVER
app.listen(8000, function() {
  console.log("listening on port 8000");
})
