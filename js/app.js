//function for chosing different player
var makeChoice = prompt ("Please select your player: boy, cat-girl, horn-girl, pink-girl, princess-girl?");


function choicePlayer(makeYourChoice){
  var choice;
  if (makeYourChoice==="boy"){
    choice = "images/char-boy.png";
  }
  else if(makeYourChoice==="cat-girl"){
    choice = "images/char-cat-girl.png";
  }

  else if (makeYourChoice==="horn-girl"){
      choice = "images/char-horn-girl.png";
  }

  else if (makeYourChoice==="pink-girl"){
    choice ="images/char-pink-girl.png";
  }

  else if (makeYourChoice==="princess-girl"){
    choice =  "images/char-princess-girl.png";
  }
  else {
      choice = "images/char-boy.png";
  }
  return choice;
};


// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * (200)) +100;
    this.sprite = "images/enemy-bug.png";
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 505) {
      this.x= 1;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

///Player
// Enemies our player must avoid
var Player = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.sprite = choicePlayer(makeChoice);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.checkCollisions(dt);
};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
///END Player

// Draw the enemy on the screen, required method for game

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

var allEnemies= function () {

};
allEnemies.prototype.render= function(){


};
var allEnemies = [new Enemy(300, 55.5), new Enemy(200, 135), new Enemy(300, 225), new Enemy(-400, 135)];
// Place the player object in a variable called player

var player = new Player(203, 400);

Player.prototype.handleInput = function(direction) {
  if(direction == "left" && this.x > 25){
    this.x -= 100;
  }
  else if(direction == "right" && this.x < 400){
    this.x += 100;
  }
  else if(direction == "up" && this.y > 0){
    this.y -= 82.5;
  }
  else if(direction == "down" && this.y < 400){
    this.y += 82.5;
  }
};

Player.prototype.reset = function() {
  this.x = 200;
  this.y = 400;
};

Player.prototype.checkCollisions = function() {
  for (var i=0; i < allEnemies.length; i++){
    var enemy = allEnemies[i];
    if (this.x >= enemy.x + 0 &&
        this.x < enemy.x + 50 &&
        this.y >= enemy.y + 0 &&
        this.y < enemy.y + 50)
{
  this.reset();
}
  if(this.y < 50) {
        this.reset();
    }
  }
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
