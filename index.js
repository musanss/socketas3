const server = require('http').createServer();

const io = require('socket.io')(server, {
  transports:['flashsocket', 'websocket', 'htmlfile', 'xhr-polling', 'jsonp-polling'],
  path: '/test',
  serveClient: false,
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
});

server.listen(3000);