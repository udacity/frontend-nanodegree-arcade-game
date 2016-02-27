// Enemies our player must avoid
var speedNumber = 0;
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

};

Enemy.prototype.randomSpeed = function () {
  var someSpeed = Math.floor(Math.random() * 60 + 1);
  this.speed = 20 * someSpeed;
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

var allEnemies = [];
for(var i = 0; i < 3; i++){
  var aSpeed = Math.floor(Math.random() * 4 + 1) * 60;
  allEnemies.push(new Enemy(-80, 60 + 80 * i, aSpeed));
}

// Place the player object in a variable called player
//var player = new Player();



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
