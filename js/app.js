// Global Variables
var gameSize = { width: 505, height: 666 };
var blockSize = { width: 101, height: 83 };
var difficulty = { name: "medium", state: false, lives: 3, enemies: 4, speedMin: 100, speedMax: 400 };
var gameOverLoc = gameOverLocation();

// Enemy object definition
var Enemy = function (xPos, yPos) {
    // x,y coordinate location of this object
    this.pos = { x: xPos, y: yPos }
    this.size = { width: 80, height: 50 }

    // we want our enemies moving at different speeds
    this.speed = getRandom(difficulty.speedMin, difficulty.speedMax);

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
    var newX = this.pos.x + dt * this.speed;

    // we want the enemy to continue moving until it's left edge is off the screen
    if (newX < gameSize.width) {
        this.pos.x = newX;
    }
        // and start showing again with the right edge first
    else {
        //this.pos.x = 0 - Resources.get(this.sprite).width;
        this.pos.x = 0 - this.size.width;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.pos.x, this.pos.y);
}

// Player who will try to make it across the traffic
// There should only be one of these at a time
var Player = function (xPos, yPos) {
    // x, y coordinates of player locationn
    this.pos = { x: xPos, y: yPos };

    // smaller than the actual sprite, this is used for calculating position and collisions
    this.size = { width: 50, height: 75 };

    // Count of how many times they make it across the road
    this.currentScore = 0;

    // Count of lives. Subtract one for each death until 0
    this.lives = difficulty.lives;

    // Flag so we can change display and freeze user after scoring
    this.justScored = false;

    // Flag so we can change display and freeze user after dying
    this.justDied = false;

    // url to our player's resource
    this.sprite = 'images/char-cat-girl.png';
}

// no-op so far
Player.prototype.update = function (dt) {

}

// To determine if player is colliding with another object
// This is just the classic "intersectRect" algorithm
Player.prototype.intersect = function (enemy) {
    // R2 is enemy, R1 is player
    
    return !(enemy.pos.x > this.pos.x + this.size.width
        || enemy.pos.x + enemy.size.width < this.pos.x
        || enemy.pos.y > this.pos.y + this.size.height
        || enemy.pos.y + enemy.size.height < this.pos.y);
}

// Set player start position at bottom middle of screen
Player.prototype.setStartPosition = function () {
    ctx.clearRect(0, 0, 60, 505);
    this.pos.x = (gameSize.width / 2) - 50;
    this.pos.y = gameSize.height - blockSize.height - 90;
}

// For scrolling the game over down the canvas
// Set a variable to this function on gameReset 
function gameOverLocation() {
        var textLoc = 200;
        return function () {
            if (textLoc < gameSize.height - 10) {
                textLoc++;
            }
            console.log("made it! gameoverloc is" + textLoc);
            //else {
            //    setTimeout(function () { gameOverLoc = 200; }, 2000);
            //}
            return textLoc;
        };
}

// Draw player and player-related text on screen
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.pos.x, this.pos.y);
    ctx.font = "60pt Bangers, cursive";
    ctx.fillStyle = "crimson";
    ctx.strokeStyle = "white";
    ctx.lineWidth = "5px";

    // User changed difficulty
    if (difficulty.state === true) {
        ctx.fillText("Resetting...", 100, 400);
        ctx.strokeText("Resetting...", 100, 400);
    }

    // User successfully made it to the top of the screen
    if (this.justScored === true) {
        ctx.fillText("Score!!", 150, 400);
        ctx.strokeText("Score!!", 150, 400);
    }

    // User hit a bug
    if ((this.justDied === true) && (this.lives > 0)) {
        ctx.fillText("Bugger!!", 150, 400);
        ctx.strokeText("Bugger!!", 150, 400);
    }

    // Game over
    if (this.lives === 0) {
        ctx.fillText("GAME OVER!!", 100, gameOverLoc());
        ctx.strokeText("GAME OVER!!", 100, gameOverLoc());
    }

    // Display player score in upper right
    ctx.font = "45px Bangers, cursive";
    ctx.textBaseline = "bottom";

    // and player lives in upper left
    ctx.clearRect(0, 0, gameSize.width, 85);
    var lifeString = ""
    for (var i = 0; i < this.lives; i++) {
        lifeString = lifeString + " \u2665";
    }
    ctx.fillText(lifeString, 10, 85);
    ctx.fillText("Score: " + this.currentScore, gameSize.width - 155, 85);

}

