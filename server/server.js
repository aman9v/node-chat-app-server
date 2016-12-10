//set up this server to set up the PUBLIC DIRECTORY

console.log(`\nHow we USED to :\n ${__dirname} /../public
  \t Why go into Server DIR and then go back out to get to the PUBLIC dir?`);

console.log(`How we SHOULD: \nUse a Module (path.join())`);
const path = require('path');   //built in mod, no need to install
const publicPath = path.join(__dirname, '../public');
console.log(`__dirname, ../public
  \t ${publicPath}`);

//Install express module
//CHALLENGE --> set up express locally
const express = require('express');
    //create brand new express app,
    var app = express();
    //configure express static middleware to serve out the public folder
    app.use(express.static(publicPath));
    //call app.listen on 3000 and provide a callback function that displays confirmation
const port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log(`Connected to Server on PORT ${port}`);
});
