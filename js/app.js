var CANVAS_WIDTH = 505,
    CANVAS_HEIGHT = 606,
    STREET_TILES_Y = [1, 2, 3],
    NUMBER_LIFES_START = 3;
// -----------------------------------------------
// Player and Enemy are later derived from Entitiy
// -----------------------------------------------
/**
   * @description Represents Tiles such as Heros, Enemies, Gems and Hearts
   * @constructor
   */
var Entity = function() {
  // all entities are by default represented as a bug
  this.sprite = 'images/enemy-bug.png';
  this.x = 0;
  this.y = 0;
  this.velocity = 0;
};

/**
 * @description Draws the entity on the screen
 */
Entity.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// -----------------------------------------------
// Special tiles - added when player levels up
// -----------------------------------------------
/**
 * @description Special tiles such as hearts, keys, stars. These show up when
 * @constructor
 * the player levels up
 * @param {string} type - type of tile
 */
function Tile(type) {
  if (type === 'gem') {
    var randomTileNumber = Math.floor(Math.random() * 3);
    if (randomTileNumber === 1) {
      this.sprite = 'images/gem-blue.png';
      this.name = 'gem-blue';
    } else if (randomTileNumber === 2) {
      this.sprite = 'images/gem-green.png';
      this.name = 'gem-green';
    } else {
        this.sprite = 'images/gem-orange.png';
      this.name = 'gem-orange';
    }
  } else if (type === 'star') {
    this.sprite = 'images/star.png';
    this.name = 'star';
  } else if (type === 'heart') {
    this.sprite = 'images/heart.png';
    this.name = 'heart';
  } else if (type === 'key') {
    this.sprite = 'images/key.png';
    this.name = 'key';
  }
  this.row = Math.floor(Math.random()*6);
  this.col = Math.floor(Math.random()*5);
  this.tile = this.row;
  this.x = this.col * 101;
  this.y = this.row * 83 - 20;
}

// JavaScript inheritance
Tile.prototype = Object.create(Entity.prototype);
Tile.prototype.constructor = Tile;

// -----------------------------------------------
// Enemy - the player must avoid these
// -----------------------------------------------
/**
 * @description Enemy moves across the screen and has to be avoided
 * by the player
 * @constructor
 * @param {number} velocity - velocity of the enemies
 */
function Enemy(velocity) {
  this.init(velocity);
}

// JavaScript inheritance
Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

/**
 * @description Initialize enemy with given velocity
 * @param {number} velocity
 */
Enemy.prototype.init = function(velocity) {
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
  this.velocity = velocity;
};

/**
 * @description Update the enemies position, required method for game
 * @param {number} dt - time step between updates
 */
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
// ----------------------------------------------
/**
 * @description Player is the hero controlled by the player
 * @constructor
 * @param {string} sprite - path to the sprite (image) of the hero
 * @param {string} name - name of the hero
 */
function Player(sprite, name) {
  this.init(sprite, name);
}

// JavaScript inheritance
Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

/**
 * @description Initialize hero with given sprite and name
 * @param {string} sprite - path to the sprite (image) of the hero
 * @param {string} name - name of the hero
 */
Player.prototype.init = function(sprite, name) {
  this.sprite = sprite;
  this.name = name;
  this.x = 101*2;
  this.tile = 4;
  this.y = -20 + this.tile * 82.5;
  this.lifes = NUMBER_LIFES_START;
};

/**
 * @description Reset the player position when collision with enemy or when
 * it reached the water
 */
Player.prototype.reset = function() {
  this.x = 101*2;
  this.tile = 4;
  this.y = -20 + this.tile * 82.5;
};

/**
 * @description Check whether hero reached the water
 * it reached the water
 * @returns {boolean} True if player reached water
 */
Player.prototype.reachWater = function() {
  if (this.y == -20) {
    return true;
  }
  return false;
};

// -----------------------------------------------
// Game - play, pause, levelup, game over
// -----------------------------------------------
/**
 * @description Game functionality such as play, pause, levelup, game over
 * @constructor
 */
var Game = function() {
  this.pause = false,
  this.gameover = false,
  this.levelup = false,
  this.squishmode = false,
  this.level = 1,
  this.score = 0,
  this.enemyVelocity = 100,
  this.gameElement = document.getElementById('game'),
  this.scoreElement = document.getElementById('scoring'),
  this.descriptionElement = document.getElementById('description');
  // Initiate the game
  this.init();
  this.showWhilePlaying();
}

