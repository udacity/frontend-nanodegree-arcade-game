

let pauseScreen;
let allEnemies;
let player;
let newGameScreen;
let allGems;
let allHearts;
let gameSpace;
let gameCommenced = false;
let restartRequested = false;

var GamePiece = function(){return this;};
  
GamePiece.prototype.render = function() {//Draw GamePieces on the screen, required method for game
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);  //This method takes three parameters: an image, an x-coordinate, and a y-coordinate:
};
var Enemy = function() {
    this.x = 505*Math.random();
    var Randomizer = function(GemArray){//TO DO: CHANGE FOR ENEMY FUNCTION
                let thisGemPos=Math.round(Math.random()*(GemArray.length-1));
                let thisGemBe = GemArray[thisGemPos];
                GemArray.splice(thisGemPos, 1);
                return thisGemBe;

                };

    this.y =  (function(){
                if(Enemy.possibleYPos.length===0){
                    return Randomizer([60, 140, 230]);     
                }else{
                    return Randomizer(Enemy.possibleYPos);
                }
            }());

    this.speed =150+250*Math.random();//IIFE
    this.sprite ='images/enemy-bug.png';  
    // Update the enemy's position, required method for game, Parameter: dt, a time delta between ticks
    this.update =   function(dt) {//If reach the edge of the Game layout
                        if(this.x>=505){ //reset image just before the layout
                            this.x=-100;   
                        }else
                            this.x+=(dt*this.speed);//multiply random speed by variable dt
                    };  

};
Enemy.possibleYPos = [60, 140, 230];
Enemy.prototype = Object.create(GamePiece.prototype);//Inherit from GamePiece Superclass

let Player= function(){ //Pseudoclassical Class Definition
    this.x = 205;
    this.y = 390; 
    this.sprite = 'images/char-boy.png';
};
Player.prototype = Object.create(GamePiece.prototype);//Inherit from GamePiece Superclass

Player.prototype.update = function(xMove,yMove){
    if(this.x + xMove !== this.x)
        if(this.x+xMove>=5 && this.x+xMove<=405)
            this.x += xMove;
    if(this.y + yMove !== this.y)
        if(this.y+yMove>=-35 && this.y+yMove<=390)
             this.y += yMove;
};

Player.prototype.selectPlayer =function(playerpicked){
    this.sprite = playerpicked;
};

Player.prototype.handleInput = function(keyPressed){
     if(keyPressed!=undefined) {
       switch(keyPressed){
            case 'right': this.update(100,0);//this.updateX(100);
                          break;
            case 'left':  this.update(-100,0);//this.updateX(-100);
                          break;
            case 'down':  this.update(0,85);//this.updateY(85);
                          break;
            case 'up':    this.update(0,-85)//this.updateY(-85);
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
        32: 'spacebar',
        27: 'esc',
        13: 'enter'
    }; 
//TO DO:FIX UP PAUSED ISSUE WHEN STARTING NEW GAME
   if(gameCommenced){
        pauseScreen.handleInput(allowedKeys[e.keyCode]);
        if(allowedKeys[e.keyCode]==='esc')
            restartRequested = true; 
        if(!pauseScreen.pauseMode) 
            player.handleInput(allowedKeys[e.keyCode]); 
    }
   if(!gameCommenced)
        newGameScreen.handleInput(allowedKeys[e.keyCode]);
});



let PauseScreen = function(){
 this.pauseMode = false;
};    

PauseScreen.prototype.handleInput = function(keyPressed){
        switch(keyPressed){
            case 'spacebar': pauseScreen.pauseMode = !pauseScreen.pauseMode;
                             break;
            case 'esc'     : restartRequested = true;
        }
};

PauseScreen.prototype.render = function(keyPressed){
    ctx.font = '90pt Impact';
    ctx.textAlign = 'center';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 5;
    ctx.fillStyle = 'red';
    ctx.fillText("Paused",252,303);
    ctx.strokeText("Paused",252,303);
};

let NewGameScreen = function(){
     this.characterArray =['images/char-boy.png','images/char-horn-girl.png','images/char-pink-girl.png','images/char-princess-girl.png','images/char-cat-girl.png'];
     this.starPosition = 201;
     this.characterSelected = 2;

};

NewGameScreen.prototype.handleInput = function(keyPressed){
    if(keyPressed!=undefined) {
           switch(keyPressed){
                case 'right': newGameScreen.update(1);
                              break;
                case 'left':  newGameScreen.update(-1);                        
                              break;
                case 'enter': newGameScreen.beginGame();
            } 
    }
};

