var UNITX = 100;
var UNITY = 85;
var MAX_X = 500;
var MAX_Y = 450;

var ENEMY_START =  -200;
var ENEMY_POSITIONS= [60, 145, 225];

var PLAYER_STATE = {
    ALIVE: "alive",
    DEAD : "dead",
    WIN  : "win"
};
 
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    var random = Math.floor(Math.random() * (3 - 0) );
    this.x = ENEMY_START * (random + 1);  
    this.y = ENEMY_POSITIONS[random];
};

// speed in which this Enemy will move across the screen
// val should be less than 5 for smooth movement
Enemy.prototype.setSpeed = function(val) {
    if(val < 1) {
        val = 2;
    }
    this.speed = val * 2;
};

// Returns the position of the Enemy in x and y
Enemy.prototype.getPosition = function() {
    return position.call(this);
};

// Determines which row the enemy will appear
Enemy.prototype.row = function(row) {
    if(row < 0 || row> ENEMY_POSITIONS.length) {
        row = 0;
    }

    this.y = ENEMY_POSITIONS[row];
    this.row = row;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // console.log("dt:", dt);
    
    this.x += this.speed;
    if(this.x > MAX_X) {
        var random = Math.floor(Math.random() * (3 - 0));
        
        this.x = ENEMY_START * (random + 1);      
        this.y = ENEMY_POSITIONS[random];
        this.setSpeed(random/2);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.numLife = 3;
    this.pause = false;
    this.reset();
};

Player.prototype.paused = function() {
    return this.pause;
};

// Returns the position of the Player in x and y
Player.prototype.getPosition = function() {
    return position.call(this);
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 380;
    this.state = PLAYER_STATE.ALIVE;
};

Player.prototype.reposition = function(timer) {
    if(typeof timer !== 'number') {
        timer =500;
    }

    window.setTimeout(function(){
                    this.reset();
                    this.render();
                }.bind(this), timer);   
}

Player.prototype.getNumLeft = function() {
    return this.numLife;
};

Player.prototype.getState = function () {
    return this.state? this.state : true;
};

Player.prototype.setState = function(val) {
    if(typeof val !== 'string'){
         return;
    }

    var state = val.toLowerCase();

    if(state !== PLAYER_STATE.ALIVE &&
       state !== PLAYER_STATE.DEAD &&
       state !== PLAYER_STATE.WIN) {
        return;
    }

    if(state === PLAYER_STATE.DEAD) {
        this.x += 10;
        this.y -= 10;
        this.numLife--;

        if(this.numLife > 0) {
            // Reset the player with timeer
            this.reposition(600);
        }
    } else if(state === PLAYER_STATE.WIN) {
        this.reposition(2000);
    }

    this.state = state;
};

Player.prototype.update = function(x, y) {  
    if(!x && !y) {
        return;
    }

    if(x === this.x && y === this.y) {
        return;
    }

    this.x = ( x < 0 ) ? 0 : (x < MAX_X ) ? x : this.x;
    this.y = ( y < 0 ) ? -30 : (y <= MAX_Y ) ? y : this.y;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    // Lock the key event unless the Player is alive
    if(this.state != PLAYER_STATE.ALIVE ) {
        return;
    }

    var x = this.x, 
        y = this.y;

    switch(key) {
        case "up":
            y -= UNITY;
            break;
        case "down":
            y += UNITY;
            break;
        case "left":
            x -= UNITX;
            break;
        case "right":
            x += UNITX;
            break;
        default: 
            break;
    }

    this.update(x, y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = initEnemies();

function initEnemies() {
    var numEnemies = 3;
    var enemies = [];

    for(var i = 0; i < numEnemies; i++) {
        var enemy = new Enemy();
        var random = Math.floor(Math.random() * (3 - 0));
        enemy.setSpeed(random);
        enemies.push(enemy);
    }
    return enemies;
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

// This function is used to get the position of each
// Enemy and Player.
function position() {
    return {
        x: this.x,
        y: this.y
    }
}