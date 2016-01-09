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
    this.speed = 550; // velocity's enemy
};

var posEnemy = [];
Enemy.prototype.generate = function() {
    if (posEnemy.length != 0) {
        this.random = Math.floor(Math.random() * posEnemy.length);
        var pos = posEnemy[this.random];
        posEnemy.splice(this.random, 1);
        this.x = pos[0];
        this.y = pos[1];
    } else {
        generatePos();
    }
    function generatePos() {
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 5; j++) {
                var pos = [-300 * (j += 1) - (Math.floor(Math.random() * 3)), i * 90 + 50];
                posEnemy.push(pos);
            }
        }
    }
}

Enemy.prototype.checkCollision = function(player) {
    if (Math.abs(Player.x < this.x) < this.Width && Math.abs(Player.y - this.y) < this.height) {
        Player.reset();
        console.log("choque");
    }
};

// Update the enemy's position, required method for game Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt, player) {
    this.checkCollision(player);
    // You should multiply any movement by the dt parameter which will ensure 
    //the game runs at the same speed for all computers.
    //crea otros Enemy
    if (this.x > 600) {
        this.generate();
    }

    //actualiza x    
    this.x += dt * this.speed;
};

Enemy.prototype.getPos = function() {
    this.pos = [];
    this.pos.push(this.x);
    this.pos.push(this.y);

    return this.pos;
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
    Player.prototype.collision();
    this.checkCollision(Enemy);
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
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
    if (this.x < 0) { // left border
        this.x = 1;
    }
    if (this.x > 600) { // right border
        this.x = 600;
    }
    if (this.y > 490) { // bottom border
        this.y = 490;
    }

    if (this.y < 1) { // Player reaches the water, top border
        this.x = 300;
        this.y = 490;
        var goal = 0 ;
        goal = ++goal;
        console.log('goal'+ goal);
    }
}

Player.prototype.update = function() {
    //update
}

Player.prototype.getPos = function() {
    this.pos = [];
    this.pos.push(this.x);
    this.pos.push(this.y);
    return this.pos;
};

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

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});