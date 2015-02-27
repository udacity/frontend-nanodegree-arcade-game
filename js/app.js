// Avoid hardcoding these values.
// TODO: pull these with code in either resources.js or engine.js
var gameWidth = 505;
var gameHeight = 666;
var blockWidth = 101;
var blockHeight = 83;

// Enemies our player must avoid
var Enemy = function (x, y) {
    // x,y coordinate location of this object
    this.x = x;
    this.y = y;

    // we want our enemies moving at different speeds
    this.speed = getRandom(100, 400);

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var newX = this.x + dt * this.speed;

    // we want the enemy to continue moving until it's left edge is off the screen
    if (newX < gameWidth) {
        this.x = newX;
    }
        // and start showing again with the right edge first
    else {
        this.x = 0 - Resources.get(this.sprite).width;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Player who will try to make it across the traffic
// There should only be one of these at a time
var Player = function (x, y) {
    // x, y coordinates of player locationn
    this.x = x
    this.y = y

    // Count of how many times they make it across the road
    this.currentScore = 0;

    // Count of lives. Subtract one for each death until 0
    this.lives = 5;

    // when true, we display a SCORE!! across the screen
    // and do not allow the player to move
    this.justScored = false;

    // when true, we display a message across the screen
    // and do not allow the player to move
    this.justDied = false;

    // url to our player's resource
    this.sprite = 'images/char-cat-girl.png';
}

Player.prototype.update = function (dt) {

}

// Compare vertical position against an enemy
// To determine if we might be colliding
Player.prototype.inSameRow = function (enemyY) {
    console.log("Y comp: " + enemyY + " >= " + this.y + " <= " + (enemyY - 50).toString());
    if (enemyY <= this.y <= enemyY - 50) {
        return true;
    }
    return false;
}

// Compare horizontal position against an enemy
// To determine if we might be colliding
Player.prototype.inSameColumn = function (enemyX) {
    console.log("X comp: " + enemyX + " <= " + this.x + " <= " + (enemyX + 80).toString());
    if (enemyX <= this.x <= enemyX + 80) {
        return true;
    }
    return false;
}

// Set player start position at bottom middle of screen
Player.prototype.setStartPosition = function () {
    ctx.clearRect(0, 0, 60, 505);
    this.x = (gameWidth / 2) - 50;
    this.y = gameHeight - blockHeight - 90;
}

// Draw player and player-related text on screen
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    // User successfully made it to the top of the screen
    if (this.justScored === true) {
        ctx.font = "60pt Bangers, cursive";
        ctx.fillStyle = "deeppink";
        ctx.fillText("Score!!", 100, 400);
    }

    if (this.justDied === true) {
        ctx.font = "60pt Bangers, cursive";
        ctx.fillStyle = "deeppink";
        ctx.fillText("OUCH!! Dead!", 100, 400);
    }

    // Display player score in upper right
    ctx.font = "45px Bangers, cursive";
    ctx.fillStyle = "deeppink";
    ctx.textBaseline = "bottom";

    // and player lives in upper left
    ctx.clearRect(0, 0, gameWidth, 90);
    var lifeString = ""
    for (var i = 0; i < 5; i++) {
        lifeString = lifeString + " \u2665";
    }
    ctx.fillText(lifeString, 10, 100);
    ctx.fillText("Score: " + this.currentScore, gameWidth - 155, 100);

}

// Player ran into an enemy; need to update lives and reset
Player.prototype.died = function () {
    this.lives--;

    // If we ran out of lives, we're dead
    if (this.lives === 0) {
        gameOver();
        return;
    }

    // if it's not game over, reset to start position
    this.setStartPosition();

    // Set our flag so player can move again
    this.justDied = false;
}

// Runs when player has scored
Player.prototype.scored = function () {
    // up the score
    this.currentScore++;

    // set our flag
    this.justScored = true;

    // wait 2 seconds to clear the "score!" message and reset player position
    window.setTimeout(function () { player.clearScore(); }, 2000);
}

// This is called on a timer after the user has scored
// It resets the justScored flag and resets the player to the start position
Player.prototype.clearScore = function() {
    this.justScored = false;
    ctx.clearRect(0, 0, gameWidth, gameHeight);
    this.setStartPosition();
}

// Our player sprites are 101x170px
// and we want to keep them horizontally centered on the blocks
// but vertically the bottom of the sprite near the bottom of the block
Player.prototype.handleInput = function (keycode) {
    var spriteHeight = 170;

    // Player cannot move for the couple seconds after 
    // scoring, when we display the score and reset their position
    if (this.justScored === true || this.justDied === true) {
        return;
    }

    // Move the player in response to user key input
    switch (keycode) {
        case 'left':
            if (this.x - blockWidth >= 0) {
                this.x = this.x - blockWidth;
            }
            break;
        case 'right':
            if (this.x + blockWidth <= gameWidth) {
                this.x = this.x + blockWidth;
            }
            break;
        case 'down':
            if (this.y + blockHeight + spriteHeight <= gameHeight) {
                this.y = this.y + blockHeight;
            }
            break;
        case 'up':
        default:
            if (this.y - blockHeight >= 0) {
                this.y = this.y - blockHeight;
            }
                // She's in the top row of the road and we want to allow her
                // to move into the water and score
            else {
                this.y = this.y - 50;
                this.scored();
            }
    }
}

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

// Allows us to randomize location and speed of objects
function getRandom(min, max) {
    return Math.floor(Math.random() * max) + min;
}


// Returns an array of randomly placed enemies
// Pass in the number of enemies you want in the array
function initializeEnemies(enemyCount) {
    var enemies = [];
    for (var i = 0; i < enemyCount; i++) {
        enemies.push(new Enemy(getRandom(0, 505), getRandom(1, 3) * blockHeight - (blockHeight * .25)));
    }
    return enemies;
}

// Create a new player
// TODO: allow player to choose character?
function initializePlayer() {
    return new Player((gameWidth / 2) - 50, gameHeight - blockHeight - 90);
}

// this runs after the pause for showing Game Over on screen
function gameOver() {
    // start with a clear Canvas
    ctx.clearRect(0, 0, gameWidth, gameHeight);

    // reset enemies and player
    allEnemies = initializeEnemies();
    player = initializePlayer();
}

// *********************************************************************
// Here we create our enemies 
// Setting random location in the road tiles for the enemies, and random speed
var allEnemies = initializeEnemies(5);
var player = initializePlayer();
//*********************************************************************

