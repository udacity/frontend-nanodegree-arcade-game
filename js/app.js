"use strict"; 
let timer;
let pauseScreen;
let allEnemies;
let gameOverScreen;
let player;
let newGameScreen;
let allGems;
let allHearts;
let gameSpace;
let scoreBoard;

let gameCommenced = false;
let restartRequested = false;
var audio = new Audio;

const GAMEAREA = {
    width : 505,
    pixelColumns:[0,101,101*2,101*3,101*4,101*5],
    pixelRows:[55, 55+80,55+80*2,55+80*3,55+80*4,55+80*5],

    enemy:{
        posY: [60, 140, 230], //Possible positions on 
        width: 101
    },
    gem:{    
        posY:[60, 140, 230],
        posX:[0, 101, 202, 303, 404],
        posSprite:['images/Gem Blue.png', 'images/Gem Orange.png', 'images/Gem Green.png'],
        yOffSet:50,
        xOffSet: 25
    },
    player:{
        xStartPos:205,
        yStartPos:390,
        xLimitleft:5,
        xLimitRight:405,
        yLimitUp: -35,
        yLimitDown: 390,
        stepVer:85,
        stepHor:100
    },
    startScreen:{
        characterArray: ['images/char-boy.png','images/char-horn-girl.png','images/char-pink-girl.png','images/char-princess-girl.png','images/char-cat-girl.png'],
        starPosition: 201,
        characterSelected: 2,
        limitLeft: 1,
        limitRight: 401,
        starOffset: 100
    },
  
};


window.onload = function() {
    //window.location.href = "#openModal";
        audio.src = 'sounds/intro.wav';
        audio.play();

}


//GAME PIECE OBJECT -SUPERCLASS FOR ITEMS
var GamePiece = function(){return this};
GamePiece.prototype.render = function() {//Draw GamePieces on the screen, required method for game
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);  //This method takes three parameters: an image, an x-coordinate, and a y-coordinate:
};

GamePiece.randomize=function(allPositions,positionsLeft){
      let randomizer = function(itemArray){
        let thisItemPos=Math.round(Math.random()*(itemArray.length-1));
        let thisItemBe = itemArray[thisItemPos];
        itemArray.splice(thisItemPos, 1);
        return thisItemBe;
    }
    return(positionsLeft.length===0? randomizer(allPositions): randomizer(positionsLeft));
 };
// ENEMY FUNCTION:
var Enemy = function() {
    this.x = GAMEAREA.width*Math.random();
    this.y = GamePiece.randomize([...GAMEAREA.enemy.posY], Enemy.possibleYPos);
    this.baseSpeed =150;
    this.speed =this.baseSpeed+250*Math.random();
   
    this.sprite ='images/enemy-bug.png'; 
    this.rowLoc = GamePiece.findPos(this.y, GAMEAREA.pixelRows)+1;
    //Update the enemy's position between ticks
    //If reach the edge of the Game layout,Move image just before the layout, Move position of enemy based on speed.
    this.update = dt => (this.x>=GAMEAREA.width)?this.x=-GAMEAREA.enemy.width:this.x+=(dt*this.speed);
};

Enemy.prototype = Object.create(GamePiece.prototype);//Inherit from GamePiece Superclass

//

GamePiece.findPos = function(pixelLoc,pixelRowCol){ 
    let rowcolLoc;
      for(let i = 0; i<pixelRowCol.length-1; i++)
        if(pixelLoc===pixelRowCol[i]||pixelLoc<pixelRowCol[i+1]){
            rowcolLoc = i;
            break;
        }
        if(pixelLoc> pixelRowCol[pixelRowCol.length-1])
            rowcolLoc = pixelRowCol.length-1;
        return rowcolLoc;
        
};


let Gem = function() {
    this.y = GamePiece.randomize([...GAMEAREA.gem.posY], Gem.possibleYPos)+GAMEAREA.gem.yOffSet;
    this.x =   GamePiece.randomize([...GAMEAREA.gem.posX], Gem.possibleXPos)+GAMEAREA.gem.xOffSet;
    this.sprite =GamePiece.randomize([...GAMEAREA.gem.posSprite], Gem.possibleSprite);
    this.gridCoord = [GamePiece.findPos(this.x, GAMEAREA.pixelColumns), GamePiece.findPos(this.y,GAMEAREA.pixelRows)+1];
};

Gem.prototype = Object.create(GamePiece.prototype);//Inherit from GamePiece Superclass

