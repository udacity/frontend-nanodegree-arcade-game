// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    //Agregar Comentario
    this.sprite = "images/enemy-bug.png";
    this.x = x;
    this.y = y;
    this.dt = 10.0;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if(this.x >= 500){
        this.x = -100;
        this.dt = Math.floor((Math.random() * 10) + 1);
        //this.dt = Math.random()*100;
        //allEnemies.push(enemy);
    }
    //this.dt = Math.floor((Math.random() * 10) + 1);
    this.x += this.dt;
    player.restart(this.x, this.y);
    player.render();
    //this.render();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y){
    this.sprite = "images/char-boy.png";
    this.x = x;
    this.y = y;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

Player.prototype.restart = function(posX, posY) {
    if((this.x >= posX-50&& this.x <= posX+50)&&(this.y >=  posY-50 && this.y  <= posY+50)){
        this.x = 200;
        this.y = 400;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player\


var player = new Player(200,400);
var allEnemies = new Array();
var numEnemies = 3;
//var numEnemies = Math.random()*maxEnemies;

//console.log(enemy.x);
//enemy.update(100);
//enemy.render();

for(var i=0; i<numEnemies; i++){
    var enemy = new Enemy(-100,100*i,Math.floor((Math.random() * 10) + 1));
    //enemy.update(Math.random()*100*i);
    allEnemies.push(enemy);
    //console.log("for");
    //enemy.render();
}

Player.prototype.handleInput = function(k) {
    switch(k) {
    case 'left':
        if(this.x > 0){
            this.x -= 100;
        }
        break;
    case 'up':
        if(this.y > 0){
            this.y -=100;
        }
        break;
    case 'right':
        if(this.x < 400){
            this.x += 100;
        }
        break;
    case 'down':
        if(this.y < 400){
            this.y += 100;
        }
        break;
}
    player.render();
};



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
