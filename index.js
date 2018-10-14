    var app = require('http').createServer(handler)
       , io = require('socket.io').listen(app,{transports:['flashsocket', 'websocket', 'htmlfile', 'xhr-polling', 'jsonp-polling']})
       , fs = require('fs');
      var port = Number(8085);
     app.listen(port);
     
     function handler (req, res) {
 
     }

     io.on('connection', function (socket) {
 
  socket.on("data",function(d){
       console.log('data from flash: ',d);
       socket.emit("data","hello");
  });
   socket.on("image",function(d){
        
      var obj=JSON.parse(d);
      fs.writeFile("./images/image.png", obj.image,'base64',function (err) {
        if (err) throw err;
        console.log('It\'s saved!');
        });
  });
  socket.on('disconnect', function (socket) {
      console.log("disconnect");
  });
     });