NewGameScreen.prototype.beginGame = function(){
    gameCommenced = true;
    player.selectPlayer(this.characterArray[this.characterSelected]);
};

NewGameScreen.prototype.update = function(direction){
    if(direction ===1 && this.starPosition+100<=401){
        this.starPosition+=100;
        ++this.characterSelected;
    }

    if(direction ===-1 &&(this.starPosition-100)>=1){
        this.starPosition-=100;
        --this.characterSelected;
    }
 
};

NewGameScreen.prototype.render = function(){
     newGameScreen.backgroundLoad();
     newGameScreen.starPositionLoad();
     newGameScreen.foreGroundLoad();    
};

NewGameScreen.prototype.backgroundLoad = function(){

        ctx.font = '40pt Impact';
        ctx.textAlign = 'center';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.fillStyle = 'blue';
        ctx.fillText("Choose A Character",250, 280);
        ctx.strokeText("Choose A Character", 250, 280);

        ctx.font = '60pt Impact';
        ctx.textAlign = 'center';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.fillStyle = 'red';
        ctx.fillText("FROGGER",250,120);
        ctx.strokeText("FROGGER", 250, 120);    

        for(let i =0; i<5;i++)
                ctx.drawImage(Resources.get('images/Selector.png'), i*101, 300);

        ctx.font = '30pt Impact';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'black';
        ctx.fillText("Press 'Enter' To Select",250,530);
};

NewGameScreen.prototype.foreGroundLoad = function(){
        for(let i =0; i<5;i++)    
            ctx.drawImage(Resources.get(this.characterArray[i]), i*101, 300); 
};

NewGameScreen.prototype.starPositionLoad = function(pos){
    ctx.drawImage(Resources.get('images/Star.png'), this.starPosition, 320);//STAR    
};




let Gem = function() {
    var randomizerfunction = function(GemArray){
                let thisGemPos=Math.round(Math.random()*(GemArray.length-1));
                let thisGemBe = GemArray[thisGemPos];
                GemArray.splice(thisGemPos, 1);
                return thisGemBe;
                };
    this.x = randomizerfunction(Gem.possibleX);
    this.y = randomizerfunction(Gem.possibleY);
    this.sprite = randomizerfunction(Gem.possibleSprites)
};
Gem.possibleX = [0, 101, 202, 303, 404];
Gem.possibleY = [60, 140, 230];
Gem.possibleSprites= ['images/Gem Blue.png', 'images/Gem Orange.png', 'images/Gem Green.png'];

Gem.prototype = Object.create(GamePiece.prototype);//Inherit from GamePiece Superclass


let Heart = function(){
     this.x =(function(){
            Heart.x+=100;
            return Heart.x;
            }());
     this.y =2;
     this.sprite = 'images/Heart.png';
};
Heart.x =110;


Heart.prototype = Object.create(GamePiece.prototype);//Inherit from GamePiece Superclass

let GameSpace = function(){
     this.score = 0;
     this.lives = 3;
     this.timeLeft = 60; //Minutes
};

   // /  this.getLives = ()=>lives;
//     this.subtractLife = ()=>{--lives;} 
//     this.getTimeLeft = ()=>timeLeft;
//     this.getScore= ()=>score;
//     this.updateScore= (num)=>{score += num};
// };


// GameSpace.prototype.addScoreForCrossing = function(){
//     if(isPlayeratFinish) 
//         updateScore(10);
// };

// GameSpace.prototype.addScoreForCollectedGem = function(){
//     if(isPlayeratFinish) 
//         updateScore(5);
// };

// GameSpace.prototype.minusScoreForCollision = function(){
//     if(isCollision)
//          updateScore(-5);
// };
// GameSpace.prototype.minusLiveForCollision = function(){
//     if(isCollision)
//          subtractLife();
// };
// GameSpace.prototype.isGameOver = function(){
//     if(getTimeLeft() === 0 || getLives() === 0)
//         return true;
//     else 
//         return false;
// };
// GameSpace.prototype.isPlayeratFinish = function(){};//TO DO
// GameSpace.prototype.isCollision = function(){};//TO DO
// GameSpace.prototype.isOnGem = function(){};//TO DO

// let gameSpace = new GameSpace();

//let gem = [new Gem(), new Gem(), new Gem()];


