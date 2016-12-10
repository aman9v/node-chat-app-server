//set up this server to set up the PUBLIC DIRECTORY
const path = require('path');   //built in mod, no need to install
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
console.log(`__dirname, ../public \n\t ${publicPath}`);

var app = express();
// var server = http.createServer(function(request, response){});//create a server using http library});
var server = http.createServer(app);  //now using the http server INSTEAD of express
//Now set up server to use SOCKET.IO
var io = socketIO(server);    //get back our websockets Server
//localhost:3000/socket.io/socket.io.js
  //add a script tag loading up the file in the browser (index.html)

app.use(express.static(publicPath));
io.on('connection', function(socket){ //reps indiv socket rather than all users connected to the server
  console.log(`\n\nNew User Connected\n`);  //connection event also exists on client
                                      //client can do something when successfully Connected
                                      //ADD this event inside of index.html (socket.on('connect'))

  //CUSTOM EVENT method call
    //EMIT: instead of listening to an event, creating an event
    //      emit(nameof Event we want to emit, specifyCUSTOM DATA)
  socket.emit('newEmail', {
    "from": "nolan@example.com",
    "text": "just some email text",
    "createAt": 123
  }); //send this data from server to client
  //CHALLENGE newMessage (emitted by server, listened to on client)
  socket.emit('newMessage', {
    from: "whoMessageisFrom@email.com",
    text: "newMessage event emitted from the server when a user connects and listen to it on the client",
    createdAt: 123234
  });

  //CUSTOM EVENT listener
  socket.on('createEmail', function(createdEmail){
    console.log('createEmail', createdEmail); //need to emit this on the client in index.js socket.on('connect' callback function)
  });
  //CHALLENGE createMessage (come from client TO the server)
      //user1 fires createMessage event from my browser to SERVER --> server fires newMessage events to everyone else
      //emit from client and listened to by server
  socket.on('createMessage', function(createdMessage){
    //createdAt is created on server so users cannot spoof it anywhere else
    console.log('createMessage', createdMessage);
  });

  socket.on('disconnect', function(){ //'disconnect' is the event to listen to
    console.log('\n\nClient was DISCONNECTED\n');
  });
});

//listen for a disconnecting client
  //do something when they leave
  //register that event INSIDE of callback above ^^^

//app.listen(port, function(){  --> not using the EXPRESS server anymore
server.listen(port, function(){
  console.log(`Connected to Server on PORT ${port}`);
});
