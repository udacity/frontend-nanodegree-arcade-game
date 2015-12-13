'use strict';

// GLOBAL VARIABLES
var CANVAS_WIDTH = 505;
var CANVAS_HEIGHT = 606;
var STARTING_ENEMIES = 4;
var DEFAULT_CHARACTER = 2;
var LEVEL_UP_DELAY = 1000;
var LEVEL_UP_MESSAGE = 'Level Up!';
var GAME_OVER_MESSAGE = 'Game Over';
// Declaring player here globally as init from Intro.handleInput method
var player, allEnemies;

// Character select screen
var Intro = function() {
    this.characters = [
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-boy.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png'
    ];
    this.selector = 'images/Selector.png';
    this.selected = DEFAULT_CHARACTER;
    this.ready = false;
};

// Draw 5 characters and selector image
Intro.prototype.render = function() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.font = '36px monospace';
    ctx.textAlign = 'center';
    ctx.globalAlpha = 0.5;
    ctx.drawImage(Resources.get('images/enemy-bug.png'), 292, -5);
    ctx.globalAlpha = 1;
    ctx.fillText('Ladybugger', CANVAS_WIDTH / 2, 110);
    ctx.font = '18px monospace';
    ctx.fillText('[<] select your hero [>]', CANVAS_WIDTH / 2, 300);
    ctx.font = '14px monospace';
    ctx.fillText('hit [space] to start', CANVAS_WIDTH / 2, 550);
    ctx.textAlign = 'left';

    this.characters.forEach(function(char,i) {
        ctx.drawImage(Resources.get(char), 101 * i, 300);
    });
    ctx.drawImage(Resources.get(this.selector), 101 * this.selected, 360);
};

// Manage various dialogues and score displays for game
var Status = function() {
    this.level = 1;
    this.gameOver = false;
    this.levelUp = false;
};

Status.prototype.scoreBoard = function() {
    ctx.font = 'normal 24px monospace';
    // Clear transparent background - text doesn't like it, blurs a lot
    ctx.clearRect(0, 0, CANVAS_WIDTH, 50);
    ctx.fillText('Level: ' + this.level, 25, 40);
    ctx.fillText('Enemies: ' + allEnemies.length, 200, 40);
};

Status.prototype.message = function(message,again) {
    ctx.fillStyle = 'black';
    ctx.font = '36px monospace';
    ctx.textAlign = 'center';
    ctx.globalAlpha = 0.7;
    ctx.fillRect(101, 200, 303, 150);
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'white';
    ctx.fillText(message, CANVAS_WIDTH / 2, 275);
    if(again) {
        ctx.font = '16px monospace';
        ctx.fillText('press [space] to play again', CANVAS_WIDTH / 2, 325);
    }
    ctx.textAlign = 'left';
    ctx.fillStyle = 'black';
};

Status.prototype.nextLevel = function() {
    this.message(LEVEL_UP_MESSAGE);
    setTimeout(function() {
        this.levelUp = false;
        // Add an enemy because we're sadistic :D
        allEnemies.push(new Enemy());
        // Reposition player
        player.init(202.5, 300);
        // Start the game loop again
        main();
        // Bind this to setTimeout otherwise this.levelUp becomes window scope
    }.bind(this),LEVEL_UP_DELAY);
};


Status.prototype.render = function() {
    this.scoreBoard();

    if(this.gameOver) {
        this.message(GAME_OVER_MESSAGE,true);
    }
    // Display the level up dialogue between levels
    if(this.levelUp) {
        this.nextLevel();
    }
};

// Trying my hand at inheritance
var Entity = function() {
    this.x = 0;
    this.y = 0;
};

Entity.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
function Enemy() {
    this.sprite = 'images/enemy-bug.png';
    this.init();
}

Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

// Initialize enemy location and speed
Enemy.prototype.init = function() {
    this.x = -100;
    this.y = 51 + (83 * Math.floor(Math.random() * (4 - 1)));
    this.speed = 50 * (Math.floor(Math.random() * (6 - 1)) + 1);
};

Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    // If enemy left screen re-spawn
    if (this.x > CANVAS_WIDTH) {
        this.init();
    }
};

// There goes my (inherited) hero...
function Player(character) {
    this.sprite = character;
    this.init(202.5, 300);
}

Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

Player.prototype.init = function(x,y) {
    this.x = x;
    this.y = y;
};

Player.prototype.update = function() {
    // When player reaches water level up
    if(this.y === -32 && gameStatus.levelUp === false) {
        // Flag to display level up message
        gameStatus.levelUp = true;
        gameStatus.level++;
    }
};

Player.prototype.move = function(x,y) {
    // Keep player in bounds
    if((this.x+x >= 0 && this.y+y >= -32) && (this.x+x <= 404.5 && this.y+y <= 383)) {
        this.x += x;
        this.y += y;
    }
};

// This probably should be renamed to be more of a game.handleInput method...
Player.prototype.handleInput = function(key) {
    if (key === 'left') {
        this.move(-101, 0);
    }
    if (key === 'right') {
        this.move(101, 0);
    }
    if (key === 'up') {
        this.move(0, -83);
    }
    if (key === 'down') {
        this.move(0, 83);
    }
};

// This restarts game after game over screen
Status.prototype.handleInput = function(key) {
    if (key === 'space') {
        this.gameOver = false;
        initEnemies(STARTING_ENEMIES);
        this.level = 1;
        player.init(202.5,300);
        main();
    }
};

Intro.prototype.handleInput = function(key) {
    // Our character select screen
    if (key === 'left' && this.selected > 0) {
        this.selected--;
    }
    if (key === 'right' && this.selected <4) {
        this.selected++;
    }
    if (key === 'space') {
        this.ready = true;
        // Initialize player here once character selected
        player = new Player(this.characters[this.selected]);
        startGame();
    }
    // Render on keyup rather than frames for intro
    this.render();
};

function initEnemies(num) {
    allEnemies = [];
    for (var k = 0; k < num; k++) {
        allEnemies.push(new Enemy());
    }
}

// Initialize our objects
var intro = new Intro();
initEnemies(STARTING_ENEMIES);
var gameStatus = new Status();


// Keyup listener
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space'
    };

    // Decide which input handler to call
    if (!intro.ready) {
        intro.handleInput(allowedKeys[e.keyCode]);
    } else if (gameStatus.gameOver) {
        gameStatus.handleInput(allowedKeys[e.keyCode]);
    } else {
        player.handleInput(allowedKeys[e.keyCode]);
    }

});