// Player ran into an enemy; need to update lives and reset position
Player.prototype.died = function () {
    this.lives = this.lives - 1;

    // If we ran out of lives, we're dead
    if (this.lives === 0) {
        gameOver();
        return;
    }

    // if it's not game over, just reset to start position
    this.setStartPosition();

    // reset flag so player can move again
    this.justDied = false;
}

// Freeze player while updating canvas with Score!! message 
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
Player.prototype.clearScore = function () {
    this.justScored = false;
    ctx.clearRect(0, 0, gameSize.width, gameSize.height);
    this.setStartPosition();
}

// We want to keep the player sprite horizontally centered on the blocks
// but vertically the bottom of the sprite near the bottom of the block
Player.prototype.handleInput = function (keycode) {

    // Player cannot move for the couple seconds after 
    // scoring, while we display the score and reset their position
    if (this.justScored === true || this.justDied === true) {
        return;
    }

    // Move the player in response to user key input
    switch (keycode) {
        case 'left':
            if (this.pos.x - blockSize.width / 2 >= 0) {
                this.pos.x = this.pos.x - blockSize.width / 2;
            }
            break;
        case 'right':
            if (this.pos.x + blockSize.width <= gameSize.width) {
                this.pos.x = this.pos.x + blockSize.width / 2;
            }
            break;
        case 'down': /* 170 is the height of the player sprite */
            if (this.pos.y + (blockSize.height / 2) + 170 <= gameSize.height) {
                this.pos.y = this.pos.y + blockSize.height / 2;
            }
            break;
        case 'up':
        default:
            if (this.pos.y - blockSize.height >= 0) {
                this.pos.y = this.pos.y - blockSize.height / 2;
            }
                // She's in the top row of the road and we want to allow her
                // to move into the water and score
            else {
                this.pos.y = this.pos.y - 50;
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

// Listen for radio button clicks to change game difficulty
document.getElementById('difficultyButtons').addEventListener('click', function () { setDifficulty(event.target.id); });

// changes difficulty of the game
function setDifficulty(choice) {
    if (choice === difficulty.name)
        return;
 
    difficulty.state = true;
    difficulty.name = choice;
    switch (choice) {
        case "hard":
            difficulty.enemies = 5;
            difficulty.lives = 2;
            break;
        case "easy":
            difficulty.enemies = 3;
            difficulty.lives = 5;
            break;
        case "medium":
            difficulty.enemies = 4;
            difficulty.lives = 3;
    }
    setTimeout(function () { gameReset(); }, 3000);
}

// this runs after the pause for showing Game Over on screen
function gameOver() {
    setTimeout(function () { gameReset(); }, 4000);
}

// Clear the canvas and re-create the enemies and players
function gameReset() {
    allEnemies = initializeEnemies();
    player = initializePlayer();
    gameOverLoc = gameOverLocation();
    ctx.clearRect(0, 0, gameSize.width, gameSize.height);
    if (difficulty.state === true) {
        difficulty.state = false;
        document.getElementById('canvas').focus();
    }
}

// Allows us to randomize location and speed of objects
function getRandom(min, max) {
    return Math.floor(Math.random() * max) + min;
}

// Returns an array of randomly placed enemies
// Uses difficulty object to determine number of enemies to create
function initializeEnemies() {
    var enemies = [];
    for (var i = 0; i < difficulty.enemies; i++) {
        enemies.push(new Enemy(getRandom(0, 505), getRandom(1, 3) * blockSize.height + (blockSize.height / 2)));
    }
    return enemies;
}

// Create a new player
function initializePlayer() {
    return new Player((gameSize.width / 2) - 50, gameSize.height - blockSize.height - 90);
}

function setRadioButtons() {
    var difficultyButtons = document.getElementById('difficultyButtons');
    console.log("hit the function");
    for (var i = 0; i < difficultyButtons.length; i++) {
        if (difficultyButtons[i].id == 'medium') {
            console.log("found a medium button");
            difficultyButtons[i].checked = true;
        }
        else {
            difficultyButtons[i].checked = false;
        }
    }
}
// *********************************************************************
// Here we create our enemies on first run of the game
// Setting random location in the road tiles for the enemies, and random speed
var allEnemies = initializeEnemies();
var player = initializePlayer();
window.onload = function () { setRadioButtons(); };
//*********************************************************************


