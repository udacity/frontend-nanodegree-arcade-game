/* App.js
 * Contains the objects and some of the gamespace logic for the game
 */

"use strict";

/**
* Global variables
*/
let gameSpace;
let pauseScreen;
let gameOverScreen;
let newGameScreen;
let allEnemies;
let player;
let allGems;
let allHearts;
let scoreBoard;
let timer;
let gameCommenced = false;
let restartRequested = false;
let audio = new Audio;
const modal= document.querySelector('.modal');

/**
* Constants
*/
const GAMEAREA = {
  WIDTH: 505,
  PIXELCOLUMNS: [0,101,101*2,101*3,101*4,101*5],
  PIXELROWS: [55, 55+80,55+80*2,55+80*3,55+80*4,55+80*5],
  TIMER: 90,
  LIVES: 3,

  ENEMY: {
    POSY: [60, 140, 230],
    WIDTH: 101,
    SPEED: 250,
    BUGIMAGE: 'images/enemy-bug.png',
    BASESPEED: 20,
  },

  GEM: {
    POSY: [60, 140, 230],
    POSX: [0, 101, 202, 303, 404],
    POSSPRITE: ['images/gem-blue.png', 'images/gem-orange.png', 'images/gem-green.png'],
    YOFFSET: 50,
    XOFFSET: 25,
    SCORE: 10,
  },

  PLAYER: {
    XSTARTPOS: 205,
    YSTARTPOS: 390,
    XLIMITLEFT: 5,
    XLIMITRIGHT: 405,
    YLIMITUP: -35,
    YLIMITDOWN: 390,
    STEPVER: 85,
    STEPHOR: 100,
    STARTPOSGRID: [2,5],
    SCORE:20,
    OFFSETLEFT: 25,
    OFFSETRIGHT: 76,
  },

  STARTSCREEN: {
    CHARACTERARRAY: ['images/char-boy.png','images/char-horn-girl.png','images/char-pink-girl.png','images/char-princess-girl.png','images/char-cat-girl.png'],
    STARTPOSITION: 201,
    CHARACTERSELECTED: 2,
    LIMITLEFT: 1,
    LIMITRIGHT: 401,
    STAROFFSET: 100,
  },
};

/**
* @description Load modal and audio on page load
*/
window.onload = function(){
  modal.style.display = "block";
  audio.src = 'sounds/intro.wav';
  audio.play();
}

/**
* @description Hide modal if outside the modal is clicked.
*/
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

/**
* @description Parent class for all game pieces that use common functions
* @constructor
*/
var GamePiece = function() {
  return this;
};

/**
* @description Place specific image on the canvas at specific x,y pixel co-ordinates
*/
GamePiece.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
* @description Randomly selects a random variable from an array
* @param {array} allPositions - All possible options that can be used, this input is used in function when positions left is 0
* @param {array} positionsLeft - Possible positions that can be selected.
* @returns {number/string} A random variable that has be selected from the array
*/
GamePiece.randomize= function(allPositions,positionsLeft) {
  let randomizer = function(itemArray) {
    let thisItemPos = Math.round(Math.random()*(itemArray.length-1));
    let thisItemBe = itemArray[thisItemPos];
    itemArray.splice(thisItemPos, 1);
    return thisItemBe;
  };
  return(positionsLeft.length === 0 ? randomizer(allPositions) : randomizer(positionsLeft));
 };

/**
* @description Returns grid (x or y) position from pixel (x or y) locations
* @param {number} pixelLoc - The pixel location (x or y)
* @param {array} pixelRowCol - The pixel to grid array
* @returns {number} The grid position (x or y)
*/
GamePiece.findPos = function(pixelLoc,pixelRowCol){
  let i;
  for(i = 0; i < pixelRowCol.length - 1; i++)
    if(pixelLoc === pixelRowCol[i] || pixelLoc < pixelRowCol[i + 1]) {
      break;
    }
  if(pixelLoc > pixelRowCol[pixelRowCol.length - 1])
    i = pixelRowCol.length - 1;
  return i;
};

