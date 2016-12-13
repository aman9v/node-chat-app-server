//CLIENT-SIDE javascript
var socket = io();

function scrollToBottom(){
  // Selectors
  var messages = jQuery('#messages');
  //variable that stres the selector for the LAST list item (the message that triggered this call)
  // var newMessage = jQuery('#messages')....
  var newMessage = messages.children('li:last-child');
  //Heights
        //messages.prop is a cross-browser way
        //to fetch a property (Alternative to jQuery bc it works for all browsers)
  //CALCULATION
    //this happens AFTER a new message is included
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();    //prev() method calls the previous child!!

  if((clientHeight + scrollTop + newMessageHeight + lastMessageHeight)>= scrollHeight){
    console.log('Should scroll to bottom!!');
    messages.scrollTop(scrollHeight); //moves to bottom of container area
  }
};


socket.on('connect', function(){
  console.log(socket.id);
  // console.log(`NEW CONNECTION (this message was sent from index.html)
  // \t CLIENT: ${socket.id}`);

  //Emit an  event that will start the process of JOINING a room
  var params = jQuery.deparam(window.location.search);
  //include Acknowledgement function
  socket.emit('join', params, function(err){
    if(err){
      alert(err);
      //direct them back to the root page
      window.location.href ='/';
    }else{  //no error
      console.log('No ERROR');
    }
  });
});

socket.on('disconnect', function(){
  console.log(`CLIENT: ${socket.id} --> DISCONNECTED from Server`);
});

//NEW LISTENER --> Update the User List
socket.on('updateUserList', function(users){
  console.log('Users List: ', users);
  var ol = jQuery('<ol></ol>');
  users.forEach(function(user){
    ol.append(jQuery('<li></li>').text(user.name));    //append the list item
  });
  //render it by ordering it to the dom
  jQuery('#users').html(ol);
})


socket.on('newMessage', function(message){
  console.log('New Message', message);
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    createdAt: formattedTime,
    from: message.from
  });
  jQuery('#messages').append(html);
  scrollToBottom();
});

//EVENT Listener for newLocationMessage EVENT
socket.on('newLocationMessage', function(message){
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#geomessage-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    createdAt: formattedTime,
    url: message.url
  });
  jQuery('#messages').append(html);   //jQuery selector selects element #messages
  scrollToBottom();
});


jQuery('#message-form').on('submit', function(eventArgument){
  eventArgument.preventDefault();   //stop the submit event from firing, now nothing happens
  var messageTextBox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: `User ${socket.id}`,
    text: messageTextBox.val()
  }, function(){//add callback function
    messageTextBox.val('');
  });
});


//SEND LOCATION BUTTON CLICK listener
var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
  if(!navigator.geolocation){
    return alert('Geolocation is NOT SUPPORTED by your Browser');  //an alert box
  }
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
