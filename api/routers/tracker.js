var db = require('../db/dbhelper');

module.exports = {
    register: function(app){
        app.post('/getTracker', function(req, res){
            var payer = req.body.payer;
            var date = req.body.date;
            var status = req.body.status;
            var total = req.body.total;
            var data = req.body.data;
            var ranger = req.body.ranger;

            db.mongodb.insert('tracker', {payer:payer,date:date,status:status,total:total,ranger:ranger,data:data}, function(result){
                res.send(result);
            })
        }),
        app.get('/getTracker',function(req,res){
            var ranger = req.query.ranger;
            db.mongodb.select('tracker',{ranger:ranger},function(result){
                res.send(result);
            })
        }),
        app.post('/updateTracker', function(req, res){
            var ranger = req.body.ranger;
            var status = req.body.status;
            db.mongodb.update('tracker', {ranger:ranger},{status:status}, function(result){
                res.send(result);
            })
        })
    }
}