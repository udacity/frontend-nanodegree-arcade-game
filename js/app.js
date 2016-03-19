// Enemies our player must avoid
var speedNumber = 1;
var count = 0;

$("#count").text(count);

function updateCount(str) {

  if(str == "pass") {
    count++;
  }
  else if(str == "fail") {
    count--;
  }
  else {
    //Nothing
  }

  $("#count").text(count);

}

var Enemy = function(startX, startY, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = startX;
    this.y = startY;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x = this.x + this.speed * dt;
    if(this.x > 606){
      this.x = -100;
      this.randomSpeed();
    }

  var enemyXleftMax = this.x - 70;
  var enemyXRightMax = this.x + 70;
  var enemyYTopMax = this.y - 65;
  var enemyYBottomMax = this.y + 65;

  if(player.x > enemyXleftMax && player.x < enemyXRightMax && player.y > enemyYTopMax &&        player.y < enemyYBottomMax) {
    updateCount("fail");
    player.resetPlayer();
  }

};

Enemy.prototype.randomSpeed = function () {
  var someSpeed = Math.floor(Math.random() * 40 + 1);
  this.speed = 20 * someSpeed;
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var startX = 202;
var startY = 395;

var Player = function() {
  this.character = 'images/char-boy.png';
  this.x = startX;
  this.y = startY;
  this.borderChecker = {
    leftWall: false,
    rightWall: false,
    bottomWall: true
  }


};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.character), this.x, this.y);
};

Player.prototype.handleInput = function(keyInput) {
  var moveLeftRight = 100;
  var moveUpDown = 90;
  this.checkPosition();
  if(keyInput === 'left') {
    if(this.borderChecker.leftWall){
      return null;
    }
    this.x -= moveLeftRight;
  }
  if(keyInput === 'right') {
    if (this.borderChecker.rightWall) {
      return null;
    }
    this.x += moveLeftRight;
  }
  if(keyInput === 'up'){
    if(this.y <= 100) {
      updateCount("pass");
     this.resetPlayer();
    }
    else {
      this.y -= moveUpDown;
    }
  }
  if(keyInput === 'down'){
    if(this.borderChecker.bottomWall){
      return null;
    }
    this.y += moveUpDown;
  }

};

Player.prototype.checkPosition = function () {
  if (this.x <= 10) {
    this.HorizontalCheck(true, false);
  }else if (this.x >= 400) {
    this.HorizontalCheck(false, true);
  }else {
    this.HorizontalCheck(false, false);
  }

  if (this.y <= 387) {
    this.borderChecker.bottomWall = false;
  } else {
    this.borderChecker.bottomWall = true;
  }
};

Player.prototype.resetPlayer = function() {
  this.x = startX;
  this.y = 395;
};

Player.prototype.HorizontalCheck = function(leftWallState, rightWallState) {
  this.borderChecker.leftWall = leftWallState;
  this.borderChecker.rightWall = rightWallState;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

var allEnemies = [];
for(var i = 0; i < 3; i++){
  var aSpeed = Math.floor(Math.random() * 2 + 1) * 15;
  allEnemies.push(new Enemy(-80, 60 + 80 * i, aSpeed));
}

// Place the player object in a variable called player
var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  console.log(e);
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
