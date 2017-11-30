var mongodb = require('mongodb');
var client = mongodb.MongoClient;
var constr = 'mongodb://127.0.0.1:27017/db';
var lida = 'mongodb://10.3.135.18:27017/db';

var apiResult = require('../modules/apiResult');

var db;
module.exports = {
	init:function(ip,fn){
		if(ip){
			var myip = 'mongodb://'+ip+':27017/db'
		}else{
			var myip = 'mongodb://127.0.0.1:27017/db';
		}

		
		client.connect(myip,function(_error,_db){
			if(_error){
				console.log('error:'+ _error);
			}else{
				db = _db;

				fn(db);
			}
			
		})

	},
	add:function(_collenction,_data,_cb){
		console.log(_collenction,_data)
		db.collection(_collenction).insertMany(_data,function(error,result){
			_cb(error,result);
		});
	}, 
	del:function(_collenction,_condition,_cb){
		db.collection(_collenction).remove(_condition||{},function(error,result){
			_cb(apiResult(error?false:true,error?[]:result));
		})
	},
	get:function(_collenction,_condition,_cb){
		console.log(typeof _condition)
		db.collection(_collenction).find(_condition || {}).toArray(function(error,result){
			_cb(error,result);
		});
	},
	set:function(_collenction, _where, _update,_cb){
		// db.collection(_collenction).updata(_condition || {}).toArray(function(error,result){
		// 	_cb(apiResult(error?false:true,error?result:[]));
		// })
        db.collection(_collenction).update(_where, _update, function(error, result){
            _cb(error,result);
        })
	}
}
// 连接表
//       module.exports=function collection(db,attr,data,fn){
//         //连接数据库
//         db.open(function(err,db){
       
//                     if(err){
//                         console.log(err);
//                        }

              
//         db.collection(attr,{safe:true},function(err,collection){
//             if(err){
//                 console.log(err);
//             }else{
         
                    
//                 var obj={  
//                     //增
//                     insert: function(data){
//                         collection.insert(data,{safe:true},function(err,result){

//                                var aa=fn;
//                               if(String(typeof fn) == 'function'){
//                                   aa(result);
//                             }
//                                db.close();
//                         })
//                     },
//                     //删
//                     dele:function(data){
//                         collection.remove(data,{safe:true},function(err,result){
//                                var aa=fn;
//                               if(String(typeof fn) == 'function'){
//                                   aa(result);
//                             }
//                                db.close();
//                         })
//                     },
//                     //查
//                     find:function(data){
//                         var res;
//                       collection.find(data).toArray(function(err,result){
                           
//                                var aa=fn;
//                               if(String(typeof fn) == 'function'){
//                                   aa(result);
//                             }
//                               db.close();
//                          });
                      
//                     },
//                     //改
//                     update:function(data){
//                         collection.update(data[0],{$set:data[1]},function(err,result){
//                                var aa=fn;
//                               if(String(typeof fn) == 'function'){
//                                   aa(result);
//                             }
//                                db.close();
//                         })
//                     }
//                 }


//                 obj[attr](data);
                
//             }
//         })
//     })