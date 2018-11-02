// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    const  Enemy = function Enemey(x,y,speed) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        //Properties
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        this.height = 45;
        this.width = 75;
        this.speed = speed;   
        this.hStep = 101;
        this.startPos= -(hStep);     
    };
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.

Enemy.prototype.update = function(dt){ //Aspects of this method have origins from https://matthewcranford.com/arcade-game-walkthrough-part-5-adding-enemies/

    this.x += 100 * dt; //movement of enemy
    this.x += this.speed * dt; //Varing speed of enemy by multiplying initial X-position by a new x-value. 
    
        if (this.x < hStep * 5){  //If x-position is less than the width of the canvass, enemy will continue to move at designated speed.
            this.x += this.speed * dt;
    
        } else {
                this.x = this.startPos; /*Otherwise, if x-position is greater than the width of the canvass, enemy will default
                                        to initial x-position.*/
            }
           
           //Collision Check
          //This Collision Check Statement is a concept originated from http://blog.sklambert.com/html5-canvas-game-2d-collision-detection
          //Used Dev Tools in order to find out height and width of player and enemy 
    
            for (enemy of allEnemies){ 
                if (this.x < player.x + player.width  && this.x + this.width  > player.x &&
                    this.y < player.y + player.height && this.y + this.height > player.y) {
            // The objects are touching
                        
                     player.reset();
                        
            }
            
            }
        };
    
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
    
        




// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

const vStep = 83;
const hStep = 101;

const Player = function (x,y){
        //Properties            
        this.x = x;
        this.y = y;
        this.vStep = vStep;
        this.hStep = hStep;
        this.initX = 200; 
        this.initY = 400;    
        this.sprite = 'images/char-boy.png';
        this.height = 60;
        this.width = 32;    
        
    };



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


let allEnemies = [];
