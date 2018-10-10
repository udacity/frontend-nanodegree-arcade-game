//--- Enemy ---
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random()*200)+100);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 505){
      this.x = 0;
    } else if (this.x <= 505){
      this.x = this.x + this.speed * dt;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//--- Player ---
// Now write your own player class
var Player = function(x, y) {
  this.x = 200;
  this.y = 400;
  this.sprite = 'images/char-boy.png';
};
// This class requires an update(), render() and
Player.prototype.update = function() {
  if (this.y === -20) {
    toggleModal();
    this.x = 200;
    this.y = 400;
  }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// a handleInput() method.

Player.prototype.handleInput = function(keyPress) {
  switch (keyPress) {
    case 'left':
    if (this.x > 0) {
      this.x -= 20;
    }
    break;
    case 'up':
    if (this.y > -20) {
      this.y -= 20;
    }
    break;
    case 'right':
    if (this.x < 400) {
      this.x += 20;
    }
    break;
    case 'down':
    if (this.y < 400) {
      this.y += 20;
    }
    break;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

var enemyPosition = [60, 140, 220];
var enemy;
var player = new Player();

enemyPosition.forEach(function(posY) {
    enemy = new Enemy(0, posY, 100 + Math.floor(Math.random() * 512));
    allEnemies.push(enemy);
});

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

// The congraulations modal
function toggleModal(){
  const modal = document.querySelector('.modal');
  modal.classList.toggle('hide');
};

// restart button
function resetPlayer(){
  location.reload();
};

document.querySelector('.restart-game').addEventListener('click', resetPlayer);
