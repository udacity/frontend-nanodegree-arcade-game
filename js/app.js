// Game play variables
var Game = function() {
	// Row and column info
	this.numRows = 6;
	this.numColumns = 5;
	this.rowHeight = 83;
	this.columnWidth = 101;
	this.numLanes = 3;

	// board limits and positions for player
	this.leftLimit = 0;
	this.rightLimit = (this.numColumns - 1) * this.columnWidth;
	this.playerYOffset = 25;
	this.upLimit = this.rowHeight - this.playerYOffset;
	this.downLimit = this.rowHeight * (this.numRows - 1) - this.playerYOffset;
	this.initialColumn = 2;

	// board limits for enemy
	this.leftStart = -150;
	this.topRowY = 60;

	// enemy speed
	this.minSpeed = 100;
	this.speedRange = 250;

	// colision distance
	this.collisionDistance = 75;
};

// Enemies our player must avoid
var Enemy = function() {
    // Set the image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Set x and y position
    this.setX();
	this.setY();

	// Set speed
	this.setSpeed();
};

Enemy.prototype.setX = function() {
	// Set initial x position, off of canvas to left
    this.x = game.leftStart;
};

Enemy.prototype.setY = function() {

    // Generate a random lane number between 0 and game.numLanes - 1, inclusive

    var laneNumber = Math.floor(Math.random() * game.numLanes);

    // Place Enemy in a lane
    this.y = game.topRowY + laneNumber * game.rowHeight;
};

Enemy.prototype.setSpeed = function() {
    // Set speed
    this.speed = Math.random() * game.speedRange + game.minSpeed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;

    // reset enemy to left of screen if leaves screen to right
    this.leftEdgeX = game.numColumns * game.columnWidth;
    if (this.x > this.leftEdgeX) {
    	this.setX();
    	this.setY();
    	this.setSpeed();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
	this.sprite = 'images/char-boy.png';
	this.setPosition();
};

Player.prototype.setPosition = function() {
	this.x = game.initialColumn * game.columnWidth;
	this.y = (game.numRows - 1) * game.rowHeight - game.playerYOffset;
};

Player.prototype.getRow = function() {
	this.row = (this.y + game.playerYOffset) / game.rowHeight;
};

Player.prototype.getColumn = function() {
	this.column = this.x / game.columnWidth;
}

Player.prototype.update = function() {
	//get row and column
	this.getRow();
	this.getColumn();

    // detect and deal with collision
    var self = this; //carry player variable into forEach
    allEnemies.forEach(function(enemy) {
        var xDiff = self.x - enemy.x;
        var xDiffSquare = Math.pow(xDiff, 2);
        var yDiff = self.y - enemy.y;
        var yDiffSquare = Math.pow(yDiff, 2);
        var distance = Math.sqrt(xDiffSquare + yDiffSquare);
        if (distance < game.collisionDistance) {
        	self.setPosition();
        }
    });
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(input) {
	// Move up if space remaining above
	if(input === 'up' && this.y > game.upLimit) {
		this.y = this.y - game.rowHeight;
	}
	// Reset to beginning if this move would reach water
	else if(input === 'up' && this.y === game.upLimit) {
		this.setPosition();
	}
	// Move down if space remaining
	else if(input === 'down' && this.y < game.downLimit) {
		this.y = this.y + game.rowHeight;
	}
	// Remain in place if no space remaining above
	else if(input === 'down' && this.y === game.downLimit) {
		this.y = this.y;
	}
	// Move left if space remaining to left
	else if(input === 'left' && this.x > game.leftLimit) {
		this.x = this.x - game.columnWidth;
	}
	// Remain in place if no space remaining to left
	else if(input === 'left' && this.x === game.leftLimit) {
		this.x = this.x;
	}
	// Move right if space remaining to the right
	else if(input === 'right' && this.x < game.rightLimit) {
		this.x = this.x + game.columnWidth;
	}
	// Remain in place if no space remaining to the right
	else if(input === 'right' && this.x === game.rightLimit) {
		this.x = this.x;
	}
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var game = new Game();

var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();

var allEnemies = [enemy1, enemy2, enemy3];

var player = new Player();

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
