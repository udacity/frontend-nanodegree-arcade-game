/** @author yayomanosalva@gmail.com 2015 */
// Enemies our player must avoid
'use strict';

//================
//=  ENEMY CLASS =
//================

var Enemy = function(x, y) {
    //Variables applied to each of our instances go here, we've provided one for you to get started
    //The image/sprite for our enemies, this uses a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed = 800; // velocity's enemy
};

var posEnemy = [];
Enemy.prototype.generate = function() {
    //validates enemy position
    if (posEnemy.length != 0) {
        this.random = Math.floor(Math.random() * posEnemy.length);
        var pos = posEnemy[this.random];
        posEnemy.splice(this.random, 4);
        this.x = pos[0];
        this.y = pos[1];
    } else {
        generatePos();
    }
    //method
    function generatePos() {
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 5; j++) {
                var pos = [-200 * (j += 1) - (Math.floor(Math.random() * 9)), i * 80 + 70];
                posEnemy.push(pos);
            }
        }
    }
}

// Update the enemy's position, required method for game Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter which will ensure 
    //the game runs at the same speed for all computers.
    //crea otros Enemy
    if (this.x > 600) {
        this.generate();
    }

    //actualiza x    
    this.x += dt * this.speed;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//================
//= PLAYER CLASS =
//================

// Now write your own player class
var Player = function() {
    // initial position
    this.x = 300;
    this.y = 490;
    this.playerImage = [
        'images/char-boy.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-minions.png'
    ];

    this.sprite = this.playerImage[2];
};

// This class requires an update(), render() and a handleInput() method.
Player.prototype.update = function() {
    //update
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

var goal = 0;
Player.prototype.handleInput = function(position) {
    
    switch (position) {
        case 'left':
            this.newPosX = this.x -= 100; // move left
            break;
        case 'right':
            this.newPosX = this.x += 100; // move left
            break;
        case 'up':
            this.newPosY = this.y -= 90; // move left
            break;
        case 'down':
            this.newPosY = this.y += 90; // move left
            break;
    }

    // constraints on movement
    if (this.x < 0) { 
        this.x = 1;
    }
    if (this.x > 600) { 
        this.x = 600;
    }
    if (this.y > 490) { 
        this.y = 490;
    }
    if (this.y < 1) { 
        console.log("Goal "+ player.winner());
    }
} 

Player.prototype.winner = function() {
    this.x = 300;
    this.y = 490;
    var result =  goal++;
    return result;
}

// reset the position of player
Player.prototype.reset = function() {
    // initial position
    this.x = 300;
    this.y = 490;
};

// Place all enemy objects in an array called allEnemies
//var enemy = new Enemy();
var allEnemies = [];
const NUM_BUG = 5;
// add enemies
// create a group of enemies
for (var i = 0; i < NUM_BUG; i++) {
    var enemy = new Enemy();
    // initialization
    enemy.generate();
    // add the enemy to array
    allEnemies.push(enemy);
}
Enemy.prototype.lastPos = function() {
    this.pos = [];
    this.pos.push(this.x);
    this.pos.push(this.y);
    return this.pos;
};

Player.prototype.lastPos = function() {
    this.pos = [];
    this.pos.push(this.x);
    this.pos.push(this.y);
    return this.pos;
};

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});


