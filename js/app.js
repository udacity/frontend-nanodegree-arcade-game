// Enemies our player must avoid
var Enemy = function(x, y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = (Math.floor(Math.random() * (400 - 100)) + 100)
}; 

// Updates the enemy's position.
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (this.x > 505) {
        this.x = -100
y    } else {
        this.x += (this.speed * dt);
    };
 };


    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //Updates the Enemy location (you need to implement)
    //Handles collision with the Player (you need to implement)


// Draws the enemy on the screen.
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    //checkCollisions function
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

Player.prototype.update = function(dt) {
    //Updates the Player location (you need to implement)
    //Handles collision with the Player (you need to implement)
};

Player.prototype.checkCollisions = function() {
    for (i = 0; i <= allEnemies.length; i++) {
        if ((allEnemies[i].x + 100 >= player.x) 
            && (allEnemies[i].x <= player.x + 100) 
            && (allEnemies[i].y + 80 >= player.y) 
            && (allEnemies[i].y <= player.y + 80)) {
            this.x = 202;
            this.y = 400;
        }
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
    if (direction === 'up') {
        if (this.y > 100) {
            this.y -= 80;
        } else {
            this.y = 400;
        };
    };
    if (direction === 'down') {
        if (this.y < 400) {
            this.y += 80;
        } else {
        this.y = 400;
        };
    };
    if (direction === 'right') {
        if (this.x < 404) {
            this.x += 101;
        } else {
        this.x = 404;
        };
    };
    if (direction === 'left') {
        if (this.x > 0) {
            this.x -= 101;
        } else {
            this.x = 0;
        };
    };
};

// Objects instantiation.
// all enemy objects in an array called allEnemies
// player object in a variable called player
var enemyOne = new Enemy(0,240);
var enemyTwo = new Enemy(0,160);
var enemyThree = new Enemy(0,80);

var allEnemies = [enemyOne, enemyTwo, enemyThree];
var player = new Player(202,400);

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
