// Enemies our player must avoid
var Enemy = function() {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';

  this.x = -101; //EN: starting point outside the canvas
  this.y = 2; //EN: one of three rows, 0 to 2
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt, canvas) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += 200 * dt; //EN: default speed
    if (this.x > (canvas.width + 303)) this.x = -101;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function(ratio) {
  ctx.scale(ratio, ratio);
  ctx.drawImage(Resources.get(this.sprite), 72 + this.x, 212 + this.y * 83);
  ctx.scale(1 / ratio, 1 / ratio);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
allEnemies.push(new Enemy());
var player = {
  update: function() {},
  render: function() {},
  handleInput: function() {}
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
