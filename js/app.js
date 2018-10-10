//--- Enemy ---
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
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
      this.x = -100;
    } else if (player.x < this.x + 60 &&
        player.x + 60 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y) {
          this.x = 200;
          this.y = 400;
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
      this.x -= 30;
    }
    break;
    case 'up':
    if (this.y > -20) {
      this.y -= 30;
    }
    break;
    case 'right':
    if (this.x < 400) {
      this.x += 30;
    }
    break;
    case 'down':
    if (this.y < 400) {
      this.y += 30;
    }
    break;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let player = new Player();
let allEnemies = [];
let enemyPosition = [60, 140, 220, 140];
let enemy;

enemyPosition.forEach(function(y) {
    enemy = new Enemy(0, y, Math.floor(Math.random() * 200));
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
  this.x = 200;
  this.y = 400;
  toggleModal();
};

document.querySelector('.restart-game').addEventListener('click', resetPlayer);
