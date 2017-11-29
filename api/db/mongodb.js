var mongodb = require("mongodb");
var client = mongodb.MongoClient;
var connStr = ("mongodb://localhost:27017/db");
var apiResult = require("../modules/apiResult");
var db;

client.connect(connStr,function(_err,_db){
	if(_err){
		console.log(_err);
	}else {
		db = _db;
	}
});


module.exports = {
	select:function(_collection,_data,_cb){
		db.collection(_collection).find(_data).toArray(function(error,result){
			_cb(apiResult(error ? false : true,error || result));
		})
	},
	insert:function(_collection,_data,_cb){
		db.collection(_collection).insert(_data,function(error,result){
			_cb(apiResult(error ? false : true,error || result));
		})
	},
	delete:function(_collection,_data,_cb){
		db.collection(_collection).remove(_data,function(error,result){
			_cb(apiResult(error ? false : true, error || result));
		})
	},
	update:function(_collection,_data,_cb){
		console.log(_data);
		db.collection(_collection).update({ID:_data.ID},_data,function(error,result){
			_cb(apiResult(error ? false : true, error || result));
		})
	}
}
