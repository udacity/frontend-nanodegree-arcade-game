// Enemies our player must avoid
var MAX_SPEED = 700;
var BASE_SPEED = 300;

var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.height = 100;
    this.width = 101;
    this.x = x;
    this.y = y;
    this.speed = BASE_SPEED;
  };


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 708) {
      this.x = -(Math.floor(Math.random() * MAX_SPEED));
      this.speed = Math.floor(Math.random() * MAX_SPEED + 200);
      // console.log(this.speed);
    } else {
      this.x += this.speed * dt;
    }
  };

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.x = 300;
  this.y = 480;
  this.height = 171;
  this.width = 101;
};

var inBounds = function(object) {
  return object.x > 0 && object.x <= 508 &&
         object.y >= 0 && object.y <= 507;
};

Player.prototype.update = function() {
  console.log('x: ' + this.x);
  console.log('y: ' + this.y);
};

Player.prototype.handleInput = function(input) {

  if (input === 'left' && this.x > 0) {
    this.x -= 100;
  } else if (input === 'right' && this.x < 600) {
    this.x += 100;
  } else if (input === 'up' && this.y > -60) {
    this.y -= 90;
  } else if (input === 'down'&& this.y < 480) {
    this.y += 90;
  }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemyRow1 = new Enemy(-100, 60);
var enemyRow2 = new Enemy(0, 140);
var enemyRow22 = new Enemy(-500, 140);
var enemyRow3 = new Enemy(-300, 220);
var enemyRow4 = new Enemy(-20, 310);
var enemyRow5 = new Enemy(-1000, 310);
var allEnemies = [];
allEnemies.push(enemyRow1);
allEnemies.push(enemyRow22);
allEnemies.push(enemyRow2);
allEnemies.push(enemyRow3);
allEnemies.push(enemyRow4);
allEnemies.push(enemyRow5);
var player = new Player();

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

var reset = function() {
  console.log('works');
  player.x = 300;
  player.y = 480;
};

var iconSelect;

window.onload = function(){

    iconSelect = new IconSelect("my-icon-select",
        {'selectedIconWidth':28,
        'selectedIconHeight':48,
        'selectedBoxPadding':5,
        'iconsWidth':28,
        'iconsHeight':48,
        'boxIconSpace':4,
        'vectoralIconNumber':8,
        'horizontalIconNumber':1});

    var icons = [];
    icons.push({'iconFilePath':'images/char-boy.png', 'iconValue':'1'});
    icons.push({'iconFilePath':'images/char-cat-girl.png', 'iconValue':'2'});
    icons.push({'iconFilePath':'images/char-horn-girl.png', 'iconValue':'3'});
    icons.push({'iconFilePath':'images/char-pink-girl.png', 'iconValue':'4'});
    icons.push({'iconFilePath':'images/char-princess-girl.png', 'iconValue':'5'});
    icons.push({'iconFilePath':'images/enemy-bug.png', 'iconValue':'6'});

    iconSelect.refresh(icons);

};

var changeChar = function(value) {
  switch (value) {
  case '1':
    player.sprite = 'images/char-boy.png';
  break;
  case '2':
    player.sprite = 'images/char-cat-girl.png';
  break;
  case '3':
    player.sprite = 'images/char-horn-girl.png';
    break;
  case '4':
    player.sprite = 'images/char-pink-girl.png';
    break;
  case '5':
    player.sprite = 'images/char-princess-girl.png';
    break;
  case '6':
    player.sprite = 'images/enemy-bug.png';
    break;
  }
};
document.querySelector('button').addEventListener('click', reset, false);
document.getElementById('my-icon-select').addEventListener('changed', function(e) {
              var value = iconSelect.getSelectedValue();
              console.log(value);
              changeChar(value);
            });
