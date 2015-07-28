// TODO List:
// 1. kitty resets if player walks off the screen while holding it
// 2. Game winning situation
// 3. some way to put more things into functions to eliminate extra code

/*
 * GAME CLASS
 */

// Create the game constructor to store the game variables
var Game = function() {
	this.win = false;
	this.lose = false;
};

Game.prototype.reset = function() {
	for (k = 0; k < 5; k++) {
		allKitties[k].reset();
	}
	player.reset();
	player.lives = 5;
	document.getElementsByClassName('lives')[0].innerHTML = 'Lives: ' + player.lives;
	game.lose = false;
	game.win = false;
};


/*
 * ENEMY CLASS
 */

// Create the enemy constructor
var Enemy = function(x,y) {

	// Set the image for the enemy
    this.sprite = 'images/enemy-bug.png';
    // Set the enemy position
    this.x = x;
    this.y = y;
    // Set the speed multipler for the enemy using a random
    // number between 1 & 4
    this.multiplier = Math.floor((Math.random() * 4) + 1);

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    // Set the position of the enemy based on dt and the speed multipler
    this.x = this.x + 101 * dt * this.multiplier;

    // Check for collisions with the player
    if (this.y == player.y && (this.x > player.x - 20 && this.x < player.x + 20)) {

    	// Player has encountered an emeny and thus loses one life
        player.lives--;
        document.getElementsByClassName('lives')[0].innerHTML = 'Lives: ' + player.lives;

        // Check to see if the player has any lives left
        if (player.lives === 0) {
        	// Player is out of lives, reset the game
        	game.lose = true;
        	alert('You lose!');
        	game.reset();

        } else {
        	// Player still has lives left, check to see if the player
        	// is currently holding a kitty
	        if (player.hold === true) {
	        	// Player is holding a kitty, so find out which kitty and
	        	// reset it to its original position
				allKitties[player.kittyIdx].reset();
	        }

	        // Reset the player to her original position
	        player.reset();
        }
    }

    // If the enemy goes off of the board, reset it
    if (this.x > 750) {
    	this.reset();
    }
};

// Reset the enemy to the left of the board
Enemy.prototype.reset = function() {
	this.x = -200;
	var yVals = [220, 140, 60];
	this.y = yVals[Math.floor((Math.random() * 3))];
	this.multiplier = Math.floor((Math.random() * 4) + 1);
};

// Render the enemy to the canvas
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


/*
 * PLAYER CLASS
 */

// Create the Player constructor
var Player = function(x,y) {

	// Set the player to the girl in the cat hat image
    this.sprite = 'images/char-cat-girl.png';

    // Set the player's location
    this.x = x;
    this.y = y;

    // Give the player 5 lives to start
    this.lives = 5;

    // Store the original position of the player for resetting later
    this.xo = x;
    this.yo = y;

    // Set some variables related to the kitties
    this.hold = false; // player is not holding a kitty
    this.color = undefined; // will reflect color of currently held kitty

    // If the player is holding a kitty, this will be set to the index
    // of the currently held kitty in allKitties array
    this.kittyIdx = undefined;
};

Player.prototype.handleInput = function(dir) {

	// Change the player's position based on the user keyboard input
    if (dir == 'up') {
        this.y = this.y - 80;
    } else if (dir == 'down') {
        this.y = this.y + 80;
    } else if (dir == 'left') {
        this.x = this.x - 101;
    } else if (dir == 'right') {
        this.x = this.x + 101;
    }

    // Check the position of the player
    if (this.x < 0 || this.x > 606) {
    	// Player is off to the left or right of the board
    	// Reset player & kitty (if the player is holding one)
    	if (player.hold === true) {
    		allKitties[player.kittyIdx].reset();
    	}
        this.reset();

    } else if (this.y > 404) {
    	// Player is off the bottom of the board
    	// Reset player & kitty (if the player is holding one)
    	if (player.hold === true) {
    		allKitties[player.kittyIdx].reset();
    	}
        this.reset();

    } else if (this.y <= -20 && this.x > 0 && this.x < 606) {
    	// Player has made it to the top colored blocks
    	// Check to see if the block is the right color for the kitty
    	// If it is, put the kitty on the block
    	if (this.hold === true) {
    		if (this.color === 'red' && this.x === 101) {
    			allKitties[0].x = 101;
    			allKitties[0].y = 35;
    		} else if (this.color === 'orange' && this.x === 202) {
    			allKitties[1].x = 202;
    			allKitties[1].y = 35;
    		} else if (this.color === 'green' && this.x === 303) {
    			allKitties[2].x = 303;
    			allKitties[2].y = 35;
    		} else if (this.color === 'blue' && this.x === 404) {
    			allKitties[3].x = 404;
    			allKitties[3].y = 35;
    		} else if (this.color === 'purple' && this.x === 505) {
    			allKitties[4].x = 505;
    			allKitties[4].y = 35;
    		} else {

    			// Kitty did not match the color, so reset the kitty
    			allKitties[player.kittyIdx].reset();
    		}
    	}

    	// Reset the player to her original location & image
        this.reset();

    } else if (this.y <= -20 && (this.x === 0 || this.x === 606)) {
    	// Player made it to one of the two water blocks

    	// Lose a life and reset the player
    	this.lives--;
    	if (this.lives === 0) {
    		// END OF GAME YOU LOSE!!
    	} else {
    		// Player still has lives left so update the lives and reset the player
    		document.getElementsByClassName('lives')[0].innerHTML = 'Lives: ' + this.lives;
    		this.reset();
    	}

    }

};

