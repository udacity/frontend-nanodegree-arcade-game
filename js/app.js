// Avoid hardcoding these values.
// TODO: pull these with code in either resources.js or engine.js
var gameWidth = 505;
var gameHeight = 606;
var blockWidth = 83;
var blockHeight = 101;

// Enemies our player must avoid
var Enemy = function(x, y) {
    // x,y coordinate location of this object
    this.x = x;
    this.y = y;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
 }

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var newX = Math.abs(this.x) + Math.abs(dt * 100);
     
    // we want the enemy to continue moving until it's left edge is off the screen
    if (newX < gameWidth) {
        this.x = newX;
    }
    // and start showing again with the right edge first
    else {
        this.x = 0 - Resources.get(this.sprite).width;
    }

}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    console.log("Enemy render at " + this.x + ", " + this.y);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y) {
    // Horizontal location on canvas
    var x = x
   
    // Vertical location on canvas 
    var y = y

    // url to our player's resource
    this.sprite = 'images/char-cat-girl.png';
}

Player.prototype.update = function(dt) {
    // maybe check for collisions here?
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function (keycode) {
    switch (keycode) {
        case 'left':
            this.x = this.x - blockWidth;
            console.log("left button hit");
            break;
        case 'right':
            this.x = this.x + blockWidth;
            break;
        case 'down':
            this.y = this.y + blockHeight;
            break;
        case 'up':
        default:
            this.y = this.y - blockHeight;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (var i = 0; i < 5; i++) {
     allEnemies.push(new Enemy(0, 3*blockHeight));
}

var player = new Player(gameWidth / 2, gameHeight - blockHeight);

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


