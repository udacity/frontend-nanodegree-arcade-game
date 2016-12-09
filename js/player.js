

//////////////////////////////////////////////////////////
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
//////////////////////////////////////////////////////////
var Player = function(x, y) {
  this.x = x;
  this.y = y;
  this.startSound = new Audio("sounds/spell.wav");
  this.itemSound = new Audio("sounds/item.wav");
  this.gameOverSound = new Audio("sounds/game_over.wav");
  // game over source: http://soundbible.com/2052-Creepy-Laugh.html
  this.soundtrack = new Audio("sounds/Edward_Shallow_The_Infinite_Railroad.mp3");
  this.soundtrack.volume = 0.3;
  // soundtrack source: Edward Shallow
  // url= http://freemusicarchive.org/music/Edward_Shallow/
  this.soundtrack.loop = true;
  this.soundtrack.playing = false;
  this.lives = 3;
  this.level = 0;
  this.completedLevels = 0;
  this.score = 0;
  this.initialX = 416;
  this.initialY = 704;
  this.startY = 576;
  this.x = this.initialX;
  this.y = this.initialY;
  this.classes = [];
  this.collided = false;
  this.gamePaused = false;
  this.gameOver = false;
  this.gameVictory = false;

  // instantiate each class as an object before pushing into array
  var knight = {
    "className": "Knight",
    "moveSound": "sounds/chainmail.wav",
    "spriteUrl": "img/hero_knight.png"
  };

  var sorceress = {
    "className": "Sorceress",
    "moveSound": "sounds/cloth.wav",
    "spriteUrl": "img/hero_sorceress.png"
  };

  var mage = {
    "className": "Mage",
    "moveSound": "sounds/cloth.wav",
    "spriteUrl": "img/hero_mage.png"
  };

  var scribe = {
    "className": "Scribe",
    "moveSound": "sounds/cloth.wav",
    "spriteUrl": "img/hero_scribe.png"
  };

  var templar = {
    "className": "Templar",
    "moveSound": "sounds/chainmail.wav",
    "spriteUrl": "img/hero_templar.png"
  };

  var oracle = {
    "className": "Oracle",
    "moveSound": "sounds/cloth.wav",
    "spriteUrl": "img/hero_oracle.png"
  };

  var priest = {
    "className": "Priest",
    "moveSound": "sounds/cloth.wav",
    "spriteUrl": "img/hero_priest.png"
  };

  var monk = {
    "className": "Monk",
    "moveSound": "sounds/cloth.wav",
    "spriteUrl": "img/hero_monk.png"
  };

  var rogue = {
    "className": "Rogue",
    "moveSound": "sounds/cloth.wav",
    "spriteUrl": "img/hero_rogue.png"
  };

  var enchantress = {
    "className": "Enchantress",
    "moveSound": "sounds/cloth.wav",
    "spriteUrl": "img/hero_enchantress.png"
  };

  var paladin = {
    "className": "Paladin",
    "moveSound": "sounds/chainmail.wav",
    "spriteUrl": "img/hero_paladin.png"
  };

  var berserker = {
    "className": "Berserker",
    "moveSound": "sounds/chainmail.wav",
    "spriteUrl": "img/hero_berserker.png"
  };

  var ninja = {
    "className": "Ninja",
    "moveSound": "sounds/cloth.wav",
    "spriteUrl": "img/hero_ninja.png"
  };

  var engineer = {
    "className": "Engineer",
    "moveSound": "sounds/cloth.wav",
    "spriteUrl": "img/hero_engineer.png"
  };

  // now push each class into this.classes array
  this.classes.push(knight);
  this.classes.push(sorceress);
  this.classes.push(mage);
  this.classes.push(scribe);
  this.classes.push(templar);
  this.classes.push(oracle);
  this.classes.push(priest);
  this.classes.push(monk);
  this.classes.push(rogue);
  this.classes.push(enchantress);
  this.classes.push(paladin);
  this.classes.push(berserker);
  this.classes.push(ninja);
  this.classes.push(engineer);

  // starts game on a random class
  var randomClass = this.getRandomClass(0, (this.classes.length - 1));
  this.classIndex = randomClass; // this.classIndex = current class

  // draw correct class sprite
  this.sprite = this.classes[this.classIndex].spriteUrl;
}; // end Player constructor definition
///////////////////////////////////////////////////////////////////////
// Define Player methods section

