var express = require('express');
var app = express();
var server = require('http').Server(app);
//socketio开始监听
var io = require('socket.io')(server);
server.listen(820, function () { console.log('成功连接Socket.io在820端口.'); });
//var mysql = require('mysql');
//var conn = mysql.createConnection({
//    host: 'localhost',
//    user: 'root',
//    password: 'admin',
//    database: 'bb_liulan',
//    port: 3306
//});
//conn.connect();

app.use(express.static(__dirname + '/public'));

//app.listen(810,function(){
//    console.log("server is start");
//})


app.get("/bb",function(req,res){
    //conn.query("call bb_ip('"+ip(req)+"');")
    res.redirect("bb.html");

});



app.get("/cy",function(req,res){
    //conn.query("call cy_ip('"+ip(req)+"');")
    res.redirect("cy.html")
})



app.post('/move', function (req, res) {



})


io.sockets.on('connection', function (socket) {
    console.log(socket);
    socket.on('connect', function (data) {
        console.log(data);
        io.sockets.emit('jiaru', data);
    });
    socket.on('move', function (data) {
        console.log(data);
        io.sockets.emit('move', data);
    });
    socket.on('leaft', function (data) {
        console.log(data);
        io.sockets.emit('leaft', data);
    });
})



function ip(req) {
    return req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
};

