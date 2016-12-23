var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;
var RoomSchema = new mongoose.Schema({
  roomName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    unique: true
  },
  occupants: [{type : mongoose.Schema.Types.ObjectId, unique: true }]
});

var ModeledRoom = mongoose.model('Room', RoomSchema);

module.exports = {ModeledRoom};
