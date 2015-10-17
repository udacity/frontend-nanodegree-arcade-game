// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x=0;
    this.y=101/2+Math.round(Math.random())*83+Math.round(Math.random())*83;
    this.speed=100+500*Math.random();
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x=this.x+this.speed*dt;
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.col=Math.round(this.x/101);
    this.row=Math.round(this.y/83);
    player.col=Math.round(player.x/101);
    player.row=Math.round(player.y/83);
    if (this.col>5){
        this.x=0;
        this.y=83/2+Math.round(Math.random())*83+Math.round(Math.random())*83;
    };
    if (this.col==player.col&&this.row==player.row){
        player.x=101*2;
        player.y=83*5-83/2;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x=101*2;
    this.y=83*5-83/2;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(), new Enemy(),new Enemy()];
var player=new Player();

Player.prototype.handleInput = function(key) {
   console.log(this.col,this.row);

    if (key=='up'&&this.row>0){
        this.y=this.y-83;
    };
    if (key=='down'&&this.row<5){
        this.y=this.y+83;
    };
    if (key=='left'&&this.col>0){
        this.x=this.x-101;
    };
    if (key=='right'&&this.col<4){
        this.x=this.x+101;
    }
    this.col=Math.round(this.x/101);
    this.row=Math.round(this.y/83);
    if (this.row==0){
        this.x=101*2;
        this.y=83*5-83/2;
    };
 
};

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