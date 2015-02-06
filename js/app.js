var PVector = function(x, y) {
    this.x = x;
    this.y = y;
}

var Grid = function(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.position = new Array();
    //cols * 101, row * 83

    for (var i = 0; i < rows; i++) {
        this.position[i] = new Array();
        for (var j = 0; j < cols; j++) {
            this.position[i][j] = new PVector(i * 101, j * 83);
        }
    }
}

//Superclass Entity wich will be common in Enemy and PLayer
var Entity = function(position, sprite) {
    this.position = position;
    this.sprite = sprite;
}

// Draw the enemy on the screen, required method for game
Entity.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.position.x, this.position.y);
}

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    //Calling Entity class
    this.speed = speed;
    Entity.call(this, x, y, 'images/enemy-bug.png')
}
Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x;
    this.y;
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(position, grid) {
    this.grid = grid;
    this.gridPosition = new PVector(position.x, position.y);
    Entity.call(this, position, 'images/char-boy.png')
}
Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;
Player.prototype.handleInput = function(key) {
    console.log(key);
    switch(key){
        case 'right':
        this.gridPosition.x++;

        break;
        case 'left':
        this.gridPosition.x--;
        break;

        case 'up':
        this.gridPosition.y--;
        break;

        case 'down':
        this.gridPosition.y++;
        break;
    }

    this.position = this.grid.position[this.gridPosition.x][this.gridPosition.y];
}

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x;
    this.y;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var grid = new Grid(5, 6);
var allEnemies = [];
var player = new Player(new PVector(0, 0), grid);

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
