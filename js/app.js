// constants
var CANVAS_WIDTH = 505;
var CANVAS_HEIGHT = 606;
var NUM_ROWS = 6;
var NUM_COLS = 5;
var STREET_TILES_Y = [1, 2, 3];

// enemies the player must avoid
var Enemy = function() {
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  // Get a random position for x and y
  // The random position for x will delay when the bug appears on screen
  this.x = -50 - Math.random() * 300;

  // the tile (yPosition - 20) is perfect placement for a bug
  // or player
  // this.y = -20 + STREET_TILES_Y[Math.floor(Math.random() *
    //                            STREET_TILES_Y.length)];   

  this.y = -20 + STREET_TILES_Y[Math.floor(Math.random() *
                                STREET_TILES_Y.length)] * 82.5;   

  this.velocity = 100;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  this.x = this.x + this.velocity * dt;
  if (this.x > CANVAS_WIDTH) {
    this.x = -100 - Math.random() * 300;
    this.y = -20 + STREET_TILES_Y[Math.floor(Math.random() *
                                  STREET_TILES_Y.length)] * 82.5;   
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  // player.handleInput(allowedKeys[e.keyCode]);
});
