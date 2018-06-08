// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
// Routes
// Root Request
mongoose.connect('mongodb://localhost/Animaldb');
mongoose.Promise = global.Promise;
var allQuotes;
var UserSchema = new mongoose.Schema({
    name: {type: String},
    size: {type: String}
   }, {timestamps: true})
   mongoose.model('Cat', UserSchema); // We are setting this Schema in our Models as 'User'
   var Cat = mongoose.model('Cat') // We are retrieving this Schema from our Models, named 'User'
   
app.get('/', function(req, res) {
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
    var allCats = "";
    Cat.find({}, function(err,cats) {
        for(q in cats) {
            allCats += cats[q].name + " is " + cats[q].size + "size.  ";
        }
        console.log(" Here are all the cats" + allCats);
        res.render('displayAllCats',{allCats:allCats});
    })
    
})
// 



app.get('/cats/new', function(req, res) {
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
        console.log(" Making new cats!");
        res.render('addnewcat',{});
})




app.get('/cats/edit/:id', function(req, res) {
    var id = req.params.id;  
    allCats = "";
    Cat.findOne({_id:id}, function(err,cat) {
        if(err) {
            res.json(err);
        } else {
            res.render('editcat',{cat:{name:cat.name, size:cat.size, id:id}});
        }
    })
})
app.get('/cats/:id', function(req, res) {

    var id = req.params.id;  
    allCats = "";
    Cat.findOne({_id:id}, function(err,cat) {
        if(err) {
            res.json(err);
        } else {
            console.log(cat);

            res.render('oneCat',{cat:{name:cat.name, size:cat.size}});
        }
    })
})

app.post('/cats', function(req, res) {
    var  q = new Cat({name: req.body.name, size: req.body.size});
    console.log("before fndoneandupdate" + q);
    Cat.findOneAndUpdate({name:req.body.name},
        {$set:{size:req.body.size}}
        ,{upsert:true},function (err, cat) {
        if(err) {
            res.json(err);
        } else {
            console.log('successfully added/updated a cat!' + cat);
            res.redirect('/');
        }
    });
    
  })
  app.post('/cats/:id', function(req, res) {
    var id = req.params.id;  
    console.log(id);
    Cat.findOneAndUpdate({name:req.body.name},
        {$set:{size:req.body.size}}
        ,{upsert:true},function (err, cat) {
        if(err) {
            res.json(err);
        } else {
            console.log('successfully added/updated a cat!' + cat);
            res.render('oneCat',{cat:{name:cat.name, size:cat.size}});
        }
    });
})
app.post('/cats/destroy/:id', function(req, res) {
    var id = req.params.id;  
    allCats = "";
    Cat.deleteOne({_id:id}, function(err,cat) {
        if(err) {
            console.log("getting cats failed!" + err);
        } else {
            res.render('editcat',{cat:{name:cat.name, size:cat.size, id:id}});
        }
    })
})
app.listen(8000, function() {
    console.log("listening on port 8000");
})




