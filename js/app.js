// Enemies our player must avoid
//EN: startX should be more than 101, so that the enemy appears outside the canvas
var Enemy = function(row, startX) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.x = -1 * startX; //EN: starting point outside the canvas
  this.y = row; //EN: one of three rows, 0 to 2
  this.defaultSpeed = 200 * (Math.random() + 1);
  this.speed = this.defaultSpeed;
  /*
   * EN: When a bug bumps into another one within the canvas borders,
   * they swap speeds.
   */
  this.checkCollisions = function(other) {
    if (this.x + 101 >= other.x && this.x < other.x) {
      other.x += this.x + 101 - other.x; //EN: to prevent interlacing
      var temp = this.speed;
      this.speed = other.speed;
      other.speed = temp;
    }
  }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
//EN: Parameter: canvas, to track when the bugs reach the edge of the canvas
Enemy.prototype.update = function(dt, canvas) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > (canvas.width + 303)) {
      this.x = -150 * (Math.random() + 1);
      this.speed = this.defaultSpeed;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function(ratio) {
  ctx.scale(ratio, ratio);
  ctx.drawImage(Resources.get(this.sprite), 72 + this.x, 212 + this.y * 83);
  ctx.scale(1 / ratio, 1 / ratio);
};

var BrownBug = function(row, startX) {
  Enemy.call(this, row, startX);
  this.sprite = 'images/brown-bug.png';
  this.defaultSpeed = 80 * (Math.random() + 1);
  this.speed = this.defaultSpeed;
};
BrownBug.prototype = Object.create(Enemy.prototype);
BrownBug.prototype.constructor = BrownBug;

var BlueBug = function(row, startX) {
  Enemy.call(this, row, startX);
  this.sprite = 'images/blue-bug.png';
  this.defaultSpeed = 150 * (Math.random() + 1);
  this.speed = this.defaultSpeed;
};
BlueBug.prototype = Object.create(Enemy.prototype);
BlueBug.prototype.constructor = BlueBug;

var RedBug = function(row, startX) {
  Enemy.call(this, row, startX);
  this.sprite = 'images/red-bug.png';
  this.defaultSpeed = 200 * (Math.random() + 1);
  this.speed = this.defaultSpeed;
};
RedBug.prototype = Object.create(Enemy.prototype);
RedBug.prototype.constructor = RedBug;

var RainbowBug = function(row, startX) {
  Enemy.call(this, row, startX);
  this.sprite = 'images/rainbow-bug.png';
  this.defaultSpeed = 300 * (Math.random() + 1);
  this.speed = this.defaultSpeed;
};
RainbowBug.prototype = Object.create(Enemy.prototype);
RainbowBug.prototype.constructor = RainbowBug;

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

function addEnemies(level) {
  var enemies = [];
  switch (level) {
    case 2:
      enemies.push(
        [new BrownBug(0, 150),
        new BlueBug(0, 600),
        new BrownBug(0, 900)],
        [new BlueBug(1, 101),
        new BrownBug(1, 600)],
        [new BrownBug(2, 300),
        new BlueBug(2, 700)]
      );
      break;
    case 3:
      enemies.push(
        [new BlueBug(0, 101),
        new BrownBug(0, 500)],
        [new RedBug(1, 200),
        new BlueBug(1, 400),
        new BrownBug(1, 700)],
        [new RedBug(2, 101),
        new BlueBug(2, 500)]
      );
      break;
    case 4:
      enemies.push(
        [new RainbowBug(0, 101),
        new BlueBug(0, 400),
        new BrownBug(0, 600)],
        [new RedBug(1, 200),
        new RainbowBug(1, 700)],
        [new RedBug(2, 101),
        new BlueBug(2, 400),
        new BlueBug(2, 800)]
      );
      break;
    case 5:
      enemies.push(
        [new BlueBug(0, 300),
        new RainbowBug(0, 101),
        new BrownBug(0, 500),
        new RedBug(0, 700)],
        [new RedBug(1, 200),
        new BlueBug(1, 101),
        new RainbowBug(1, 400)],
        [new RedBug(2, 700),
        new BlueBug(2, 200),
        new RainbowBug(2, 300),
        new BlueBug(2, 400)]
      );
      break;
    default: //EN: level 1
      enemies.push(
        [new BrownBug(0, 101),
        new BrownBug(0, 505)],
        [new BrownBug(1, 200)],
        [new BrownBug(2, 150),
        new BrownBug(2, 700)]
      );
  }
  return enemies;
};

var allEnemies = addEnemies(lev);
// allEnemies.push(new BrownBug(0, 202));
// allEnemies.push(new BlueBug(2, 500));
// allEnemies.push(new Enemy(2, 404));
// allEnemies.push(new RedBug(1, 101));
// allEnemies.push(new RainbowBug(0, 803));
var player = {
  avatar: 'images/char-boy.png',
  health: 100, //EN: initial value
  lives: 3, //EN: initial value
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
