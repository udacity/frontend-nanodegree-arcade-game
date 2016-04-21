var CANVAS_WIDTH = 505,
    CANVAS_HEIGHT = 606,
    STREET_TILES_Y = [1, 2, 3],
    NUMBER_LIFES_START = 3;
// -----------------------------------------------
// Player and Enemy are later derived from Entitiy
// -----------------------------------------------
var Entity = function() {
  // all entities are by default represented as a bug
  this.sprite = 'images/enemy-bug.png';
  this.x = 0;
  this.y = 0;
  this.velocity = 0;
};

// Draw the entity on the screen
Entity.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// -----------------------------------------------
// Enemy - the player must avoid these
// -----------------------------------------------
function Enemy() {
  this.init();
};

// JavaScript inheritance
Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.init = function() {
  this.sprite = 'images/enemy-bug.png';
  // Get a random position for x and y
  // The random position for x will delay when the bug appears on screen
  this.x = -50 - Math.random() * 300;

  // the tile (yPosition - 20) is perfect placement for a bug
  // or player
  this.tile = STREET_TILES_Y[Math.floor(Math.random() *
                                        STREET_TILES_Y.length)];
  // These values were mostly found by trial and error, there is no
  // science behind those numbers, unfortunately.
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

// -----------------------------------------------
// Player - the player can control the hero
// -----------------------------------------------
function Player(sprite, name) {
  this.init(sprite, name);
}

// JavaScript inheritance
Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

Player.prototype.init = function(newSprite, newName) {
  this.sprite = newSprite;
  this.name = newName;
  this.x = 101*2;
  this.tile = 4;
  this.y = -20 + this.tile * 82.5;
  this.lifes = NUMBER_LIFES_START;
};

Player.prototype.reset = function() {
  this.x = 101*2;
  this.tile = 4;
  this.y = -20 + this.tile * 82.5;
};

Player.prototype.reachWater = function() {
  if (this.y == -20) {
    return true;
  }
  return false;
};



// -----------------------------------------------
// Game - play, pause, levelup, game over
// -----------------------------------------------
var Game = function() {
  this.pause = false,
  this.gameover = false,
  this.level = 0,
  this.score = 0,
  this.gameElement = document.getElementById("game"),
  this.scoreElement = document.getElementById("scoring"),
  this.descriptionElement = document.getElementById("description");
  this.init();
  this.showWhilePlaying();
}

// Ask player to choose a hero, start game
Game.prototype.init = function() {
  this.player = new Player("images/char-boy.png", "Char Boy");
  this.allEnemies = [new Enemy(), new Enemy(), new Enemy()];
}

Game.prototype.getPause = function() {
  return this.pause;
}

Game.prototype.checkCollisions = function() {
  for (var i = 0; i < this.allEnemies.length; i++) {
    if (this.checkCollisionBox(this.allEnemies[i])) {
      this.player.lifes--;
      this.updateScoring();
      return true;
    }
  }
  return false;
}

Game.prototype.update = function() {
  if (this.player.reachWater()) {
    this.level++;
    this.increaseScore('levelup');
    this.updateScoring();
    this.player.reset();
  }
}

Game.prototype.checkCollisionBox = function(enemy) {
  if (enemy.tile == this.player.tile) {
    enemy.xLo = enemy.x;
    enemy.xHi = enemy.x + 79;
    this.player.xLo = this.player.x;
    this.player.xHi = this.player.x + 50;
    if (enemy.xHi >= this.player.xLo && enemy.xLo <= this.player.xHi) {
      return true;
    }
  }
  return false;
}

Game.prototype.showWhilePlaying = function() {
  var heading = document.createElement("h2");
  heading.setAttribute("id", "heading");
  var text_heading = document.createTextNode("Help " + this.player.name + " reach the water!");
  var scoreh3 = document.createElement("h3");
  scoreh3.setAttribute("id", "score");
  var text_score = document.createTextNode("Lifes: " + this.player.lifes + "      Level: " + this.level + "    Score: " + this.score);
  heading.appendChild(text_heading);
  scoreh3.appendChild(text_score);

  var keys = document.getElementById("keys");
  this.descriptionElement.insertBefore(heading, keys);
  this.scoreElement.appendChild(scoreh3);
}

Game.prototype.updateScoring = function() {
  var scoreElement = document.getElementById("scoring");
  var oldScoreElement = document.getElementById("score");
  var scoreh3 = document.createElement("h3");
  scoreh3.setAttribute("id", "score");
  var text_score = document.createTextNode("Lifes: " + this.player.lifes + "      Level: " + this.level + "    Score: " + this.score);
  scoreh3.appendChild(text_score);
  scoreElement.replaceChild(scoreh3, oldScoreElement);
}

Game.prototype.showGameOver = function() {
  this.pause = true;
  this.gameover = true;
  ctx.fillStyle = "rgba(0,0,0,0.3)";
  ctx.fillRect(0, CANVAS_HEIGHT/2-100, CANVAS_WIDTH, 200);
  ctx.fillStyle = "white";
  ctx.font = "40px serif";
  ctx.textAlign = "center";
  ctx.fillText("Game Over!", CANVAS_WIDTH/2, CANVAS_HEIGHT/2 - 30);
  ctx.fillText("Press [space] to restart", CANVAS_WIDTH/2, CANVAS_HEIGHT/2 + 30);
}

Game.prototype.resetGame = function() {
  this.score = 0;
  this.level = 0;
  this.gameover = false;
  this.pause = false;
  this.player.lifes = 3;
  this.player.reset();
  this.player.render();
  this.updateScoring();
}

Game.prototype.increaseScore = function(event) {
  if (event === 'levelup') {
    this.score += 10;
  }
}

Game.prototype.handleInput = function(direction) {
  if (direction === 'up' && this.player.y > -20) {
    this.player.y -= 82.5;
    this.player.tile -= 1;
  } else if (direction === 'down' && this.player.y < (CANVAS_HEIGHT - 220)) {
    this.player.y += 82.5;
    this.player.tile += 1;
  } else if (direction === 'left' && this.player.x > 0) {
    this.player.x -= 101;
  } else if (direction === 'right' && this.player.x < (CANVAS_WIDTH - 101)) {
    this.player.x += 101;
  } else if (direction === 'pause' && this.gameover) {
    this.gameover = false;
    this.resetGame();
  } else if (direction === 'pause' && this.pause) {
    this.pause = false;
  } else if (direction === 'pause' && !this.pause) {
    this.pause = true;
  }
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

  game.handleInput(allowedKeys[e.keyCode]);
});



// -----------------------------------------------
// Initialize Game, Enemies and Player
// -----------------------------------------------
var game = new Game();
