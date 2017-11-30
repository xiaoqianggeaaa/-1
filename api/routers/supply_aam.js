//货源管理
var jwt = require('jsonwebtoken');

//db data connection
var dbs = require('../db/DBHelper');
var mongodb = require('mongodb');
var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname,'/')));
        app.all('*', function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
            res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
            res.header("X-Powered-By",' 3.2.1')
            if(req.method=="OPTIONS") {
                res.sendStatus(200);/*让options请求快速返回*/
            } else{
                next();
            }
        });

var apiResult = require('../modules/apiResult');
var db;

module.exports = {
	init:function(app){
		//采购(需要采购单)
		app.get('/purchase',function(req,res){
			if(req.query){
				if(req.query.data){
					var data = req.query.data;
					var datalist = JSON.parse(data);

					//先获取然后进行匹配，条形码相同数量增加
					dbs.mgod.init(null,function(db){
						dbs.mgod.get('purchase',null,function(errer,result){

							if(errer){
								res.send(errer);
							}else{
								for(var i=0;i<datalist.length;i++){
									var is = true;
									for(var j=0;j<result.length;j++){
										if(result[j].barcode===datalist[i].barcode){
											var qty = (result[j].qty)*1 + (datalist[i].qty)*1;
											dbs.mgod.set('purchase',result[j],{$set:{qty:qty}},function(errer,results){
												if(errer){
													res.send(errer);
												}else{
													console.log('数量已添加');
													
												}
											})
											is = false;
											break;
										}
									}
									if(is){
										dbs.mgod.add('purchase',[datalist[i]],function(err,results){
											if(errer){
												res.send(errer);
											}else{
												console.log('写入成功');
											}
										})
									}
								}
								

							}
						});
					});
				}
				

				
				dbs.mgod.init(null,function(db,cz){
					var cz = req.query.cz;
					if(cz==='del'){
						dbs.mgod.del('purchase',null,function(errer,result){
							if(errer){
								res.send(errer);
							}else{
								res.send("订单已删除");
							}
						});
					}else if(cz==="get"){
						dbs.mgod.get('purchase',null,function(errer,result){
							if(errer){
								res.send(errer);
							}else{
								res.send(result);
							}
						});
					}
					
				});
			}	
		});

		//收货
		app.get('/receiving',function(req,res){
			if(req.query){
				if(req.query.data){
					var data = req.query.data;
					var datalist = JSON.parse(data);
				}
				
				dbs.mgod.init('10.3.135.18',function(db,cz){
					var cz = req.query.cz;
					
					if(cz==='add'){
						dbs.mgod.add('products',datalist,function(errer,result){
							if(errer){
								res.send(errer);
							}else{
								res.send('入库成功');
							}
						});
					}else if(cz==='del'){
						dbs.mgod.del('products',null,function(errer,result){
							if(errer){
								res.send(errer);
							}else{
								res.send("删除成功");
							}
						});
					}else if(cz==="get"){
						dbs.mgod.get('products',data?data:null,function(errer,result){
							if(errer){
								res.send(errer);
							}else{
								res.send(result);
							}
						});
					}
					
				});
			}	
		})

		//连接供应商
		app.get('/supplierList',function(req,res){
			if(req.query){
				if(req.query.data){
					var data = req.query.data;
					
					var datalist = JSON.parse(data);
				}
				
				dbs.mgod.init('10.3.135.65',function(db,cz){
					var cz = req.query.cz;
					
					if(cz==='add'){
						dbs.mgod.add('suppliers',datalist,function(errer,result){
							if(errer){
								res.send(errer);
							}else{
								res.send('入库成功');
							}
						});
					}else if(cz==='del'){
						dbs.mgod.del('suppliers',null,function(errer,result){
							if(errer){
								res.send(errer);
							}else{
								res.send("删除成功");
							}
						});
					}else if(cz==="get"){
						dbs.mgod.get('suppliers',datalist?datalist:null,function(errer,result){
							if(errer){
								res.send(errer);
							}else{
								res.send(result);
							}
						});
					}
				});
			}	
		})
	}
}