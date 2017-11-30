var db = require('../db/dbhelper');

module.exports = {
    register: function(app){
        app.post('/getmember', function(req, res){
            var idx = req.body.idx;
            db.mongodb.select('member', {idx: idx}, function(result){
                res.send(result);
            })
        })
    }
}