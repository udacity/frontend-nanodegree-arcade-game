// Game play variables
var Game = function() {
	// Row and column info, based on engine.js Engine.render().
	this.numRows = 6;
	this.numColumns = 5;
	this.rowHeight = 83;
	this.columnWidth = 101;
	this.numLanes = 3; // 3x stone blocks.

	// Many below amounts are somewhat arbitrary, but are set in attempt
	// to match the demo.

	// Board limits and positioning for Player.
	this.initialColumn = 2; // Middle row for 5 column game board.
	this.playerYOffset = 25;  // Player feet slightly above bottom of tile.
	this.minPlayerRow = 1; // Row zero is water.
	this.maxPlayerRow = this.numRows - 1; // Rows are zero-indexed.
	this.minPlayerColumn = 0;
	this.maxPlayerColumn = this.numColumns - 1; // Columns are zero-indexed.

	// Board limits for Enemy.
	this.enemyXStart = -150; // Start of screen, minor delay before return.
	this.enemyTopY = 60;
	this.maxEnemyX = this.numColumns * this.columnWidth;

	// Enemy speed parameters.
	this.enemyMinSpeed = 100;
	this.enemySpeedRange = 250;

	// Collision distance.
	this.collisionDistance = 50; // Slight overlap of sprites before collision.

	this.phase = "new";
	this.score = 0;
	this.lives = 3; // initial number of lives
	this.speed = 1;	// initial speed multiplier
	this.increase = 0.20; // multiplier for speed increase per point
	this.difficulty = "";

	this.winScore = 10;
};

Game.prototype.printText = function(text, center, height, size, x) {
	ctx.font = "900" + " " + size + " " + "Sans";
	ctx.lineWidth = "2";
	ctx.fillStyle = "white";
	if (center === "center") {
		ctx.textAlign = "center";
		x = this.numColumns * this.columnWidth / 2;
	} else if (center === "left") {
		ctx.textAlign = "left";
	}
	ctx.fillText(text, x, height);
	ctx.strokeText(text, x, height);
};

Game.prototype.printNew = function() {
	this.printText("Enter difficulty:", "center", 200, "50px");
	this.printText("1 for easy", "left", 250, "50px", 50);
	this.printText("2 for increasing", "left", 300, "50px", 50);
};

Game.prototype.printFooter = function() {
	this.printText("Score: " + this.score, "left", this.numRows * this.rowHeight + 80,
		"25px", 1 * this.columnWidth + 5);
	this.printText("Lives: " + this.lives, "left", this.numRows * this.rowHeight + 80,
		"25px", 3 * this.columnWidth + 5);
};

Game.prototype.printWin = function() {
	this.printText("You win!!!!!!:", "center", 200, "50px");
	this.printText("Enter for new game", "center", 250, "40px");
};

Game.prototype.printLose = function() {
	this.printText("You lose!!!!!!:", "center", 200, "50px");
	this.printText("Enter for new game", "center", 250, "40px");
};

Game.prototype.render = function() {
	if (this.phase === "new") {
		this.printNew();
	}
	else if (this.phase === "playing") {
		this.printFooter();
	}
	else if (this.phase === "win") {
		this.printWin();
		this.printFooter();
	}
	else if (this.phase === "lose") {
		this.printLose();
		this.printFooter();
	}
};

Game.prototype.handleInput = function(input) {
	if ((input === '1' || input === '2') && this.phase === "new")  {
		this.phase = "playing";
		if (input === '2') {
			this.difficulty = "increasing";
		}
	}
	if ((this.phase === "lose" || this.phase === "win") && input === "enter") {
		this.phase = "new";
		game.reset();
	}
};

Game.prototype.update = function() {
	if (this.difficulty === "increasing") {
		this.speed = 1 + this.increase * this.score;
	}
	if (this.score === this.winScore) {
		this.phase = "win";
	}
	if (this.lives <= 0) {
		this.phase = "lose";
	}
};

Game.prototype.reset = function() {
	this.phase = "new";
	this.score = 0;
	this.lives = 3; // initial number of lives
	this.speed = 1;	// initial speed multiplier
	this.increase = 0.20; // multiplier for speed increase per point
	this.difficulty = "";
	player.setPosition();
	allEnemies.forEach(function(enemy) {
		enemy.set();
    });
};


// Enemies our player must avoid.
var Enemy = function() {
    // Set the image/sprite for our enemies, this uses
    // a helper we've provided to easily load images.
    this.sprite = 'images/enemy-bug.png';

    // Set position and speed.
    this.set();
};

Enemy.prototype.setX = function() {
	// Set initial x position, off of canvas to left.
    this.x = game.enemyXStart;
};

Enemy.prototype.setY = function() {
    // Generate a random lane number between 0 and
    //game.numLanes - 1, inclusive.
    var laneNumber = Math.floor(Math.random() * game.numLanes);

    // Place Enemy in a lane.
    this.y = game.enemyTopY + laneNumber * game.rowHeight;
};

Enemy.prototype.setSpeed = function() {
    // Set speed; take a base-speed and add a random additional speed within
    // a range.
    this.speed = Math.random() * game.enemySpeedRange + game.enemyMinSpeed;
};

Enemy.prototype.set = function() {
	this.setX();
	this.setY();
	this.setSpeed();
};

