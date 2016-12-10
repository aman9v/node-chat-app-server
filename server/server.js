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
  console.log(`New User Connected`);  //connection event also exists on client
                                      //client can do something when successfully Connected
                                      //ADD this event inside of index.html (socket.on('connect'))
  socket.on('disconnect', function(){
    console.log('Client was DISCONNECTED');
  });
});

//listen for a disconnecting client
  //do something when they leave
  //register that event INSIDE of callback above ^^^

//app.listen(port, function(){  --> not using the EXPRESS server anymore
server.listen(port, function(){
  console.log(`Connected to Server on PORT ${port}`);
});
