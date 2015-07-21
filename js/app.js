'use strict';

// Game measurements to help set initial state of the game.
var Game = function() {
  // A single block element width and height.
  // Helps to set proper locations centered in a certain block.
  this.blockWidth = 101;
  this.blockHeight = 83;
  // The game canvas size. Used to detect if an object is out of screen
  this.canvasWidth = this.blockWidth * 5;
  this.canvasHeight = this.blockHeight * 6;

  // Set a range to choose a certain speed from for the enemies objects.
  this.minSpeed = 100;
  this.maxSpeed = 400;

  // The Y position of player that decides if it won.
  this.winnigPosY = -41.5;

  // The initial player position. Will be used anytime game resets
  // as well as when creating the player object.
  this.playerInitPos = {row: 4, col: 2};

  this.playerSprite = 'images/char-horn-girl.png';

  this.allEnemies = [];
  this.numOfEnemies = 4;

  // Keep track of number of times player won
  this.winRounds = 0;
};
Game.prototype.generateRandom = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
Game.prototype.randomEnemyValues = function() {
  var randomRow = this.generateRandom(1, 3),
      // set X so that enemy position starts outside the canvas area
      enemyX = -this.blockWidth,
      // Pick a random row to from the 3 columns available for enemy movement
      // Block measurement is used to set the correct position on screen
      enemyY = randomRow * this.blockHeight - (this.blockHeight / 2),
      speed = this.generateRandom(this.minSpeed, this.maxSpeed);
  return {enemyX: enemyX, enemyY: enemyY, speed: speed};
};
Game.prototype.initialize = function() {
  var randomEnemyValues;
  // Initialize enemies with random speed values
  for(var i = 0; i < this.numOfEnemies; ++i) {
    randomEnemyValues = this.randomEnemyValues();
    this.allEnemies.push(new Enemy(randomEnemyValues.enemyX, randomEnemyValues.enemyY, randomEnemyValues.speed));
  }
  this.player = new Player();

  // This listens for key presses and sends the keys to your
  // Player.handleInput() method. You don't need to modify this.
  document.addEventListener('keyup', function(e) {
    var allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
    };
    game.player.handleInput(allowedKeys[e.keyCode]);
  });
};
Game.prototype.pickCharacter = function() {
  var charPicker = document.getElementsByClassName('welcomeScreen')[0],
      start = document.getElementById('start'),
      imgs = document.getElementsByTagName('img'),
      score = document.getElementById('score'),
      imgsLength = imgs.length;

  charPicker.style.display = 'block';

  function imgSelect(event){
    var image = event.target;
    var currentSelected = document.getElementsByClassName('selected')[0];
    currentSelected.className = '';
    image.className = 'selected';
    game.playerSprite = image.getAttribute('src');
  }

  for(var i = 0; i < imgsLength; ++i) {
    imgs[i].addEventListener('click', imgSelect);
  }

  // Hide character picker, display score and initialize game
  start.addEventListener('click', function(){
    charPicker.style.display = 'none';
    score.style.display = 'block';
    game.initialize();
  });
};
Game.prototype.updateScore = function() {
  var scoreVal = document.getElementById('scoreVal');
  scoreVal.innerHTML = this.winRounds;
};
Game.prototype.resetGame = function() {
  this.player.reset();
  for(var i = 0; i < this.numOfEnemies; ++i) {
    this.allEnemies[i].reset();
  }
};

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  this.sprite = 'images/enemy-bug.png';
  this.x = x;
  this.y = y;
  this.speed = speed;
};
/* Update the enemy's position, required method for game
 * Parameter: dt, a time delta between ticks
 * Ensures the game runs at the same speed for all computers.
 */
Enemy.prototype.update = function(dt) {
  this.x += this.speed * dt;
  if(this.x > game.canvasWidth) {
    this.reset();
  }
  this.detectCollision();
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Enemy.prototype.detectCollision = function() {
  // the +80 and +30 are used to neglect white space around
  // the enemy and the player sprites, for a better visual collision detection.
  if((this.x + 80 >= game.player.x &&
      this.x + 80 <= game.player.x + game.blockWidth &&
      this.y == game.player.y) ||
      (this.x + 30 <= game.player.x + game.blockWidth &&
      this.x + 30 >= game.player.x &&
      this.y == game.player.y)) {
    game.winRounds--;
    game.updateScore();
    game.resetGame();
  }
};
Enemy.prototype.reset = function() {
  var values = game.randomEnemyValues();
  this.x = values.enemyX;
  this.y = values.enemyY;
  this.speed = values.speed;
};

// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = game.playerSprite;
  // Initialize location of player
  this.x = game.playerInitPos.col * game.blockWidth;
  this.y = game.playerInitPos.row * game.blockHeight - (game.blockHeight / 2);
};
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(val) {
  switch(val) {
    case 'left':
      this.moveLeft();
      break;
    case 'right':
      this.moveRight();
      break;
    case 'up':
      this.moveUp();
      break;
    case 'down':
      this.moveDown();
      break;
    default:
      return;
  }
};
Player.prototype.update = function() {
  this.x = this.x;
  this.y = this.y;
};
Player.prototype.moveLeft = function() {
  if(this.x - game.blockWidth >= 0) {
    this.x -= game.blockWidth;
  }
};
Player.prototype.moveRight = function() {
  if(this.x + game.blockWidth < game.canvasWidth) {
    this.x += game.blockWidth;
  }
};
Player.prototype.moveUp = function() {
  if(this.y - game.blockHeight >= (-game.blockHeight/2)) {
    this.y -= game.blockHeight;
  }
  this.checkWin();
};
Player.prototype.moveDown = function() {
  if(this.y + game.blockHeight < (game.canvasHeight-game.blockHeight/2)) {
    this.y += game.blockHeight;
  }
};
Player.prototype.checkWin = function() {
  if(this.y == game.winnigPosY) {
    game.winRounds++;
    game.updateScore();
    game.resetGame();
  }
};
// Reset Player location to initial
Player.prototype.reset = function() {
  this.x = game.playerInitPos.col * game.blockWidth;
  this.y = game.playerInitPos.row * game.blockHeight - (game.blockHeight / 2);
};

var game = new Game();
game.pickCharacter();
