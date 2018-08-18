// Enemies our player must avoid
// Variables applied to each of our instances go here,
// we've provided one for you to get started
// The image/sprite for our enemies, this uses
// a helper we've provided to easily load images
class BaseClass {
  constructor(x, y, sprite) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
  }

  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

class Enemy extends BaseClass {
  constructor(x, y, sprite) {
    super();
    this.sprite = sprite;
    this.x = x;
    this.y = y;
  }

  update(dt) {}

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player extends BaseClass {
  constructor(x, y) {
    super();
    this.sprite = '/images/char-boy.png';
    this.x = x;
    this.y = y;
  }

  handleInput(input) {
    //
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const player = new Player();
const enemy_one = new Enemy();
const enemy_two = new Enemy();
const enemy_tree = new Enemy();
const enemy_four = new Enemy();
const enemy_five = new Enemy();

const allEnemies = [];

allEnemies.push(enemy_one, enemy_two, enemy_tree, enemy_four, enemy_five);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  const allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