let Player= function(){ //Pseudoclassical Class Definition
    this.x = GAMEAREA.player.xStartPos;
    this.y = GAMEAREA.player.yStartPos; 
    this.gridCoord = [2,5];
    this.sprite = 'images/char-boy.png';
};
Player.prototype = Object.create(GamePiece.prototype);//Inherit from GamePiece Superclass

Player.prototype.selectPlayer =function(playerpicked){
    this.sprite = playerpicked;
};

Player.prototype.update = function(xMove,yMove){
    if(this.x + xMove !== this.x)
        if(this.x+xMove>=GAMEAREA.player.xLimitleft && this.x+xMove<=GAMEAREA.player.xLimitRight){
            this.x += xMove;
            (xMove>0) ? ++this.gridCoord[0]:--this.gridCoord[0];
    }
    if(this.y + yMove !== this.y)
        if(this.y+yMove>=GAMEAREA.player.yLimitUp && this.y+yMove<=GAMEAREA.player.yLimitDown){
             this.y += yMove;
             (yMove>0) ? ++this.gridCoord[1]:--this.gridCoord[1];
        }
};

Player.prototype.handleInput = function(keyPressed){
     if(keyPressed!=undefined) {
       switch(keyPressed){
            case 'right': this.update(GAMEAREA.player.stepHor,0);//this.updateX(100);
                          break;
            case 'left':  this.update(-GAMEAREA.player.stepHor,0);//this.updateX(-100);
                          break;
            case 'down':  this.update(0,GAMEAREA.player.stepVer);//this.updateY(85);
                          break;
            case 'up':    this.update(0,-GAMEAREA.player.stepVer)//this.updateY(-85);
        gameSpace.checkPlayerAtWater(player);
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

if(!gameOverScreen.on){
   if(gameCommenced){
        pauseScreen.handleInput(allowedKeys[e.keyCode]);
        if(allowedKeys[e.keyCode]==='esc')
            restartRequested = true; 
        if(!pauseScreen.pauseMode) 
            player.handleInput(allowedKeys[e.keyCode]); 
    }
   if(!gameCommenced)
        newGameScreen.handleInput(allowedKeys[e.keyCode]);
}
});

let Heart = function(){
     this.x =(function(){
            Heart.x-=50;
            return Heart.x;
            }());
     this.y =2;
     this.sprite = 'images/Heart.png';
};
Heart.prototype = Object.create(GamePiece.prototype);//Inherit from GamePiece Superclass


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
     this.characterArray =GAMEAREA.startScreen.characterArray;
     this.starPosition = GAMEAREA.startScreen.starPosition;
     this.characterSelected =  GAMEAREA.startScreen.characterSelected;
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
    if(direction ===1 && this.starPosition+100<=GAMEAREA.startScreen.limitRight){
        this.starPosition+=GAMEAREA.startScreen.starOffset;
        ++this.characterSelected;
    }

    if(direction ===-1 &&this.starPosition-100>=GAMEAREA.startScreen.limitLeft){
        this.starPosition-=GAMEAREA.startScreen.starOffset;
        --this.characterSelected;
    }
 
};

NewGameScreen.prototype.render = function(){
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


            ctx.drawImage(Resources.get('images/Star.png'), this.starPosition, 320);


             for(let i =0; i<5;i++)    
                 ctx.drawImage(Resources.get(this.characterArray[i]), i*101, 300); 

};

let ScoreBoard = function(){
    this.score =0;
};
ScoreBoard.prototype.render = function(){
        let scoreString = 'Score: ' + this.score;
        ctx.font = '40pt Impact';
        ctx.textAlign = 'left';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.fillStyle = 'orange';
        ctx.fillText(scoreString,10, 44);
        ctx.strokeText(scoreString, 10, 44);
};

let Timer = function(){
    this.gameTime = 90;
};    
Timer.timeThen = Date.now();


Timer.prototype.update=function(){
    if(Date.now()-Timer.timeThen>=1000){
            if(gameCommenced &&!pauseScreen.pauseMode)
                --timer.gameTime;
            Timer.timeThen = Date.now();
        }
};

Timer.prototype.render = function(keyPressed){
    ctx.font = '28pt Impact';
    ctx.textAlign = 'left';
    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 0.8;
    ctx.fillText("Time Left: "+ timer.gameTime,150,580);
    ctx.strokeText("Time Left: " + timer.gameTime,150,580);
};




let GameSpace = function(){
      
      this.lives = 3;
     
};

