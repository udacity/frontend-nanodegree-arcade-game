/*       ENEMY       */

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 50;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = "images/enemy-bug.png";
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    this.x += this.speed * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*         PLAYER         */

// Now write your own player class
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.sprite = "images/char-boy.png"
};

// player position relocating point
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

// collision checking function
Player.prototype.checkCollision = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        if (player.x >= allEnemies[i].x - 40 && player.x <= allEnemies[i].x + 40) {
            if (player.y >= allEnemies[i].y - 35 && player.y <= allEnemies[i].y + 35) {
                alert("You hit a bug!! Your character will be relocated to the starting point!! Good luck!!");
                player.reset();
            }
        }
    }
    for (var i = 0; i < allGems.length; i++) {
        if (player.x >= allGems[i].x - 50 && player.x <= allGems[i].x + 50) {
            if (player.y >= allGems[i].y - 50 && player.y <= allGems[i].y + 50) {
                allGems.splice(i,1);
            }
        }
    }
};

// update player's position
Player.prototype.update = function(dt) {
    player.checkCollision();
};

// draw player's character image on the board
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// handling character
Player.prototype.handleInput = function(inputKey) {
    if (inputKey == 'up') {
        player.y -= 50;
    }
    if (inputKey == 'right') {
        if (player.x < 400) {
            player.x += 50;
        }
    }
    if (inputKey == 'down') {
        if (player.y < 400) {
            player.y += 50;   
        }
    }
    if (inputKey == 'left') {
        if (0 < player.x) {
            player.x -= 50;
        }
    }
};

/*         GEM         */

var Gem = function(x, y) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
    this.sprite = "images/Gem-Green.png"
};

Gem.prototype.update = function(dt) {
    
};

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// variables, objects
var player = new Player(200, 400);

var allEnemies = [];

var allGems = [];

// random enemy placing
for (x=0; x < 4; x++) {
    var enemy = new Enemy(-150, 60 * (Math.floor((Math.random() * 6) + 1)), 10 * (Math.floor((Math.random() * 10) + 1)));
    allEnemies.push(enemy);
};

// random gem placing
for (x=0; x < 2; x++) {
    var gem = new Gem(30 * Math.floor((Math.random() * 10) + 1), 30 * Math.floor((Math.random() * 10) + 1));
    allGems.push(gem);
};

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
