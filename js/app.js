function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
var Map = {
    rowHeight: 83,
    colWidth: 101,
    offsetY: 41
};
// Enemies our player must avoid
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.setStartCol();
    this.generateRow();
    this.generateSpeed();
};

Enemy.prototype.generateRow = function() {
    this.y = getRandomInt(1, 3) * Map.rowHeight - Map.offsetY;
};
Enemy.prototype.setStartCol = function() {
    this.x = 0 - Map.colWidth;
};
Enemy.prototype.generateSpeed = function() {
    this.speed = getRandomInt(1,4);
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x >= Map.colWidth*5) {
            this.generateRow();
            this.generateSpeed();
            this.setStartCol();
        } else {
            this.x += Map.colWidth * dt * this.speed;
        }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
    this.sprite = 'images/char-horn-girl.png';
    this.x = Map.colWidth * 2;
    this.y = Map.rowHeight * 5 - Map.offsetY;
};
Player.prototype.reset =function(){
    this.y = Map.rowHeight * 5 - this.offsetY;
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.update = function() {
};
Player.prototype.handleInput = function(direction) {
    switch(direction) {
        case 'left':
            if (this.x > 0) {           //not on first coll
                this.x -= Map.colWidth;
            }
            break;
        case 'right':
            if (this.x < Map.colWidth * 4) {  //not on last col
                this.x += Map.colWidth;
            }
            break;
        case 'up':
            if (this.y > Map.rowHeight - Map.offsetY) {      //under the bridge
                this.y -= Map.rowHeight;
            }
            break;
        case 'down':
            if (this.y < Map.rowHeight * 5 - Map.offsetY) {        //last row
                this.y += Map.rowHeight;
            }
        }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



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
var player = new Player();
var allEnemies = [];
var createEnemies = setInterval(function(){
    allEnemies.push(new Enemy);
    if (allEnemies.length > 1 ) {
        clearInterval(createEnemies);
    }
}, 400);
