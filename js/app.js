// Enemies our player must avoid
var Enemy = function(speed, row) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
    this.row=row;
    this.x=0;
    this.y=0;


};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x=this.x+this.speed;
    if (this.x<=player.x && this.x>=player.x+83 && this.y==player.y) {
        //function reset
       player.reset();
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
    var player = function() {
 
    this.sprite = 'char-princess-girl';
    this.x=249;
    this.y=506;

    this.reset= function(){
    this.x=249;
    this.y=506;
    }

   this.handleInput =function(key){
    if (key== "left" && this.x!=0) {
        this.x=this.x-83;
        if (true) {}
    }
    else if (key== "right"&& this.x<=332) {
        this.x=this.x+83;
    }
    /////
   }

};
   
   player.prototype.update = function(dt) {
    
   }

   player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
   
 var player=new player();
 
 var Enemy =new Enemy(20,1);



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
