// @author yayomanosalva@gmail.com 2015
// Enemies our player must avoid

var positionEnemy = [];

var Enemy = function() {
    // Variables applied to each of our instances go here, we've provided one for you to get started
    this.speed = 150;
    //position
    this.x = 0;
    this.y = y;

    this.updatePosition = function() {
        while(positionEnemy != 0) {
            this.random = Math.floor(Math.random() * positionEnemy.length);

            var pos = updatePosition[this.random];

            updatePosition.splice(2, this.random);
        }

    };
    // The image/sprite for our enemies, this uses a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter which will ensure the game runs at the same speed for all computers.
    
    //crea otros Enemy
    if(this.x>400) {
        this.x = -100;
    }

    //actualiza x    
    this.x += dt * this.speed;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {

    // initial position
    this.x = 360;
    this.y = 320;
    
    this.sprite = 'images/char-pink-girl.png';
}

Player.prototype.update =function(){
    //update
    return this.x;
}

var player = new Player();

var render = function() {

}
//begin position player
Player.prototype.begin = function() {
    this.x = 100;
    this.y = 200;
}

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var handleInput = function() {
    
}

Player.prototype.update =function(){
    //update
    return this.x;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies =[];
// Place the player object in a variable called player





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
