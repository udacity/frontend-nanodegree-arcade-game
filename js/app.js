/**
 * @description Represents the enemy
 * @constructor
 * @param x
 * @param y
 * @param speed
 * @constructor
 */
var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // make enemies loop to left side of canvas after reaching canvas.width @todo comment fix
    if (this.x >= 505) {
        this.x = 0;
    }

    this.isCollided();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.isCollided = function () {
    // check for collision between enemy and player
    if (
        player.y + 131 >= this.y + 90
        && player.x + 25 <= this.x + 88
        && player.y + 73 <= this.y + 135
        && player.x + 76 >= this.x + 11) {

        player.x = 202.5; // @todo shouldn't be hardcoded
        player.y = 383;

        // check high-score
        if (highScore < gameLevel) {
            highScore = gameLevel;
            $("#high-score").text(highScore); // Update high-score on page
        }

        gameLevel = 1; // Reset game level
        $("#level").text(gameLevel); // Update current level on page
        return true;
    }

    return false;
};

/**
 * @description Represents the player
 * @constructor
 * @param {number} x
 * @param {number} y
 * @param {number} speed
 */
var Player = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.isLevelUp();

    // check if player runs into left, bottom, or right canvas walls
    // prevent player from moving beyond canvas wall boundaries
    // @todo make constants or other solution
    if (player.y > 383) {
        player.y = 383;

        return true;
    }

    if (player.x > 402.5) {
        player.x = 402.5;

        return true;
    }

    if (player.x < 2.5) {
        player.x = 2.5;

        return true;
    }
};

// Draw our player on the screen, required method for game
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.isLevelUp = function () {
    // check for player reaching top of canvas and winning the game
    // if player wins, add 1 to the score and level
    // pass score as an argument to the increaseDifficulty function
    if (player.y + 63 <= 0) {
        player.x = 202.5;
        player.y = 383;

        gameLevel++;
        $("#level").text(gameLevel); // Update current level on page
        updateEnemies(gameLevel);

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 505, 171);

        // score += 1;
        // gameLevel += 1;
        // console.log('current score: ' + score + ', current level: ' + gameLevel);
        // increaseDifficulty(score);

    }
};

// Draw our player on the screen, required method for game
Player.prototype.handleInput = function (keyPressed) {
    switch (keyPressed) {
        case 'left':
            player.x -= player.speed;
            break;
        case 'up':
            player.y -= player.speed;
            break;
        case 'right':
            player.x += player.speed;
            break;
        case 'down':
            player.y += player.speed;
            break;
        default:
        // do nothing
    }
};

var gameLevel = 1;
var highScore = 1;

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
var possibleEnemyPositions = [60, 140, 220];

// Place the player object in a variable called player
var player = new Player(202.5, 383, 100);

var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);
allEnemies.push(enemy);

var updateEnemies = function (numberOfEnemies) {
    allEnemies = [];

    for (var i = 0; i <= (numberOfEnemies / 2); i++) {
        allEnemies.push(new Enemy(0, possibleEnemyPositions[Math.floor((Math.random() * possibleEnemyPositions.length))], Math.random() * 256));
    }
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function (e) {
    var allowedKeys = {
        37: "left",
        38: "up",
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    // console.log(allowedKeys[e.keyCode]);
});