// starts game on a random class
Player.prototype.getRandomClass = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// If player and item's hitbox touch eachother,
// make item's effect happen, and set item to consumed
Player.prototype.checkItems = function(item) {
  if (this.y === item.y && this.x === item.x && item.consumed === false) {
    item.giveBonus();
    item.consumed = true;
  }
};

// checkCollisions is invoked by player.update method
// checkCollisions takes 1 parameter: array of current level's mobs
Player.prototype.checkCollisions = function(enemiesList) {
  // Create player hitbox
  var playerTop = this.y;
  var playerBottom = this.y + 110;
  var playerRight = this.x + 90;
  var playerLeft = this.x;

  for (var i = 0; i < enemiesList.length; i++) {
    // Create enemy hitbox for each enemy on current level
    var enemyTop = enemiesList[i].y;
    var enemyBottom = enemiesList[i].y + 110;
    var enemyRight = enemiesList[i].x + 90;
    var enemyLeft = enemiesList[i].x;

    // If player and enemy's hitbox touch eachother, invoke collide function
    if ((playerTop <= enemyBottom) && (playerBottom >= enemyTop) && (playerLeft <= enemyRight) && (playerRight >= enemyLeft)) {
      enemiesList[i].sound.play();
      this.collide();
    }
  }
};

// Invoked by player.checkCollisions() if player touches enemy
// Reduces life and sends player back to beginning of level
// Sets game to gameOver if player is out of lives,
// and plays an annoying evil laugh
Player.prototype.collide = function() {
  this.lives--;
  if (this.lives < 1) {
    this.gameOverSound.play();
    this.gameOver = true;
  } else {
    this.collided = true;
  }
};

// this resets the player to the beginning of level after hitting an enemy
Player.prototype.resetAfterCollision = function() {
  this.collided = false;
  if (this.level === 1) {
    this.x = this.initialX;
    this.y = this.startY;
  } else {
    this.x = this.initialX;
    this.y = this.initialY;
  }
};


// this function handles player/obstacle collision
// checkObstacles is passed 1 parameter:
// an array of current level's obstacles
Player.prototype.checkObstacles = function(obstaclesList) {
  // setup player hitbox
  var playerY = this.y;
  var playerX = this.x;
  var playerTop = this.y - 128;
  var playerBottom = this.y + 128;
  var playerLeft = this.x - 128;
  var playerRight = this.x + 128;

  // create array to hold all blocked directions
  var blockedDirections = [];


  // loop through all obstacles on current level's array
  for (var i = 0; i < obstaclesList.length; i++) {

    // set each obstacles location
    var thisObstacle = obstaclesList[i];
    var obstacleX = obstaclesList[i].x;
    var obstacleY = obstaclesList[i].y;

    // prevents moving left
    if (playerLeft === obstacleX && playerY === obstacleY) {
      blockedDirections.push("Left is Blocked");
    }

    // prevents moving right
    if (playerRight === obstacleX && playerY === obstacleY) {
      blockedDirections.push("Right is Blocked");
    }

      // prevents moving down
    if (playerBottom === obstacleY && playerX === obstacleX) {
      blockedDirections.push("Down is Blocked");
    }

    // prevents moving up
    if (playerTop === obstacleY && playerX === obstacleX) {
      blockedDirections.push("Up is Blocked");
    }

  }
  return blockedDirections;
};