// TODO: Ask player to choose a hero
/**
 * @description Initialie game with player and a few enemies
 */
Game.prototype.init = function() {
  this.player = new Player('images/char-boy.png', 'Char Boy');
  this.allEnemies = [new Enemy(this.enemyVelocity),
                     new Enemy(this.enemyVelocity),
                     new Enemy(this.enemyVelocity)];
  this.specialTiles = [];
};

/**
  * @description Check for collisions between hero and enemies
  * Treat collisions differently depending whether game is in
  * squishmode (i.e. player took a star and can kill bugs now)
  * @returns {boolean} True if collision occured between player and enemy
 */
Game.prototype.checkCollisions = function() {
  for (var i = 0; i < this.allEnemies.length; i++) {
    if (this.checkCollisionBox(this.allEnemies[i])) {
      if (this.squishmode) {
        this.allEnemies.splice(i,1);
        i--;
        if (this.allEnemies.length < 3) {
          this.allEnemies.push(new Enemy(this.enemyVelocity));
          this.allEnemies.push(new Enemy(this.enemyVelocity));
        }
      } else {
        this.player.lifes--;
        this.updateScoring();
      }
      return true;
    }
  }
  return false;
}

/**
 * @description Check whether player picked up a gem, star, heart or other special items.
 * Hearts increase the lifes of the player, stars lead to squish mode
 * where the player can kill bugs and reduce their number. Everything else gives
 * merely points.
 * Treat collisions differently depending whether game is in
 * squishmode (i.e. player took a star and can kill bugs now)
 */
Game.prototype.checkCollisionsGems = function() {
  for (var i = 0; i < this.specialTiles.length; i++) {
    if (this.checkCollisionBox(this.specialTiles[i])) {
      if (this.specialTiles[i].name === 'gem-blue') {
        this.score += 20;
    	} else if (this.specialTiles[i].name === 'gem-green') {
        this.score += 25;
    	} else if (this.specialTiles[i].name === 'gem-orange') {
        this.score += 30;
    	} else if (this.specialTiles[i].name === 'key') {
        this.score += 100;
    	} else if (this.specialTiles[i].name === 'heart') {
        this.player.lifes += 1;
    	} else if (this.specialTiles[i].name === 'star') {
        this.squishMode();
      }
      if (this.squishmode) {
        this.showWhileSquishing();
      } else {
        this.updateScoring();
      }
      this.specialTiles.splice(i,1);
      i--;
    }
  }
}

/**
 * @description Set game to squish mode where the player can kill bugs.
 */
Game.prototype.squishMode = function() {
  this.squishmode = true;
  this.showWhileSquishing();
  setTimeout(function() {
    this.updateScoring();
  }.bind(this), 7000);
  setTimeout(function() {
    this.squishmode = false;
  }.bind(this), 10000);
}

/**
 * @description Check for collision within a box, i.e. there is a margin
 * that counts as a collision.
 * @param {Enemy} enemy
 * @returns {boolean} True if collision occured between player and the enemy
 */
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

/**
 * @description Update the game statistics when player reaches the water
 */
Game.prototype.update = function() {
  if (this.player.reachWater()) {
    this.level++;
    this.increaseScore('levelup');
    this.updateScoring();
    this.player.render();
    this.pause = true;
    this.showLevelUp();
    setTimeout(function() {
      this.player.reset();
      this.pause = false;
      this.levelup = false;
      this.squishmode = false;
    }.bind(this), 800);
  }
}

/**
 * @description Statistics to show while the game is being played.
 * This might have to be changed later when the player can choose his own hero.
 */
Game.prototype.showWhilePlaying = function() {
  var heading = document.createElement('h2');
  heading.setAttribute('id', 'heading');
  var text_heading = document.createTextNode('Help ' + this.player.name + ' reach the water!');
  var scoreh3 = document.createElement('h3');
  scoreh3.setAttribute('id', 'score');
  var text_score = document.createTextNode('Lifes: ' + this.player.lifes +
                                           '      Level: ' + this.level +
                                           '    Score: ' + this.score);
  heading.appendChild(text_heading);
  scoreh3.appendChild(text_score);

  var keys = document.getElementById('keys');
  this.descriptionElement.insertBefore(heading, keys);
  this.scoreElement.appendChild(scoreh3);
}

/**
 * @description Show different text while the player can squish bugs instead
 * to avoid them
 */
