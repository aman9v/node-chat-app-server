//add test for message functions
var expect = require('expect');

//load in the module we are testing
var {generateMessage, generateLocationMessage} = require('./message');

//TEST: generateMessage()
describe('TEST \tgenerateMessage(from, text)', function(){
  it('Should generate correct message object', function(){
    //store response in var
    //assert from match
    //assert text match
    //assert createdAt is number
    var from = 'messageTester file';
    var text = 'Some message';
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    // expect(message.from).toBe(from);
    // expect(message.from).toBe(text);
    //replace^^^ with:
                      // expect(message).toInclude({
                      //   from: from,
                      //   text: text
                      // });
            //replace ^^ WITH:
            expect(message).toInclude({from, text});
  });
});

//Synchronous
describe('TEST \tgenerateLocationMessage', function(){
  it('Should generate the correct location object', function(){
    //pass in from, lat, longitude
    var from = 'messageTeserFILE';
    var latitude = '50';
    var longitude = '50';
    var message = generateLocationMessage(from, latitude, longitude);

    expect(message.createdAt).toBeA('number');
    expect(message.url).toBe('https://www.google.com/maps?q=50,50');
    // expect(message.from).toBe(from); //replaced with below code
    expect(message).toInclude({from});
  });
});
