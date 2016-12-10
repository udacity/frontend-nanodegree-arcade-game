// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 0;
    this.y = ypositions[Math.floor(Math.random() * ypositions.length)];
    
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    movement = Math.floor((Math.random() * 250) + 150) * dt;
    this.x += movement;
    if (this.x > 505){
        this.x = 0;
        this.y = ypositions[Math.floor(Math.random() * ypositions.length)];
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
    
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 200;
    this.y = 300;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';

};

Player.prototype.update = function() {

    if (this.y < 15){
        this.restart();
    }
    if (this.y > 395){
        this.y = 395;
    }
    if (this.x < 10){
        this.x = 10;
    }
    if (this.x > 390){
        this.x = 390;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.restart = function(){
    this.x = 200;
    this.y = 300;
};

Player.prototype.handleInput = function(key){
    switch (key){
        case 'left':{

            this.x -= spaces;
            break;
        }
        case 'right':{
            this.x += spaces;
            break;
        }
        case 'up':{
            this.y -= spaces;
            break;
        }
        case 'down':{
            this.y += spaces;
            break;
        }
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var ypositions = [60,140,220];
var spaces = 95;

var bug1 = new Enemy();
var bug2 = new Enemy();
var bug3 = new Enemy();
var allEnemies = [bug1, bug2, bug3];

var p1 = new Player();
var player = p1;


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