/*
*@description Represents an enemy/bug
*@constuctor
*/
var Enemy = function() {
  this.x = GAMEAREA.WIDTH*Math.random();
  this.y = GamePiece.randomize([...GAMEAREA.ENEMY.POSY], Enemy.possibleYPos);
  this.baseSpeed = 150;
  this.speed = this.baseSpeed+GAMEAREA.ENEMY.SPEED*Math.random();
  this.sprite = GAMEAREA.ENEMY.BUGIMAGE;
  //Update the enemy's row position
  this.rowLoc = GamePiece.findPos(this.y, GAMEAREA.PIXELROWS) + 1;
  //If the left edge of the Game layout is reached then move image right just before the layout
  //Move position of enemy based on speed.
  this.update = dt => (this.x >= GAMEAREA.WIDTH) ? this.x = -GAMEAREA.ENEMY.WIDTH : this.x += (dt*this.speed);
};
//Inherit functions from GamePiece parent class.
Enemy.prototype = Object.create(GamePiece.prototype);

/*
*@description Represents a gem
*@constuctor
*/
let Gem = function() {
  this.y = GamePiece.randomize([...GAMEAREA.GEM.POSY], Gem.possibleYPos)+GAMEAREA.GEM.YOFFSET;
  this.x =  GamePiece.randomize([...GAMEAREA.GEM.POSX], Gem.possibleXPos)+GAMEAREA.GEM.XOFFSET;
  this.sprite = GamePiece.randomize([...GAMEAREA.GEM.POSSPRITE], Gem.possibleSprite);
  this.gridCoord = [GamePiece.findPos(this.x, GAMEAREA.PIXELCOLUMNS), GamePiece.findPos(this.y,GAMEAREA.PIXELROWS) + 1];
};
//Inherit functions from GamePiece parent class.
Gem.prototype = Object.create(GamePiece.prototype);

/*
* @description Represents the player
* @constuctor
*/
let Player= function() {
    this.x = GAMEAREA.PLAYER.XSTARTPOS;
    this.y = GAMEAREA.PLAYER.YSTARTPOS;
    this.gridCoord = [...GAMEAREA.PLAYER.STARTPOSGRID];
    this.sprite = 'images/char-boy.png';
};
//Inherit functions from GamePiece parent class.
Player.prototype = Object.create(GamePiece.prototype);

/**
* @description Set the players sprite to the character selected
* @param {string} the player image string
*/
Player.prototype.selectPlayer =function(playerpicked) {
    this.sprite = playerpicked;
};

/**
* @description Updates the x and y pixel positions of the player within the limitation of the game area.
* @param {number} xMove: the request number of pixels to move in the x direction
* @param {number} yMove: the request number of pixels to move in the x direction
*/
Player.prototype.update = function(xMove,yMove) {
  if(this.x + xMove !== this.x)
    if(this.x + xMove >= GAMEAREA.PLAYER.XLIMITLEFT && this.x + xMove <= GAMEAREA.PLAYER.XLIMITRIGHT) {
      this.x += xMove;
      (xMove > 0) ? ++ this.gridCoord[0] : --this.gridCoord[0];
    }
  if(this.y + yMove !== this.y)
    if(this.y + yMove >= GAMEAREA.PLAYER.YLIMITUP && this.y + yMove <= GAMEAREA.PLAYER.YLIMITDOWN) {
      this.y += yMove;
      (yMove > 0) ? ++this.gridCoord[1] : --this.gridCoord[1];
    }
};

/**
*@description Invokes the update function in various ways if the arrow keys are pressed
*@param {string} keyPressed - any key on pressed on the keyboard
*/
Player.prototype.handleInput = function(keyPressed) {
  if(keyPressed!=undefined) {
    switch(keyPressed) {
      case 'right': this.update(GAMEAREA.PLAYER.STEPHOR,0);
                    break;
      case 'left':  this.update(-GAMEAREA.PLAYER.STEPHOR,0);
                    break;
      case 'down':  this.update(0,GAMEAREA.PLAYER.STEPVER);
                    break;
      case 'up':    this.update(0,-GAMEAREA.PLAYER.STEPVER)
    }
  }
};

