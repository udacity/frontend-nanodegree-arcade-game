// Enemies our player must avoid
let pauseMode = false; 

////////////SUPER CLASS-GAME PIECE///////////
var GamePiece = function(){};
//Draw GamePieces on the screen, required method for game
GamePiece.prototype.render = function() {
    ctx.drawImage(Resources.get(this.getSprite()), this.getX(), this.getY());
    //This method takes three parameters: an image, an x-coordinate, and a y-coordinate:
};

//////////////////ENEMY///////////////////
//Pseudoclassical Class Definition
var Enemy = function() {
    //Private variables
    let x = (function(){ return 505*Math.random()}());
    let makeRandomYCord; //A private functiom 
    let y = (function(){ 
                    let yPosition =0; //Use a closure with makeRandomYCord(function) to make yPosition a private static variable.
                    makeRandomYCord = function (){ 
                        let yPossiblePos = [60, 140, 230];
                        if(yPosition>=3) 
                            yPosition= Math.round(Math.random()*2);//Last bug is placed on a random row.
                        return yPossiblePos[yPosition++];
                    }
            return makeRandomYCord();
            }());//IIFE
    let speed =(function(){return 600*Math.random();}());//IIFE
    let sprite = 'images/enemy-bug.png';
    //public functions
    this.getSprite = function(){return sprite;};
    this.getX = function(){return x;};
    this.getY = function(){return y;};
    this.getSpeed = function(){return speed;};
    // Update the enemy's position, required method for game, Parameter: dt, a time delta between ticks
    this.update = function(dt) {//If reach the edge of the Game layout
                    if(x>=505){ //reset image just before the layout
                        x=-100;
                        y=makeRandomYCord();
                    }else
                        //multiply random speed by variable dt
                        x+=(dt*speed);      
                    };  
};

Enemy.prototype = Object.create(GamePiece.prototype);//Inherit from GamePiece Superclass


/////////////////PLAYER/////////////////////
let Player= function(){ //Pseudoclassical Class Definition
    let x = 205;
    let y = 390; 
    let sprite = 'images/char-boy.png';
    let lives = 3; //Default 3 lives at start

    this.updateX =  function(movePos){x = x + movePos;};
    this.updateY =  function(movePos){y = y + movePos;};
    this.getSprite = function(){return sprite;};
    this.getX = function(){return x;};
    this.getY = function(){return y;};
};
Player.prototype = Object.create(GamePiece.prototype);//Inherit from GamePiece Superclass

//Player.lives = 3; //Use a closure....

Player.prototype.update = function(){
  
};

Player.prototype.handleInput = function(keyPressed){
    if(keyPressed == 'spacebar')
        pauseMode = !pauseMode;
    else if(keyPressed!=undefined && !pauseMode) {
       switch(keyPressed){
            case 'right': this.updateX(100);
                          break;
            case 'left':  this.updateX(-100);
                          break;
            case 'down':  this.updateY(85);
                          break;
            case 'up':    this.updateY(-85);
                          break;
        } 
    }
};

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

// Now instantiate your objects.
let allEnemies = [new Enemy(),new Enemy(),new Enemy(),new Enemy()]; 
let player = new Player(); 