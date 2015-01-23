//Superclass Entity wich will be common in Enemy and PLayer
var Entity = function(x, y, speed, sprite){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = sprite;
}
Entity.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed;
    this.y += this.speed;
}

// Draw the enemy on the screen, required method for game
Entity.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    //Calling Entity class
    Entity.call(this, x, y, speed, 'images/enemy-bug.png')
}
Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed){
     Entity.call(this, x, y, speed, 'images/enemy-bug.png')
}
Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player(0, 0, 0.001);

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
