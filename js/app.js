
/**
 * @description Enemy defines an enemy sprite and controls its movement on the
 * game board. The game engine requires it to contain `render` and `update`
 * methods.
 * @class Enemy
 */
class Enemy {

  /**
   * @description Creates an instance of the Enemy class and establishes the
   * required object variables.
   * @param {Number} row Number of the game board row this enemy is constrained
   * to.
   * @memberof Enemy
   */
  constructor(row) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.rowConstraint = row;
    this.x = 0;
    this.y = row * 101;
    this.startRow = 1;
    this.endRow = 3;
  }

  /**
   * @description Retrieve the first row enemies are constrained to
   * @returns {Number} Starting constraint row
   * @memberof Enemy
   */
  getStartRow() {
    return this.startRow;
  }

  /**
   * @description Retrieve the last row enemies are constrained to
   * @returns {Number} Ending constraint row
   * @memberof Enemy
   */
  getEndRow() {
    return this.endRow;
  }

  /**
   * @description Update the enemy's position. This method is required by the
   * game engine.
   * @param {Number} dt a time delta between ticks of the game clock
   * @memberof Enemy
   */
  update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
  }

  /**
   * @description Draw this enemy on the screen. This method is required by the
   * game engine.
   * @memberof Enemy
   */
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

/**
 * @description Player defines the player sprite and controls its movement
 * game board
 * @class Player
 */
class Player {
  /**
   * @description Creates an instance of Player and creates and initializes
   * object variables. The game engine requires it to contain `render` and
   * `update` methods.
   * @memberof Player
   */
  constructor() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';

    this.x = 50;
    this.y = 50;
  }

  /**
   * @description Update the player's position. This method is required by the
   * game engine.
   * @param {Number} dt a time delta between ticks of the game clock
   * @memberof Player
   */
  update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

  }

  /**
   * @description Draw the player on the screen. This method is required by the
   * game engine.
   * @memberof Player
   */
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];
for (let i = 1; i <= 3; ++i) {
	allEnemies.push(new Enemy(i));
}

// Place the player object in a variable called player
let player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});