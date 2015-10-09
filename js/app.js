// Enemies our player must avoid
var Enemy = function (startX, startY, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = startX;
    this.y = startY;
    this.speed = speed;
    
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x += this.speed*dt;
};


function randomSpeed (min, max) {
  var min = 50;
  var max = 200;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class

var Player = function (startX, startY) {
    this.x = startX;
    this.y = startY;
    
    this.sprite = 'images/char-horn-girl.png';
};

// This class requires an update(), render() and

Player.prototype.update = function () {
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// a handleInput() method.

Player.prototype.handleInput = function (key) {
  if (key === 'left') {
    if (this.x === 0) {
      this.x = 0;
    }
    else {
      this.x -= 100;
      console.log("left", this.x, this.y);
    }
  }
  else if (key === 'right') {
    if (this.x === 400) {
      this.x = 400;
    }
    else {
      this.x += 100;
      console.log("right", this.x, this.y);
    }
  }
  else if (key === 'up') {
    if (this.y === -50){
      this.y = -50;
    }
    else {
      this.y -= 90;
      console.log("up", this.x, this.y);
    }
  }
  else if (key === 'down') {
    if (this.y === 400) {
      this.y = 400;
    }
    else {
      this.y += 90;
      console.log("down", this.x, this.y);
    }
  }
  
  
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

var allEnemies = [];

//var enemy4 = new Enemy (-60, 60 + (83 * 3), 80);
//allEnemies.push(enemy4);

for (var i = 0; i < 3; i++) {
    allEnemies.push(new Enemy(-60, 60 + (83 * i), randomSpeed()));
}



// Place the player object in a variable called player

var player = new Player(200, 400);


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
