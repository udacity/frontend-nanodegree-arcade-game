// Enemies our player must avoid
var row = 1;

var Enemy = function(speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -202;

    //Assign row randomly.
    if(row === 1){
        this.y = 60;
    }
    else if(row === 2){
        this.y = 143;
    }
    else if(row === 3){
        this.y = 226;
        row = 1;
    }
    row++;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x >505){
        this.x = -202;
    }
    else {
        this.x += Math.round(100 * this.speed * dt);
    }

    if (this.y === player.y && (player.x >= this.x && player.x < (this.x + 75) )) {
        console.log("you lose");
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 392;

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function () {
    this.x = 202;
    this.y = 392;
}

Player.prototype.update = function(x,y) {

    if (x != undefined && y != undefined){
        if(this.x + x >= 0 && this.x +x < 505 && this.y+y >= -23 && this.y+y <= 392 ) {
            this.x += x;
            this.y += y;

            //check if he's on the blue to win
            if( this.y === -23 ){
                console.log("you win");
                this.reset();
            }

            allEnemies.forEach(function(enemy) {
                if (enemy.y === player.y && (player.x >= enemy.x && player.x < (enemy.x + 75) )) {
                    console.log("you lose");
                }
            });
        }
    }
};

Player.prototype.handleInput = function (keyCode){

    if(keyCode === "left"){
        this.update(-101, 0);
    }
    else if(keyCode === "up"){
        this.update(0, -83);
    }
    else if(keyCode === "down"){
        this.update(0, 83);
    }
    else if(keyCode === "right"){
        this.update(101, 0);
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var allEnemies = [new Enemy(1),new Enemy(2), new Enemy(3)];

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
