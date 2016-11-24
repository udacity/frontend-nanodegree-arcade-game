
//////////////////////////////////////////////////////////
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
//////////////////////////////////////////////////////////
var Player = function(x, y) {
  this.x = x;
  this.y = y;
  this.sprite = 'img/hero_knight.png';
  this.lives = 3;
  this.level = 1;
  this.completedLevels = 1;
  this.score = 0;
  this.collided = false;
  this.initialX = 288;
  this.initialY = 704;
  this.x = this.initialX;
  this.y = this.initialY;
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
  } else {
    this.collided = false;
    this.x = this.initialX;
    this.y = this.initialY;
  }
}

// Reset game to the beginning
// Reset includes lives, score, level, original position
Player.prototype.reset = function() {
  this.lives = 3;
  this.score = 0;
  this.level = 1;
  this.completedLevels = 1;
  this.x = this.initialX;
  this.y = this.initialY;
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

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
    this.checkCollisions(levelSeven);
  } else if (player.level === 8) {
    this.checkCollisions(levelEight);
  }

  // Level up conditional
  if (this.y <= 32) {
    // only add to score if it is first time player made it up
    if (this.level == this.completedLevels) {
      this.level++;
      // TODO add endgame scenario
      //if (this.level <= 6) {
      this.completedLevels++;
      this.score += 1000;
      this.y = this.initialY;
      //} else {
      //  player.reset();
      //}
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
  if (key === 'reset') {
    player.reset();
  }
  else if (key === 'up') {
    this.y -= 128;
  }
  else if ((key === 'down' && this.y < this.initialY) || (key === 'down' && this.level > 1)) {
    this.y += 128;
  }
  else if (key === 'down' && this.y >= this.initialY && this.level <= 1) {
    console.log("Error! Can't go farther down.");
  }
  else if (key === 'right' && this.x < 544) {
    this.x += 128;
  }
  else if (key === 'right' && this.x >= 544) {
    console.log("Error! Can't go farther right.");
  }
  else if (key === 'left' && this.x > 33) {
    this.x -= 128;
  }
  else if (key === 'left' && this.x <= 33) {
    console.log("Error! Can't go farther left.");
  } else if (key === 'pause') {
    console.log("Place a pause function here");
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
        80: 'pause',
        13: 'reset'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