/**
*@description Listens for keystrokes and invokes different input handlers depending on game states.
*@param {e} - the key pressed on the keyboard
*/
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
  if(modal.style.display === "none") {
    if(!gameOverScreen.on) {
      if(gameCommenced) {
        pauseScreen.handleInput(allowedKeys[e.keyCode]);
        if(allowedKeys[e.keyCode]==='esc')
          restartRequested = true;
        if(!pauseScreen.pauseMode)
          player.handleInput(allowedKeys[e.keyCode]);
      } else
          newGameScreen.handleInput(allowedKeys[e.keyCode]);
    }
  }
});

/*
* @description Represents the heart
* @constuctor
*/
let Heart = function() {
  //Sets each constructed heart to preplaced areas on the canvas
  this.x =(function() {
    Heart.x-=50;
    return Heart.x;
  } ());
  this.y =2;
  this.sprite = 'images/Heart.png';
};
//Inherit functions from GamePiece parent class.
Heart.prototype = Object.create(GamePiece.prototype);

/*
* @description Represents the PauseScreen
* @constuctor
*/
let PauseScreen = function() {
  this.pauseMode = false;
};

/**
*@description Restarts the game if the esc is pressed or pauses/unpauses if the spacebar is pressed
*@param {string} keyPressed - any key on pressed on the keyboard
*/
PauseScreen.prototype.handleInput = function(keyPressed) {
  switch(keyPressed) {
    case 'spacebar': this.pauseMode =! this.pauseMode;
                     break;
    case 'esc'     : restartRequested = true;
  }
};

/**
*@description Displays the pause screen
*/
PauseScreen.prototype.render = function() {
  ctx.font = '90pt Impact';
  ctx.textAlign = 'center';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 5;
  ctx.fillStyle = 'red';
  ctx.fillText("Paused",252,303);
  ctx.strokeText("Paused",252,303);
};

/*
* @description Represents the New Game screen where new characters can be selected.
* @constuctor
*/
let NewGameScreen = function() {
  this.characterArray = GAMEAREA.STARTSCREEN.CHARACTERARRAY;
  this.starPosition = GAMEAREA.STARTSCREEN.STARTPOSITION;
  this.characterSelected =  GAMEAREA.STARTSCREEN.CHARACTERSELECTED;
};

/**
*@description Invokes the update function based on right or left arrow key presses
*Selects character and begins game if enter is pressed.
*@param {string} keyPressed - any key on pressed on the keyboard
*/
NewGameScreen.prototype.handleInput = function(keyPressed) {
  if(keyPressed != undefined) {
    switch(keyPressed) {
      case 'right': this.update(1);
                    break;
      case 'left':  this.update(-1);
                    break;
      case 'enter': this.beginGame();
    }
  }
};

/**
*@description Changes global variable to commence game and invokes the selectplayer function
*this function will change the player property to the player selected by the user.
*@param {string} keyPressed - any key on pressed on the keyboard
*/
NewGameScreen.prototype.beginGame = function() {
  gameCommenced = true;
  player.selectPlayer(this.characterArray[this.characterSelected]);
};

/**
*@description Update the position of the star on the newGame Screen
*@param {number} direction - 1 or -1 indicates left/right direction
*/
NewGameScreen.prototype.update = function(direction) {
  if(direction === 1 && this.starPosition + GAMEAREA.STARTSCREEN.STAROFFSET <= GAMEAREA.STARTSCREEN.LIMITRIGHT) {
    this.starPosition += GAMEAREA.STARTSCREEN.STAROFFSET;
    ++this.characterSelected;
  }
  if(direction === -1 && this.starPosition - GAMEAREA.STARTSCREEN.STAROFFSET >= GAMEAREA.STARTSCREEN.LIMITLEFT) {
    this.starPosition -= GAMEAREA.STARTSCREEN.STAROFFSET;
    --this.characterSelected;
  }
};

