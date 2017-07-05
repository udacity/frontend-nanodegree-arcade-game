var tileLength = 90;
var tileWidth = 101;
var canvas = document.getElementsByTagName("canvas");
var gScoreHTML = document.querySelector("#score");
var playerScore = 0;
var ENEMY_LENGTH = 100

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.collision = false;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.length = ENEMY_LENGTH;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + dt*50;
    if(this.x > canvas[0].width){
        this.x -= canvas[0].width;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y){
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-cat-girl.png';
};

Player.prototype.update = function(dt){
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode){
    //console.log("Initial " + this.x + " " + this.y);
    var maxHeight = canvas[0].height - tileLength;
    var maxWidth = canvas[0].width - tileWidth;
    if(keyCode == 'left'){
        this.x = Math.max(0, this.x - tileWidth);
    }else if(keyCode == 'up'){
        this.y = Math.max(this.y - tileLength, 0);
    }else if(keyCode == 'right'){
        this.x = Math.min(this.x + tileWidth, maxWidth);
    }else if(keyCode == 'down'){
        if(this.y == 0){
            this.y = 40;
        }else{
            this.y = Math.min(this.y + tileLength, 400);
        }
    }else{

    }
    if(this.y == 0){
        playerScore +=1;
        gScoreHTML.innerHTML = playerScore;
        this.resetPlayer();
    }
    //console.log("Final " + this.x + " " + this.y);
}


Player.prototype.resetPlayer = function(){
    this.x = 0;
    this.y = 400;
    if(this.collision == true){
        this.collision = false;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy(0,60);
var enemy2 = new Enemy(-50,140);
var enemy3 = new Enemy(-400,220);
var enemy4 = new Enemy(-550,140);
var allEnemies = [enemy1, enemy2, enemy3, enemy4];
//var allEnemies = [enemy1];

var player = new Player(0,400);

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
