// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // Random delay.
    this.x = -100 * Math.floor((Math.random() * 4) + 1);
    // Random lane.
    this.y = 60 + 80 * Math.floor((Math.random() * 3) + 0);
    // Random speed.
    this.speed = 100 * Math.floor((Math.random() * 4) + 1); 

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Move bug right until it`s gone;
    this.x += this.speed*dt;

    // If it went off reset it.
    if(this.x > 500){
        this.speed = 100 * Math.floor((Math.random() * 4) + 1);
        this.x = -100 * Math.floor((Math.random() * 10) + 1);
        this.y = 60 + 80 * Math.floor((Math.random() * 4) + 0);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 380;
};

// Draw the player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Reset player possition to start.
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 380;
};

// Move player according to key pressed.
Player.prototype.handleInput = function(keyPressed) {
    if(keyPressed === 'left' && this.x > 0){
        this.x -= 100;
    }

    if(keyPressed === 'right' && this.x < 400 ){
        this.x += 100;
    }

    if(keyPressed === 'up' && this.y > 60){
        this.y -= 80;
    }

    if(keyPressed === 'down' && this.y < 380){
        this.y += 80;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var allEnemies = new Array();

for(var i = 0; i<10; i++){
    allEnemies.push(new Enemy());
}

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