/**
*@description Displays the new game screen where characters can be selected
*/
NewGameScreen.prototype.render = function() {
  ctx.font = '40pt Impact';
  ctx.textAlign = 'center';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  ctx.fillStyle = 'blue';
  ctx.fillText("Choose A Character", 250, 280);
  ctx.strokeText("Choose A Character", 250, 280);

  ctx.font = '60pt Impact';
  ctx.textAlign = 'center';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  ctx.fillStyle = 'red';
  ctx.fillText("FROGGER", 250, 120);
  ctx.strokeText("FROGGER", 250, 120);

  ctx.font = '30pt Impact';
  ctx.textAlign = 'center';
  ctx.fillStyle = 'black';
  ctx.fillText("Press 'Enter' To Select",250,530);


  for(let i = 0; i < 5; i++)
    ctx.drawImage(Resources.get('images/Selector.png'), i*101, 300);

  ctx.drawImage(Resources.get('images/Star.png'), this.starPosition, 320);

  for(let i =0; i<5;i++)
    ctx.drawImage(Resources.get(this.characterArray[i]), i*101, 300);
};

/**
* @description Represents the real time scoreboard
* @constuctor
*/
let ScoreBoard = function() {
  this.score = 0;
};
/**
*@description Displays the scoreboard
*/
ScoreBoard.prototype.render = function() {
  let scoreString = 'Score: ' + this.score;
  ctx.font = '40pt Impact';
  ctx.textAlign = 'left';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  ctx.fillStyle = 'orange';
  ctx.fillText(scoreString, 10, 44);
  ctx.strokeText(scoreString, 10, 44);
};

/**
* @description Represents the realtime countdown timer.
* @constuctor
*/
let Timer = function() {
  this.gameTime = GAMEAREA.TIMER;
};
Timer.timeThen = Date.now();

/**
*@description Counts down from this.gameTime every second.
*/
Timer.prototype.update=function(paused) {
  if((Date.now()-Timer.timeThen>=1000)&&(gameCommenced &&!paused)) {
    --this.gameTime;
    Timer.timeThen = Date.now();
  }
};

/**
*@description Displays the countdown timer
*/
Timer.prototype.render = function(keyPressed) {
  ctx.font = '28pt Impact';
  ctx.textAlign = 'left';
  ctx.fillStyle = 'black';
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 0.8;
  ctx.fillText("Time Left: "+ this.gameTime, 150, 580);
  ctx.strokeText("Time Left: " + this.gameTime, 150, 580);
};

/**
* @description Represents the high score banner
* @constuctor
*/
let HighScore = function() {
  this.highestScore = 0;
};

/**
* @description Updates the highscore if the current one is higher
*/
HighScore.prototype.updateHighScore = function(lastScore) {
  if(lastScore > this.highestScore) {
    this.highestScore = lastScore;
    document.querySelector('.highscore').innerHTML = lastScore;
  }
};

//Create a highscore object with global reference
let highScore = new HighScore();

/**
* @description Represents the Game Over Screen
* @constuctor
*/
let GameOverScreen = function() {
 this.on = false;
 this.playedSound = false;
};

