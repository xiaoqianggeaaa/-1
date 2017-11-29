var db = require("../db/dbhelper.js");
//	console.log(66);
module.exports = {
	register:function(app){
		app.post("/selectSupplier",function(req,res){
			var data = req.body;
			db.mongodb.select("suppliers",data,function(result){
				res.send(result);
			})
		});
		app.post("/addSupplier",function(req,res){
			var data = req.body;
			db.mongodb.insert("suppliers",data,function(result){
				res.send(result);
			})
		});
		app.post("/deleteSupplier",function(req,res){
			var data = req.body;
			db.mongodb.delete("suppliers",data,function(result){
				res.send(result);
			})
		});
		app.post("/updateSupplier",function(req,res){
			var data = req.body;
			db.mongodb.update("suppliers",data,function(result){
				res.send(result);
			})
		});
	}
}
