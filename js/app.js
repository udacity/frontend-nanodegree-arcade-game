// These constants come fromt the game engine
var ROW_HEIGHT = 83;
var COL_WIDTH = 101;

// Enemies our player must avoid
var Enemy = function(row, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.row = row;
    this.speed = speed * 25;
    this.x = -2 * COL_WIDTH;
    this.y = (this.row * ROW_HEIGHT) - 20;
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += dt * this.speed;

    if (this.x > (COL_WIDTH * 6)) {
        this.x = 0;
    }
};

Enemy.prototype.getPosition = function() {
    return { x1: this.x, x2: this.x + COL_WIDTH, y1: this.y, y2: this.y + ROW_HEIGHT };
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.reset();
};

Player.prototype.reset = function() {
    this.x = 2 * COL_WIDTH;
    this.y = (5 * ROW_HEIGHT);
};

Player.prototype.update = function() {
    if (this.collidedWithEnemy()) {
        this.reset();
        console.log('Collided with an enemy!');
    }
};

Player.prototype.collidedWithEnemy = function() {
    var enemyPosition = {};
    for (var i = 0; i < allEnemies.length; i++) {
        enemyPosition = allEnemies[i].getPosition();

        if (
            (this.x >= enemyPosition.x1 && this.x <= enemyPosition.x2 ||
            this.x + COL_WIDTH >= enemyPosition.x1 && this.x + COL_WIDTH <= enemyPosition.x2) &&
            (this.y >= enemyPosition.y1 && this.y <= enemyPosition.y2 ||
            this.y + ROW_HEIGHT >= enemyPosition.y1 && this.y + ROW_HEIGHT <= enemyPosition.y2)
        ) {
            return true;
        }
    }

    return false;
};

Player.prototype.collidedWithWater = function() {
    // Water is the top row
    return this.y < ROW_HEIGHT;
};

Player.prototype.handleInput = function (keycode) {
    if (keycode === 'left') {
        if (this.x > 0) {
            this.x += -COL_WIDTH;
        }
    } else if (keycode === 'right') {
        if (this.x < (COL_WIDTH * 4)) {
            this.x += COL_WIDTH;
        }
    } else if (keycode === 'up') {
        if (this.y > 0) {
            this.y += -ROW_HEIGHT;
        }
    } else if (keycode === 'down') {
        if (this.y < (ROW_HEIGHT * 5)) {
            this.y += ROW_HEIGHT;
        }
    }

    if (this.collidedWithWater()) {
        this.reset();
        console.log('Collided with the water!');
    }
};

// Draw the player on the screen
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Place all enemy objects in an array called allEnemies
var allEnemies = [
    new Enemy(1, 1),
    new Enemy(2, 1.5),
    new Enemy(3, .5),
    new Enemy(1, 3),
    new Enemy(2, 4),
    new Enemy(3, 2),
];

// Place the player object in a variable called player
var player = new Player(0, 0);

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
