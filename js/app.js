//Global Variables
var enemyNumber = 5; 
var xStep = 101;
var yStep = 83;
var playerStartX = 202;
var playerStartY = 392;
var livesNumber = 5;


var scoreText = document.createElement("div");
scoreText.id = 'score';
var t = document.createTextNode(livesNumber.toString());       // Create a text node
scoreText.appendChild(t);                                // Append the text to <button>
document.body.appendChild(scoreText);  

// Enemies our player must avoid
var randomNumber = function() {
  return Math.floor((Math.random() * 300) + 50);
};


var Enemy = function(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -200;
    this.y = y;
    this.speed = randomNumber();

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if(this.x>500) {
      this.x = -120;
      this.speed = randomNumber();
      this.y = 60+Math.floor(Math.random() * 3)*83;
    }
};




// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var player = function() {
    this.sprite = 'images/char-cat-girl.png';
    this.x = playerStartX;
    this.y = playerStartY;
    this.lives = livesNumber;
    this.key = "";
};


player.prototype.update = function() {
  //prevents player from moving when the game is paused
  if (allEnemies.length>0) {
  //controls movements and limits the player
  switch (this.key) {
  case "right":
    this.x += xStep;
    if(this.x>404) this.x=404;
    break;
  case "left":
    this.x -= xStep;
    if(this.x<0) this.x=0;
    break;
  case "up":
    this.y -= yStep;
    break;  
  case "down":
    this.y += yStep;
    if(this.y>380) this.y=380;
    break; 
    }
  this.key = "";
 
//controls if player gets to the water
  if(this.y<0) { 
    player.win();
  }
  }
};

player.prototype.win = function() {

    document.getElementById("score").innerHTML = "You Win!";
    this.lives = livesNumber;
    player.reset();
};

player.prototype.lose = function() {
    this.lives -= 1;
    if (this.lives > 0) {
      
      player.reset();
      allHearts.splice(allHearts.length-1, 1);
      console.log(allHearts.length);
      document.getElementById("score").innerHTML = this.lives.toString();
    }
    else if(this.lives ==0){
      document.getElementById("score").innerHTML = "GAME OVER!";
  
      player.gameOver();
    }
};

player.prototype.reset = function() {
    this.x = playerStartX;
    this.y = playerStartY;
};

player.prototype.gameOver = function() {
      var btn = document.createElement("BUTTON");
      btn.id = "resetGame";        // Create a <button> element
      var t = document.createTextNode("Try Again!");       // Create a text node
      btn.appendChild(t);                                // Append the text to <button>
      document.body.appendChild(btn);

      allEnemies = [];

      btn.onclick=function(){
        document.getElementById("resetGame").remove();
        
        this.lives = livesNumber;
        document.getElementById("score").innerHTML = this.lives.toString();
        player.reset();
        createEnemies();
      };

    };
//TO DO! RESET ENEMIES!!!


// Draw the enemy on the screen, required method for game
player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

player.prototype.handleInput = function(movement) {
 this.key = movement;
};


function checkCollisions() {
    allEnemies.forEach(function(bug) {
      if(bug.y-player.y==0){
        if(Math.abs(bug.x-player.x)<80) 
          player.lose();    
      }
    });
}

//HEARTS!
var heart = function(x){
    this.sprite = 'images/Heart.png';
    this.x = x;
    this.y = 0;
    this.width = 101/3;
    this.height = 171/3;
}

heart.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new player();

var allEnemies = [];
createEnemies();

function createEnemies() {
for (var i = 0; i < enemyNumber; i++) {
  var newEnemy = new Enemy(60+(i%3)*83);
  allEnemies.push(newEnemy);
};
};


var allHearts = [];
createHearts();

function createHearts() {
for (var i = 0; i < livesNumber; i++) {
  var newHeart = new heart(i*40);
  allHearts.push(newHeart);
};
};





// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});