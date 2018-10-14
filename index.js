const Server = require('socket.io');
var express = require('express');
const PORT   = 3000;
var app = express();
const server = require('http').Server();

const io = Server(PORT);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

server.listen(PORT); // PORT is free to use

io = Server(server);