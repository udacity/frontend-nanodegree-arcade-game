// constants
var CANVAS_WIDTH = 505;
var CANVAS_HEIGHT = 606;
var NUM_ROWS = 6;
var NUM_COLS = 5;
var STREET_TILES_Y = [1, 2, 3];
var NUMBER_LIFES_START = 3;

var pause = false;
var gameover = false;
var game = document.getElementById("game");
var scoring = document.getElementById("scoring");
var description = document.getElementById("description");
var level_counter = 0;

// enemies the player must avoid
var Enemy = function() {
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  // Get a random position for x and y
  // The random position for x will delay when the bug appears on screen
  this.x = -50 - Math.random() * 300;

  // the tile (yPosition - 20) is perfect placement for a bug
  // or player
  // this.y = -20 + STREET_TILES_Y[Math.floor(Math.random() *
    //                            STREET_TILES_Y.length)];
  this.tile = STREET_TILES_Y[Math.floor(Math.random() *
                                STREET_TILES_Y.length)];
  this.y = -20 + this.tile * 82.5;

  this.velocity = 100;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  this.x = this.x + this.velocity * dt;
  if (this.x > CANVAS_WIDTH) {
    this.x = -100 - Math.random() * 300;
    this.tile = STREET_TILES_Y[Math.floor(Math.random() *
                                  STREET_TILES_Y.length)];
    this.y = -20 + this.tile * 82.5; 
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = "images/char-boy.png";
  this.name = "char boy";
  this.x = 101*2;
  this.tile = 4;
  this.y = -20 + this.tile * 82.5;
  this.lifes = NUMBER_LIFES_START;
  this.score = 0;
}

Player.prototype.update = function() {
  if (this.reachWater()) {
    level_counter++;
    updateScoring();
    this.reset();
  }
}

Player.prototype.handleInput = function(direction) {
  if (direction === 'up' && this.y > -20) {
    this.y -= 82.5;
    this.tile -= 1;
  } else if (direction === 'down' && this.y < (CANVAS_HEIGHT - 220)) {
    this.y += 82.5;
    this.tile += 1;
  } else if (direction === 'left' && this.x > 0) {
    this.x -= 101;
  } else if (direction === 'right' && this.x < (CANVAS_WIDTH - 101)) {
    this.x += 101;
  } else if (direction === 'pause' && gameover) {
    gameover = false;
    resetGame();
  } else if (direction === 'pause' && pause) {
    pause = false;
    console.log("toggle pause: " + pause);
  } else if (direction === 'pause' && !pause) {
    pause = true;
    console.log("toggle pause: " + pause);
  }
}

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.reset = function() {
  this.x = 101*2;
  this.tile = 4;
  this.y = -20 + this.tile * 82.5;
}

Player.prototype.reachWater = function() {
  if (this.y == -20) {
    return true;
  }
  return false;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];
var player = new Player();

var checkCollisions = function() {
  for (var i = 0; i < allEnemies.length; i++) {
    if (checkCollisionBox(allEnemies[i], player)) {
      player.lifes--;
      updateScoring();
      return true;
    }
  }
  return false;
}

var showWhilePlaying = function() {
  var heading = document.createElement("h2");
  heading.setAttribute("id", "heading");
  var text_heading = document.createTextNode("Help " + player.name + " reach the water!");
  var score = document.createElement("h3");
  score.setAttribute("id", "score");
  var text_score = document.createTextNode("Lifes: " + player.lifes + "\t ScorePoints: " + player.score + "\t Level: " + level_counter);
  heading.appendChild(text_heading);
  score.appendChild(text_score);

  var keys = document.getElementById("keys");
  description.insertBefore(heading, keys);
  scoring.appendChild(score);
}

var updateScoring = function() {
  var scoring = document.getElementById("scoring");
  var oldScore = document.getElementById("score");
  var score = document.createElement("h3");
  score.setAttribute("id", "score");
  var text_score = document.createTextNode("Lifes: " + player.lifes + "    ScorePoints: " + player.score + "      Level: " + level_counter);
  score.appendChild(text_score);
  scoring.replaceChild(score, oldScore);
}

var showGameOver = function() {
  pause = true;
  gameover = true;
  ctx.fillStyle = "rgba(0,0,0,0.3)";
  ctx.fillRect(0, CANVAS_HEIGHT/2-100, CANVAS_WIDTH, 200);
  ctx.fillStyle = "white";
  ctx.font = "40px serif";
  ctx.textAlign = "center";
  ctx.fillText("Game Over!", CANVAS_WIDTH/2, CANVAS_HEIGHT/2 - 30);
  ctx.fillText("Press [space] to restart", CANVAS_WIDTH/2, CANVAS_HEIGHT/2 + 30);
}

var checkCollisionBox = function(enemy, player) {
  if (enemy.tile == player.tile) {
    enemy.xLo = enemy.x;
    enemy.xHi = enemy.x + 79;
    player.xLo = player.x;
    player.xHi = player.x + 50;
    if (enemy.xHi >= player.xLo && enemy.xLo <= player.xHi) {
      return true;
    }
  }
  return false;
}

var getPause = function() {
  return pause;
}

var resetGame = function() {
  player.lifes = 3;
  player.score = 0;
  level_counter = 0;
  gameover = false;
  pause = false;
  updateScoring();
  player.reset();
  player.render();
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
  var allowedKeys = {
    32: 'pause',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  console.log(allowedKeys[e.keyCode]);

  player.handleInput(allowedKeys[e.keyCode]);
});

showWhilePlaying();