/**
* @description Displays the gameover screem
*/
GameOverScreen.prototype.render = function(keyPressed) {
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

/**
* @description Represents the majority of the gameplay logic.
* @constuctor
*/
let GameSpace = function() {
  this.lives = GAMEAREA.LIVES;
  this.firstTimeWater = true;
  this.hasNotHitEnemy = true;
};

/**
* @description Checks if player has landed on a gem
* @param {object array} gemArray - The gems that have been created for the round
* @param {object} currentPlayer - The current player object
* @param {object} currentScore - The current score object
*/
GameSpace.prototype.checkGemCollision = function(gemArray,currentPlayer, currentScore) {
  let gemcollided;
  for(let i=0; i<gemArray.length; i++) {
   if(gemArray[i].gridCoord[0]===currentPlayer.gridCoord[0]
    && gemArray[i].gridCoord[1]===currentPlayer.gridCoord[1]) {
     currentScore.score +=GAMEAREA.GEM.SCORE;
     gemcollided = i;
     break;
   }
  }
  if(gemcollided!=undefined) {
    gemArray.splice(gemcollided, 1);
    audio.src = 'sounds/gem.wav';
    audio.play();
  }
};

/**
* @description Check if the player is at the water and if so starts a new round
* @paramc {object} CurrentPlayer - The current player object
* @paramc {object} currentScore - The current scoreboard object
*/
GameSpace.prototype.checkPlayerAtWater = function(currentPlayer,currentScore) {
  if(currentPlayer.gridCoord[1] === 0 && this.firstTimeWater) {
    this.firstTimeWater = false;
    setTimeout(function() {
      currentPlayer.x = GAMEAREA.PLAYER.XSTARTPOS;
      currentPlayer.y = GAMEAREA.PLAYER.YSTARTPOS;
      currentPlayer.gridCoord =  [...GAMEAREA.PLAYER.STARTPOSGRID];
      gameSpace.newRound();
      currentScore.score += GAMEAREA.PLAYER.SCORE;
      currentPlayer.baseSpeed += GAMEAREA.ENEMY.BASESPEED;
      audio.src = 'sounds/made it.wav';
      audio.play();
    }, 200);
  }
};

/**
* @description Check if enemy collides with player
* @paramc {array of object} enemies - An array of enemy objects
* @paramc {object} currentPlayer - The current player object
* @paramc {object} heartArray - An array of heart objects
*/
GameSpace.prototype.checkEnemyCollision = function(enemies, currentPlayer, heartArray) {
  for(let i = 0; i < enemies.length; i++)
    if(enemies[i].rowLoc === currentPlayer.gridCoord[1] ) {
      if(((currentPlayer.x + GAMEAREA.PLAYER.OFFSETRIGHT >= enemies[i].x
        && currentPlayer.x + GAMEAREA.PLAYER.OFFSETRIGHT <= enemies[i].x + GAMEAREA.ENEMY.WIDTH)
        || (currentPlayer.x + GAMEAREA.PLAYER.OFFSETLEFT >= enemies[i].x
        && currentPlayer.x + GAMEAREA.PLAYER.OFFSETLEFT <= enemies[i].x + GAMEAREA.ENEMY.WIDTH))
        && this.hasNotHitEnemy) {
        heartArray.pop(1);
         --this.lives;
         this.hasNotHitEnemy = false;
         setTimeout(function() {
           currentPlayer.x = GAMEAREA.PLAYER.XSTARTPOS;
           currentPlayer.y = GAMEAREA.PLAYER.YSTARTPOS;
           currentPlayer.gridCoord = [...GAMEAREA.PLAYER.STARTPOSGRID];
           gameSpace.newRound();
           audio.src = 'sounds/bug.wav';  //ERROR FIX
           audio.play();
        }, 50);
      }
    }
};

/**
* @description Start a new round.
*/
GameSpace.prototype.newRound = function() {
  this.firstTimeWater = true;
  this.hasNotHitEnemy = true;
  Enemy.possibleYPos = [...GAMEAREA.ENEMY.POSY];
  allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];
  Gem.possibleYPos = [...GAMEAREA.GEM.POSY];
  Gem.possibleXPos = [...GAMEAREA.GEM.POSX];
  Gem.possibleSprite = [...GAMEAREA.GEM.POSSPRITE];
  allGems = [new Gem(), new Gem(), new Gem()];
};

/**
* @description Starts a new Game and within that a new round.
* ie goes back to the main character selection screne
*/
GameSpace.prototype.startGame = function() {
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

/**
* @description Checks if the condition for a gameover is true.
* This condition is either 0 lives or 0 seconds left on the timer
*/
GameSpace.prototype.checkGameOver = function() {
  if(this.lives == 0 || timer.gameTime == 0) {
    highScore.updateHighScore(scoreBoard.score);
    gameOverScreen.on = true;
    setTimeout(function() {
      if(!this.playedSound) {
        audio.src = 'sounds/game over.wav';
        audio.play();
      }
    }, 400);
    setTimeout(function() {
     restartRequested = true;
    }, 5000);
  }
};

//Go over code
//JSHInt
//try and

 //instructions for the readme file.
 //A README file is included detailing all steps required to successfully run the application.
