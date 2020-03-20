// Enemies our player must avoid
var Enemy = function([x,y],[Vx,Vy]) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = [Math.floor(Math.random() *Vx)+1, Math.floor(Math.random() *Vy)+1];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if(this.x >= 505) {
         this.speed[0] = -1.1*this.speed[0];
    }
    else {
        this.x+= this.speed[0]*dt;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function(x,y){
    this.sprite='images/char-cat-girl.png'; 
    this.x = x;
    this.y = y;
};
// This class requires an update(), render() and
// a handleInput() method.

Player.prototype.update = function(dt) {
    this.y+=this.speed*dt;
    //this.reset();
};

Player.prototype.render = function() {
    /*ctx.drawImage(Resources.get(this.sprite), this.x, this.y);*/
};

// Now instantiate your objects.
var enemy = new Enemy([-16.5,120],[30,0]);
enemy.update(3);
var enemy2 = new Enemy([-30,50],[20,0]);
enemy2.update(3);
var enemy3 = new Enemy([-60,200],[40,0]);
enemy3.update(3);
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
allEnemies.push(enemy,enemy2,enemy3);
// Place the player object in a variable called player
var player = new Player(200,180);

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
