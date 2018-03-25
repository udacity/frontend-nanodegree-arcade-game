frontend-nanodegree-arcade-game
===============================

Students should use this [rubric](https://review.udacity.com/#!/projects/2696458597/rubric) for self-checking their submission. Make sure the functions you write are **object-oriented** - either class functions (like Player and Enemy) or class prototype functions such as Enemy.prototype.checkCollisions, and that the keyword 'this' is used appropriately within your class and class prototype functions to refer to the object the function is called upon. Also be sure that the **readme.md** file is updated with your instructions on both how to 1. Run and 2. Play your arcade game.

For detailed instructions on how to get started, check out this [guide](https://docs.google.com/document/d/1v01aScPjSWCCWQLIpFqvg3-vXLH2e8_SZQKC8jNO0Dc/pub?embedded=true).

This project is to be used to make it compatible to play online

==============================
Grow with Google Project
==============================
In order to run this project locally, you need to use a localhost since the Service Worker only works with https and localhost. This is how I did it:

/*Steps for express.js
*/

one directory above your root directory, 
1.npm init
	Follow the promt. You should get a package.json file

2.npm install --save express
	install express and dependencies

3.create server.js and add the following code:
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/frontend-nanodegree-arcade-game')); //__dir and not _dir
var port = 8000; // you can use any port
app.listen(port);
console.log('server on' + port);

4.node server
	It should output "sever on 8000"

5.start http://localhost:8000/ : your index.html will be called
