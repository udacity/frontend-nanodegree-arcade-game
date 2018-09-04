class Game {
  constructor(score = 0, level = 1) {
    this.score = score;
    this.level = level;
    this.x = 0;
    this.y = 540;
    this.sprite = 'images/Heart.png';
  }

  increaseLevel() {
    this.level += 1
    this.increaseEnemy()
  }

  increaseScore(points) {
    this.score += points;
  }

  increaseEnemy() {
    var choices = [40, 130, 220];
    for (var i = 0; i < game.level; i++) {
      var choice = choices[Math.floor(Math.random() * choices.length)];
      var speed = Math.floor(Math.random()*300) + 10;
      allEnemies.push(new Enemy(choice, speed));
    }    
  }

  renderLife() {
    ctx.clearRect(0, 0, 0 , 0);
    ctx.font = "bold 28px serif";
    // Draw scores on the top left
    ctx.fillText(" x " + player.life, 40, 575);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 40, 50);
  }

  renderStatus() {
    ctx.clearRect(0, 20 , 505 , 25);
    ctx.font = "20px serif";
    // Draw scores on the top left
    ctx.fillText("Score: " + this.score, 15, 40);
    // Draw lives on the top right
    ctx.fillText("Level: " + this.level, 420, 40);
  }

}

// Enemies our player must avoid
class Enemy {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  constructor(y = 10, rate) {
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    this.y = y;
    this.rate = rate
    this.width = 30;
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    if (this.x > 505) this.x = -100
    else this.x += this.rate*dt;
  }

  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
};

class Player {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  constructor(x = 10, y = 10) {
    this.sprite = 'images/char-boy.png';
    this.life = 3;
    this.count = 0;
    this.x = x;
    this.y = y;
    this.width = 40;
  }

  // Update the player's position, required method for game
  // Parameter: dt, a time delta between ticks
  update() {
    
  }

  increaseCount() {
    if (this.count < 3 + game.level) this.count += 1;
    else {
      this.count = 1;
      game.increaseLevel();
    }
  }

  reset() {
    this.x = 200;
    this.y = 400;
  }

  lost() {
    this.reset();
    this.life -= 1;
  }

  // Draw the player on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  // Now write your own player class
  // This class requires an update(), render() and
  // a handleInput() method.
  handleInput(keyCode) {
    if (keyCode === 'up') this.y -= 90;
    if (keyCode === 'down' && this.y < 400) this.y += 90;
    if (keyCode === 'left' && this.x > 0) this.x -= 100;
    if (keyCode === 'right' && this.x < 400) this.x += 100;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy(40, 60);
/*var enemy2 = new Enemy('enemy2', 130, 30);
var enemy3 = new Enemy('enemy3', 220, 40);
var enemy4 = new Enemy('enemy4', 40, 10);
var enemy5 = new Enemy('enemy5', 130, 20);
var enemy6 = new Enemy('enemy6', 220, 70);*/
var allEnemies = [enemy1/*, enemy2, enemy3, enemy4, enemy5, enemy6*/];

var player = new Player(200, 400);

var game = new Game();

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
