// TODO Clear render on alpha pixels
// TODO remove instances of 83 and 101 with variables
// TODO Add music
// TODO Rename playersprites and add selection menu (maybe)
// TODO Add scoring mechanism (maybe)


// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // SY: Iniital position of the bug. Y is set up
    // such that it only appears on the concrete path
    this.x = Math.ceil(Math.random() * 5) * 101;
    this.y = Math.ceil(Math.random() * 3) * 83 - 25;

    this.speed = Math.random() * 200 + 100;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Enemies will move horizontally across the screen. On
    // collision of the bounds, they appear again on from
    // the edge

    if (this.x <= 505){
        this.x += this.speed * dt;
    } else{
        this.x = -101;
        this.y = Math.ceil(Math.random() * 3) * 83 - 25;
        this.speed = Math.random() * 200 + 100;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';

    this.x = Math.floor(5 / 2) * 101;
    this.y = 5 * 83 - 35;
}

Player.prototype.update = function(dt) {

}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
    // TODO Handle collision with edges
    switch(key){
        case 'left':
            this.x -= 101;
            break;
        case 'right':
            this.x += 101;
            break;
        case 'up':
            this.y -= 83;
            break;
        case 'down':
            this.y += 83;
            break;
        default:
            this.x = this.x;
            this.y = this.y;
    }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for(var i = 0; i < Math.random() * 5 + 2; i++){
    allEnemies.push(new Enemy());
}
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
