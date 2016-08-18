// Enemies our player must avoid

var Enemy = function() {
    // The image/sprite for enemies uses
    // a helper to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = Math.floor((Math.random() * 225) + 25);
    this.vel = Math.floor((Math.random() * 100) + 10);
};

// Update the enemy's position.
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Movement is multiplied by the dt parameter
    // to ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + dt * this.vel;
    if (this.x > 505) {
      this.x = -10;
    }
};

// Draw the enemy on the screen.
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class

var Player = function() {
  this.sprite = "images/char-boy.png";
  this.x = 205;
  this.y = 400;
  this.score = 0;
};

Player.prototype.update = function(dt) {
  if (this.x > 420) {
    this.x = 420;
  }
  if (this.x < -15) {
    this.x = -15;
  }
  if (this.y > 400) {
    this.y = 400;
  }
  if (this.y < -10) {
    //When player makes it across and scores
    this.y = 400;
    this.score += 5;
    if (allStars.length === 0) {
      var star1 = new Star();
      var star2 = new Star();
      var star3 = new Star();
      allStars = [star1, star2, star3];
    }
    for (var i = 0; i < allEnemies.length; i++) {
      allEnemies[i].vel += 5;
    }
  }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
  switch (key) {
    case 'left':
      this.x -= 10;
      break;

    case 'right':
      this.x += 10;
      break;

    case 'up':
      this.y -= 10;
      break;

    case 'down':
      this.y += 10;
      break;

    case 'boy':
      this.sprite = "images/char-boy.png";
      break;

    case 'cat':
      this.sprite = "images/char-cat-girl.png";
      break;

    case 'princess':
      this.sprite = "images/char-princess-girl.png";
      break;

    default:
      console.log("Illegal keypress");
  }
};

Player.prototype.checkCollisions = function(enemyArray) {
  var zone = 70;
  for (var i = 0; i<enemyArray.length; i++) {
    if (
      this.x > enemyArray[i].x - zone &&
      this.x < enemyArray[i].x + zone &&
      this.y > enemyArray[i].y - zone &&
      this.y < enemyArray[i].y + zone) {
      this.x = 205;
      this.y = 400;
      this.score -= 1;
    }
  }
};

Player.prototype.checkStarCollisions = function(starArray) {
  var zone = 50;
  for (var i = 0; i<starArray.length; i++) {
    if (
      this.x > starArray[i].x - zone &&
      this.x < starArray[i].x + zone &&
      this.y > starArray[i].y - zone &&
      this.y < starArray[i].y + zone) {
      this.score += 2;
      starArray.splice(i,1);
    }
  }
};

// Star class

var Star = function() {
  this.sprite = "images/Star.png";
  this.x = Math.floor((Math.random() * 400) + 25);
  this.y = Math.floor((Math.random() * 300) + 30);
}

Star.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This listens for key presses and sends the keys to
// Player.handleInput() method. 
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        66: 'boy',
        67: 'cat',
        80: 'princess'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
