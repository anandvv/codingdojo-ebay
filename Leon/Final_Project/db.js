var mongoose = require('mongoose');
var tunnel = require('tunnel-ssh');
var _db;

var options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};

module.exports = {

	connectToServer: function(callback){
		var args= {
		   username: "epteam",
		   password: "experimentation",
		   host: "chromedbplugindb1.m3.ebay.com",
		   port: 22,
		   dstPort: 27017,
		   localPort: 27017
		};
		var mongoose = require('mongoose');
		var server = tunnel(args, function(error, server){
		if(error){
	        console.log("SSH connection error: " + error);
	    }

		    mongoose.connect("mongodb://127.0.0.1:27017/my_first_db", options);

		    _db = mongoose.connection;
		    _db.on('error', console.error.bind(console, 'DB connection error:'));
		    _db.once('open', function() {
		    	console.log('DB Successfully connected');
		    });
		});
	},
	getDb: function(){
		return _db;
	}
};
