// Enemies our player must avoid. Includes random
// speed each enemy will travel at.
var Enemy = function(x, y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = (Math.floor(Math.random() * (500 - 200)) + 200);
};

// Updates the enemy's position. moving the enemy 
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (this.x > 505) {
        this.x = -100;
    } else {
        this.x += (this.speed * dt);
    }
};

// Draws the enemy on the screen.
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
// This class has an update(), checkCollisions(),
// reset(), render() and a handleInput() method.
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

Player.prototype.update = function(dt) {
    this.checkCollisions();
    if (this.y < 0) {
        this.reset();
    }
};

// This method compares enemy and player 
// locations to check for collisions
Player.prototype.checkCollisions = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        if (this.x >= allEnemies[i].x &&
            this.x < allEnemies[i].x + 60 &&
            this.y >= allEnemies[i].y &&
            this.y < allEnemies[i].y + 40) {
            this.reset();
        }
    }
};

// this method resets the player to the starting position
Player.prototype.reset = function() {
    this.x = 202;
    this.y = 400;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This method defines how each key should move the player
Player.prototype.handleInput = function(direction) {
    if (direction === 'up') {
        if (this.y > 100) {
            this.y -= 80;
        } else {
            alert("You did it!");
            this.y = 400;
        }
    }
    if (direction === 'down') {
        if (this.y < 400) {
            this.y += 80;
        } else {
            this.y = 400;
        }
    }
    if (direction === 'right') {
        if (this.x < 404) {
            this.x += 101;
        } else {
            this.x = 404;
        }
    }
    if (direction === 'left') {
        if (this.x > 0) {
            this.x -= 101;
        } else {
            this.x = 0;
        }
    }
};

// Objects instantiation.
// all enemy objects in an array called allEnemies
// player object in a variable called player
var enemyOne = new Enemy(0, 240);
var enemyTwo = new Enemy(0, 160);
var enemyThree = new Enemy(0, 80);

var allEnemies = [enemyOne, enemyTwo, enemyThree];
var player = new Player(202, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});