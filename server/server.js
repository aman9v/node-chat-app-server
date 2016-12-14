//set up this server to set up the PUBLIC DIRECTORY
const path = require('path');   //built in mod, no need to install
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {Users} = require('./utils/users');
const {isRealString} = require('./utils/validation');
const {generateMessage} = require('./utils/message');
const {generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
console.log(`__dirname, ../public \n\t ${publicPath}`);
var app = express();
var server = http.createServer(app);  //now using the http server INSTEAD of express
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', function(socket){ //reps indiv socket rather than all users connected to the server
  console.log(`\n\nNew User Connected:    ${socket.id}\n`);

  socket.on('join', function(params, callback){
    //validate data (name and room) --> create new utils file for duplicate code
    if(!isRealString(params.name) || !isRealString(params.room)){
      //call the callback with a str message
      return callback('Name and Room Name are required');
    }

    socket.join(params.room);
    // socket.leave(params.room);
    //target specific users (users only in that room)
        //io.emit --> sends the message to everyone on socket server
        //socket.broadcast.emit --> sends message to everyone EXCEPT the current user
        //socket.emit --> emits an event specifically to one users
    //io.to(params.room).emit --> sends everything to the people in that room
    //socket.broadcast.to(params.room).emit

    //ADD A USER TO THE LIST when they joined the chatroom
      //make sure there is not already a user with that socket id
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
            //not supposed to run if there is a validation error
                    //add a return to the socket.on isRealString code up top
    //emit the event with newly updated user List
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    socket.emit('newMessage',
                generateMessage(`ADMIN ${port}\n`,
                                `\tHello, USER(${params.name})! \n\tWelcome to the ${params.room}! `));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('ADMIN', `${params.name} has joined`));
    callback(); //no arg because we set up the first arg to be an error arg in chat.js
  });

  socket.on('createMessage', function(createdMessage, callback){
   var user = users.getUserMead(socket.id);
   console.log(user);
   console.log(user.name);
   console.log(user.room);
   if(user){
     if(isRealString(createdMessage.text)){
       io.to(user.room).emit('newMessage', generateMessage(user.name, createdMessage.text));
     }
   }
    // callback('This is from the server, firing a callback after emitting the created message from a user');
    callback(); //dont need to pass an arg,
                  //Acknowledgement function still gets called in index.js
                  //client only needs to know that the call was made, not any new data
  });

  //GEOLOCATION EVENT listener
  socket.on('createLocationMessage', function(user, coords){
    console.log(`${user}\n\t`, coords);
    var us = users.getUserMead(socket.id);
    console.log('GeoLocation USER: ', us);
    //io.emit('newMessage', generateMessage(`USER(${user}): `, `${coords.latitude}, ${coords.longitude}`));
    io.to(us.room).emit('newLocationMessage', generateLocationMessage(us.name,
                                                          coords.latitude, coords.longitude));
  });

  socket.on('disconnect', function(){ //'disconnect' is the event to listen to
    console.log(`CLIENT: ${socket.id} was DISCONNECTED from server`);
    var user = users.removeUser(socket.id);

    if(user){
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('ADMIN', `${user.name} has left the ${user.room}`));
    }
  });
});

server.listen(port, function(){
  console.log(`Connected to Server on PORT ${port}`);
});
