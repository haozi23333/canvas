var express = require('express')
var app= express();
var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'bb_liulan',
    port: 3306
});
conn.connect();

app.use(express.static(__dirname + '/public'));



app.listen(80,function(){
    console.log("server is start")
})


app.get("/bb",function(req,res){
    conn.query("call bb_ip('"+ip(req)+"');")
    res.redirect("bb.html");

});

app.get("/cy",function(req,res){
    conn.query("call cy_ip('"+ip(req)+"');")
    res.redirect("cy.html")
})

function ip(req) {
    return req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
};
