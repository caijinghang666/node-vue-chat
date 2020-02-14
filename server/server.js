let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io').listen(server);

users = [];
connections = [];
server.listen(3000,()=>{   
});
io.sockets.on('connection',(s)=>{
    //添加到连接数组
    connections.push(s);
    console.log('当前连接数为： %s',connections.length);

    
    // 断开连接
    s.on('disconnect',(data)=>{
        //移出连接数组
        connections.splice(connections.indexOf(s),1);
        //移出用户数组
        users.splice(users.indexOf(s),1)
        //重新获取一次用户数据
        if(s.username){
            io.sockets.emit('get_users',users.length,users);   
        }        
        console.log('当前连接数为： %s',connections.length);
             
    });
  
    //发送消息
    s.on('send_message',(data)=>{
        //socket.emit(event,data,[callback])  广播
        io.sockets.emit('new_message',{msg:data,userna:s.username})
    });
    //登录添加用户
    s.on('new_user',(data,callback)=>{
        //找到的情况
        if(users.indexOf(data)!=-1){
            callback(true);
        }else{
            callback(false);
            s.username = data;
            users.push(s.username);
            console.log('当前用户数为： %s',users.length)  
            console.log(users)
            io.sockets.emit('get_users',users.length,users);   
        }
    });
})