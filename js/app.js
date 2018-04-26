// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
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
    if (this.x <= 550) {
      this.x = this.x + this.speed * dt;
    } else {
      this.x = -100;
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
  this.x = 202;
  this.y = 404;
  this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
  if (this.pressedKey === 'right') {
    this.x = this.x + 101;
  } else if (this.pressedKey === 'left') {
    this.x = this.x - 101;
  } else if (this.pressedKey === 'up') {
    this.y = this.y - 84;
  } else if (this.pressedKey === 'down') {
    this.y = this.y + 84;
  }

// Determining the boundaries of the game
  if (this.x < 0) {
    this.x = 0;
  } else if (this.x > 404) {
    this.x = 404;
  } else if (this.y < -14) {
    this.y = -14;
  } else if (this.y > 404) {
    this.y = 404;
  }

  this.pressedKey = 0;
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(e) {
  this.pressedKey = e;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

var player = new Player;

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