// Reset game to the beginning
// Reset includes lives, score, level, original position,
// Sets gameOver, gameVictory, and allItems.consumed to false
// And turns off the music
Player.prototype.resetGame = function() {
  this.gameOver = false;
  this.gameVictory = false;
  allItems.forEach(function(item) {
    item.consumed = false;
  });
  this.lives = 3;
  this.score = 0;
  this.level = 0;
  this.completedLevels = 0;
  this.x = this.initialX;
  this.y = this.startY;
  this.pauseMusic();
  this.startSound.play();
};

// this function allows
Player.prototype.toggleMusic = function() {
  if (this.soundtrack.playing === false) {
    this.playMusic();
  } else {
    this.pauseMusic();
  }
};

// used by player.toggleMusic to turn music on
Player.prototype.playMusic = function() {
  this.soundtrack.play();
  this.soundtrack.playing = true;
};

// used by player.toggleMusic to turn music off
Player.prototype.pauseMusic = function() {
  this.soundtrack.pause();
  this.soundtrack.playing = false;
};

// Draw the player's image
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Set the proper level of enemies and items for the player's
// hitbox to check for
// And controls level up/down/victory conditions
Player.prototype.update = function(dt) {
  // Collision conditional for each level
  if (player.level === 1) {
    this.checkCollisions(levelOne);
  } else if (player.level === 2) {
    this.checkCollisions(levelTwo);
  } else if (player.level === 3) {
    this.checkCollisions(levelThree);
  } else if (player.level === 4) {
    this.checkCollisions(levelFour);
  } else if (player.level === 5) {
    this.checkCollisions(levelFive);
  } else if (player.level === 6) {
    this.checkCollisions(levelSix);
  } else if (player.level === 7) {
    this.checkItems(extraLife7);
    this.checkCollisions(levelSeven);
  } else if (player.level === 8) {
    this.checkCollisions(levelEight);
  } else if (player.level === 9) {
    this.checkItems(extraLife9);
    this.checkCollisions(levelNine);
  } else if (player.level === 10) {
    this.checkCollisions(levelTen);
  } else if (player.level === 11) {
    this.checkCollisions(levelEleven);
  } else if (player.level === 12) {
    this.checkCollisions(levelTwelve);
  } else if (player.level === 13) {
    this.checkCollisions(levelThirteen);
  } else if (player.level === 14) {
    this.checkCollisions(levelFourteen);
  } else if (player.level === 15) {
    this.checkCollisions(levelFifteen);
  } else if (player.level === 16) {
    this.checkCollisions(levelSixteen);
  } else if (player.level === 17) {
    this.checkItems(extraLife17);
    this.checkCollisions(levelSeventeen);
  } else if (player.level === 18) {
    this.checkCollisions(levelEighteen);
  } else if (player.level === 19) {
    this.checkCollisions(levelNineteen);
  } else if (player.level === 20) {
    this.checkItems(extraLife20);
    this.checkCollisions(levelTwenty);
  } else if (player.level === 21) {
    this.checkCollisions(levelTwentyOne);
  } else if (player.level === 22) {
    this.checkCollisions(levelTwentyTwo);
  } else if (player.level === 23) {
    this.checkItems(extraLife23);
    this.checkCollisions(levelTwentyThree);
  } else if (player.level === 24) {
    this.checkCollisions(levelTwentyFour);
  } else if (player.level === 25) {
    this.checkCollisions(levelTwentyFive);
  }

  // Level up conditional
  if (this.y <= 32) {
    // only add to score if it is first time player made it up
    if (this.level === this.completedLevels) {
      this.level++;
      this.completedLevels++;
      this.score += 100;
      // conditional for starting player above bottom trees on level one
      if (this.level === 1) {
        this.y = this.startY;
      } else {
        this.y = this.initialY;
      }
    // if already been on this level, don't add score
    } else {
      this.level++;
      this.y = this.initialY;
    }
  // conditional for going down to previous level
  } else if (this.y > this.initialY) {
    this.level--;
    this.y = 64;
  }
  // victory game conditions
  if (this.level === 26) {
    this.gameVictory = true;
  }
};

// End of Player Method definitions (except handleInput)
//////////////////////////////////////////////////////////
// all game controls are defined in handleInput.js
