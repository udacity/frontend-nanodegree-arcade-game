// @author yayomanosalva@gmail.com 2015

var posEnemy = [];

var Enemy = function() {
    // Variables applied to each of our instances go here, we've provided one for you to get started
    this.speed = 150;
    

    this.updatePosition = function() {
        while(posEnemy != 0) {
            this.random = Math.floor(Math.random() * posEnemy.length);

            var posEnemy = updatePosition[this.random];

            updatePosition.splice(2, this.random);

            //position
            this.x = posEnemy[0];
            this.y = posEnemy[1];
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
    this.x = 200;
    this.y = 390;
    
    this.playerImage = [
        'images/char-boy.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png'
    ];

    this.sprite = this.playerImage[0];
}

Player.prototype.update =function(){
    //update
    return this.x;
}

var player = new Player();


//begin position player
Player.prototype.begin = function() {
    this.x = 100;
    this.y = 200;
}

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(position) {


    this.constX = 80;
    this.constY = 90;

    this.newPosX = this.x;
    this.newPosY = this.y;

    switch(position){
        case 'left':
            this.newPosX = this.x - this.constX;
            break;
        case 'right':
            this.newPosX = this.x - this.constX;
            break;
        case 'up':
            this.newPosY = this.y - this.constY;
            break;
        case 'down':
            this.newPosY = this.y - this.constY;
            break;
    }
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
