uj// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // X pos
    // Y pos

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

//is enemey outside of boundary in other words reached its destination?
    //Increment x by speed * dt..move foward
  //Reset position to start
    //Increment x by speed * dt..move foward
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// Now write your own player class

/*player class*/
class Charicter {
  // Init allEnemies array
  // For each enemy create and push new Enemy object into above array

/*constructor*/
  constructor(){
/*properties*/
    // x
    this.x = 0;
    // y
    this.y = 0;
    // sprite
    this.sprite = 'images/char-boy.png';
/*methods*/
  //create character onscreen
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  // hint update method...update position methods
    // collision
      // did player x & y collide with Enemy?
    // WIN?
      // did player reach a winning tile?
        // postion player back to starting position - x,y must now = starting x,y
    // movement handleing
      // update postioning according to input x,y

// This class requires an update(), render() and
// a handleInput() method.
  }
}

const player = new Charicter();


// Now instantiate your objects.
const Inky = new Enemy();
const Blinky = new Enemy();
const Pinky = new Enemy();
const Clyde = new Enemy();
// Place all enemy objects in an array called allEnemies
const allEnemies = {Inky, Blinky, Pinky, Clyde}

// Place the player object in a variable called player



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
