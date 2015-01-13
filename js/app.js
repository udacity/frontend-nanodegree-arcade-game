// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // initialize position instance variables
    this.x = x;
    this.y = y;

    
    

}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.ResetCollide = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x>500) {
        this.x= -125;
    }



    this.checkCollision(this, player);
}
Enemy.prototype.update = function(dt) {
    this.ResetCollide(dt);

    //move standard enemy pieces (bigEnemy pieces move slower, have 
    // personal move method
    var dist = 300 * dt;
    this.x+=dist

    //define corners of sprite for collision detection
    this.leftside = this.x;
    this.bottomside = this.y + 70;
    this.rightside = this.x +85;
    this.topside = this.y;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
}


var bigEnemy = function (x, y) {
    Enemy.call(this, x, y);
    this.sprite = 'images/bigEnemy.png'
}

bigEnemy.prototype = Object.create(Enemy.prototype);
bigEnemy.prototype.constructor = bigEnemy;
bigEnemy.prototype.update = function (dt) {
    this.ResetCollide(dt);

    var dist = 150 * dt;
    this.x += dist

    this.leftside = this.x;
    this.bottomside = this.y + 90;
    this.rightside = this.x +170;
    this.topside = this.y;
}


bigEnemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);


}


// Collision code for entities in the game. Idea taken from the 
// physics and canvas lessons in the HTML5 game dev course.
// The following is a function to determine if the two entities are intersecting
// by returning a boolean that is false (no collision) if there is
// evidence that they are not overlapping (i.e. a left side on one entity that has a 
// higher xvalue than the right side of the other entity. There is no possible way for
// two rectangles to intersect under this condition, thus we return false).
Enemy.prototype.checkCollision = function (enemy, player) {
    if (this.isOverlapping(enemy, player)) {
        player.resetPosition();
        player.lives -= 1;
    }
}

Enemy.prototype.isOverlapping = function(enemy, player) {
    return !(player.rightside < enemy.leftside ||
            player.leftside > enemy.rightside ||
            player.topside > enemy.bottomside ||
            player.bottomside < enemy.topside);
}



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {

    //image to be uploaded representing the player
    this.sprite = 'images/char-boy.png';

    //init position instance variables

    this.x = 200;
    this.y = 400;

    this.lives = 6;

}



Player.prototype.update = function(dt) {

    //define corners of sprite for collision
    this.leftside = this.x;
    this.bottomside =this.y+80
    this.rightside = this.x+70
    this.topside = this.y
}

Player.prototype.resetPosition = function() {
    this.x = 200;
    this.y = 400;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    

    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("lives: " + this.lives, 400, 90)
}

Player.prototype.handleInput = function(key) {
    if (key === 'left'){
        if (this.x>50) {
            this.x -= 101;
        } 
    }
    if (key === 'up'){
        if (this.y>100){
            this.y -=83;
        } else {
            this.resetPosition();
        }
    }
    if (key === 'right') {
        if (this.x <350) {
            this.x += 101;
        }
    }
    if (key === 'down'){
        if (this.y < 400) {
            this.y +=83;
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [
    new Enemy(0, 65),
    new Enemy(50,145),
    new bigEnemy(100, 305)
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


