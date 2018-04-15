// Enemies the player must avoid
var Enemy = function(y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = -101 - Math.random() * 1000;
    this.y = y;
    this.speed = Math.random() * (300 - 50) + 50;
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
  if (this.x > 600) {
      this.speed = Math.random() * (400 - 100)  + 100
      this.x = -150 - Math.random() * 1000;
  }

  // Multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x = this.x + this.speed * dt;
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player
var Player = function () {
  this.x = 202;
  this.y = 320;
  this.sprite = 'images/char-boy.png'
}

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

// Gem
var Gem = function(x, y, color) {
    this.sprite = `images/gem-${color}.png`;
    this.x = x;
    this.y = y;
};

// Method for gem to change position and color
Gem.prototype.update = function () {
  const random3 = Math.floor(Math.random() * 3);
  const random3color = Math.floor(Math.random() * 3);
  const random5 = Math.floor(Math.random() * 5);
  this.x = 20 + 101 * random5;
  this.y = 105 + 85 * random3;
  let color;
  switch (random3color) {
    case 0:
      color = 'green';
      break;
    case 1:
      color = 'blue';
      break;
    case 2:
      color = 'orange'
      break;
  }
  this.sprite = `images/gem-${color}.png`;
};

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.

let bug1 = new Enemy(60);
let bug2 = new Enemy(145);
let bug3 = new Enemy(230);
let bug4 = new Enemy(60);
let bug5 = new Enemy(145);
let bug6 = new Enemy(230);
let player = new Player();
let gem = new Gem(20, 190, 'green');
gem.update();

let allEnemies = [bug1, bug2, bug3, bug4, bug5, bug6];

// This listens for key presses and sends the keys to Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
