// Enemies our player must avoid
var x_cell = 101;
var y_cell = 83;
var Enemy = function() {
    'use strict';
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x=0;
    this.y=x_cell/2+Math.round(Math.random())*y_cell+Math.round(Math.random())*y_cell;
    this.speed=100+500*Math.random();
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x=this.x+this.speed*dt;
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.col=Math.round(this.x/x_cell);
    this.row=Math.round(this.y/y_cell);
    player.col=Math.round(player.x/x_cell);
    player.row=Math.round(player.y/y_cell);
    if (this.col>5){
        this.x=0;
        this.y=y_cell/2+Math.round(Math.random())*y_cell+Math.round(Math.random())*y_cell;
    }
    if (this.col==player.col&&this.row==player.row){
        player.x=x_cell*2;
        player.y=y_cell*5-y_cell/2;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x=x_cell*2;
    this.y=y_cell*5-y_cell/2;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(), new Enemy(),new Enemy()];
var player=new Player();

Player.prototype.handleInput = function(key) {
   console.log(this.col,this.row);

    if (key=='up'&&this.row>0){
        this.y=this.y-y_cell;
    }
    if (key=='down'&&this.row<5){
        this.y=this.y+y_cell;
    }
    if (key=='left'&&this.col>0){
        this.x=this.x-x_cell;
    }
    if (key=='right'&&this.col<4){
        this.x=this.x+x_cell;
    }
    this.col=Math.round(this.x/x_cell);
    this.row=Math.round(this.y/y_cell);
    if (this.row===0){
        this.x=x_cell*2;
        this.y=y_cell*5-y_cell/2;
    }

};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});