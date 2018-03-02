// Enemies our player must avoid
let pauseMode = false; 


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
  
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Player.prototype.handleInput = function(keyPressed){
    if(keyPressed == 'spacebar')
        pauseMode = !pauseMode;
    else if(keyPressed!=undefined && !pauseMode) {
       switch(keyPressed){
            case 'right': player.x += 100;
                          break;
            case 'left':  player.x -= 100;
                          break;
            case 'down':  player.y += 85;
                          break;
            case 'up':    player.y -= 85;
                          break;
        } 
    }
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
        40: 'down',
       32:  'spacebar'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
