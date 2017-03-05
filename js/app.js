/**
 * Constants
 */
var CONSTANTS = CONSTANTS || {};
CONSTANTS.CANVAS_WIDTH = 505;
CONSTANTS.CANVAS_HEIGHT = 606;
CONSTANTS.BLOCK_WIDTH = 101;
CONSTANTS.BLOCK_HEIGHT = 83;



/**
 * Rectangle class
 */
var Rectangle = function(x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
};

// Find whether current rectangle touches or overlaps the given rectangle
Rectangle.prototype.doesOverlap = function(rectangle2){
    // if one rec is left of other
    if(this.x + this.width < rectangle2.x || this.x > rectangle2.x + rectangle2.width){
        return false;
    }

    // if one rec is above other
    if(this.y + this.height < rectangle2.y || this.y > rectangle2.y + rectangle2.height){
        return false;
    }

    return true;
};

/**
 * GameCharacter class
 */
var GameCharacter = function(){
    // Each game character to have a unique id. This will handy for debugging purposes.
    this.id = this.getNextInstanceId();
};

// Get the next unique id
GameCharacter.prototype.getNextInstanceId = (function(){
    var _instanceId = 0;
    return function(){
        return ++_instanceId;
    };
})();

// Get bounding rectangle for collision detection purposes
GameCharacter.prototype.getBoundingRectangle = function(){
    // middle 50% in x direction
    // bottom 50% in y direction
    return new Rectangle(
        this.position.x + CONSTANTS.BLOCK_WIDTH/4, 
        this.position.y + CONSTANTS.BLOCK_HEIGHT/2, 
        CONSTANTS.BLOCK_WIDTH/2, 
        CONSTANTS.BLOCK_HEIGHT/2);
};

// Draw the GameCharacter on the screen, required method for game
GameCharacter.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.position.x, this.position.y);
};

/**
 * Enemies our player must avoid
 */
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // Inherit common functionality from GameCharacter pseudo-class
    GameCharacter.call(this);

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Setting the Enemy initial location
    this.resetPosition();

    // Setting the Enemy speed
    this.resetSpeed();
};
Enemy.prototype = Object.create(GameCharacter.prototype);
Enemy.prototype.constructor = Enemy;

// Provides initial value of speed of enemy
Enemy.prototype.resetSpeed = function(){
    this.speed = {
        // Initial speed randomly selected in range of [200, 400) units
        x: 200 + Math.random() * 200,
        y: 0
    };
};

// Provides initial value of position of enemy
// Used in constructor as well as later when enemy is off screen.
Enemy.prototype.resetPosition = function(){
    // step can be 0, 1 or 2 generated at random. Based on this, enemy is placed on one of the three rows.
    var nRows = 3;
    var initialRowChoice = Math.floor(Math.random() * nRows);
    this.position = {
        x: -1 * CONSTANTS.BLOCK_WIDTH, // initial horizontal position one block left of canvas
        y: 55 + CONSTANTS.BLOCK_HEIGHT * initialRowChoice
    };
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Updates the Enemy location
    this.position.x += this.speed.x * dt;

    // If the bug has run past the whole width of canvas, regenerate it from beginning.
    if(this.position.x > CONSTANTS.CANVAS_WIDTH){
        this.resetPosition();
    }
};

/**
 * Now write your own player class.
 * This class requires an update(), render() and
 * a handleInput() method.
 */
var Player = function(){
    // Inherit common functionality from GameCharacter pseudo-class
    GameCharacter.call(this);

    // Default player avatar
    this.sprite = 'images/char-boy.png'; 

    // Setting the player's initial location
    this.speed = {
        x: 0,
        y: 0
    };

    // Setting the player's speed
    this.resetPosition();
};

Player.prototype = Object.create(GameCharacter.prototype);
Player.prototype.constructor = Player;

// Reset the player position
Player.prototype.resetPosition = function(){
    this.position = {
        x: (CONSTANTS.CANVAS_WIDTH - CONSTANTS.BLOCK_WIDTH) / 2,
        y: 55 + CONSTANTS.BLOCK_HEIGHT * 4
    };
};

// Update the player's position, required method for game 
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Updates the Player location
    this.position.x += this.speed.x * dt;
    this.position.y += this.speed.y * dt;
};

Player.prototype.reset = function() {
    this.resetPosition();
}

// handle input to navigate the player
Player.prototype.handleInput = function(moveDirection) {
    var prevPositionX = this.position.x,
        prevPositionY = this.position.y,
        minPositionY = 61,
        maxPositionY = 387,
        minPositionX = 0,
        maxPositionX = 404;
    switch(moveDirection){
        case 'left':
            if(prevPositionX > minPositionX){
                this.position.x = prevPositionX - CONSTANTS.BLOCK_WIDTH;
            }
            break;
        case 'right':
            if(prevPositionX < maxPositionX){
                this.position.x = prevPositionX + CONSTANTS.BLOCK_WIDTH;
            }
            break;
        case 'up':
            if(prevPositionY > minPositionY){
                this.position.y = prevPositionY - CONSTANTS.BLOCK_HEIGHT;
            }else{
                this.reset();
            }
            break;
        case 'down':
            if(prevPositionY < maxPositionY){
                this.position.y = prevPositionY + CONSTANTS.BLOCK_HEIGHT;
            }
            break;
        default:
            // do nothing on other events
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [
    new Enemy(),
    new Enemy(),
    new Enemy()
];
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
