//Play around with timestamps and formatting with MOMENT
//VALID timestamps: 0 - 903453579 or something
    //numbers are relative of one point in history, the Unix Epic (Jan 1st 1970 00:00:00am)
    //-1000 is 1 second into the past from the Unix Epic

//JS uses milis, not seconds
//new timestamp:
console.log(new Date().getTime());  //not really readable, must be formatted

var date = new Date();
console.log('\n', date.getMonth());

//no need to create new utility methods to format date
//INSTEAD, install moment@2.15.1 --save
          //momentjs.com/docs/#/displaying/
          //momentjs.com/docs/#/manipulating/
var moment = require('moment');
var betterDate = moment();
console.log(betterDate.format());
console.log(betterDate.format('M'));
console.log(betterDate.format('MMM'));
console.log(betterDate.format('MMMM'));

console.log(betterDate.format('MMM Do, YYYY'));

betterDate.add(1, `year`);
console.log(betterDate.format('MMM Do, YYYY'));

//10:35 am
//6:01 am, not 6:1 am
betterDate.subtract(365, 'day');
console.log(betterDate.format('h:mm a --> (MMM D, \'YY)'));


var someTimestamp = moment().valueOf();
console.log(someTimestamp);
var createdAt = 1234;
var someDate = moment(createdAt);
console.log(someDate.format('h:mm a'));
