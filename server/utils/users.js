

//addUser(id, name, room)

//removeUser(id, name, room) --> update the people list
//getUser(id)
//getUserList(room) --> all users in the room

// below method works fine, BUT we will use the ES6 method to store users (create a class)
// var users = [];
// var addUser = function(id, name, room){
//     users.push({});
// };
// modules.export = {addUsers};

//ES6 classes
var {isRealString} = require('./validation');
class Users {
  constructor (){
    this.users = [];
  }
  addUser(id, name, room){
    var message = "";
    var messages = [];
    if(isRealString(name)){
      if(isRealString(room)){
        var user = {id, name, room, messages};
        this.users.push(user);
        return user;
      }else {
        message = 'Invalid Room Request';
      }
    }else {
      message = 'Invalid Display Name';
    }
    return message;
  }

  ///REMOVE----------------------------------
  removeUser(id){
    //return the object after you remove it from the list
    var gotUser = this.users.filter(function(user){
      return user.id === id;
    });
    console.log(this.users);
    console.log('USer to Be REMOVED: ', gotUser);
    var us;
    if(!gotUser.length > 0){
      console.log(`\tID(${id}) NOT FOUND -- could NOT return a USER`);
      return undefined;
    }
    us = gotUser[0];
    var index = this.users.indexOf(us);
    this.users.splice(index, 1);
    console.log(this.users);
    return us;
  }


  getUser(id){
    var gotUser = this.users.filter(function(user){
      return user.id === id;
    });
    if(!gotUser.length > 0){
      return (`Missing User with id ${id}`);
    }
    return(gotUser);
  }
  getUserList(room){
    var userList = this.users.filter(function(user){
      return user.room === room;
    });
    if(!userList.length > 0) {
      console.log(`No Users in Chat Room: ${room}`);
    }
    console.log(userList);
    return userList;
  }
  getUserListMead(room){
    var userList = this.users.filter((user)=>user.room === room);
    var namesArray = userList.map((user)=>user.name);

    return namesArray;
  }
  getUserMead(id){
    return this.users.filter((user)=> user.id===id)[0];
  }
  updateMessages(id, message){
    var user = this.getUserMead(id);

    if(user){
      console.log('Should have updateMessages for user');
      console.log(message);
      user.messages.push(message);
      return user;
    }
  }
  // updateMessages(message){
  //   var user = message.from
  // }
}

module.exports = {Users};
// class Person {
//     constructor (name, age){
//       console.log(name, age);
//       this.name = name;
//       this.age = age;
//     }
//     getUserDescription(){
//       return `${this.name} is ${this.age} year(s) old`
//     }
// };
//
// var me = new Person('Nolan', 23);
// console.log('this.name', me.name);
// console.log('this.age', me.age);
// console.log(me.getUserDescription());
