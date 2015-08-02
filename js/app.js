// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    // Create speed var and set speed
    this.speed;
    this.setSpeed();

    // Create image
    this.sprite = 'images/enemy-bug.png';

    // Initiate first position of enemy
    this.x = -100;
    this.y = this.setRow();
}

Enemy.prototype.setRow = function(){
    var rows = [60, 145, 230];
    console.log("setRow");
    return rows[Math.floor(Math.random() * rows.length)];
}
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 500) { 
        this.x = -101;
        this.setSpeed();
        this.y = this.setRow();
    }

    if (this.x > (player.x - 25) && this.y == player.y && this.x < (player.x + 25)) {
        player.reset();
    }
}

Enemy.prototype.setSpeed = function() {
    this.speed = (Math.random() * 600);
    (this.speed < 150) ? this.setSpeed() : null;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Set the player location
    this.x = 202;
    this.y = 400;
    // Render player image
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    switch (true) {
        case (this.y < 50):
            this.reset(); 
            break;
        case (this.y > 401):
            this.y = 400;
            break;
        case (this.x > 500):
            this.x = 404;
            break;
        case (this.x < 0):
            this.x = 0;
            break;
    }
  
}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(input) {
    switch (input){
        case 'left':
            this.x -= 101;
            this.update();
            break;
        case 'up':
            this.y -= 85;
            this.update();
            break;
        case 'right':
            this.x += 101;
            this.update();
            break;
        case 'down':
            this.y += 85;
            this.update();
            break;
    }
}

Player.prototype.reset = function() {
    this.y = 400;
    this.x = 202;
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];
var player = new Player();


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
