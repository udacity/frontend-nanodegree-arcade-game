// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

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
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {;  
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}



var tileWidth = 101;
var topArea = 60;
var tileHeight = 80;
  
// Now write your own player class
var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.x = tileWidth*2;
  this.y = topArea + tileHeight*2;
}

// This class requires an update(), render() and
// a handleInput() method.


Player.prototype.update = function() {

}

Player.prototype.render = function(direction) {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  console.log('Player is at (' +this.x +"," +this.y +')');
}

Player.prototype.handleInput = function(direction) {
  if (direction == 'left') {
    console.log("player pressed left");
    console.log("this.x was at " +this.x +". tileWidth was " +tileWidth);
    if (this.x > 0 ) { // ensure that we don't go left of the first tile
      this.x = this.x - tileWidth;
      console.log("valid move");
    }
    console.log("this.x is at " +this.x +". tileWidth is " +tileWidth);
  }
  if (direction == 'up') {
    console.log("player pressed up");
    console.log("this.y was at " +this.y +". tileHeight was " +tileHeight);
    if (this.y > 0 ) { // ensure that we don't go left of the first tile
      this.y = this.y - tileHeight;
      console.log("valid move");
    }
    console.log("this.y is at " +this.y +". tileHeight is " +tileHeight);
  }
  if (direction == 'right') {
    console.log("player pressed right");
    console.log("this.x was at " +this.x +". tileWidth was " +tileWidth);
    if (this.x < tileWidth*4 ) { // ensure that we don't go right of the last tile
      this.x = this.x + tileWidth;
      console.log("valid move");
    }
    console.log("this.x is at " +this.x +". tileWidth is " +tileWidth);
  }
  if (direction == 'down') {
    console.log("player pressed down");
    console.log("this.y was at " +this.y +". tileHeight was " +tileHeight);
    if (this.y < (tileHeight*4 + topArea) ) { // ensure that we don't go left of the first tile
      this.y = this.y + tileHeight;
      console.log("valid move");
    }
    console.log("this.y is at " +this.y +". tileHeight is " +tileHeight);
  }
}

// Now instantiate your objects.

// Instantiate each enemy
// Rows are counted from the top
var enemyTop = new Enemy();
var enemyMiddle = new Enemy();
var enemyBottom = new Enemy();

// Place all enemy objects in an array called allEnemies
var allEnemies = [enemyTop, enemyMiddle, enemyBottom];

// Place the player object in a variable called player
var player = new Player();

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
