// Enemies our player must avoid
var Enemy = function(val1,val2) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
	this.x = val1;
	this.y = val2;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	
	this.x = this.x + 1;
	if (this.x > 400)
		this.x = 0;
	
	
	if (this.x == player.x && this.y == player.y){
		player.x = 400;
		player.y = 400;
	}
	//ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var a1 = new Enemy(200,150);
var a2 = new Enemy(300,300);
var a3 = new Enemy(70,400);
var allEnemies = [a1,a2,a3];


var player = function(){
	
	this.sprite = 'images/char-boy.png';	
	this.x = 400;
	this.y = 400;
	
};

player.prototype.update = function(dt){
	
};

player.prototype.render = function(){
	
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

player.prototype.handleInput = function(value){
	
	if(value == 'left')
		this.x = this.x - 100;
	if(value == 'up')
		this.y = this.y - 100;
	if(value == 'right')
		this.x = this.x + 100;
	if(value == "down")
		this.y = this.y + 100;	

};

var player = new player();

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
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

