//CLIENT-SIDE javascript
var socket = io();
socket.on('connect', function(){
  console.log(socket.id);
  console.log(`NEW CONNECTION (this message was sent from index.html)
  \t CLIENT: ${socket.id}`);
});

socket.on('disconnect', function(){
  console.log(`CLIENT: ${socket.id} --> DISCONNECTED from Server`);
});

socket.on('newMessage', function(message){
  console.log('New Message', message);

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
  anchorTag.attr('href', message.url);

  li.append(anchorTag);
  jQuery('#messages').append(li);
});


jQuery('#message-form').on('submit', function(eventArgument){
  eventArgument.preventDefault();   //stop the submit event from firing, now nothing happens
  var messageTextBox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: `User: ${socket.id}`,
    text: messageTextBox.val()
  }, function(){//add callback function
    messageTextBox.val('');
  });
});


//SEND LOCATION BUTTON CLICK listener
var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
  if(!navigator.geolocation){
    return alert('Geolocation is NOT SUPPORTED by your Browser');      //an alert box
  }

  //set attribute to disable button while sending
  // locationButton.attr('disabled', 'disabled');
  // locationButton.attr('text', 'Sending ...');
  locationButton.attr('disabled', 'disabled').text('Sending ... ');

  navigator.geolocation.getCurrentPosition(function(position){
    //if things go well, reference the locationButton
    locationButton.removeAttr('disabled');
    locationButton.text('Send Location');
    console.log(position);
    socket.emit('createLocationMessage', socket.id, {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }); //listen to this event in the server
  }, function(){  //error handler function
    alert('Unable to Fetch Location (user rejection)');
  })
});
