//Enemy Code

//Enemies our player must avoid
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
    this.x += this.speed * dt
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Instantiate your enemy.
// Place all enemy objects in an array called allEnemies
var enemy;
var allEnemies = [];
var enemyStart = [30, 122.5, 215];

for (var position of enemyStart) {
  enemy = new Enemy(0, position, Math.floor(Math.random() * 250) + 75);
  allEnemies.push(enemy);
};

// Player code

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
  this.x = x;
  this.y = y;
  this.speed = 92.5;
  this.sprite = 'images/char-boy.png';
};

// creates boundaries and if player reaches water sets them back to initial position
Player.prototype.update = function() {
  if (this.y > 400) {
    this.y = 400;
  }

  if (this.x > 400) {
    this.x = 400;
  }

  if (this.x < 0) {
    this.x = 0;
  }

  if (this.y < 0) {
    this.x = 200;
    this.y = 400
  }
};

//Draws player on canvas
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Handles input so that when player moves the position is moved according to speed
Player.prototype.handleInput = function(input) {
  switch (input) {
    case 'left':
      this.x -= this.speed;
      break;
    case 'right':
      this.x += this.speed;
      break;
    case 'up':
      this.y -= this.speed;
      break;
    case 'down':
      this.y += this.speed;
      break;
  }
}

// Instantiate your player.
// Place the player object in a variable called player
var player = new Player(200, 400);


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
