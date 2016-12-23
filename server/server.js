//set up this server to set up the PUBLIC DIRECTORY
const path = require('path');   //built in mod, no need to install
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {ObjectId} = require('mongodb');
const {mongoose} = require('./db/mongoose');
const {isRealString} = require('./utils/validation');
const {ModeledMessage} = require('./models/messageModel');
const {User} = require('./models/users');
const {ModeledRoom} = require('./models/rooms');

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

  var listUsers = function(){
    return User.find({}).then((docs)=>{
      console.log('USERS List: \n', docs);
      return docs;
    })
  }
  var getUserList = function(roomName){
    return User.find({roomName}).then((docs)=>{
      console.log('USERS List: \n', docs);
      return docs;
    })
  }

  var addRoom = function(roomName, userID){
    return new ModeledRoom({
      roomName: roomName,
      occupants: [userID]
    }).save();
  }

app.use(express.static(publicPath));
io.on('connection', function(socket){ //reps indiv socket rather than all users connected to the server
  console.log(`\n\nNew User Connected\n`, socket.id);  //connection event also exists on client
                                      //client can do something when successfully Connected
                                      //ADD this event inside of index.html (socket.on('connect'))

    var userID = new ObjectId();
    socket.on('join', function(params, callback){
      //validate data (name and room) --> create new utils file for duplicate code
      if(!isRealString(params.name) || !isRealString(params.room)){
        //call the callback with a str message
        return callback('Name and Room Name are required');
      }
      console.log('PARAMS at LOGIN: ', params.name, params.room);
      var name = params.name;
      //return this.users.filter((user)=> user.id===id)[0];
      var taken = false;
      var room = params.room.toUpperCase();
      //IS USER TAKEN??
      // taken = users.users.filter((user)=> user.name===name && user.room === room);
      // if(taken.length > 0){ return callback('Display Name already exists in that Chat Room');}
      // console.log(taken);

      var boo = ModeledRoom.find({}).then((docs)=>{
        console.log('\nrunning ModeledRoom.find\n',docs);
        var filtered = docs.filter((ro)=> ro.roomName === room);
        if(filtered.length === 0){
          addRoom(room, userID);
          console.log('UPDATE THE ROOMS LIST', filtered);
          // socket.emit('updateRoomsList', rooms.getRoomsList());
        }
      });



      socket.join(room);

      //REMOVE and ReADD user

      io.to(room).emit('updateUserList', getUserList(room));

      // socket.emit('newMessage',
      //             generateMessage(`ADMIN ${port}\n`,
      //                             `\tHello, USER(${params.name})! \n\tWelcome to the ${room}! `));
      // socket.broadcast.to(room).emit('newMessage', generateMessage('ADMIN', `${params.name} has joined`));
      callback(); //no arg because we set up the first arg to be an error arg in chat.js
    });

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
