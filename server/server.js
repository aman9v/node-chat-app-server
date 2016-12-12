//set up this server to set up the PUBLIC DIRECTORY
const path = require('path');   //built in mod, no need to install
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const {generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
console.log(`__dirname, ../public \n\t ${publicPath}`);

var app = express();
var server = http.createServer(app);  //now using the http server INSTEAD of express
var io = socketIO(server);
app.use(express.static(publicPath));

io.on('connection', function(socket){ //reps indiv socket rather than all users connected to the server
  console.log(`\n\nNew User Connected:    ${socket.id}\n`);

  socket.emit('newMessage',
              generateMessage(`ADMIN: ${port}\n`,
                              `\tHello, USER(${socket.id})! \tWelcome to the Message App! `));

  socket.on('createMessage', function(createdMessage, callback){
    console.log('createMessage', createdMessage);

    io.emit('newMessage', generateMessage(createdMessage.from, createdMessage.text));
    // callback('This is from the server, firing a callback after emitting the created message from a user');
    callback(); //dont need to pass an arg,
                  //Acknowledgement function still gets called in index.js
                  //client only needs to know that the call was made, not any new data

  });

  //GEOLOCATION EVENT listener
  socket.on('createLocationMessage', function(user, coords){
    console.log(`${user}\n\t`, coords);
    //io.emit('newMessage', generateMessage(`USER(${user}): `, `${coords.latitude}, ${coords.longitude}`));
    io.emit('newLocationMessage', generateLocationMessage(`USER(${user})`,
                                                          coords.latitude, coords.longitude));  
  });

  socket.on('disconnect', function(){ //'disconnect' is the event to listen to
    console.log(`CLIENT: ${socket.id} was DISCONNECTED from server`);
  });
});

server.listen(port, function(){
  console.log(`Connected to Server on PORT ${port}`);
});
