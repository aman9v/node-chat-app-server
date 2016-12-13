const expect = require('expect');

const {Users} = require('./users');

describe('Users CLASS', function(){
//Seed data with beforeEach
  var testUsers;
  beforeEach(function(){
    testUsers = new Users();
    testUsers.users = [{
      id: '1',
      name: 'Mike',
      room: 'Chat Room 1'
    }, {
      id: '2',
      name: 'Suzy',
      room: 'CourseChat'
    }, {
      id: '3',
      name: 'Nolan',
      room: 'Chat Room 1'
    },{
      id: '4',
      name: 'FakeUser',
      room: 'Chat Room 1'
    }];
  });

  it('addUser --> Should ADD a NEW User', function(){
    var localUsers = new Users();
    var user = {
      id: '123',
      name: 'Nolan',
      room: 'The Office Fans'
    };
    var l = testUsers.users.length +1;
    var responseUser = testUsers.addUser(user.id, user.name, user.room);
    expect(responseUser).toEqual(user);
    expect(testUsers.users.length).toEqual(l); //toEqual for arrays
  });
  it('addUser --> Should REJECT a NEW User (invalid Name)', function(){
    var user = {
      id: '123',
      name: '',
      room: 'The Office Fans'
    };
    var l = testUsers.users.length;
    var responseUser = testUsers.addUser(user.id, user.name, user.room);
    expect(responseUser).toBeA('string'); //toEqual for arrays
    expect(testUsers.users.length).toEqual(l);
  });

  it('getUser --> Should FETCH a User by the User id', function(){
    var id = '3';
    var u = testUsers.getUser(id);
    expect(u).toBeAn('array');
    expect(u.length).toBe(1);
    expect(u[0].id).toBe(id);
  });
  it('getUser --> Should NOT return a User by a Missing User id', function(){
    var id = '0000';
    var u = testUsers.getUser(id);
    console.log('\t',u);
    expect(u).toNotBeAn('array');
    //expect(u).toBeA(String);
  });

  it('getUserList --> Should FETCH all the Users in the specified Chat Room', function(){
    var room = 'Chat Room 1';
    var list = testUsers.getUserList(room);
    expect(list).toBeAn('array');
    expect(list.length).toBe(3);
  });

  it('getUserList --> Should ALERT User with an INVALID Chat Room Request', function(){
    var room = 'Chat Room 9';
    var list = testUsers.getUserList(room);
    expect(list).toBeAn('array');
    expect(list.length).toBe(0);  //no rooms with that name
  });


  it('Should remove an EXISTING User', function(){
    var id = '1';
    var temp = testUsers.users.length -1;
    var u = testUsers.removeUser(id);

    console.log('TEST: User was removed: ', u);
    expect(u.id).toBe(id);
    expect(testUsers.users.length).toBe(temp);
  });
  it('Should NOT an Fake User', function(){
    var id = '9';
    var temp = testUsers.users.length;
    var u = testUsers.removeUser(id);

    console.log('TEST: User was removed: ', u);
    expect(u).toBe(undefined);
    expect(testUsers.users.length).toBe(temp);
  });

  it('Should return names for Chat Room 1', function(){
    var userList = testUsers.getUserListMead('Chat Room 1');
    expect(userList).toEqual(['Mike', 'Nolan', 'FakeUser']);
  })
});
