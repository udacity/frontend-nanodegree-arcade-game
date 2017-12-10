// Enemies our player must avoid
var yPosition = [83,16,249];
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    var x = Math.floor(Math.random() * - 100);
    var y = yPosition[Math.floor(Math.random() * 3)];
    this.x = x;
    this.y = y;

    this.speed = 150 + Math.floor(Math.random() * 300);
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
  if (this.x >= 500) {
    this.x = 1;
  }

  if (player.x < this.x +75 && player.x + 75 > this.x && player.y < this.y + 50 && player.y + 50 > this.y ) {
    player.reset();
  }
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Char = ['images/char-boy.png', 'images/char-cat-girl.png', 'images/char-horn-girl.png'];
var Player = function(x, y) {
    this.speed = 100;
    this.x = x;
    this.y = y;
    this.score = 0;
    var s = Math.floor(Math.random()* 3);
    this.sprite = Char[s];
};

// update the location
Player.prototype.update = function() {
    if (this.x > 402) {
        this.x = 402;
    }
    if (this.x < 0) {
        this.x = 0;
    }
    if (this.y > 400) {
        this.y = 400;
    }
    if (this.y < 35) {
        this.y = 400;
        this.x = 200;
        this.addPoints();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // re-draw the score text
    ctx.fillText("Score: "+ this.score, 10, 575);
    ctx.strokeText("Score: "+ this.score, 10, 575);
    ctx.font='20px Impact';
    ctx.fillStyle='white';
    ctx.strokeStyle='black';
};

//move the Player
Player.prototype.handleInput = function(allowedKey) {
    switch (allowedKey) {
        case 'up':
            this.y -= 83;
            break;
        case 'down':
            this.y += 83;
            break;
        case 'left':
            this.x -= 101;
            break;
        case 'right':
            this.x += 101;
            break;
    }
};

//when the Player and the enemies have a collision
Player.prototype.reset = function() {
    //reset Player position
    this.x = 200;
    this.y = 400;
    //reset score
    this.score = 0;
};

// Add points to the score
Player.prototype.addPoints = function(){
    // Add 100 points to the Player score
    this.score += 100;
    // clear a rectangle over the score text
    ctx.clearRect(1, 580, 600, 20);
};


// Place the Player object in a variable called player
var player = new Player(200, 400);


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (var i=0; i<3; i++) {
  var enemy = new Enemy();
  allEnemies.push(enemy);
}


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
