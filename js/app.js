// Enemies our player must avoid

var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = Math.floor((Math.random() * 225) + 25);
    this.vel = Math.floor((Math.random() * 100) + 10);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + dt * this.vel;
    if (this.x > 505) {
      this.x = -10;
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
  this.sprite = "images/char-boy.png";
  this.x = 205;
  this.y = 400;
  this.score = 0;
};

Player.prototype.update = function(dt) {
  if (this.x > 420) {
    this.x = 420;
  }
  if (this.x < -15) {
    this.x = -15;
  }
  if (this.y > 400) {
    this.y = 400;
  }
  if (this.y < -10) {
    this.y = 400;
    this.score += 1;
    console.log(this.score);
  }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
  switch (key) {
    case 'left':
      this.x -= 10;
      break;

    case 'right':
      this.x += 10;
      break;

    case 'up':
      this.y -= 10;
      break;

    case 'down':
      this.y += 10;
      break;

    default:
      console.log("Illegal keypress");
  }
};

Player.prototype.checkCollisions = function(enemyArray) {
  var zone = 70;
  for (var i = 0; i<enemyArray.length; i++) {
    if (
      this.x > enemyArray[i].x - zone &&
      this.x < enemyArray[i].x + zone &&
      this.y > enemyArray[i].y - zone &&
      this.y < enemyArray[i].y + zone) {
      //console.log("Hit");
      this.x = 205;
      this.y = 400;
    }
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();

allEnemies = [enemy1, enemy2, enemy3];

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
