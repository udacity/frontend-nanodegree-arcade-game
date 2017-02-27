var Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;

    if(this.x >= 505) {
      this.x = 0;
    }
    checkCollision(this)
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function(x, y, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {

}

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var checkCollision = function(anEnemy) {
    if (player.y + 131 >= anEnemy.y + 90
        && player.x + 25 <= anEnemy.x + 88
        && player.y + 73 <= anEnemy.y + 135
        && player.x + 76 >= anEnemy.x + 11) {
          console.log('collided');
          player.x = 202.5;
          player.y = 383;
      }
    if (player.y + 63 <= 0) {
        player.x = 202.5;
        player.y = 383;

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 505, 171);

        score += 1;
        gameLevel += 1;
        console.log('current score: ' + score + ', current level: ' + gameLevel);
        increaseDifficulty(score);
      }

    if (player.y > 383 ) {
        player.y = 383;
    }
    if (player.x > 402.5) {
        player.x = 402.5;
    }
    if (player.x < 2.5) {
        player.x = 2.5;
    }
};

Player.prototype.handleInput = function(onPress) {
  if(onPress === 'left') {
    player.x -= player.speed;
  }
  if(onPress === 'up') {
    player.x -= player.speed -20;
  }
  if(onPress === 'right') {
    player.x += player.speed;
  }
  if(onPress === 'down') {
    player.x += player.speed;
  }
}

var allEnemies = [];
var player = new Player();

var enemy = new Enemy(0,Math.random() * 184 + 50, Math.random() * 256);
allEnemies.push(enemy);

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
