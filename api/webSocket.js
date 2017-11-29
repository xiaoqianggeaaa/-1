var WsServer = require('ws').Server;

var wss = new WsServer({port:99});

wss.on('connection',function(client){
    console.log('兄弟们，操家伙，客户已经点击支付...')
    client.on('message',function(_message){
        wss.clients.forEach(function(_client){
            _client.send(_message+'OK');
        })

        // var _messageObj = JSON.parse(_message);

        // _messageObj.status = 1;//status = 1 表示正常聊天
        // this.message = _messageObj;
        // wss.broadcast(_messageObj);//把客户端的消息广播给所有在线用户
    })
    // 退出聊天
    client.on('close',function(){
        try{
            this.message = this.message || {};
            this.message.status = 0;//status = 0;表示推出聊天
            wss.broadcast(this.message);
        }catch(err){
            console.log('刷新页面');
        }
    })
})

// 定义广播方法
wss.broadcast = function broadcast(_messageObj){
    wss.clients.forEach(function(client){
        client.send(JSON.stringify(_messageObj))
    });
}






// 思考：如何改用socket.io实现单点发送消息

// var express = require('express');
// var app = express();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);
// http.listen(99);

// io.on('connection', function(client){
//     //把当前登录的用户保存到对象 onlinePersons，并向所有在线的用户发起上线提示
//     //serverLogin 为自定义事件，供客户端调用
//     client.on('serverLogin', function(_person){
//         var _personObj = JSON.parse(_person);
//         onlinePersons[_personObj.id] = _personObj;
//         //向所有在线的用户发起上线提示
//         //触发客户端的 clientTips 事件
//         //clientTips 为客户端的自定义事件
//         io.emit('clientTips', JSON.stringify(onlinePersons));
//     })

//     //当监听到客户端有用户在移动，就向所有在线用户发起移动信息，触发客户端 clientMove 事件
//     //serverMove 为自定义事件，供客户端调用
//     client.on('serverMove', function(_person){
//         var _personObj = JSON.parse(_person);
//         onlinePersons[_personObj.id] = _personObj;
//         console.log('serverLogin', onlinePersons);
//         //clientTips 为客户端的自定义事件
//         io.emit('clientMove', _person);
//     });
// })


