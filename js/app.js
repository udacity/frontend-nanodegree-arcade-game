// Enemies our player must avoid
var Enemy = function() {
  // The image/sprite for our enemies
  this.sprite = "images/enemy-bug.png";
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
// Requires update(), render() and handleInput() methods
var Player = function() {
  this.sprite = "images/char-boy.png";
};

// Update the player's position
Player.prototype.update = function(dt) {};

// Draw the player on the screen
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function() {};

// Now instantiate your objects.
var bug1 = new Enemy();
var bug2 = new Enemy();
var bug3 = new Enemy();
var bug4 = new Enemy();
var bug5 = new Enemy();
var bug6 = new Enemy();
var bug7 = new Enemy();

// Static position all enemies
bug1.x = 10;
bug1.y = 60;

bug2.x = 400;
bug2.y = 60;

bug3.x = 200;
bug3.y = 150;

bug4.x = 80;
bug4.y = 150;

bug5.x = -50;
bug5.y = 230;

bug6.x = 450;
bug6.y = 230;

bug7.x = 240;
bug7.y = 230;

// Place all enemy objects in an array called allEnemies
var allEnemies = [];
allEnemies.push(bug1, bug2, bug3, bug4, bug5, bug6, bug7);

// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
