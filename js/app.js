// Enemies our player must avoid
var Enemy = function(x, y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = 80;
}; 

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (this.x < 505) {
        this.x += this.speed * dt;
    } else {
        this.x = 0;
    }
    
    
  
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //Updates the Enemy location (you need to implement)
    //Handles collision with the Player (you need to implement)
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    //checkCollisions function
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

Player.prototype.update = function(dt) {
    //e.g. if up key pressed decrease x value from this to this
    
    //Updates the Player location (you need to implement)
    //Handles collision with the Player (you need to implement)
};


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

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(0, 240), new Enemy(0, 160), new Enemy(0, 80)]
var player = new Player(202,400);

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
