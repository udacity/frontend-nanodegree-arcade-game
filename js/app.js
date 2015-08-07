/* First few variables to help with game structure
 * gameRunning is a flag to determine the state of the game
 * starsCollected helps with scoring later on
 */
var canvasWidth = 505,
    canvasHeight = 606,
    blockHeight = 83,
    blockWidth = 101,
    gameRunning = false,
    starsCollected = 0;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Iniital position of the bug. Y is set up
    // such that it only appears on the concrete path
    this.x = Math.ceil(Math.random() * 5) * blockWidth;
    this.y = Math.ceil(Math.random() * 3) * blockHeight - 25;

    this.speed = Math.random() * 200 + 100;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    /* You should multiply any movement by the dt parameter
     * which will ensure the game runs at the same speed for
     * all computers.
     */

    /* Enemies will move horizontally across the screen. On
     * collision of the bounds, they appear again on from
     * the edge
     */
    if (this.x <= canvasWidth){
        this.x += this.speed * dt;
    } else{
        this.x = -blockWidth;
        this.y = Math.ceil(Math.random() * 3) * blockHeight - 25;
        this.speed = Math.random() * 200 + 100;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Stars that player must collect
var Star = function() {
    this.sprite = 'images/star.png';

    this.x = Math.ceil(Math.random() * 5) * blockWidth;
    this.y = Math.ceil(Math.random() * 3) * blockHeight - 25;
}

Star.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    // which grid row and col the player is currently on.
    this.colNo = 3;
    this.rowNo = 6;
    // the resulting actual x and y
    this.x = (this.colNo - 1) * blockWidth;
    this.y = (this.rowNo - 1) * blockHeight - 35;
}

Player.prototype.update = function() {
    this.x = (this.colNo - 1) * blockWidth;
    this.y = (this.rowNo - 1) * blockHeight - 35;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
    // Check for each case, decide whether it's at the
    // bounds, increment or decrement col or row counter
    // if not at the edge.
    switch(key){
        case 'left':
            if(this.colNo === 1) break;
            this.colNo -= 1;
            break;
        case 'right':
            if(this.colNo === 5) break;
            this.colNo += 1;
            break;
        case 'up':
            if(this.rowNo === 1) break;
            this.rowNo -= 1;
            break;
        case 'down':
            if(this.rowNo === 6) break;
            this.rowNo += 1;
            break;
        default:
            break;
    }
    this.update();
}

// Instantiating objects
var allEnemies = [],
    allStars = [],
    player = new Player();
gameReset();

// Resets number of enemies, their positions, and position
// of player
function gameReset() {
    allEnemies = [];
    for(var i = 0; i < Math.random() * 5 + 2; i++) {
       allEnemies.push(new Enemy());
   }

   allStars = [];
   for(var i = 0; i < Math.random() * 3 + 3; i++) {
        allStars.push(new Star());
   }
   starsCollected = 0;

   player.colNo = 3;
   player.rowNo = 6;
   player.update();
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. Only allows player position to be
// updated when game is running.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    if(gameRunning === true){
        player.handleInput(allowedKeys[e.keyCode]);
    }
});
