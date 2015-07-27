// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.multiplier = Math.floor((Math.random() * 4) + 1);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + 101 * dt * this.multiplier;

    if (this.y == player.y && (this.x > player.x - 20 && this.x < player.x + 20)) {
        player.lives--;
        if (player.lives === 0) {
        	// TODO: Add logic here for doing a 'game over'
        }
        document.getElementsByClassName('lives')[0].innerHTML = 'Lives: ' + player.lives;
        player.reset();
    }

    // If the bug goes off of the board, reset its position and randomize the multiplier
    if (this.x > 750) {
    	this.multiplier = Math.floor((Math.random() * 4) + 1);
    	this.reset();
    }
};

// Reset the enemy to the left of the board
Enemy.prototype.reset = function() {
	this.x = -200;
	var yVals = [220, 140, 60];
	this.y = yVals[Math.floor((Math.random() * 3))];
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    this.sprite = 'images/char-cat-girl.png';
    this.x = x;
    this.y = y;
    this.score = 0;
    this.lives = 5;
};

Player.prototype.handleInput = function(dir) {

    if (dir == 'up') {
        this.y = this.y - 80;

    } else if (dir == 'down') {
        this.y = this.y + 80;

    } else if (dir == 'left') {
        this.x = this.x - 101;

    } else if (dir == 'right') {
        this.x = this.x + 101;

    }

    if (this.x < 0 || this.x > 606) {
        this.reset();
    } else if (this.y > 404) {
        this.reset();
    } else if (this.y <= -20) {
        this.score++;
        document.getElementsByClassName('score')[0].innerHTML = 'Score: ' + this.score;
        this.reset();
    }

};

Player.prototype.reset = function() {
    this.x = 303;
    this.y = 380;
};

Player.prototype.update = function() {
    this.x = this.x;
    this.y = this.y;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var yVals = [220, 140, 60];
for (var i = 0; i < 6; i++) {
    var x = Math.floor((Math.random() * -1000) + 1);
    var y = yVals[Math.floor((Math.random() * 3))];
    enemy = new Enemy(x, y);
    allEnemies.push(enemy);
}

player = new Player(303, 380);


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
