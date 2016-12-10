//CLIENT-SIDE javascript
var socket = io();
socket.on('connect', function(){
  console.log('Connected to the Server (this message was sent from index.html)');

  socket.emit('createEmail', {
    to: 'jen@example.com',
    text: 'client-side script connects to the server and emits this createEmail event'
  });

  // socket.emit('createEmail', {to: "julie@sdf.com", text: "event emitted from browser console"});
        //^^can be entered through the browser console to the server console
  //CHALLENGE createMessage
  //user1 fires createMessage event from my browser
      //to SERVER --> server fires newMessage events to everyone else
  socket.emit('createMessage', {
    from: 'aUsertotheServer',
    text: 'User on Browser fires event to server, server fires newMessage events to everyone else'
  });
});

socket.on('disconnect', function(){
  console.log('DISCONNECTED from the Server');
});

//listen to a CUSTOM event
//emit event from server, sending data to the client
socket.on('newEmail', function(email){
  var em = email;
  //template strings dont work //console.log(`\nCUSTOM EVENT: newEmail callback function is fired\n\t${em}`);
  console.log('New Email', email);
});


//CHALLENGE newMessage
socket.on('newMessage', function(message){
  console.log('New Message', message);
})
