/* setting tile width and height values and variables */
var tileWidth = 101;
var tileHeight = 83;

// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    /* I will add x, y and speed
       The keyword this refers to <global> */
    this.x = tileWidth - (Math.floor((Math.random())));
    /* Return a random number between 1 and 4 as per tutorial at
      http://www.w3schools.com/jsref/jsref_random.asp
      We floor the random number so as to get a whole number and not a decimal */
    this.y = Math.floor((Math.random() * 4) + 1) * tileHeight;
    this.speed = Math.floor(Math.random() * 200) + tileHeight;
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
    if (this.x > (tileWidth * 5)) {
        this.x = -tileHeight;
    // I don't understand why the above line works
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x,y,speed) {
    //Enemy.call(this, x, y);
    this.x = 2 * tileWidth;
    this.y = 5 * tileHeight;
    this.sprite = 'images/char-pink-girl.png';
};
//Player.prototype = Object.create(Enemy.prototype);
//Player.prototype.constructor = Player;
Player.prototype.update = function(dt) {
    this.checkCollisions();
    this.win();
};
Player.prototype.render = function( ) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(e) {
    var keyOK = (typeof e !== 'undefined');
    console.log(e);

    var xInBound = (this.x >= 0 && this.x <=(tileWidth * 4));
    var yInBound = (this.y >= 0 && this.y <=(tileHeight * 5));

    if (keyOK && xInBound && yInBound) {
      if (e == 'right' && this.x < (tileWidth * 4)){
          this.x = this.x + tileWidth;
      } else if (e == 'left' && this.x > 0) {
          this.x = this.x - tileWidth;
      } else if (e == 'up' && this.y > 0) {
          this.y = this.y - tileHeight;
      } else if (e == 'down' && this.y < (tileHeight * 5)) {
        this.y = this.y + tileHeight;
      }
    }
};

Player.prototype.checkCollisions = function( ) {
    for (i = 0; i < allEnemies.length; i++) {

            if (this.x < allEnemies[i].x + 50 && this.x + 50 > allEnemies[i].x &&
                this.y < allEnemies[i].y + 30 && this.y + 30 > allEnemies[i].y) {
                this.reset();
                alert("Oopsie");
            }
        }
};

Player.prototype.win = function() {
    if (this.y == 0) {
      // what is the difference between == and ===
        this.reset();
        alert("You made it!");

    }
};

/** This function sends the player back to the start position. */
Player.prototype.reset = function() {
    this.x = 2 * tileWidth;
    this.y = 5 * tileHeight;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];

for (var i = 0; i <= 3; i++) {
    pushEnemy = new Enemy();
    allEnemies.push(pushEnemy);
}
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
