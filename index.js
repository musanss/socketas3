var app = require('http').createServer()
  , io = require('socket.io').listen(app, {transports:['flashsocket', 'websocket', 'htmlfile', 'xhr-polling', 'jsonp-polling']})
  , fs = require('fs')

app.listen(8085);

io.sockets.on('connection', function (socket) {
	
	});