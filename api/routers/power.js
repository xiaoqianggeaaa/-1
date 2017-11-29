//权限管理模块
var express=require('express');
var app=express();
var path = require('path');
var jwt=require('jsonwebtoken');
var bp=require('body-parser');
var moment=require('moment');
//引入数据库模块
var mongo=require('mongodb');
//连接mongodb数据库
var server =new mongo.Server('localhost',27017,{auto_reconnect:true});
//创建一个数据库
var db=new mongo.Db('db',server,{safe:true});

var mogodb=require('./mymogodp');

var username,token,obj;
// var app =express();
//引入token解密模块
var jwt_simple=require('jwt-simple');
module.exports={
  
  register: function(app){




app.set('jwtTokenSecret', 'YOUR_SECRET_STRING');
      
    app.use(bp.urlencoded({extended: false}));

       // app.all('*', function(req, res, next) {
       //      res.header("Access-Control-Allow-Origin", "*");
       //      res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
       //      res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
       //      res.header("X-Powered-By",' 3.2.1');
       //      if(req.method=="OPTIONS") {
       //        res.send(200);/*让options请求快速返回*/
       //      } else{
       //        next();
       //      }
       //  });


app.post('/index',function(req,res){
       username=req.body.name;
    
       //对密码进行加密
       // 
       var expires = moment().add('days', 7).valueOf();
       token = jwt_simple.encode({
          psw:  req.body.password,
          exp: expires
        }, app.get('jwtTokenSecret'));
      
       obj={
            'username' :username,
             'token' :token
       }
   
       // //解密token
       // var decoded = jwt_simple.decode(token, app.get('jwtTokenSecret'));


      mogodb(db,'add',obj,function(data){
            console.log(data);
      });
})
   app.post('/find',function(req,res){
        var username=req.body.user;
        var date=req.body.date;
        if(username==undefined){
                 mogodb(db,'find',{'date':date},function(data){
                    res.send(data);
              });
        }else{
           mogodb(db,'find',{'username':username},function(data){
                    res.send(data);
              });
        }
   })
app.post('/save',function(req,res){
    var date=new Date();
    //对密码进行加密token
       var expires = moment().add('days', 365).valueOf();
       token = jwt_simple.encode({
          psw:  req.body.password,
          exp: expires
        }, app.get('jwtTokenSecret'));



    var obj={
        _id: req.body.id,
        username : req.body.user,
        password : token,
        sex : req.body.sex,
        phone :req.body.phone,
        email :req.body.email,
        role : req.body.role,
        remark : req.body.remark,
        date: date.getFullYear()+'/'+date.getMonth()+'/'+date.getDay()
    }

    mogodb(db,'insert',obj,function(data){
        res.send('ok');
    })
})

app.post('/dele',function(req,res){
      
      if(req.body.idx!=undefined){
        console.log(77);
               
              mogodb(db,'dele',{'_id':req.body.idx},function(data){
                res.send("ok");
        })

              
    }else if(req.body['isarr[]']!=undefined){

        console.log(999);

        
    var arr=req.body['isarr[]'];
    if(Array.isArray(arr)){
        arr.forEach(function(item){
            var obj={};
            obj._id=item;
            console.log(obj);
         mogodb(db,'dele',obj,function(data){
                  res.send("ok");
        })
         db.close();
      })
    }else{
      mogodb(db,'dele',{'_id':arr},function(data){
            res.send('ok');
        })
    }
}

    
})

app.get('/login',function(req,res){
      var username=req.query.user;

      var password=req.query.password;
    

      mogodb(db,'find',{'username':username},function(data){
          console.log(data);
            if(data.length==0){
              res.send("user_err");
              return;
            }

       var decoded = jwt_simple.decode(data[0].password, app.get('jwtTokenSecret'));
   
            if(password!==decoded.psw){
                res.send('pass_err');
                return;
            }
            res.send(data[0].role);
        })
})

}
}

