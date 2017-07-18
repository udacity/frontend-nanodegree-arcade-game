var tileLength = 90;
var tileWidth = 101;
var canvas = document.getElementsByTagName("canvas");
var playerScore = 0;
var ENEMY_LENGTH = 100;

var gameLoaded = false;
var gameOverVariable =false;

var canvas_width = 505,
    canvas_height = 606;    

//Gem class
var Gem = function(r, c){
    this.row = r;
    this.column = c;
    this.sprite = 'images/Gem Blue.png';
    this.point = 10;
    this.active = true;
};    

Gem.prototype.render = function(){
    if(this.active == true){
        var x = this.column * 101;
        var y = this.row * 101;
        var dWidth = 90;
        var dHeight = 90;
        ctx.drawImage(Resources.get(this.sprite), x, y, dWidth, dHeight);
    }
};

Gem.prototype.setSpriteAndPoint = function(sprite, point){
    this.sprite = sprite;
    this.point = point;
};

Gem.prototype.setInactive = function(sprite){
    this.active = false;
};

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
    this.x = this.x + dt*120;
    if(this.x > canvas_width){
        this.x -= canvas_width;
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
    this.sprite = 'images/char-boy.png';
    this.score = 0;
};

Player.prototype.update = function(dt){
};

Player.prototype.setSprite = function(sprite){
    this.sprite = sprite;
};


Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode){
    if(gameOverVariable == true){
            return;
    }
    var maxHeight = canvas_height - tileLength;
    var maxWidth = canvas_width - tileWidth;
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
        this.score += 1;
        console.log("Updating player score " + this.score);
        //gScoreHTML.innerHTML = playerScore;
        //document.body.appendChild(gScoreHTML);
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
var enemy2 = new Enemy(51,140);
var enemy3 = new Enemy(400,220);
var enemy4 = new Enemy(230,140);
var enemy5 = new Enemy(-200,60);
// var enemy6 = new Enemy(-50,220);
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];
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