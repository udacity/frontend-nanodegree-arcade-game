//Define global variables
var row = 1;
var xTile  =  101;
var yTile = 83;
var playerStartXPos = 202;
var playerStartYPos = 392;

/* This section is used to create the Lives object.
 * This will display the hearts on the top and removes a heart every time there's a collision.
 * At the moment, the player has no way to obtain extra lives.
 */
var Lives = function(){

    this.sprite = 'images/Heart.png';
    this.numLives = 5;
}
//render lives
Lives.prototype.render = function () {
    //dynamically render lives with 40px space between them.
    for(var i = 0; i < this.numLives; i++ ) {
        var space = i * 40;
        ctx.drawImage(Resources.get(this.sprite), 0 + space, 0, 35, 50);
    }
};
Lives.prototype.remove = function () {
    ctx.clearRect(0,0,300,50);
    this.numLives -= 1;
};
//TODO: Make an update for lives load on each engine. if loose, reset.

var Score = function () {
    this.score = 0;
};
Score.prototype.render = function(){
    ctx.font = "25px Arial";
    ctx.fillText("SCORE: " + this.score, 325,35);
};
Score.prototype.win = function(){
    ctx.clearRect(325,0,606,50);
    this.score += 500
}

/* This section is used to define the Enemy object with all
 * its prototype functions. The speed of the enemy is defined upon
 * creating the object and takes as a parameter an integer scaling from 1-4.
 */
var Enemy = function(speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x =  this.setXPos(-101);
    this.y =  this.setYPos();
    this.speed = speed;
    //Assign row randomly.
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x >505){
       this.x = this.setXPos(this.x);
    }
    else {
        this.x += Math.round(100 * this.speed * dt);
    }

    if (this.y === player.y && (player.x >= this.x && player.x < (this.x + 75) )) {
        lives.remove();
        console.log("you lose");
        player.reset();
    }
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// instantiate default row to Enemy (round robbin)
Enemy.prototype.setYPos = function () {

    if(row === 1){
        row++;
        return 60;
    }
    else if(row === 2){
        row++;
        return 143;
    }
    else if(row === 3){
        row = 1;
        return 226;
    }


};
//used for setting x initial position, and resetting x pos every time enemy goes off canvas
Enemy.prototype.setXPos = function(x) {
    return Math.floor(Math.random() * (-303)) -101;
};

/* This section is used to define the Player object with all
 * its prototype functions.
 */
var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.x = playerStartXPos;
    this.y = playerStartYPos;

};
//render player on canvas
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//set values of x/y to reset players position upon winning/losing
Player.prototype.reset = function () {
    this.x = playerStartXPos;
    this.y = playerStartYPos;
};
//update players position
Player.prototype.update = function(x,y) {

    //check if x,y has a value (key has been pressed)
    if (x !== undefined && y !== undefined){

          //Check that the value is in bounds
          if (this.checkBounds(x,y) === true) {

              //assign new position
              this.x += x;
              this.y += y;

              //check if he's on the blue to win
              if (this.y === -23) {
                  score.win();
                  console.log("you win");
                  this.reset();
              }
              allEnemies.forEach(function (enemy) {
                  if (enemy.y === player.y && (player.x >= enemy.x - 45 && player.x < (enemy.x + 75) )) {
                      lives.remove();
                      console.log("you lose");
                      player.reset();
                  }
              });
          }
      }
};
//Check if key pressed will cause player to go offscreen
Player.prototype.checkBounds = function (x,y) {

        //return value if user is in/out of bounds
        if(this.x + x >= 0 && this.x +x < 505 && this.y+y >= -23 && this.y+y <= 392 ) {
            return true;
        }
        else{
            return false;
        }
};
//Translate key pressed to tile movement and pass the value to update method before rendering
Player.prototype.handleInput = function (keyCode){

    if(keyCode === "left"){
        this.update(-xTile, 0);
    }
    else if(keyCode === "up"){
        this.update(0, -yTile);
    }
    else if(keyCode === "down"){
        this.update(0, yTile);
    }
    else if(keyCode === "right"){
        this.update(xTile, 0);
    }
};

// Instantiating player, and allEnemeis for rendering.
var lives = new Lives();
var score = new Score();
var player = new Player();
var allEnemies = [new Enemy(1)];

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

