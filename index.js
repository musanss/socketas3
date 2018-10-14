var WebSocketServer = require("ws").Server
var http = require("http")
var express = require("express")
var app = express()
var httpTest = require('http').Server(app);
var port = process.env.PORT || 5000

var io = require('socket.io')(httpTest);

http2.listen(port, function(){
  console.log('listening on *:' + port);
});


app.use(express.static(__dirname + "/"))

var server = http.createServer(app)
server.listen(port)


console.log("http server listening on %d", port)

var wss = new WebSocketServer({server: server})
console.log("websocket server created")

wss.on("connection", function(ws) {
  var id = setInterval(function() {
    ws.send(JSON.stringify(new Date()), function() {  })
  }, 1000)

  console.log("websocket connection open")

  ws.on("close", function() {
    console.log("websocket connection close")
    clearInterval(id)
  })
})
