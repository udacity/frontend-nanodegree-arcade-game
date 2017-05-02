//Define global variables
var row = 1;
var xTile = 101;
var yTile = 83;
var playerStartXPos = 202;
var playerStartYPos = 392;

/* Create Main Menu for player selection
 * This screen will show up in the beginning, and every time the player losses.
 */
var Menu = function(){
    this.message= [
        "Welcome to Frogger!",
        "Select your Character to continue"
    ];
    this.selected = false;
    this.x = 130;
    this.y = 200
};
//Render the player select menu
Menu.prototype.render = function (){

    ctx.fillStyle = "#f5f5dc";
    ctx.fillRect(10,100,485,300);
    ctx.fillStyle = "red";
    ctx.font = "30pt Arial";
    ctx.fillText(this.message[0],60, 150);
    ctx.font = "12pt Arial";
    ctx.fillText(this.message[1],120, 180);
    ctx.fillStyle = "black";

    ctx.drawImage(Resources.get("images/Selector.png"), this.x, this.y);
    ctx.drawImage(Resources.get("images/char-boy.png"), 130, 200);
    ctx.drawImage(Resources.get("images/char-pink-girl.png"), 280, 200);
};

//update the value of the selector
Menu.prototype.update = function (x){
    if(x !== undefined){
        this.x = x;
    }
};
//change message and set selected to false once player loses all lives
Menu.prototype.lose = function(){
   this.message[0] =" You Lose, Try Again!";
   this.selected = false;
};
//handles the left and right between selection (including staying in bounds)
Menu.prototype.handleInput = function (keyCode) {

    if(keyCode === "left" && this.x === 280){
        this.update(this.x-150);
    }
    else if(keyCode === "right" && this.x ===130){
        this.update(this.x+150);
    }
    else if(keyCode === "enter"){
        if(this.x === 130){
            player.sprite = "images/char-boy.png";
        }
        else{
            player.sprite = "images/char-pink-girl.png";
        }
        this.clear();
        this.selected = true;
    }
};
//clear the menu to play the game
Menu.prototype.clear = function (){
    ctx.clearRect(0,0,600,600);
};

/* This section is used to create the Lives object.
 * This will display the hearts on the top and removes a heart every time there's a collision.
 * At the moment, the player has no way to obtain extra lives.
 * By default the max number of lives a user has is 5, which is instantiated using
 * the live.reset function.
 */
var Lives = function() {
    this.sprite = 'images/Heart.png';
};
//dynamically render each life on the top left corner
Lives.prototype.render = function() {
    for (var i = 0; i < this.numLives; i++) {
        var space = i * 40;
        ctx.drawImage(Resources.get(this.sprite), space, 0, 35, 50);
    }
};
//clear a life
Lives.prototype.remove = function() {
    ctx.clearRect(0, 0, 300, 50);
    this.numLives -= 1;
};
//check if the player has 0 lives left
Lives.prototype.lose = function() {
    return this.numLives === 0;
};
//reset lives to default 5
Lives.prototype.reset = function() {
    this.numLives = 5;
};


/* This section is used to create the Score object.
 * Every time the player wins, he is awarded 500 points.
 * Upon losing, if the player created the top score, it is displayed
 * and the players score is reset.
 */
var Score = function() {
    this.score = 0;
    this.topScore = 0;
};
// render score and top score on the top right corner
Score.prototype.render = function() {
    ctx.font = "18px Arial";
    ctx.fillText("TOP SCORE: " + this.topScore, 320, 20);
    ctx.fillText("SCORE: " + this.score, 320, 45);

};
//increase counter by 500 when player wins
Score.prototype.win = function() {
    this.clear();
    this.score += 500;
};
//reset the values and store TOP score upon losing.
Score.prototype.reset = function() {
    if (this.score > this.topScore) {
        this.topScore = this.score;
        this.score = 0;
        this.clear();
    }
};
// helper method to clear the score
Score.prototype.clear = function() {
    ctx.clearRect(320, 0, 606, 50);
};


/* This section is used to define the Enemy object with all
 * its prototype functions. The speed of the enemy is defined upon
 * creating the object and takes as a parameter an integer scaling from 1-4.
 */
var Enemy = function(speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = this.setXPos(-101);
    this.y = this.setYPos();
    this.speed = speed;
};

Enemy.prototype.update = function(dt) {
    //check if bug is outside boundaries and reset else update position
    if (this.x > 505) {
        this.x = this.setXPos(this.x);
    } else {
        this.x += Math.round(100 * this.speed * dt);
    }
    //if collision is detected, remove life and reset players position
    if (this.collision()) {
        lives.remove();
        player.reset();
    }
};
//Collision detection using bounding box algorithm
Enemy.prototype.collision = function() {
    if (player.x <= this.x + 80 && player.x >= this.x - 70 &&
        player.y === this.y) {
        return true;
    }
};
// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// used for setting the Enemy's initial row (y) (round robbin)
Enemy.prototype.setYPos = function() {

    if (row === 1) {
        row++;
        return 60;
    } else if (row === 2) {
        row++;
        return 143;
    } else if (row === 3) {
        row = 1;
        return 226;
    }

};
//used for setting x initial position, and resetting x pos every time enemy goes off canvas
Enemy.prototype.setXPos = function(x) {
    return Math.floor(Math.random() * (-303)) - x;
};

/* This section is used to define the Player object with all
 * its prototype functions.
 */
var Player = function() {
    this.sprite = '';
};
//render player on canvas
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//set values of x/y to reset players position upon winning/losing
Player.prototype.reset = function() {
    this.x = playerStartXPos;
    this.y = playerStartYPos;
};
//update players position
Player.prototype.update = function(x, y) {

    //check if x,y has a value (key has been pressed)
    if (x !== undefined && y !== undefined) {

        //Check that the value is in bounds
        if (this.checkBounds(x, y) === true) {

            //assign new position
            this.x += x;
            this.y += y;

            //check if he's on the blue to win
            if (this.y === -23) {
                score.win();
                this.reset();
            }
        }
    }
};
//Check if key pressed will cause player to go offscreen
Player.prototype.checkBounds = function(x, y) {
    //return value if user is in/out of bounds
    return this.x + x >= 0 && this.x + x < 505 && this.y + y >= -23 && this.y + y <= 392;
};
//Translate key pressed to tile movement and pass the value to update method before rendering
Player.prototype.handleInput = function(keyCode) {

    if (keyCode === "left") {
        this.update(-xTile, 0);
    } else if (keyCode === "up") {
        this.update(0, -yTile);
    } else if (keyCode === "down") {
        this.update(0, yTile);
    } else if (keyCode === "right") {
        this.update(xTile, 0);
    }
};
// Instantiating player, and allEnemeis for rendering.
var menu = new Menu();
var lives = new Lives();
var score = new Score();
var player = new Player();
var allEnemies = [new Enemy(1.5), new Enemy(2), new Enemy(2.8), new Enemy(2), new Enemy(3), new Enemy(2.5)];

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        13: "enter",
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    if(menu.selected) {
        player.handleInput(allowedKeys[e.keyCode]);
    }
    else{
        menu.handleInput(allowedKeys[e.keyCode]);
    }
});