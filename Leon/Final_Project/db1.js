var mongoose = require('mongoose');
var tunnel = require('tunnel-ssh');
var _db;

var options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};

module.exports = {

	connectToServer: function(callback){
		
		var mongoose = require('mongoose');
		mongoose.connect("mongodb://127.0.0.1:27017/my_first_db", options);
		_db = mongoose.connection;
		_db.on('error', console.error.bind(console, 'DB connection error:'));
		_db.once('open', function() {
			console.log('DB Successfully connected');
		});
	},
	getDb: function(){
		return _db;
	}
};
