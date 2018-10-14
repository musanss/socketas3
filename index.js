var app = require('http').createServer();
var io = require('socket.io').listen(app, {transports:['flashsocket', 'websocket', 'htmlfile', 'xhr-polling', 'jsonp-polling']});
var fs = require('fs');

app.listen(8085);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

     io.on('connection', function (socket) {
 
     });