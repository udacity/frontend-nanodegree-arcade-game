
// Enemies our player must avoid

var myCanvas = $('canvas');
var myCanvasWidth = myCanvas.width();
var myCanvasHeight = myCanvas.height();

var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 0;
    this.y = 0;
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
    this.x += 200*dt;
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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
  this.y = 405;
  this.dx = 0;
  this.dy = 0;
  this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
  this.x += this.dx;
  this.y += this.dy;
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  this.dx = 0;
  this.dy = 0;
  //console.log("x: ",this.x,"y: ",this.y);
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
  // Check the bounds, don't allow character to go out of screen
  //console.log(key);
  // x-max = 404
  // x-min = 0
  // y-min = 405
  // y-max = -10

  if(key === 'left'){
    if( this.x > 0 ){
      this.dx = -101;
    }
  } else if (key === 'up') {
    if( this.y > -10 ){
      this.dy = -83;
    }
  } else if (key === 'down') {
    if( this.y < 405 ){
      this.dy = 83;
    }
  } else {
    if( this.x < 404 ){
      this.dx = 101;
    }
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var b1 = new Enemy();
var player = new Player();
var allEnemies = [b1];


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
