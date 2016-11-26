

//////////////////////////////////////////////////////////
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
//////////////////////////////////////////////////////////
var Player = function(x, y) {
  this.x = x;
  this.y = y;
  this.moveSound = new Audio('sounds/cloth.wav');
  this.startSound = new Audio('sounds/spell.wav');
  this.lives = 3;
  this.level = 0;
  this.completedLevels = 0;
  this.score = 0;
  this.collided = false;
  this.initialX = 416;
  this.initialY = 704;
  this.startY = 576;
  this.x = this.initialX;
  this.y = this.startY;
  this.classes = [];
  this.obstacleTop = false;
  this.obstacleBottom = false;
  this.obstacleLeft = false;
  this.obstacleRight = false;

  var knight = {
    "className": "Knight",
    "spriteUrl": "img/hero_knight.png"
  };

  var sorceress = {
    "className": "Sorceress",
    "spriteUrl": "img/hero_sorceress.png"
  };

  var mage = {
    "className": "Mage",
    "spriteUrl": "img/hero_mage.png"
  };

  var scribe = {
    "className": "Scribe",
    "spriteUrl": "img/hero_scribe.png"
  };

  var templar = {
    "className": "Templar",
    "spriteUrl": "img/hero_templar.png"
  };

  var oracle = {
    "className": "Oracle",
    "spriteUrl": "img/hero_oracle.png"
  };

  var priest = {
    "className": "Priest",
    "spriteUrl": "img/hero_priest.png"
  };

  var monk = {
    "className": "Monk",
    "spriteUrl": "img/hero_monk.png"
  };

  var rogue = {
    "className": "Rogue",
    "spriteUrl": "img/hero_rogue.png"
  };

  var enchantress = {
    "className": "Enchantress",
    "spriteUrl": "img/hero_enchantress.png"
  };

  var paladin = {
    "className": "Paladin",
    "spriteUrl": "img/hero_paladin.png"
  };

  var berserker = {
    "className": "Berserker",
    "spriteUrl": "img/hero_berserker.png"
  };

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

  this.classIndex = 0;
  this.sprite = this.classes[this.classIndex].spriteUrl;
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
// Resets game if player is out of lives
Player.prototype.collide = function() {
  this.lives--;
  if (this.lives < 1) {
    player.reset();
  } else if (this.level === 1) {
    this.x = this.initialX;
    this.y = this.startY;
  } else {
    this.x = this.initialX;
    this.y = this.initialY;
  }
}

Player.prototype.checkObstacles = function(obstaclesList) {


  var playerY = this.y;
  var playerX = this.x;
  var playerTop = this.y - 128;
  var playerBottom = this.y + 128;
  var playerLeft = this.x - 128;
  var playerRight = this.x + 128;



    for (var i = 0; i < obstaclesList.length; i++) {

      var obstacleTop = obstaclesList[i].top;
      var obstacleBottom = obstaclesList[i].bottom;
      var obstacleRight = obstaclesList[i].right;
      var obstacleLeft = obstaclesList[i].left;

      // prevents moving left
      if (playerLeft === obstaclesList[i].x && playerY === obstaclesList[i].y) {
        this.obstacleRight = true;
        break;
      } else if (playerLeft !== obstaclesList[i].x || playerY !== obstaclesList[i].y) {
        this.obstacleRight = false;
      }

      // prevents moving right
      if (playerRight === obstaclesList[i].x && playerY === obstaclesList[i].y) {
        this.obstacleLeft = true;
        break;
      } else if (playerRight !== obstaclesList[i].x || playerY !== obstaclesList[i].y) {
        this.obstacleLeft = false;
      }

      // prevents moving down
      if (playerBottom === obstaclesList[i].y && playerX === obstaclesList[i].x) {
        this.obstacleTop = true;
        break;
      } else if (playerBottom !== obstaclesList[i].y || playerX !== obstaclesList[i].x) {
        this.obstacleTop = false;
      }

      // prevents moving up
      if (playerTop === obstaclesList[i].y && playerX === obstaclesList[i].x) {
        this.obstacleBottom = true;
        break;
      } else if (playerTop !== obstaclesList[i].y || playerX !== obstaclesList[i].x) {
        this.obstacleBottom = false;
      }
    }
};

Player.prototype.blockMove = function() {

};

// Reset game to the beginning
// Reset includes lives, score, level, original position
Player.prototype.reset = function() {
  this.lives = 3;
  this.score = 0;
  this.level = 0;
  this.completedLevels = 0;
  this.x = this.initialX;
  this.y = this.startY;
;
  this.startSound.play();
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function(dt) {
  // Collision conditional for each level
  if (player.level === 1) {
    this.checkCollisions(levelOne);
    this.checkObstacles(obstaclesOne);
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
    this.checkCollisions(levelSeven);
  } else if (player.level === 8) {
    this.checkCollisions(levelEight);
  } else if (player.level === 9) {
    this.checkCollisions(levelNine);
  }

  // Level up conditional
  if (this.y <= 32) {
    // only add to score if it is first time player made it up
    if (this.level === this.completedLevels) {
      this.level++;
      // TODO add endgame scenario

      this.completedLevels++;
      this.score += 100;
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
};

// handleInput is passed 1 parameter: (key pressed)
// from document.addEventListener('keyup', function....)
Player.prototype.handleInput = function(key) {
// start screen controls
if (player.level === 0){
  if (key === 'right') {
    this.classIndex ++;

    if (this.classIndex < this.classes.length) {
      this.sprite = this.classes[this.classIndex].spriteUrl;
    } else {
      this.classIndex = 0;
      this.sprite = this.classes[this.classIndex].spriteUrl;
    }

  } else if (key === 'left') {
    this.classIndex --;
    if (this.classIndex > 0) {
      this.sprite = this.classes[this.classIndex].spriteUrl;
    } else {
      this.classIndex = this.classes.length - 1;
      this.sprite = this.classes[this.classIndex].spriteUrl;
    }
  } else if (key === 'enter'){
    this.startSound.play();
    this.level ++;
    this.completedLevels ++;
  }
}

// game controls
else {
  if (key === 'enter') {
    this.reset();
  } else if (key === 'up' && this.obstacleBottom === false) {
    this.y -= 128;
    this.moveSound.play();

  } else if (this.obstacleTop === false && (key === 'down' && this.y < this.initialY)
    || (key === 'down' && this.level > 1)) {
    this.y += 128;
    this.moveSound.play();
  } else if (key === 'down' && this.y >= this.initialY && this.level <= 1) {
    console.log("Error! Can't go farther down.");

  } else if (key === 'right' && this.x < 800 && this.obstacleLeft === false) {
    this.x += 128;
    this.moveSound.play();
  } else if (key === 'right' && this.x >= 800) {
    console.log("Error! Can't go farther right.");

  } else if (key === 'left' && this.x > 33 && this.obstacleRight === false) {
    this.x -= 128;
    this.moveSound.play();
  } else if (key === 'left' && this.x <= 33) {
    console.log("Error! Can't go farther left.");

  } else if (key === 'p') {
    console.log("Place a pause function here");
  }
}
};

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        80: 'p',
        13: 'enter'
    };

  player.handleInput(allowedKeys[e.keyCode]);
});
