// Enemies our player must avoid
var Enemy = function(X, Y, P) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    //nere aldaketak
    this.x = X * 101;
    this.y = (Y * 83) - (83 / 3);
    this.speed = P;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //nere aldaketak
    if ((this.x + dt * this.speed) < 505) {
        this.x += dt * this.speed;
    } else {
        this.x = -101;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(X, Y) {
    //nere aldaketak

    this.x = X * 101;
    this.y = (Y * 83) - (83 / 3);
    this.score = 0;
    this.lifes = 5;
    
    // The image/sprite for our players
    this.sprite = 'images/char-boy.png';
}

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function() {
    // check if there is any enemy
    var collision = checkCollision(this.x, this.y, allEnemies);
    if (collision) {
        restartPlayer(this);
    }
}


// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    // Draw score
/*    ctx.fillStyle = 'black';
    ctx.font = "36px Arial";
    ctx.textAlign = "left";
    ctx.fillText("HI-SCORE: " + player.score, 0, 40);
    ctx.textAlign = "right";
    ctx.fillText("Lifes: " + player.lifes, 505, 40);

    ctx.fillStyle = "blue";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Monsterrs caught: " + this.lifes, 32, 32);*/
    updateScore(this);
}

// Function for updating score
function updateScore(obj) {
    //white background, otherwise overwritten
    ctx.fillStyle= 'white';
    ctx.fillRect(0, 0, 505, 45);
    ctx.fillStyle = 'black';
    ctx.font = "36px Arial";
    ctx.textAlign = "left";

    var gradient=ctx.createLinearGradient(0,0,505,0);
    gradient.addColorStop("0","magenta");
    gradient.addColorStop("0.5","blue");
    gradient.addColorStop("1.0","red");
    ctx.fillStyle=gradient;

    ctx.fillText("SCORE: " + player.score, 0, 40);
    ctx.textAlign = "right";
    ctx.fillText("Lifes: " + player.lifes, 505, 40);
}

Player.prototype.handleInput = function(key) {
    
    switch (key) {
    case 'left':
        if ((this.x - 101) >= 0) {
            this.x -= 101;
        }
        break;
    case 'right':
        if ((this.x + 101) < 505) {
            this.x += 101;
        }
        break;
    case 'up':
        if ((this.y - 83) > 0) {
            this.y -= 83;
        }
        else {
            this.y = (5 * 83) - (83 / 3);
            this.score += 100;
            console.log("Score " + this.score);
        }
        break;
    case 'down':
        console.log(this.y);
        if ((this.y + 83) < (5 * 83)) {
            this.y += 83;
        }
        break;
    default:
    }

    /** if ((this.x + dt * this.speed) < 505) {
        this.x = this.x + dt * this.speed;
    } else {
        this.x = -101;
    } **/
}

function checkCollision (X, Y, arrayObjs) {
    for (obj in arrayObjs) {
        var objX = (arrayObjs[obj].x / 101).toFixed(0);
        var objY = (arrayObjs[obj].y / 83).toFixed(0);
        //to check the collision, first I checked in which square is my player and if one of the enemy is there or al least entering there

        if ((objX == (X / 101).toFixed(0)) && (objY == (Y / 83).toFixed(0))) {
            //collision
            console.log("collision");
            return true;
            
        }
        
    }
    return false;
}

function restartPlayer(obj) {
    obj.x = 2 * 101;
    obj.y = (5 * 83) - (83 / 3);
    obj.lifes -= 1;
    obj.score = 0;
    if (obj.lifes <= 0) {
        //finish gabe, stop engine    
    }
}

var GemBlue = function() {
    this.x = 0;
    this.y = 0;
    this.visible = false;
    this.nextAppearance = 5;
    this.sprite = 'images/Gem Blue.png';
}


GemBlue.prototype.newPosition = function() {
    this.x = getRandomInt(0,4) * 101;
    this.y = (getRandomInt(1,3) * 83) - (83 / 3);
}

GemBlue.prototype.newTime = function() {
    this.nextAppearance = Date.now() + 30000 + (30000 * Math.random());
}

GemBlue.prototype.update = function() {
    console.log("Gem blue " + this.visible);
    console.log("time next appearance: " + this.nextAppearance + ", now Time: " + Date.now());
    if (!this.visible && (Date.now() > this.nextAppearance)) {
        this.visible = true;
    }

    if (this.visible) {
        //check if there is any blue gem
        collision = checkCollision(player.x, player.y, [this]);
        if (collision) {
            player.score += 25;
            this.visible = false;
            this.newTime();
            this.newPosition();
        }
    }
}

GemBlue.prototype.render = function() {
    if (this.visible) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * ((max - min) + 1)) + min;
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
//var enemy = new Enemy (1, 2, 20);
var player = new Player(2, 5);
var allEnemies = [];
for (var row = 1; row < 4; row++) {
    var numberEnemies = 5 - row;
    for (var i = 1; i < numberEnemies; i++) {
        allEnemies.push(new Enemy(numberEnemies - row, row, numberEnemies * row * 11))
    }
}
var gemblue = new GemBlue();
gemblue.newPosition();
gemblue.newTime();
console.log("Test beginning: " + gemblue.x);
console.log(gemblue.nextAppearance);

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
