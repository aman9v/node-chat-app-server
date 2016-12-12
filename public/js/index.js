//CLIENT-SIDE javascript
var socket = io();
socket.on('connect', function(){
  console.log(socket.id);
  console.log(`NEW CONNECTION (this message was sent from index.html) \n\t CLIENT: ${socket.id}`);

  // socket.emit('createEmail', {to: "julie@sdf.com", text: "event emitted from browser console"});
        //^^can be entered through the browser console to the server console
  //CHALLENGE createMessage
  //user1 fires createMessage event from my browser
      //to SERVER --> server fires newMessage events to everyone else
});

socket.on('disconnect', function(){
  console.log(`CLIENT: ${socket.id} --> DISCONNECTED from Server`);
});


//EVENT Acknowledgements
// socket.emit('createMessage', {
//   from: `Frank`,
//   text: 'Event Emitter added for Event Acknowledgement functionality'
// }, function(callbackArg){
//   console.log(`Got IT!  `, callbackArg);
// });

//CHALLENGE newMessage
socket.on('newMessage', function(message){
  console.log('New Message', message);

  //create a list item on jquery to CREATE and MODIFY an element before rendering to markup
  var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`); //created an element but have not rendered it to the dom
    jQuery('#messages').append(li);
});


//call jQuery with the selector and an event listener
    //--listener should be calling on, and providing 2 args (eventName, function(){})
jQuery('#message-form').on('submit', function(eventArgument){
  eventArgument.preventDefault();   //stop the submit event from firing, now nothing happens

  socket.emit('createMessage', {
    from: `User: ${socket.id}`,
    text: jQuery('[name=message]').val()
  }, function(){//add callback function

  });
});