GameSpace.prototype.checkGemCollision = function(gemArray,currentPlayer){
    let gemcollided;
    for(let i=0; i<gemArray.length; i++){
        if(gemArray[i].gridCoord[0]===currentPlayer.gridCoord[0]&& gemArray[i].gridCoord[1]===currentPlayer.gridCoord[1]){
                scoreBoard.score +=10;
                gemcollided = i;
                break;
            }
        }
    if(gemcollided!=undefined){
        gemArray.splice(gemcollided, 1);
        console.log("gem")
        audio.src = 'sounds/gem.wav';
        audio.play();
    }
};

GameSpace.prototype.checkPlayerAtWater = function(currentPlayer){
    if(currentPlayer.gridCoord[1]===0)
            //Add a short break here
        setTimeout(function(){
            player.x = GAMEAREA.player.xStartPos;
            player.y = GAMEAREA.player.yStartPos; 
            player.gridCoord = [2,5]; 
            gameSpace.newRound();
            scoreBoard.score += 20;
            player.baseSpeed +=20;
            audio.src = 'sounds/made it.wav';
            audio.play();
            console.log("Water")
        },200);
};

GameSpace.prototype.checkEnemyCollision = function(enemies,currentPlayer, heartArray){
    for(let i=0; i<enemies.length;i++)
        if(enemies[i].rowLoc===currentPlayer.gridCoord[1]){
            let enemyOffset =101;
            let playerOffSetLeft =25;
            let playerOffSetRight = 101-playerOffSetLeft;
           if((currentPlayer.x+playerOffSetRight>=enemies[i].x&&currentPlayer.x+playerOffSetRight<=enemies[i].x+enemyOffset)||(currentPlayer.x+playerOffSetLeft>=enemies[i].x&&currentPlayer.x+playerOffSetLeft<=enemies[i].x+enemyOffset)){
                heartArray.pop(1);
               --gameSpace.lives;
                currentPlayer.x = GAMEAREA.player.xStartPos;
                currentPlayer.y = GAMEAREA.player.yStartPos; 
                currentPlayer.gridCoord = [2,5]; 
               
                     audio.src = 'sounds/bug.wav';
                     audio.play();
                gameSpace.newRound();     
            }
        }
};

GameSpace.prototype.newRound = function(){
        Enemy.possibleYPos =[...GAMEAREA.enemy.posY];
        allEnemies = [new Enemy(),new Enemy(),new Enemy(),new Enemy()];

        Gem.possibleYPos =[...GAMEAREA.gem.posY];
        Gem.possibleXPos =[...GAMEAREA.gem.posX];
        Gem.possibleSprite =[...GAMEAREA.gem.posSprite];
        allGems = [new Gem(), new Gem(), new Gem()]; 

};

GameSpace.prototype.startGame = function(){     
        this.lastGameEvent=null;

        restartRequested = false;
        gameCommenced = false;
 
        timer = new Timer();
        newGameScreen = new NewGameScreen();     
        pauseScreen = new PauseScreen();
        gameOverScreen = new GameOverScreen();
        player = new Player(); 
        scoreBoard = new ScoreBoard();

        Heart.x =505;
        allHearts = [new Heart(), new Heart(), new Heart()];

        this.newRound();
};

GameSpace.prototype.checkGameOver = function(){
     if(this.lives==0 || timer.gameTime==0){
        highScore.updateHighScore(scoreBoard.score);
        gameOverScreen.on = true;
       setTimeout(function(){
            if(!this.playedSound){
                audio.src = 'sounds/game over.wav';
                audio.play();
            }
       },400);
        setTimeout(function(){
            restartRequested = true;},5000);
    }  

};

let HighScore = function(){
    this.highestScore = 0;
};

 HighScore.prototype.updateHighScore = function(lastScore){
     if(lastScore> this.highestScore)
         this.highestScore = lastScore;


};

let highScore = new HighScore();

let GameOverScreen = function(){
 this.on = false;
 this.playedSound = false;
};    

GameOverScreen.prototype.render = function(keyPressed){
    ctx.font = '90pt Impact';
    ctx.textAlign = 'center';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 5;
    ctx.fillStyle = 'pink';
    ctx.fillText('GAME',252,290);
    ctx.strokeText('GAME',252,290);
    ctx.fillText('OVER!',252,403);
    ctx.strokeText('OVER!',252,403);
};


//TO DO:

    //Add High Score 
    //Add Instructions
    //Neaten Code
    //Add Comments
    //Go over guidelines
