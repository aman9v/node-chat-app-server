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

//EVENT Listener for newLocationMessage EVENT
socket.on('newLocationMessage', function(message){
  var li = jQuery('<li></li>');
  var anchorTag = jQuery('<a target="_blank">My Current Location</a>');
        //^^^ setting anchors target var to blank directs browser to open link in a new tab
  li.text(`${message.from}: `);
  //update anchor tag by using attr to fetch attributes
      //one arg GETS value, 2 args SETS value
  anchorTag.attr('href', message.url);
  //append the anchor tag to end of list
  li.append(anchorTag);
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



//SEND LOCATION BUTTON CLICK listener
var locationButton = jQuery('#send-location');
// jQuery('#send-location').on    //making 2 jQuery calls to the same dom is wasteful
locationButton.on('click', function(){
  //check if the user has access to the geolocation API (only if they are on old browser)
  if(!navigator.geolocation){
    return alert('Geolocation is NOT SUPPORTED by your Browser');      //an alert box
  }
  navigator.geolocation.getCurrentPosition(function(position){
    //success case, emit the event
    //want to send lng, lat info to the server so server can send it out
    console.log(position);
    //info flows from client, emit long,lat to server, server emits newLocationMessage
    socket.emit('createLocationMessage', socket.id, {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }); //listen to this event in the server

  }, function(){  //error handler function
    alert('Unable to Fetch Location (user rejection)');
  })
});
