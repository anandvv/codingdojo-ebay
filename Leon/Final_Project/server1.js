// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();

var axios = require('axios');

// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');

var dbConfig = require('./db1.js')

var routes = require("./routes/routes.js");
var mongoose = require('mongoose');
/*===========================MONGOOSE===============================*/


/*
You won't be able to connect to my own database. I was unable to install mongodb
on my local, so I used tunnel-ssh to connect to a server that already had mongodb
running.
*/

dbConfig.connectToServer(function(err){
    if(err) console.log('db connection error');
  });
var db = mongoose.connection;

// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));

// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './public')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
// Routes
// Root Request

app.use(routes);

app.get('/results', function(req, res) {
  // Construct the request
  // Replace MyAppID with your Production AppID
  var fs = require('fs'),
    xml2js = require('xml2js');

  var parser = new xml2js.Parser();
  fs.readFile(__dirname + '/ebay_findItemsByCategory.xml', function (err, data) {
      //parser.parseString(data, function (err, result) {
          //console.dir(result);
          //console.log('Done');
          //console.log(JSON.parse(stringifiedResult));
          // var axiosConfig = {
          //   headers: {
          //     'Content-Type': 'text/xml',
          //     'X-EBAY-SOA-SECURITY-APPNAME': 'AnandVij-ProSport-PRD-55d80d3bd-bd415843',
          //     'X-EBAY-SOA-OPERATION-NAME' : 'findItemsByCategory'
          //   }
          // };
          axios.get(
                      "https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByCategory&SERVICE-VERSION=1.13.0&RESPONSE-DATA-FORMAT=JSON&categoryId=115280&GLOBAL-ID=EBAY-US&siteid=0&SECURITY-APPNAME=PakHeiIe-codingdo-PRD-0b058513b-a39b18f0"
                      // data, axiosConfig
                      // ).then(function(response){
                      //     parser.parseString(response.data, function(err, data){
                      //       for(index in data.searchResult){
                      //         console.log(data.searchResult[index].item.itemId);
                      //       }
                      //     });
                      // }
                    ).then(function(response){
                      res.send(response.data);
                          // parser.parseString(response.data, function(err, data){
                          //   for(index in data.searchResult){
                          //     console.log(data.searchResult[index].item.itemId);
                          //   }
                          })
                      .catch((err) => {
                        console.log(err);
                      });
      });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
