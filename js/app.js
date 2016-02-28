// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Random variables to define speed and starting position of enemyies randomly
    var random1 = Math.random();
    var random2 = Math.random();
    var yPos = [60, 143, 226, 309, 392];

    dx = 500 * dt * random1;
    if (random2 > 0.9) {
        dx = dx * 2;
    }
    this.x = this.x + dx;

    // Defining starting positions of new enemy
    if (this.x > 600) {
        this.x = -101 * random2;
        this.y = yPos[Math.floor(Math.random() * yPos.length)];
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function(dt) {
    maxEnemies = allEnemies.length;
    var checkCollisionX = 0;
    var checkCollisionY = 0;
    for (enemyNumber = 0; enemyNumber < maxEnemies; enemyNumber++) {
        checkCollisionX = Math.abs(this.x - allEnemies[enemyNumber].x);
        checkCollisionY = Math.abs(this.y - allEnemies[enemyNumber].y);
        if (checkCollisionX < 50 && checkCollisionY < 50 || this.y < 0) { //
            this.x = 202;
            this.y = 569;
        }
    }
};

Player.prototype.handleInput = function(action) {
    var stepX = 101;
    var stepY = 83;
    if (action === 'left' && this.x > 0) {
        this.x = this.x - stepX;
    } else if (action === 'right' && this.x < 403) {
        this.x = this.x + stepX;
    } else if (action === "up") {
        this.y = this.y - stepY;
    } else if (action === "down" && this.y < 569) {
        this.y = this.y + stepY;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var xStartPos = [-45, 300, 150, -45, -100];
var yStartPos = [60, 143, 226, 309, 392];

for (var i = 0; i < 5; i++) {
    allEnemies.push(new Enemy(xStartPos[i], yStartPos[i]));
}

var player = new Player(202, 569);


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