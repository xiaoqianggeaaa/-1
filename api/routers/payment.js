var db = require('../db/dbhelper');

module.exports = {
    register: function(app){
        app.post('/generateorder', function(req, res){
            var products = req.body.products;
            db.mongodb.insert('order', {orderno: new Date().getTime().toString(), products: products, state: 1}, function(result){
                res.send(result);
            })
        })
    }
}