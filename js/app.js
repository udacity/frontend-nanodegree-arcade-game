// TODO Clear render on alpha pixels
// TODO Add music
// TODO Rename playersprites and add selection menu (maybe)
// TODO Add scoring mechanism (maybe)
var canvasWidth = 505;
var canvasHeight = 606;
var blockHeight = 83;
var blockWidth = 101;
var gameRunning = false;         // Boolean to record if game is running

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // SY: Iniital position of the bug. Y is set up
    // such that it only appears on the concrete path
    this.x = Math.ceil(Math.random() * 5) * blockWidth;
    this.y = Math.ceil(Math.random() * 3) * blockHeight - 25;

    this.speed = Math.random() * 200 + 100;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Enemies will move horizontally across the screen. On
    // collision of the bounds, they appear again on from
    // the edge

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

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';

    this.colNo = 3;
    this.rowNo = 6;

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

// Resets all theh game positions etc
function gameReset() {
    allEnemies = [];
    for(var i = 0; i < Math.random() * 5 + 2; i++){
       allEnemies.push(new Enemy());
   }

   player.colNo = 3;
   player.rowNo = 6;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player();
gameReset();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
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
