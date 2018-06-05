// CONFIG
var express = require("express");
var app = express();


// EJS TEMPLATING SETUP
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');


// STATIC
app.use(express.static(__dirname + "/static"));




// ROUTES
app.get('/', (request, response) => {
   response.send("<h1>Hello Express</h1>");
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

// SERVER
app.listen(8000, function() {
  console.log("listening on port 8000");
})