Game.prototype.showWhileSquishing = function() {
  var scoreElement = document.getElementById('scoring');
  var oldScoreElement = document.getElementById('score');
  var scoreh1 = document.createElement('h1');
  scoreh1.setAttribute('id', 'score');
  var text_score = document.createTextNode('Squish those bugs!');
  scoreh1.appendChild(text_score);
  scoreh1.style.color = 'Red';
  scoreElement.replaceChild(scoreh1, oldScoreElement);
}

/**
 * @description Update the score
 */
Game.prototype.updateScoring = function() {
  var scoreElement = document.getElementById('scoring');
  var oldScoreElement = document.getElementById('score');
  var scoreh3 = document.createElement('h3');
  scoreh3.setAttribute('id', 'score');
  var text_score = document.createTextNode('Lifes: ' + this.player.lifes +
                                           '      Level: ' + this.level +
                                           '    Score: ' + this.score);
  scoreh3.appendChild(text_score);
  scoreElement.replaceChild(scoreh3, oldScoreElement);
}

/**
 * @description Show that the game is over and that the player can restart the game
 * by pressing SPACE
 */
Game.prototype.showGameOver = function() {
  this.pause = true;
  this.gameover = true;
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.fillRect(0, CANVAS_HEIGHT/2-100, CANVAS_WIDTH, 200);
  ctx.fillStyle = 'white';
  ctx.font = '40px serif';
  ctx.textAlign = 'center';
  ctx.fillText('Game Over!', CANVAS_WIDTH/2, CANVAS_HEIGHT/2 - 30);
  ctx.fillText('Press [space] to restart', CANVAS_WIDTH/2, CANVAS_HEIGHT/2 + 30);
}

/**
 * @description Show that the player leveled up
 */
Game.prototype.showLevelUp = function() {
  this.pause = true;
  this.levelup = true;
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.fillRect(0, CANVAS_HEIGHT/2-100, CANVAS_WIDTH, 200);
  ctx.fillStyle = 'white';
  ctx.font = '40px serif';
  ctx.textAlign = 'center';
  ctx.fillText('Level up! :D', CANVAS_WIDTH/2, CANVAS_HEIGHT/2 - 30);
  ctx.fillText('More Bugs!', CANVAS_WIDTH/2, CANVAS_HEIGHT/2 + 30);
}

// Reset the game in the case of a game over and restart
Game.prototype.resetGame = function() {
  this.score = 0;
  this.level = 0;
  this.gameover = false;
  this.pause = false;
  this.enemyVelocity = 100;
  this.allEnemies = [new Enemy(this.enemyVelocity),
                     new Enemy(this.enemyVelocity),
                     new Enemy(this.enemyVelocity)];
  this.player.lifes = 3;
  this.player.reset();
  this.player.render();
  this.updateScoring();
}

// Increase the score when there was a level up
// Give stars and keys a new position if level up is reached,
// in case that they were in a hard to reach position before
Game.prototype.increaseScore = function(event) {
  if (event === 'levelup') {
    this.score += 10;
    this.enemyVelocity += 20;
    this.allEnemies.push(new Enemy(this.enemyVelocity));
    this.specialTiles.push(new Tile('gem'));
    if (this.level > 3 && this.player.lifes < 8) {
      if (this.containsSpecialTile('heart')) {
        this.deleteSpecialTile('heart');
      }
      this.specialTiles.push(new Tile('heart'));
    }
    if (this.level > 6 && !this.containsSpecialTile('key')) {
      this.specialTiles.push(new Tile('key'));
    }
    if (this.allEnemies.length > 8 || this.enemyVelocity > 700) {
      if (this.containsSpecialTile('star')) {
        this.deleteSpecialTile('star');
      }
      this.specialTiles.push(new Tile('star'));
    }
  }
}

// Find and delete a special tile (e.g. heart or star)
Game.prototype.deleteSpecialTile = function(type) {
  for (var i = 0; i < this.specialTiles.length; i++) {
    if (this.specialTiles[i].name === type) {
      this.specialTiles.splice(i,1);
      i--;
    }
  }
}

// Find out if game contains a special tile (e.g. heart or star)
Game.prototype.containsSpecialTile = function(type) {
  for (var i = 0; i < this.specialTiles.length; i++) {
    if (this.specialTiles[i].name === type) {
      return true;
    }
  }
  return false;
}

// Handle the input from the plaer, such as space, arrows up, down,
// left and right
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
  game.handleInput(allowedKeys[e.keyCode]);
});

// -----------------------------------------------
// Initialize Game, Enemies and Player
// -----------------------------------------------
var game = new Game();
