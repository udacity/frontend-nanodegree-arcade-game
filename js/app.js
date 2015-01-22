//Superclass Entity wich will be common in Enemy and PLayer
var Entity = function(x, y, speed, sprite){
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.sprite = sprite;
}
Entity.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += speed * dt;
    this.y += speed * dt;
}

// Draw the enemy on the screen, required method for game
Entity.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    //Calling Entity class
    this.sprite = 'images/enemy-bug.png';
    Entity.call(this, x, y, speed, sprite)
}

Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += speed * dt;
    this.y += speed * dt;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.speed = speed;
    this.x = x;
    this.y =
    this.sprite = 'images/char-boy.png';

}

Player.prototype.update = function(){
    this.x += speed * dt;
    this.y += speed * dt;
}

Player.prototype.render = function(){    
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);   
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player(0, 0, 2);


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
