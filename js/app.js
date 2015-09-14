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
    
    if (this.x >= 505) {
	this.x = 0;
    }

    checkCollision(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Bonus = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/Star.png';
};

Bonus.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Bonus.prototype.update = function() {
    checkBonus(this);
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    // function not needed right now
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    displayBonusLevel(totalBonus, gameLevel);
};

Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left') {
        player.x -= player.speed;
    }
    if (keyPress == 'up') {
        player.y -= player.speed - 20;
    }
    if (keyPress == 'right') {
        player.x += player.speed;
    }
    if (keyPress == 'down') {
        player.y += player.speed - 20;
    }
    console.log('keyPress is: ' + keyPress);
    console.log(player.x + ' ' +  player.y);
};

var displayBonusLevel = function(aBonus, aLevel) {
    var canvas = document.getElementsByTagName('canvas');
    var firstCanvasTag = canvas[0];

    // add player score and level to div element created
    bonusLevelDiv.innerHTML = 'Bonus: ' + aBonus
        + ' / ' + 'Level: ' + aLevel;
    document.body.insertBefore(bonusLevelDiv, firstCanvasTag[0]);
};

var checkBonus = function(aBonus) {
        if (
	player.y - aBonus.y >= -77
	&& player.y - aBonus.y <= 73
	&& player.x - aBonus.x >= -88
	&& player.x - aBonus.x <= 73) {
	console.log('bonus');
	++totalBonus;
	aBonus.x = -100;
    }
}

var checkCollision = function(anEnemy) {
    // check for collision between enemy and player
    if (
        player.y + 131 >= anEnemy.y + 90
        && player.x + 25 <= anEnemy.x + 88
        && player.y + 73 <= anEnemy.y + 135
        && player.x + 76 >= anEnemy.x + 11) {
        console.log('collided');
        player.x = 202.5;
        player.y = 383;
    }
    
    if (player.y + 10 <= 0) {        
        player.x = 202.5;
        player.y = 383;
        console.log('next level');

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 505, 171);

	gameLevel += 1;
	increaseDifficulty(gameLevel);

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

var increaseDifficulty = function(gameLevel) {
    allEnemies.length = 0;
    allBonus.length = 0;

    for (var i = 0; i <= gameLevel; ++i) {
        var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);
        allEnemies.push(enemy);
    }
    
    for (var i = 0; i <= gameLevel/2 + 1; ++i) {
	var bonus = new Bonus(Math.random() * 405 , Math.random() * 256);
	allBonus.push(bonus);
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var allBonus = [];
var totalBonus = 0;
var gameLevel = 1;
var bonusLevelDiv = document.createElement('div');

var player = new Player(202.5, 383, 50);
var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);
allEnemies.push(enemy);
//var bonus = new Bonus(Math.random() *  + 50,  Math.random() * 256);
var bonus = new Bonus(Math.random() * 405 , Math.random() * 256);
allBonus.push(bonus);
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
