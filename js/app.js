// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 0;
    this.y = 0;
    this.sprite = 'images/enemy-bug.png';
    this.step = 101;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    // If enemy is not past boundary
    if(this.x < this.step * 5) { // places bug just off screen
        // Move forward
        // Increment x by speed * dt
        this.x += 200 * dt;
    }
    // else
    else {
        // Reset position to start
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Hero {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.step = 101;
        this.jump = 83;
        this.startX = this.step * 2; // Center column
        this.startY = (this.jump * 5) - 20; // Bottom row
        this.x = this.startX;
        this.y = this.startY;
    }
    
    // Draw player sprite at current x,y
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    
    /** Update player x,y based on input
    *
    * @param {string} input - Direction of travel
    */
    handleInput(input) {
        switch(input) {
            case 'left':
                if (this.x > 0) {
                    this.x -= this.step;
                }
                break;
            case 'up':
                if (this.y > this.jump) {
                    this.y -= this.jump;
                }
                break;
            case 'right':
                if (this.x < this.step * 4) {
                    this.x += this.step;
                }
                break;
            case 'down':
                if (this.y < this.jump * 4) {
                    this.y += this.jump;
                }
                break;
        }
    }
}
// New Hero and Enemy objects
const player = new Hero();
const bug1 = new Enemy();

// Init allEnemies array
// For each enemy create and push new Enemy object into array
const allEnemies = [];
allEnemies.push(bug1);

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
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
