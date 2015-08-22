//Set
/** @const {Number} Dimension for tiles height. */
var ROW_HEIGHT = 83;

/** @const {Number} Dimension for tiles width. */
var COL_WIDTH = 101;

/** @const {Number} Dimension for tiles height. */
var COL = 83;

/** @const {Number} Dimension for tiles width. */
var score = 0;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed = 100*Math.floor(Math.random()*1.999);//(0.5*(1+1/50) + Math.random()*(1+1/50))*100;
    this.x = -100;
    this.y = 70;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
     if (this.x >= 500){
     	this.x = -100;
        this.y = 70+ Math.floor(Math.random()*2.999)*80;
        this.speed = Math.floor(Math.random()*3.999)*100;
     } else {
        this.x += this.speed * dt;
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
    this.sprite = 'images/char-princess-girl.png';
    this.x = 200;
    this.y = 400;
}

Player.prototype.render = function(){
	ctx.drawImage(Resources.get(this.sprite), this.x,this.y);
}
Player.prototype.update = function(){
	if(this.y < 0  ){
		this.y = 400;
	}
}
Player.prototype.handleInput = function(e) {	
	if (e === "up" && this.y >=0){
		this.y -= 80;
	}
	else if(e === "down" && this.y <400){
		this.y += 80;
	}
	else if(e === "left" && this.x >0){
		this.x -= 100;
	}
	else if(e === "right" && this.x< 400){
		this.x += 100;
	}
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player();

for(var i = 0;i < 5; i++){
	allEnemies[i] = new Enemy();
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
