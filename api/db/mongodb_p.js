

var mongodb = require('mongodb');
var client = mongodb.MongoClient;
var connstr = 'mongodb://127.0.0.1:27017/db';

var apiresult = require('../modules/apiresult_p');

var db;
client.connect(connstr, function(_error, _db){
    if(_error){
        console.log(_error);
    } else {
        db = _db;
    }
})

module.exports = {
    select: function(_collection, _condition, _cb){
        db.collection(_collection).find(_condition || {}).toArray(function(error, result){
            _cb(apiresult(error ? false : true, error || result));
        })
    },
    insert: function(_collection, _condition, _cb){
        db.collection(_collection).insert(_condition, function(error, result){
            _cb(apiresult(error ? false : true, error || result));
        })
    },
    update: function(_collection, _condition, _cb){
        var whereStr = {barcode:_condition.barcode};
        db.collection(_collection).update(whereStr,{$set:_condition}, true, function(error, result) {
            _cb(apiresult(error ? false : true, error || result));
        })
    },
    delete: function(_collection, _condition, _cb){
        db.collection(_collection).remove(_condition, function(error, result){
            _cb(apiresult(error ? false : true,error || result));
        })
    },
    selectpage: function(_collection, _condition, _cb){
        if(_condition.status !== undefined){
            var condition  = {status:_condition.status};
        }else if(_condition.name !== undefined){
            var condition = {name:_condition.name};
        }else if(_condition.type !== undefined){
            var condition = {type:_condition.type};
        }else if(_condition.barcode !== undefined){
            var condition = {barcode:_condition.barcode};
        }else if(_condition.supplier !== undefined){
            var condition = {supplier:_condition.supplier};
        }else if(_condition.stocktime !== undefined){
            var condition = {stocktime:_condition.stocktime};
        }else if(_condition.price !== undefined){
            var condition = {price:_condition.price};
        }else {
            var condition = {};
        }  
        db.collection(_collection).find(condition).skip((_condition.page)*(_condition.readqty*1)).limit(_condition.readqty*1).toArray(function(error, result){
            _cb(apiresult(error ? false : true, error || result));
        })

    }
}

