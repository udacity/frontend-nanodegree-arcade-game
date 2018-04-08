// Enemies our player must avoid
var Enemy = function(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.sprite = 'images/enemy-bug.png';
    this.x = -101 - Math.random() * 1000;
    this.y = y;
    this.speed = Math.random() * (300 - 50) + 50;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
  if (this.x > 600) {
      this.speed = Math.random() * (300 - 50)  + 50
      this.x = -150 - Math.random() * 1000;
  }

  // Multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x = this.x + this.speed * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function () {
  this.x = 202;
  this.y = 320;
  this.sprite = 'images/char-boy.png'
}

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
  if (direction === 'left' && this.x >= 101) {
    this.x -= 101;
  } else if (direction === 'right' && this.x <= 303) {
    this.x += 101;
  } else if (direction === 'up' && this.y >= 71) {
    this.y -= 83;
  } else if (direction === 'down' && this.y <= 320) {
    this.y += 83;
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let bug1 = new Enemy(60);
let bug2 = new Enemy(140);
let bug3 = new Enemy(230);
let bug4 = new Enemy(60);
let bug5 = new Enemy(140);
let bug6 = new Enemy(230);
let allEnemies = [bug1, bug2, bug3, bug4, bug5, bug6];
let player = new Player();


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