// Reset the player to her original position & image
Player.prototype.reset = function() {
    this.x = this.xo;
    this.y = this.yo;
    this.sprite = 'images/char-cat-girl.png';
    this.hold = false;
    this.color = undefined;
    this.kittyIdx = undefined;
};

// Update the player's position
Player.prototype.update = function() {
    this.x = this.x;
    this.y = this.y;
};

// Render the player to the canvas
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*
 * KITTY CLASS
 */

// Create the Kitty constructor
var Kitty = function(color, x, y) {
	this.color = color;
	this.sprite = 'images/cat-' + color + '.png';
	this.x = x;
	this.y = y;

	// Set the original position of the kitty
	// This does not change throughout one game
	this.xo = x;
	this.yo = y;
};

// Reset the kitty to its original position
Kitty.prototype.reset = function() {
	this.x = this.xo;
	this.y = this.yo;
};

// Updates the kitty's location if the player picks it up
Kitty.prototype.update = function () {
    if (this.y === player.y + 65 && this.x === player.x && player.hold === false) {

    	// Change the player's sprite to be the girl 'holding' the correct color kitty
    	player.sprite = 'images/char-cat-girl-' + this.color + '-cat.png';

    	player.hold = true; // player is now holding a kitty
    	player.color = this.color; // player's color matches the kitty's color
    	player.kittyIdx = kittyIndex(this.color); // Index of currently held kitty in allKitties

    	// Move the kitty sprite to off of the grid so it isn't visible
    	this.x = -100;
    	this.y = -100;
	}
};

// Renders the kitty to the canvas
Kitty.prototype.render = function () {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


/*
 * FUNCTIONS
 */

// Determine the index of a kitty in the allKitties array
// based on the color of the kitty
var kittyIndex = function(color) {
	if (color === 'red') {
		return 0;
	} else if (color === 'orange') {
		return 1;
	} else if (color === 'green') {
		return 2;
	} else if (color === 'blue') {
		return 3;
	} else if (color === 'purple') {
		return 4;
	}
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    // Pass the values to the handleInput method
    player.handleInput(allowedKeys[e.keyCode]);
});


/*
 * INSTANTIATE OBJECTS
 */

// Instantiate the enemies
var allEnemies = [];
var yVals = [220, 140, 60];
for (var i = 0; i < 4; i++) {
    var x = Math.floor((Math.random() * -1000) + 1);
    var y = yVals[Math.floor(Math.random() * 3)];
    enemy = new Enemy(x, y);
    allEnemies.push(enemy);
}

// Instantiate the player
player = new Player(303, 380);

// Instantiate the kitties
var colors = ['red', 'orange', 'green', 'blue', 'purple'];
var xVals = [0, 101, 202, 303, 404, 505, 606];
var yValsKitty = [285, 205, 125];
var allKitties = [];
for (var j = 0; j < 5; j++) {
	var x = xVals[Math.floor(Math.random() * 7)];
	var y = yValsKitty[Math.floor(Math.random() * 3)];
	kitty = new Kitty(colors[j], x, y);
	allKitties.push(kitty);
}

// Instantiate the game
game = new Game();
