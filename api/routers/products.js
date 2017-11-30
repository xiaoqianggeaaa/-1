var db = require('../db/dbhelper');

module.exports = {
    register: function(app){
        //查询某个商品的数据
        app.post('/getproduct', function(req, res){
            db.mongodb_p.select('products', req.body, function(result){
                res.send(result);
            })
        }),
        //查询所有商品数据并实现分页
        app.post('/products',function(req, res){
            db.mongodb_p.selectpage('products', req.body, function(result){
                res.send(result);
            })
        }),
        //删除某个商品数据
        app.post('/delproduct',function(req, res){
            db.mongodb_p.delete('products', req.body, function(result){
                res.send(result);
            })
        }),
        //添加商品数据
        app.post('/insertproduct',function(req, res){
            db.mongodb_p.insert('products', req.body, function(result){
                res.send(result);
            })
        })
        //修改商品数据
        app.post('/updateproduct',function(req, res){
            db.mongodb_p.update('products', req.body, function(result){
                res.send(result);
            })
        })
    }
}