Enemy.prototype.getRow = function() {
	// Work back from y position to row index.
	this.row = (this.y - game.enemyTopY)/game.rowHeight + 1;
};

Enemy.prototype.testScreenExit = function() {
	// Test if Enemy exists screen to right;
	// set to new position and speed if it does.
	if (this.x > game.maxEnemyX) {
		this.setSpeed();
		this.setX();
		this.setY();
	}
};

Enemy.prototype.move = function(dt) {
	// Move enemy x-coordinate.
	this.x = this.x + this.speed * dt * game.speed;
};

Enemy.prototype.update = function(dt) {
	// Scaling by the dt parameter makes game run
	// Same speed on any system, see engine.js.
    this.getRow();

    this.move(dt);

    // Reset enemy to left of screen if leaves screen to right.
    this.testScreenExit();

    // A collision between a Player and an Enemy is the triggered
    // by the same conditions as a collision between an Enemy and
    // Nothing happens to the Enemy object in a collision.  Only
    // The player is reset.  Seems like we can forgo collision
    // detection in the Enemy.
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
	if (game.phase === "playing") {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
};

// Player character the user moves around the screen
var Player = function() {
	this.sprite = 'images/char-boy.png';
	this.setPosition();
};

Player.prototype.setPosition = function() {
	// Set player sprite to initial x and y positions
	this.x = game.initialColumn * game.columnWidth;
	// Rows are zero-indexed
	this.y = (game.numRows - 1) * game.rowHeight - game.playerYOffset;
};

Player.prototype.resetPosition = function(collision) {
	this.setPosition();
	if (collision === false) {
		game.score = game.score + 1;
	} else {
		game.lives = game.lives - 1;
	}
};

Player.prototype.getRow = function() {
	// Work back from y position to row index
	this.row = (this.y + game.playerYOffset) / game.rowHeight;
};

Player.prototype.getColumn = function() {
	// Work back from x position to column index
	this.column = this.x / game.columnWidth;
};

Player.prototype.moveUp = function() {
	// Move player one row up
	this.y = this.y - game.rowHeight;
};

Player.prototype.moveDown = function() {
	// Move player one row down
	this.y = this.y + game.rowHeight;
};

Player.prototype.moveLeft = function() {
	// Move player one column left
	this.x = this.x - game.columnWidth;
};

Player.prototype.moveRight = function() {
	// Move player one column left
	this.x = this.x + game.columnWidth;
};

Player.prototype.getXDistance = function(enemy) {
	// Find absolute difference in x coordinate between
	// player and enemy
	var xDistance = Math.abs(this.x - enemy.x);
	return xDistance;
};

Player.prototype.compareRows = function(enemy) {
	// Check if player and enemy are in same row
	if (this.row === enemy.row) {
		return true;
	}
};

Player.prototype.checkCollision = function(enemy) {
	// Check if player and enemy are in same row and
	// their x-coordinates are within collision distance
	var xDistance = this.getXDistance(enemy);
	var sameRow = this.compareRows(enemy);
	if (xDistance < game.collisionDistance && sameRow === true) {
		return true;
	}
};

Player.prototype.checkCollisions = function() {
	// Loop through all enemies checking for a collision with player.
    var self = this; // Carry player variable into forEach.
    var collision = false;
    allEnemies.forEach(function(enemy) {
    	if (self.checkCollision(enemy)) {
    		collision = true;
    	}
    });
    if (collision === true) {
    	self.resetPosition(true);
    }
};

Player.prototype.update = function() {
	// Get row and column.
	this.getRow();
	this.getColumn();
	// Check for collisions.
	this.checkCollisions();
};

Player.prototype.render = function() {
	if (game.phase === "playing") {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
		}
	};

Player.prototype.handleInput = function(input) {
	// Move up if space remaining above.
	if(input === 'up' && this.row > game.minPlayerRow) {
		this.moveUp();
	}
	// Reset to beginning if this move would reach water (row zero).
	else if(input === 'up' && this.row === game.minPlayerRow) {
		this.resetPosition(false);  // reset, collision === false
	}
	// Move down if space remaining.
	else if(input === 'down' && this.row < game.maxPlayerRow) {
		this.moveDown();
	}
	// Remain in place if no space remaining above.
	else if(input === 'down' && this.row === game.maxPlayerRow) {
		// No action, leaving as placeholder to explicitly
		// account for this case.
	}
	// Move left if space remaining to left.
	else if(input === 'left' && this.column > game.minPlayerColumn) {
		this.moveLeft();
	}
	// Remain in place if no space remaining to left.
	else if(input === 'left' && this.column === game.minPlayerColumn) {
		// No action, leaving as placeholder to explicitly
		// account for this case.
	}
	// Move right if space remaining to the right.
	else if(input === 'right' && this.column < game.maxPlayerColumn) {
		this.moveRight();
	}
	// Remain in place if no space remaining to the right.
	else if(input === 'right' && this.column === game.maxPlayerColumn) {
		// No action, leaving as placeholder to explicitly
		// account for this case.
	}
};

// Instantiate Game, Enemy, and Player objects; build enemy array.

var game = new Game();

var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();

var allEnemies = [enemy1, enemy2, enemy3];

var player = new Player();

// Listens for key presses and sends the keys to
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
    	13: 'enter',
    	49: '1',
    	50: '2',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    game.handleInput(allowedKeys[e.keyCode]);
});