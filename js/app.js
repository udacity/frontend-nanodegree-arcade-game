// Enemies our player must avoid

var Enemy = function() {
    let obj = Object.create(Enemy.prototype);   
    //x co-ordinate
    obj.x = (function(){ 
                return 505*Math.random()
            }());
    //y co-ordinate
    obj.y =makeRandomYCord();

    function makeRandomYCord(){
        let yPossiblePos = [60, 140, 230];
        if(Enemy.yPosition>=3) 
            Enemy.yPosition==0;
        return yPossiblePos[Enemy.yPosition++];
    }
    obj.speed= 800;//Speed
    obj.sprite = 'images/enemy-bug.png';// The image/sprite



   return obj;
    //create a random speed
    //create a random x direction
    //create a random y position between y 38 and y 122

};
//Acts as a static object, to help keep track of where to place each bug.
Enemy.yPosition =0; 



// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

  //  this.x = x++;
    //if(this.x===555)x=0;
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};



// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //This method takes three parameters: an image, an x-coordinate, and a y-coordinate:
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
////var b = Enemy();
//var c = Enemy();
let allEnemies = [Enemy(),Enemy(),Enemy()];

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