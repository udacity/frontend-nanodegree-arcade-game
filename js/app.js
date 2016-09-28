// Game play variables
var Game = function() {
	this.laneWidth = 83;
	this.topLaneY = 60;
	this.numberOfLanes = 3;
	this.laneHeight = 100;
	this.leftLimit = 0;
	this.rightLimit = 400;
	this.upLimit = 48;
	this.downLimit = 380;
}

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
    this.x = -150;
}

Enemy.prototype.setY = function() {

    // Generate a random lane number between 0 and numberOfLanes - 1, inclusive
    var laneNumber = Math.floor(Math.random() * game.numberOfLanes);

    // Place Enemy in a lane
    this.y = game.topLaneY + laneNumber * game.laneWidth;
}

Enemy.prototype.setSpeed = function() {
    // Variables to control initial speed
    var minSpeed = 100;
    var speedRange = 250;

    // Set speed
    this.speed = Math.random() * speedRange + minSpeed;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;

    // reset enemy to left of screen if leaves screen to right
    this.leftEdgeX = 490;
    if (this.x > this.leftEdgeX) {
    	this.setX();
    	this.setY();
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
	this.setPosition()
}

Player.prototype.setPosition = function() {
	this.x = 200;
	this.y = 380;
}

Player.prototype.holdPosition = function() {
	this.x = 200;
	this.y = 380;
}

Player.prototype.update = function() {
	console.log(this.x, this.y);
	//if (this.y < 48) {
	//	this.setPosition();
	//}
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(input) {
	// Move up if space remaining above
	if(input === 'up' && this.y > game.upLimit) {
		this.y = this.y - game.laneWidth;
	}
	// Reset to beginning if this move would reach water
	else if(input === 'up' && this.y === game.upLimit) {
		this.setPosition();
	}
	// Move down if space remaining
	else if(input === 'down' && this.y < game.downLimit) {
		this.y = this.y + game.laneWidth;
	}
	// Remain in place if no space remaining above
	else if(input === 'down' && this.y === game.downLimit) {
		this.y = this.y;
	}
	// Move left if space remaining to left
	else if(input === 'left' && this.x > game.leftLimit) {
		this.x = this.x - game.laneHeight;
	}
	// Remain in place if no space remaining to left
	else if(input === 'left' && this.x === game.leftLimit) {
		this.x = this.x;
	}
	// Move right if space remaining to the right
	else if(input === 'right' && this.x < game.rightLimit) {
		this.x = this.x + game.laneHeight;
	}
	// Remain in place if no space remaining to the right
	else if(input === 'right' && this.x === game.rightLimit) {
		this.x = this.x;
	}
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var game = new Game;

enemy1 = new Enemy();
enemy2 = new Enemy();
enemy3 = new Enemy();

var allEnemies = [enemy1, enemy2, enemy3];

player = new Player();

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
