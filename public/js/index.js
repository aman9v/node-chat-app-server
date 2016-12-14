var socket = io();
var template = jQuery('#open-rooms-template').html();

jQuery('#open-rooms-template').on('submit', function(eventArgument){
  eventArgument.preventDefault();   //stop the submit event from firing, now nothing happens
  var comboBox = jQuery('[name=chatrooms]');

  socket.emit('createMessage', {
    //from: `User ${socket.id}`,
    text: messageTextBox.val()
  }, function(){//add callback function
    messageTextBox.val('');
  });
});

// //  <div>
//     <form id="openrooms-form">
//       <select id="open-rooms" onclick="addToDropBox()">
//       </select>
//     </form>
//   </div>

socket.on('updateRoomsList', function(rooms){
  console.log('ROOMS List: ', rooms);
  var ol = jQuery('<ol></ol>');
  rooms.forEach(function(room){
    console.log(room);
    ol.append(jQuery('<li></li>').text(room.name));    //append the list item
    // var html = Mustache.render(template, {
    //   name: room.name
    // });
    console.log('ROOM trying to be updated: ', room);
    addToDropBox(room.name);
  });
  jQuery('#rooms').html(ol);
});

function addToDropBox(room){
  var x = document.getElementById("open-rooms");
  var option = document.createElement("option");
  option.text = room;
  console.log('ROOM trying to be updated: ', option);
  x.add(option);
}

console.log('THE INDEX.JS FILE WAS RUN');
