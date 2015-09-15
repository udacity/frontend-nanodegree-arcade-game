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
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Rock = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/Rock.png';
    this.speed = 400;
};

Rock.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Rock.prototype.update = function(dt) {
    this.y -= this.speed * dt;
    
    if (hasRock === 0 && this.y < -17) {
	this.y = -17;
    }

    checkHits(this, allEnemies);
    checkPickup(this, player);
};

var checkHits = function(aRock, allEnemies) {
    var i = 0;
    while (i < allEnemies.length) {
	if (
	allEnemies[i].y - aRock.y >= -77
	&& allEnemies[i].y - aRock.y <= 73
	&& allEnemies[i].x - aRock.x >= -88
	&& allEnemies[i].x - aRock.x <= 73) {
	console.log('hit');
	++totalBugsKilled;
	allEnemies[i].y = -10000;
	}
	++i
    }
};

var checkPickup = function(aRock, player) {
    if (
	hasRock === 0
	&& player.y - aRock.y >= -60
	&& player.y - aRock.y <= 60
	&& player.x - aRock.x >= -70
	&& player.x - aRock.x <= 70) {
	console.log('pickup');
	aRock.y = -1000;
	hasRock = 1;
    }
}
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    // function not needed right now
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    displayGameStatus(numOfChances, totalBonus, totalBugsKilled, gameLevel);
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
    if (keyPress == 'f') {
	this.throwRock();
    }
    console.log('keyPress is: ' + keyPress);
    console.log(player.x + ' ' +  player.y);
};

Player.prototype.throwRock = function() {
    //var rock = new Rock(player.x, player.y - 30);
    //allRocks.push(rock);

    //Reduce to only one rock per round.
    if (hasRock) {
	allRocks[0].x = player.x;
	allRocks[0].y = player.y - 70;
	hasRock = 0;
    }
};
    
var displayGameStatus = function(aChance, aBonus, aBug, aLevel) {
    var canvas = document.getElementsByTagName('canvas');
    var firstCanvasTag = canvas[0];

    // add player score and level to div element created
    bonusLevelDiv.innerHTML = 'Chance: ' + aChance + ' / ' + 'Bugs: ' + aBug + ' / ' + 'Bonus: ' + aBonus
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
	--numOfChances;
	if (numOfChances == 0) {
	    restart();
	}
        player.x = 202.5;
        player.y = 383;
    }
    
    if (player.y + 10 <= 0) {        
        player.x = 202.5;
        player.y = 383;
        console.log('next level');

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

var restart = function() {
    allEnemies.length = 0;
    allRocks.length = 0;
    allBonus.length = 0;

    numOfChances = 3;
    hasRock = 1;
    gameLevel = 1;
    totalBonus = 0;
    totalBugsKilled = 0;

    player.x = 202.5;
    player.y = 383;

    var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);
    allEnemies.push(enemy);
    var bonus = new Bonus(Math.random() * 405 , Math.random() * 256);
    allBonus.push(bonus);
    var rock = new Rock(0, -1000);
    allRocks.push(rock);
};    
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var allBonus = [];
var allRocks = [];
var totalBonus = 0;
var totalBugsKilled = 0;
var gameLevel = 1;
var bonusLevelDiv = document.createElement('div');

var numOfChances = 3;
var player = new Player(202.5, 383, 50);
var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);
allEnemies.push(enemy);
var bonus = new Bonus(Math.random() * 405 , Math.random() * 256);
allBonus.push(bonus);
var rock = new Rock(0, -1000);
allRocks.push(rock);
var hasRock = 1;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
	70: 'f'  //fire
    };
    
    player.handleInput(allowedKeys[e.keyCode]);
});
