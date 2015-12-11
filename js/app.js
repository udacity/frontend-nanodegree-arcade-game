var Status = function() {
    this.level = 1;
    this.gameOver = false;
    this.levelUp = false;
};

Status.prototype.scoreBoard = function() {
    // Lets keep track of the level...
    level = 'Level: ' + this.level;
    enemies = 'Enemies: ' + allEnemies.length;
    ctx.font = "normal 24px monospace";
    // Clear transparent background - text doesn't like it, blurs a lot
    ctx.clearRect(0,0,505,50);
    ctx.fillText(level,25,40);
    ctx.fillText(enemies,200,40);
};

Status.prototype.message = function(message,again) {
    ctx.fillStyle = "black";
    ctx.font = "36px monospace";
    ctx.textAlign = "center";
    ctx.globalAlpha = 0.7;
    ctx.fillRect(101,200,303,150);
    ctx.globalAlpha = 1;
    ctx.fillStyle = "white";
    ctx.fillText(message,252.5,275);
    if(again) {
        ctx.font = "16px monospace";
        ctx.fillText('press [space] to play again',252.5,325);
    }
    ctx.textAlign = "left";
    ctx.fillStyle = "black";
};

Status.prototype.nextLevel = function() {
    this.message("Level Up!");
    setTimeout(function() {
        gamestatus.levelUp = false;
        // Add an enemy because we're sadistic :D
        allEnemies.push(new Enemy());
        // Reposition player
        player.init(202.5,300);
        // Start the game loop again
        main();
    },3000);

};


Status.prototype.render = function() {
    this.scoreBoard();

    if(this.gameOver) {
        this.message('GAME OVER!',true);
    }
    // Display the level up dialogue between levels
    if(this.levelUp) {
        this.nextLevel();
    }
};

// Enemies our player must avoid
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.init();
};

// Initialize enemy location and speed
Enemy.prototype.init = function() {
    this.x = -100;
    this.y = 51 + (83 * Math.floor(Math.random() * (4-1)));
    this.speed = 50*(Math.floor(Math.random() * (6-1)) + 1);
};

Enemy.prototype.update = function(dt) {
    this.x += this.speed*dt;
    // If enemy left screen re-spawn
    if (this.x > 600) {
        this.init();
    }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// There goes my hero...
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.init(202.5, 300);
};

Player.prototype.init = function(x,y) {
    this.x = x;
    this.y = y;
};

Player.prototype.update = function() {
    // When player reaches water level up
    if(this.y === -32 && gamestatus.levelUp === false) {
        // Flag to display level up message
        gamestatus.levelUp = true;
        gamestatus.level++;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.move = function(x,y) {
    // Keep player in bounds
    if((this.x+x >= 0 && this.y+y >= -32) && (this.x+x <= 404.5 && this.y+y <= 383)) {
        this.x += x;
        this.y += y;
    }
};

Player.prototype.handleInput = function(key) {
    if(!gamestatus.gameOver) {
        if (key === 'left') {
            player.move(-101,0);
        }
        if (key === 'right') {
            player.move(101,0);
        }
        if (key === 'up') {
            player.move(0,-83);
        }
        if (key === 'down') {
            player.move(0,83);
        }
    } else {
        // When game is over reset player and enemies
        if (key === 'space') {
            gamestatus.gameOver = false;
            allEnemies = [new Enemy(),new Enemy(),new Enemy(),new Enemy()];
            gamestatus.level = 1;
            player.init(202.5,300);
            main();
        }
    }

};

// Initialize our objects
var allEnemies = [new Enemy(),new Enemy(),new Enemy(),new Enemy()];
var player = new Player();
var gamestatus = new Status();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});