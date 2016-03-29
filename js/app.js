// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * (200)) +100;

    this.sprite = 'images/enemy-bug.png';
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
    this.sprite = 'images/char-boy.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

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
var allEnemies = [new Enemy(200, 100), new Enemy(-200, 50), new Enemy(300, 200), new Enemy(-400, 50)];
// Place the player object in a variable called player

var player = new Player(200, 390);

Player.prototype.handleInput = function(direction) {
  if(direction == "left" && this.x > 25){
    this.x -= 100;
  }
  else if(direction == "right" && this.x < 400){
    this.x += 100;
  }
  else if(direction == "up" && this.y > 0){
    this.y -= 80;
  }
  else if(direction == "down" && this.y < 400){
    this.y += 80;
  }
};

Player.prototype.reset = function() {
  this.x = 200;
  this.y = 360;
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
