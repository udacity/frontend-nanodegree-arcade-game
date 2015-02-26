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
var Player = function (x, y) {
    // x, y coordinates of player locationn
    this.x = x
    this.y = y

    // Count of how many times they make it across the road
    this.currentScore = 0;
    
    // when true, we display a SCORE!! across the screen
    this.justScored = false;

    // url to our player's resource
    this.sprite = 'images/char-cat-girl.png';
}

Player.prototype.update = function (dt) {
   
}

Player.prototype.scoreDone = function () {
    this.justScored = false;
}

Player.prototype.setStartPosition = function() {
    ctx.clearRect(0, 0, 60, 505);
    this.x = (gameWidth / 2) - 50;
    this.y = gameHeight - blockHeight - 90;
 
}
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    if (this.justScored === true) {
        ctx.font = "60pt Bangers, cursive";
        ctx.fillStyle = "deeppink";
        ctx.fillText("Score!!", 100, 400);
    }

    ctx.font = "45px Bangers, cursive";
    ctx.fillStyle = "deeppink";
    ctx.textBaseline = "bottom";

    ctx.clearRect(0, 0, gameWidth, 90);
    ctx.fillText("Score: " + this.currentScore, 350, 100);

}

// Our player sprites are 101x170px
// and we want to keep them horizontally centered on the blocks
// but vertically the bottom of the sprite near the bottom of the block
Player.prototype.handleInput = function (keycode) {
    var spriteHeight = 170;
    switch (keycode) {
        case 'left':
            if (this.x -blockWidth >= 0) {
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
            else  {
                if (this.justScored === false) {
                    this.y = this.y - 50;
                    this.currentScore++;
                    this.justScored = true;
                    window.setTimeout(function () { clearScore(); }, 2000);
                }
            }
    }
}
// *********************************************************************
// Here we create our enemies 
// Setting random location in the road tiles for the enemies, and random speed
var allEnemies = [];
for (var i = 0; i < 5; i++) {
    allEnemies.push(new Enemy(getRandom(0, 505), getRandom(1, 3) * blockHeight - (blockHeight * .25)));
}

// Create a new player
// TODO: allow player to choose character
var player = new Player((gameWidth / 2) - 50, gameHeight - blockHeight - 90);

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


function clearScore() {
    console.log("Made it to clearScore function");
    player.scoreDone();
    ctx.clearRect(0, 0, gameWidth, gameHeight);
    player.setStartPosition();
}

