var express = require('express');
var router = express.Router();


var mongoose = require('mongoose');

var PlayerSchema = new mongoose.Schema({
 name: String,
 about: String,
 image: String,
 age: Number,
 equipments: [{name: String, coord: String}]
},{timestamps: true});

mongoose.model('players', PlayerSchema); // We are setting this Schema in our Models as 'User'
var Players = mongoose.model('players'); // We are retrieving this Schema from our Models, named 'User'

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/', function(req, res) {
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
    Players.find({}).sort({'createdAt': 1}).exec(function(err, docs) {
      console.log(docs);
      res.render('index', { data: docs });
    });
});

router.get('/player/:id', function(req, res) {
  // TODO change api to find by id
  var id = req.params.id;
  Players.findOne({"_id": id}, (err, playersData) => {
    res.render('player', {player: playersData});
  });
});

module.exports = router;
