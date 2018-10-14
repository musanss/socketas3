var app = require('http').createServer()
  , io = require('socket.io').listen(app, {transports:['flashsocket', 'websocket', 'htmlfile', 'xhr-polling', 'jsonp-polling']})
  , fs = require('fs')

app.listen(8085);

var roomnames = [];
var allroominfo = [];
var roomusers;
 var azz;
io.sockets.on('connection', function (socket) {
	//ws.on('error', () => console.log('errored'));
  //emits an object {objectdata}
  var roomname;
  var rommid;  

  var rnames = [];
  var theData; 
   socket.emit('WelcomeMsg', 'hello world');
  
  socket.on('createRoom', function(ussid){ 
    var rroomname = makeid();
	roomnames.push(rroomname);
	rnames.push(rroomname);
	socket.room = rroomname;
    io.sockets.room = rroomname;
	roomusers = 1;
	azz = {roomname:rroomname,roomusers:roomusers,usersid:ussid};
	allroominfo.push(azz);
    socket.join(rroomname);
    socket.emit("createRoomResponse", socket.room);
	io.sockets.in(socket.room).emit('joinRoomResponse', socket.room);
	socket.emit('joinRoomResponse' , socket.room);
    console.log(rroomname);
  });

  
   socket.on('Message', function(Msg){
    console.log('Message');
	var msg = Msg;
	var arr = msg.split(":");
	var userid = arr[0];
	var respone = {
		"event":"MessageRes",
		"message":arr
	};
    io.sockets.emit('MessageRes', respone)
  });
  
  socket.on('EnemyLocation', function(Msg){
    console.log('EnemyLocation');
	var msg = Msg;
	var arr = msg.split(":");
	var userid = arr[0];
	var data = arr[1];
	var dataAll = data.split("|");
	var enemyx = dataAll[0];
	var enemyy = dataAll[1];
	var respone = {
		"event":"EnemyLocationRes",
		"message":arr
	};
    io.sockets.in(roomname).emit('EnemyLocationRes', respone)
  });
  
  socket.on('MessageRoom', function(Msg){
    console.log('MessageRoom');
	var msg = Msg;
	var arr = msg.split(":");
	var userid = arr[0];
	var respone = {
		"event":"MessageRes",
		"message":arr
	};
    io.sockets.in(roomname).emit('MessageRoomRes', respone)
  });
  
  socket.on('getRoom', function(rn){
    console.log('getRoom');
    socket.emit('getRoomResponse', roomnames)
  });
  
  socket.on('joinRoom', function(rn){
	var res = rn.split(":");
	var user = res[0];
	console.log("RoomName : " + allroominfo[0].roomname);
	console.log("RoomUsers : " + allroominfo[0].roomusers);
	var selrom = res[1];
	var usersnow;
	roomid = selrom - 1;
	var selectedroom = roomnames[roomid];
	roomname = selectedroom;
	for (var n = 0;n<roomnames.length;n++){
	//	usersnow = socket.azz.roomusers;
		if (socket.room == roomnames[n]){
			socket.leave(roomnames[n]);
			console.log("logged out from room :" + roomnames[n]);
			allroominfo[n].roomusers = usersnow - 1;
			console.log("RoomUsers : " + allroominfo[n].roomusers);
		}
		if (roomname == allroominfo[n].roomname){
			usersnow = allroominfo[n].roomusers;
		    console.log(usersnow);
			console.log(rn);
			if (allroominfo[n].usersid == user){
				socket.room = selectedroom;
				socket.join(selectedroom);
				io.sockets.in(socket.room).emit('joinRoomResponse', socket.room);
				socket.emit('joinRoomResponse' , socket.room);
			}else{
				if (usersnow == 1){
					usersnow++;
					allroominfo[n].roomusers = usersnow;
					socket.room = selectedroom;
					socket.join(selectedroom);
					io.sockets.in(socket.room).emit('joinRoomResponse', socket.room);
					socket.emit('joinRoomResponse' , socket.room);
				}else{
					socket.emit('joinRoomResponse' , "NoPlace");
				}
			}
			
		}
	}
	
	/*for (var num = 0;num <allroominfo.length;num++){
		if (roomname == allroominfo[num].roomname){
			usersnow = allroominfo[num].roomusers;
			 console.log(rn);
			if (usersnow <= 1){
				usersnow++;
				allroominfo[num].roomusers = usersnow;
				socket.room = selectedroom;
				socket.join(selectedroom);
				io.sockets.in(socket.room).emit('joinRoomResponse', socket.room);
				socket.emit('joinRoomResponse' , socket.room);
			}else{
				socket.emit('joinRoomResponse' , "NoPlace");
			}
		}
	}*/
    /*socket.room = selectedroom;
    socket.join(selectedroom);
    io.sockets.in(socket.room).emit('joinRoomResponse', socket.room);
	socket.emit('joinRoomResponse' , socket.room);*/
   
  });

  socket.on('helloRoom', function(roomname){
    console.log('helloRoom');
    io.sockets.in(roomname).emit('helloRoomResponse', 'hello room');
  });

  socket.on('sendData', function(theData){
    console.log('sendData', theData);
    io.sockets.in(roomname).emit('sendDataResponse', theData);
  });
  
  socket.on('closed', function(theData){
    console.log('Connection Closed', theData);
	var index;
	for (var num  = 0 ; num < rnames.length ; num++){
		index = roomnames.indexOf(rnames[num]);
		if (index > -1) {
		  roomnames.splice(index, 1);
		}
	}
  });
  
});

function makeid(){
    var text = "";
    //no 0 or O;
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    
    return text;
}