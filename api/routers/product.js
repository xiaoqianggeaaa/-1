var db = require('../db/dbhelper');

module.exports = {
    register: function(app){
        app.post('/getproduct', function(req, res){
            var barcode = req.body.barcode;
            console.log(barcode)
            db.mongodb.select('products', {barcode: barcode}, function(result){
                res.send(result);
            })
        })
    }
}