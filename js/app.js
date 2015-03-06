//Global Variables***********
var enemyNumber = 5; 
var ENEMY_X = -200;
var X_STEP = 101;
var Y_STEP = 83;
var PLAYER_START_X = 202;
var PLAYER_START_Y = 422;
var livesNumber = 7;
var points = 0;
var gameIsOn = true;
var ENTITY_HEIGHT = 50;
var ENTITY_WIDTH = 90;
var CANVAS_OFFSET = 90;
//temporary variable for the canvas
var canvas_width = 505;
var canvas_height = 606;


// create random number
var randomNumber = function() {
  return Math.floor((Math.random() * 300) + 50);
};

//Enemy class
var Enemy = function(y) {
  this.sprite = 'images/boot.png';
  this.x = ENEMY_X;
  this.y = y;
  this.height = ENTITY_HEIGHT;
  this.width = ENTITY_WIDTH;
  this.speed = randomNumber();
};

Enemy.prototype.update = function(dt) {
  this.x = this.x + this.speed * dt;
  //brings back the enemies to a random row and a random speed
  if(this.x>canvas_width) {
    this.x = ENEMY_X;
    this.speed = randomNumber();
    this.y = CANVAS_OFFSET+Math.floor(Math.random() * 3)*Y_STEP;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Function to initiate enemies
function createEnemies() {
  for (var i = 0; i < enemyNumber; i++) {
    var newEnemy = new Enemy(CANVAS_OFFSET+(i%3)*Y_STEP);
    allEnemies.push(newEnemy);
  }
};

//Player Class
var player = function() {
  this.sprite = 'images/char-cat.png';
  this.x = PLAYER_START_X;
  this.y = PLAYER_START_Y;
  this.height = ENTITY_HEIGHT;
  this.width = ENTITY_WIDTH;
  this.lives = livesNumber;
  this.key = "";
  this.points = points;
};

// Draw the player on the screen, required method for game
player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

player.prototype.update = function() {
  //prevents player from moving when the game is paused
  if (gameIsOn) {
    //controls movements, limits the player and updates sprite
    switch (this.key) {
    case "right":
      this.sprite = "images/char-cat-right.png";
      this.x += X_STEP;
      if(this.x>canvas_width-this.width) this.x=404;
      break;
    case "left":
      this.sprite = "images/char-cat-left.png";
      this.x -= X_STEP;
      if(this.x<0) this.x=0;
      break;
    case "up":
      this.sprite = "images/char-cat-up.png";
      this.y -= Y_STEP;
      break;  
    case "down":
      this.sprite = "images/char-cat-down.png";
      this.y += Y_STEP;
      if(this.y>PLAYER_START_Y) this.y=PLAYER_START_Y;
      break;
    }
    this.key = "";
    //controls if player gets to the water
    if(this.y<CANVAS_OFFSET) { 
      player.win();
    }
  }
  else if (this.key=="space"){
  gameIsOn = true;
  resetGame();
  }
};
//receives the keys
player.prototype.handleInput = function(movement) {
 this.key = movement;
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        32: 'space',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//resets player position and sprite
player.prototype.reset = function() {
  gameIsOn = true;
  this.x = PLAYER_START_X;
  this.y = PLAYER_START_Y;
  this.sprite = 'images/char-cat.png';
};

//when player wins gets points and resets
player.prototype.win = function() {
  this.points +=10;
  document.getElementById("score").innerHTML = this.points.toString();
  player.reset();
};

//when player looses looses 1 life and resets
player.prototype.lose = function() {
  //to do cat being hit explosion
  this.lives -= 1;
  allHearts[this.lives].sprite = "images/Heartless.png";
  
  if (this.lives > 0) {
      player.sprite ='images/char-cat-hit.png';
      gameIsOn =false;

    setTimeout(function(){player.reset()}, 50);
  }
  //Gameover situation - final score
  else if(this.lives ==0){
    document.getElementById("score").innerHTML = "FINAL SCORE: "+this.points.toString();
    player.gameOver();
  }
};

//game Over Function
player.prototype.gameOver = function() {
  gameIsOn = false;
  //creates banner and text divs
  createBanner();
  //change cat to dead cat
  this.sprite = 'images/char-cat-dead.png';
  //erases enemies
  allEnemies = [];
  
};


//reset game function - resets lives, points, creates enemies and hearts
function resetGame() {
  document.getElementById("gameOverBanner").remove();
  document.getElementById("gameOverText").remove();
  player.reset();
  player.lives = livesNumber;
  player.points = points;
  document.getElementById("score").innerHTML = player.points.toString();
  createHearts();
  createEnemies();
};



//Hearts 
var Heart = function(x){
  this.sprite = 'images/Heart.png';
  this.x = x;
  this.y = -10;
  this.width = 101/3;
  this.height = 171/3;
}

function createHearts() {
  //cleans hearts array
  allHearts = [];
  //creates new ones
  for (var i = 0; i < livesNumber; i++) {
    allHearts.push(new Heart(10+i*40));
  }
};

Heart.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
};


//CREATE MORE ELEMENTS****
//create a rules div
function createRules() {
  var rules = document.createElement("div");
  rules.id = 'rules';
  var t1 = document.createTextNode("beware of the boots!");
  var t2 = document.createTextNode("use the arrows to get to the rooftops");
  var t3 = document.createTextNode("you like rooftops.");

  rules.appendChild(t1);
  rules.appendChild(document.createElement("br"));
  rules.appendChild(t2);
  rules.appendChild(document.createElement("br"));
  rules.appendChild(t3);
  document.body.appendChild(rules);  
};

//create a score div
function createScore() {
  var scoreText = document.createElement("div");
  scoreText.id = 'score';
  var t = document.createTextNode(points.toString());
  scoreText.appendChild(t);
  document.body.appendChild(scoreText); 
}; 

//create a game over Banner
function createBanner() {
  var gameOverBanner = document.createElement("div");
  gameOverBanner.id = 'gameOverBanner';
  var gameOverText = document.createElement("div");
  gameOverText.id = 'gameOverText';
  var t1 = document.createTextNode("Game Over!");
  var t2 = document.createTextNode("Hit space to try again!");
  document.body.appendChild(gameOverBanner);
  document.body.appendChild(gameOverText);
  gameOverText.appendChild(t1);
  gameOverText.appendChild(document.createElement("br"));
  gameOverText.appendChild(t2);
};

//OBJECTS***********
//player object
var player = new player();

//Enemies object
var allEnemies = [];
createEnemies();


//Hearts object
var allHearts = [];
createHearts();

//Rules
createRules();

//Score
createScore();

