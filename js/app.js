const modal = document.querySelector('.modal');
const modal_message = document.querySelector('.modal-message');
const form = document.forms[0];

// Enemies our player must avoid
// Variables applied to each of our instances go here,
// we've provided one for you to get started
// The image/sprite for our enemies, this uses
// a helper we've provided to easily load images
class BaseClass {
  constructor() {
    this.sprite = 'images/';
    this.x = 0;
    this.y = 0;
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

  backToSquareOne() {
    this.x = 2 * this.rightLeft;
    this.y = 4 * this.upDown + 54;
  }
}

class Enemy extends BaseClass {
  constructor(x, y, speed) {
    super();
    this.x = x;
    this.y = y + 54;
    this.speed = speed;
    this.sprite += 'enemy-bug.png';
    this.rightLeft = 101;
    this.offX = this.rightLeft * 5;
    this.reset = -this.rightLeft;
  }
  update(dt) {
    // looping action for enemies
    if (this.x < this.offX) {
      this.x += this.speed * dt;
    } else {
      this.x = this.reset;
    }
  }
}

class Player extends BaseClass {
  constructor() {
    super();
    this.sprite += 'char-boy.png';
    this.rightLeft = 101;
    this.upDown = 83;
    this.x = 2 * this.rightLeft;
    this.y = 4 * this.upDown + 54;
    this.conquest = false;
  }

  handleInput(input) {
    switch (input) {
      case 'left':
        if (this.x > 0) {
          this.x -= this.rightLeft;
        }
        break;
      case 'right':
        if (this.x < 4 * this.rightLeft) {
          this.x += this.rightLeft;
        }
        break;
      case 'up':
        if (this.y > 5) {
          this.y -= this.upDown;
          this.gameWon();
        }
        break;
      case 'down':
        if (this.y < 4 * this.upDown) {
          this.y += this.upDown;
        }
        break;
      default:
        break;
    }
  }

  gameWon() {
    if (this.y === -29) {
      this.conquest = true;
      if (this.conquest === true) {
        modal_message.textContent = 'You Safely made it to the other side.';
      }
    }
  }

  update() {
    allEnemies.forEach((enemy) => {
      if (
        this.y === enemy.y &&
        this.x < enemy.x + 83 &&
        this.x + 83 > enemy.x &&
        this.y < enemy.y + 101 &&
        101 + this.y > enemy.y
      ) {
        this.backToSquareOne();
      }
    });
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const player = new Player();
const enemy_row_one = new Enemy(-101, 0, 208);
const enemy_row_two = new Enemy(-101 * 4, 0, 210);
const enemy_row_tree = new Enemy(-101 * 4, 83, 180);
const enemy_row_four = new Enemy(-101 * 3, 166, 245);
const enemy_row_five = new Enemy(-101 * 6, 166, 245);

const allEnemies = [];

allEnemies.push(
  enemy_row_one,
  enemy_row_two,
  enemy_row_tree,
  enemy_row_four,
  enemy_row_five,
);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', (event) => {
  const allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
  };
  console.log(player.x, player.y);
  player.handleInput(allowedKeys[event.keyCode]);
});

//After winning game modal will appear asking for another game.
//form will reload the current location
form.addEventListener('submit', (event) => {
  location.reload();
  event.preventDefault();
});
