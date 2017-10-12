// Enemies our player must avoid
var Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * (200 - 50) + 100);
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);
    if (this.x > 500) {
        this.x = -100;
        this.speed = Math.floor(Math.random() * 200 + 50);
    }
    this.makeEnemyHitbox();
    return this.x;
};
//draw hitboxes on the enemies:
Enemy.prototype.drawBox = function(x, y, width, height, color) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.lineWidth = 1;
    ctx.strokeStyle = color;
    ctx.stroke();
};

Enemy.prototype.makeEnemyHitbox = function() {
    this.EnemyHitBox = {
            x: this.x,
            y: this.y,
            width: 100,
            height: 67
        };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    this.drawBox(this.x, this.y + 77, 100, 67, "red");
};

// This class requires an update(), render() and
// a handleInput() method.
var score = 0;
var playerInit_x=200;
var playerInit_y=410;
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.lives = 3;
    this.boxWidth = 69;
    this.boxHeight = 79;
    this.boxXvalue = this.x + 16;
    this.boxYvalue = this.y + 61;
    this.sprite = 'images/char-horn-girl.png';
};

Player.prototype.drawBox = function(x, y, width, height, color) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.stroke();
};

Player.prototype.checkCollisions = function() {
    var playerBox = {
        x: this.boxXvalue,
        y: this.boxYvalue,
        width: this.boxWidth,
        height: this.boxHeight
    };
    //cycle through allEnemies and make playerBox = rect1, allEnemies.EnemyHitBox = rect2:
    for (var i = 0; i < allEnemies.length; i++) {
        var rect1 = playerBox;
        var rect2 = allEnemies[i].EnemyHitBox;
        //this is the collision check code from the MDN 2d collision check:
        if (rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.height + rect1.y > rect2.y) {
            console.log("collision detected!");
            this.lives -= 1;

            this.reset();
            return;

        }
    }
};

Player.prototype.updateHitBoxXvalue = function() {
    this.boxXvalue = this.x + 16;
};

Player.prototype.updateHitBoxYvalue = function() {
    this.boxYvalue = this.y + 61;
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.handleInput = function(direction) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    switch (direction) {
        case "left":
            this.x -= 100;
            this.updateHitBoxXvalue();
            break;
        case "right":
            this.x += 100;
            this.updateHitBoxXvalue();
            break;
        case "up":
            this.y -= 40;
            this.updateHitBoxYvalue();
            break;
        case "down":
            this.y += 40;
            this.updateHitBoxYvalue();
            break;
    }
};
var flag = 0;
Player.prototype.reset = function() {
    this.x = playerInit_x;
    this.y = playerInit_y;
    //end condition
    if (this.lives === 0 || flag === 1) {
        if (this.lives === 0) {
            console.log("GAME OVER\nYou ran out of lives! Try again.\nSCORE:" + score)
            document.getElementsByClassName('lives')[0].innerHTML = "You ran out of lives!<br>Score: " + score;
            document.getElementsByClassName('gameStatus')[0].innerHTML = "Refresh to play again!";
            exit()
        } else {
            score += 40 * this.lives;
            console.log("Congratulations!\nSCORE:" + score);
            document.getElementsByClassName('lives')[0].innerHTML = "Congratulations! You did it!<br>Score: " + score;
            document.getElementsByClassName('gameStatus')[0].innerHTML = "Refresh to play again!";
            flag = 0;
            exit();
        }
        score = 0;
        this.lives = 3;

    } else {
        console.log("SCORE:" + score + " LIVES left:" + this.lives);
        document.getElementsByClassName('lives')[0].innerHTML = "Score:" + score + " Lives: " + this.lives;
    }
    this.updateHitBoxXvalue();
    this.updateHitBoxYvalue();
};

Player.prototype.update = function(dt) {
    //dectect x edges and make sure player stays in bounds:
    if (this.x < 0 || this.x > 400) {
        if (this.x < 0) {
            this.x = 0;
            this.updateHitBoxXvalue();
        } else {
            this.x = 400;
            this.updateHitBoxXvalue();
        }
    }
    //detect y bounds and make sure player stays in bounds:
    if (this.y < 0 || this.y > playerInit_y) {
        if (this.y < 0) {
            console.log("winner");
            score += 200;
            flag = 1;
            this.reset();
        } else {
            this.y =  playerInit_y;

            this.updateHitBoxYvalue();
        }
    }
    this.checkCollisions();

};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //Draw a hitbox on the sprite:
    this.drawBox(this.boxXvalue, this.boxYvalue, this.boxWidth, this.boxHeight, "purple");
};

var Gems = function(x, y) {
    this.x = x;
    this.y = y;
    this.boxWidth = 100;
    this.boxHeight = 100;
    this.hitBox = {
        x: this.x,
        y: this.y,
        width: this.boxWidth,
        height: this.boxHeight
    };
    this.sprite = "images/Gem Blue.png";
    this.sprite = this.makeRandomGem();
};

Gems.prototype.makeHitBox = function() {
    this.hitBox.x = this.x;
    this.hitBox.y = this.y;
};

Gems.prototype.drawHitBoxs = function(x, y, width, height, color) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.stroke();
};

Gems.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    var rectX = this.hitBox.x;
    var rectY = this.hitBox.y + 60;
    var rectWidth = this.boxWidth;
    var rectHeight = this.boxHeight;
    //this.drawHitBoxs(rectX, rectY, rectWidth, rectHeight, "red");
};

Gems.prototype.update = function(dt) {
    this.checkCollisions();
    this.makeHitBox();

    return this.x;
};

//checks to see if player hits gem to collect it
Gems.prototype.checkCollisions = function() {
    var rect1 = player.getBoundingBox();
    var rect2 = this.hitBox;
    //this is the collision check code from the MDN 2d collision check:
    if (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y) {
        // collision detected!
        console.log('collected');
        this.reset();
    }
};

Player.prototype.getBoundingBox = function() {
    var box = {
        x: this.boxXvalue,
        y: this.boxYvalue,
        width: this.boxWidth,
        height: this.boxHeight
    };
    return box;
};

Gems.prototype.reset = function() {
    score += 50;
    console.log("SCORE:" + score);
    document.getElementsByClassName('lives')[0].innerHTML = "Score:" + score + " Lives: " + player.lives;
    this.x = -500;
    this.makeHitBox();
};

Gems.prototype.randomGemsOnWin = function() {
    this.x = Math.floor((Math.random() * 450) + 10);
};


//randomizes image chosen for gem
Gems.prototype.makeRandomGem = function() {
    var gemSprites = ["images/Gem Green.png", "images/Gem Orange.png", "images/Gem Blue.png", "images/Key.png", "images/Star.png", "images/Heart.png"];

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };
    var index = getRandomInt(0, gemSprites.length - 1);
    //this.sprite = gemSprites[index];
    return gemSprites[index];
};

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player - home square is 200, 410
var player = new Player(playerInit_x, playerInit_y);
var allEnemies = [];



// enemy start positions
var enemyRow1 = new Enemy(200, 60);
var enemyRow2 = new Enemy(50, 145);
var enemyRow3_1 = new Enemy(100, 225);
// var enemyRow3_2 = new Enemy(300, 225);
var enemyRow4 = new Enemy(0, 310);
allEnemies.push(enemyRow1, enemyRow2, enemyRow3_1, enemyRow4);

var allGems = [new Gems(175, 140), new Gems(10, 75), new Gems(420, 220)];

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



// Attributions:
// https://github.com/vickyvishal/Classic-Arcade/tree/master#classic-arcade
// Udacity FEND discussion forum
