// handleInput.js defines all the game controls
// that the user can use


// handleInput is passed 1 parameter: (key pressed)
// from document.addEventListener('keyup', function....)
Player.prototype.handleInput = function(key) {
if (key === 'music') {
  this.toggleMusic();
}
// start screen controls
if (player.level === 0) {
  // create sound for flipping between classes
  var newSwitchSound = new Audio("sounds/class_switch.wav");
  this.switchSound = newSwitchSound;
  if (key === 'right') {
    // increasing class index moves class selection right
    this.classIndex ++;
    this.switchSound.play();

    // Display proper player sprite
    // conditional lets player cycle through player.classes in a loop
    // when player tries to move past last class, they cycle to
    // the first class in the array
    if (this.classIndex < this.classes.length) {
      this.sprite = this.classes[this.classIndex].spriteUrl;
    } else {
      this.classIndex = 0;
      this.sprite = this.classes[this.classIndex].spriteUrl;
    }

  } else if (key === 'left') {
    // decreasing class index moves class selection left
    this.classIndex --;
    this.switchSound.play();
    // this conditional lets player cycle backwards through
    // player.classes in a loop
    if (this.classIndex > -1) {
      this.sprite = this.classes[this.classIndex].spriteUrl;
    } else {
      this.classIndex = this.classes.length - 1;
      this.sprite = this.classes[this.classIndex].spriteUrl;
    }
  // pressing enter selects class and begins game
  } else if (key === 'enter'){
    this.startSound.play();
    this.level ++;
    this.completedLevels ++;
    this.y = this.startY;
    this.score += 100;
  }
}

// Game controls section
// check that player.gamePaused, player.collided, player.gameOVer,
// and player.gameVictory are all false, disabling these controls
// on those screens
else if (player.level > 0 && this.gamePaused === false
  && this.collided === false
  && this.gameOver === false
  && this.gameVictory === false) {
  // conditional plays a swimming sound on water levels
  if (this.level >= 11 && this.level <= 14) {
    var waterWalkSound = new Audio("sounds/bubbles.wav");
    this.moveSound = waterWalkSound;
  // when not on water lvls, play regular classes moveSound
  } else {
    this.moveSound = new Audio(this.classes[this.classIndex].moveSound);
  }

  // Set an array to hold current levels obstacles
  // This will array will then be passed to game controls
  // to prevent player from moving on tiles that hold obstacles
  var currentObstacles = [];
  if (this.level === 1) {
    currentObstacles = this.checkObstacles(obstaclesOne);
  } else if (this.level === 2) {
    currentObstacles = this.checkObstacles(obstaclesTwo);
  } else if (this.level === 3) {
    currentObstacles = this.checkObstacles(obstaclesThree);
  } else if (this.level === 4) {
    currentObstacles = this.checkObstacles(obstaclesFour);
  } else if (this.level === 5) {
    currentObstacles = this.checkObstacles(obstaclesFive);
  } else if (this.level === 6) {
    currentObstacles = this.checkObstacles(obstaclesSix);
  } else if (this.level === 7) {
    currentObstacles = this.checkObstacles(obstaclesSeven);
  } else if (this.level === 8) {
    currentObstacles = this.checkObstacles(obstaclesEight);
  } else if (this.level === 9) {
    currentObstacles = this.checkObstacles(obstaclesNine);
  } else if (this.level === 10) {
    currentObstacles = this.checkObstacles(obstaclesTen);
  } else if (this.level === 11) {
    // do nothing - no obstacles on level 11
  } else if (this.level === 12) {
    // do nothing - no obstacles on level 12
  } else if (this.level === 13) {
    currentObstacles = this.checkObstacles(obstaclesThirteen);
  } else if (this.level === 14) {
    // do nothing - no obstacles on level 14
  } else if (this.level === 15) {
    currentObstacles = this.checkObstacles(obstaclesFifteen);
  } else if (this.level === 16) {
    currentObstacles = this.checkObstacles(obstaclesSixteen);
  } else if (this.level === 17) {
    currentObstacles = this.checkObstacles(obstaclesSeventeen);
  } else if (this.level === 18) {
    currentObstacles = this.checkObstacles(obstaclesEighteen);
  } else if (this.level === 19) {
    currentObstacles = this.checkObstacles(obstaclesNineteen);
  } else if (this.level === 20) {
    currentObstacles = this.checkObstacles(obstaclesTwenty);
  } else if (this.level === 21) {
    currentObstacles = this.checkObstacles(obstaclesTwentyOne);
  } else if (this.level === 22) {
    currentObstacles = this.checkObstacles(obstaclesTwentyTwo);
  } else if (this.level === 23) {
    currentObstacles = this.checkObstacles(obstaclesTwentyThree);
  } else if (this.level === 24) {
    currentObstacles = this.checkObstacles(obstaclesTwentyFour);
  } else if (this.level === 25) {
    currentObstacles = this.checkObstacles(obstaclesTwentyFive);
  }

  // move up controls
  if (key === 'up' && (currentObstacles.indexOf("Up is Blocked") == -1)
    && (this.y > 64 || (this.x >= 288 && this.x <= 544))) {
    this.y -= 128;
    this.moveSound.play();

  // move down controls
  } else if (key === 'down' &&
    (currentObstacles.indexOf("Down is Blocked") == -1)
    && (this.y < 704 || (this.x >= 288 && this.x <= 544))) {
    this.y += 128;
    this.moveSound.play();
  } else if (key === 'down' && this.y >= this.initialY && this.level <= 1) {
    console.log("Error! Can't go farther down.");

  // move right controls
  } else if ((key === 'right' && this.x < 800)
    && (currentObstacles.indexOf("Right is Blocked") == -1)) {
    this.x += 128;
    this.moveSound.play();
  } else if (key === 'right' && this.x >= 800) {
    console.log("Error! Can't go farther right.");

  // move left controls
  } else if ((key === 'left' && this.x > 33)
    && (currentObstacles.indexOf("Left is Blocked") == -1)) {
    this.x -= 128;
    this.moveSound.play();
  } else if (key === 'left' && this.x <= 33) {
    console.log("Error! Can't go farther left.");

  // pause game controls
  } else if (key === 'space') {
    this.gamePaused = true;
  }
// end regular game controls
////////////////////////////////////////////////////////////
// now check for other game state conditions

// player.gamePaused controls
} else if (this.gamePaused === true) {
  if (key === 'enter') {
    this.gamePaused = false;
    this.resetGame();
  } else if (key === 'space') {
    this.gamePaused = false;
  }

// player.collided controls
} else if (this.collided === true) {
  if (key === 'space') {
    this.resetAfterCollision();
  }

// player.gameOver controls
} else if (this.gameOver === true) {
  if (key === 'enter') {
    this.resetGame();
  }

// player.gameVictory controls
} else if (this.gameVictory === true) {
  if (key === 'enter') {
    this.resetGame();
  }
}

}; // end of Player.prototype.handleInput definition

var player = new Player(); // <- very important! instantiates player

// This listens for key presses and sends the keys to your
// Player.handleInput() method
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space',
        13: 'enter',
        77: 'music'
    };

  player.handleInput(allowedKeys[e.keyCode]);
});
