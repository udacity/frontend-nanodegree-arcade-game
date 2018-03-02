// Enemies our player must avoid

var Enemy = function() {
    //create prototype for Enemy
    let obj = Object.create(Enemy.prototype);   
    //x co-ordinate
    obj.x = (function(){ 
                return 505*Math.random()
            }());
    //y co-ordinate
    obj.y =Enemy.makeRandomYCord();
    //create a random speed
    obj.speed =(function(){return 600*Math.random();}());
    // The image/sprite
    obj.sprite = 'images/enemy-bug.png';
    return obj;
};
//Static variable, keeps track of where to place each bug.
Enemy.yPosition =0; 

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    //If reach the edge of the Game layout
    if(this.x>=505){ 
        //reset image just before the layout
        this.x=-100;
        this.y =Enemy.makeRandomYCord();
    }else
        //multiply random speed by variable dt
        this.x+=(dt*this.speed);      
    
  
};

 Enemy.makeRandomYCord = function(){
        let yPossiblePos = [60, 140, 230];
        if(Enemy.yPosition>=3) 
            //Last bug is placed on a random row.
            Enemy.yPosition= Math.round(Math.random()*2);
        return yPossiblePos[Enemy.yPosition++];
    }

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //This method takes three parameters: an image, an x-coordinate, and a y-coordinate:
};

let Player= function(){
    this.x=205;
    this.y=390;
    this.sprite = 'images/char-boy.png';
};

Player.lives = 3;

Player.prototype.update = function(){
//console.log("what");
};

Player.prototype.render = function(){

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(){
    
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [Enemy(),Enemy(),Enemy(),Enemy()]; 
// Place the player object in a variable called player
let player = new Player(); 



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    // player.handleInput(allowedKeys[e.keyCode]);
});
// Review the code and comments provided in app.js
// Identify the various classes you will need to write.
// Identify and code the properties each class must have to accomplish its tasks.
// Write the functions that provide functionality to each of your class instances.
// Review the project rubric to make sure your project is up to spec. For example 
// make sure the functions you write are object-oriented - either class functions 
// (like Player and Enemy) or class prototype functions such as Enemy.prototype.checkCollisions, 
// and that the keyword 'this' is used appropriately within your class and class prototype functions.
//  Also be sure that the readme.md file is updated with your instructions on both how to 
//  1. Run and 2. Play your arcade game.