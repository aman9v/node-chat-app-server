//ES6 classes
var {isRealString} = require('./validation');
class Rooms {
  constructor (){
    this.rooms = [];
  }
  isTaken(name){
    var list = this.rooms.filter((room)=> room.name === name);
    if(list.length > 0) {
      return true;
    }
    return false;
  }
  addRoom(name){
    var message = "";
    var messages = [];
    if(isRealString(name)){
      if(this.isTaken(name)===false){
        var room = {name, messages}
        this.rooms.push(room);
        return room;
      }else {
        message = 'Room is Taken';
      }
    }
    return message;
  }
  getRoomsList(){
    console.log(this.rooms);
    return this.rooms;
  }

  getRoom(name){
    var matches = this.rooms.filter(function(r){
      return r.name === name
    });
    return matches[0];
  }

  roomIsEmpty(room){
    var gotRoom = this.getRoom(room);
    var userList;
    if(gotRoom != undefined) {
        userList = getUserList(gotRoom);
    }else{
      console.log(room, ' Chat Room does not exist');
    }
    console.log(`Is ${gotRoom} empty?`);
    if(userList && userList.length > 0) return false;
    else return true;
  }
  ///REMOVE----------------------------------
  removeRoom(name){
    //return the object after you remove it from the list
    var gotRoom = this.rooms.filter(function(ro){
      return ro.name === name.name;
    });
    console.log(this.rooms);
    console.log('ROOM to Be REMOVED: ', gotRoom);
    var room;
    if(!gotRoom.length > 0){
      console.log(`\tChatRoom(${name.name}) NOT FOUND -- could NOT return a ChatRoom`);
      return undefined;
    }
    room = gotRoom[0];
    var index = this.rooms.indexOf(room);
    console.log(room, index);
    this.rooms.splice(index, 1);
    console.log(this.rooms);
    return room;
  }

  updateMessages(name, message){
    // var r = this.getRoom(name);
    console.log('\n\nRoom Name to be updated: ', name);
    var matches= this.rooms.filter(function(r){
      return r.name === name;
    });
    var r = matches[0];
    console.log('\n', r);      //HOW THE FUCK IS THIS UNDEFINED
    console.log('\n\n\n');
    if(r){
      console.log('Should have updateMessages for ROOM', r.name);
      console.log(message);
      r.messages.push(message);
      return r;
    }
  }
}

module.exports = {Rooms};
