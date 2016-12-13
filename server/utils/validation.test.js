var expect = require('expect');

var {isRealString} = require('./validation');

describe('TEST \t isRealString(str)', function(){

  it('Should return \'No ERROR\' when the string is not empty AND contains characters',
  function(){
    var str = "    TestingString    ";
    var message = isRealString(str);
    console.log(message);
    expect(message).toBe(true);
  });

  it('Should return the ERROR when the string is EMPTY',
  function(){
    var str = "    ";
    var message = isRealString(str);
    console.log(message);
    expect(message).toBe(false);
  });
  it('Should reject a string made of non-string characters',
  function(){
    var str = 98;
    var message = isRealString(str);
    console.log(message);
    expect(message).toBe(false);
  });
});
