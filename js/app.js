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

    // checks whether player was crashed by an enemy

    if (
        player.y + 131 >= this.y + 90
        && player.x + 25 <= this.x + 88
        && player.y + 73 <= this.y + 135
        && player.x + 76 >= this.x + 11) {
        console.log('crashed')
        player.x = 202.5;
        player.y = 383;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y, step) {
    this.x = x;
    this.y = y;
    this.step = step;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {

};


//draws the Player to the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    displayLevel(score, gameLevel)
};


//moves the player on the screen

Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left') {
        player.x -= player.step;
    }

    if (keyPress == 'up') {
        player.y -= player.step - 20;
    }

    if (keyPress == 'right') {
        player.x += player.step;
    }

    if (keyPress == 'down') {
        player.y += player.step - 20;
    }

    console.log('keyPress is: ' + keyPress);

    if (player.y + 10 <= 0) {
        player.x = 202.5;
        player.y = 383;
        console.log('wow crazy!');

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 505, 171);

        score +=1;
        gameLevel += 1;

        console.log('score: ' + score + 'current level: ' + gameLevel);
        inscreaseLevel(score);
    }

    
    //makes sure that player stays on the canvas

    if (player.y > 383) {
        player.y = 383;
    }

    if (player.x > 402.5) {
        player.x = 402.5;
    }

    if (player.x < 2.5) {
        player.x = 2.5;
    }

};

var displayLevel = function(aScore, aLevel) {
    var canvas = document.getElementsByTagName('canvas');
    var firstCanvasTag = canvas[0];

    scoreLevelDiv.innerHTML = 'Score: ' + aScore + ' / ' + 'Level: ' + aLevel;
    document.body.insertBefore(scoreLevelDiv, firstCanvasTag[0]);
};

// increases the number of enemies as the game progresses

var inscreaseLevel = function(numEnemies) {
    // removes existing enemies from the screen
    allEnemies.length = 0;

    //loads new enemies
    for (var i = 0; i <= numEnemies; i++) {
        var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);

        allEnemies.push(enemy);
    }
};

// Now instantiate your objects.
var allEnemies = [];// Place all enemy objects in an array called allEnemies
var player = new Player(202.5, 383, 50);// Place the player object in a variable called player
var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256); //randomized enemies occur
var score = 0;
var gameLevel = 1;
var scoreLevelDiv = document.createElement('div');

allEnemies.push(enemy);

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
