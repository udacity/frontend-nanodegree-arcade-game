    // Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.init();

}


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += dt*this.speed;
    if (this.x > 505) {
        this.init();
}
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
}
Enemy.prototype.init = function(){
    this.x = getRandomInt(-250, -100);
    this.y = lines[randomLineIndex()];
    this.speed = getRandomInt(100, 250)
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var randomLineIndex = function(){
    return  Math.round(Math.random()*3 -0.5);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprites = ['images/char-cat-girl.png',
                    'images/char-horn-girl.png',
                    'images/char-pink-girl.png',
                    'images/char-princess-girl.png',
                    'images/char-boy.png'] ;
    this.reset();
    this.score = 0;
    this.level = 1;
    this.ind = 0;
    this.life = -1;

}
Player.prototype.renderScoreLine = function(){
    ctx.font = '400 24pt Nunito';
    ctx.clearRect(0,0, 500,40)
    ctx.fillText("Level: " + this.level, 20, 40);
    ctx.fillText("Score: " + this.score, 170, 40);
        for (i = 0; i<this.life; i++)
            ctx.drawImage(Resources.get("images/Heart.png"), 350+i*30, 0, 30, 50);
}
Player.prototype.update = function(dt) {
    this.checkCollisions(dt);

}

Player.prototype.reset = function() {
    this.x = 202;
    this.y = 407;
}
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprites[this.ind]), this.x, this.y);
    this.renderScoreLine();
    this.Start();

}

Player.prototype.next = function(){
    this.ind += 1;
    this.reset();
    this.score += 50;
        if (this.ind >= 5){
        this.ind = 0;
        this.level += 1;
        allEnemies.push( new Enemy());
        this.score += 100;

        //this.renderScoreLine();
    }
}
//check for Player/bug collisions
Player.prototype.checkCollisions = function(dt){
    for(var i in allEnemies) {
        if( Math.abs(this.x - allEnemies[i].x) <= 40
         && Math.abs(this.y - allEnemies[i].y) <= 40){
        this.reset();
        this.life-=1;
        }
    }

    if( Math.abs(this.x - gem.x) <= 40 && Math.abs(this.y - gem.y) <= 40) {
        this.score = this.score + 20;
        //this.renderScoreLine();
        gem.init();
    }

    if (this.y <= 10) {
        this.next();
    }
    if( Math.abs(this.x - heart.x) <= 40 && Math.abs(this.y - heart.y) <= 40) {

        heart.init();
        heart.x = -100;
        heart.y = -100;


        if (this.life < 5){
            this.life +=1;
        }
    }
}

Player.prototype.handleInput = function(direction){
    if (this.life <=0 ) {
        if(direction == "space") {
           this.restart();

        }
        return;
    }
    if (direction == 'left' && this.x > 0)
        this.x = this.x - 101;
    if (direction == 'right' && this.x < 404)
        this.x = this.x + 101;
    if (direction == 'up' && this.y >0 )
        this.y = this.y - 83;
    if (direction == 'down' && this.y < 407)
        this.y = this.y + 83;

}
Player.prototype.restart = function(){
            this.life = 5;
            this.score = 0;
            this.level = 1;
            this.ind = 0;
            heart.timePassed = 0;  
            while( allEnemies.length > 5){
                allEnemies.pop();
            }
    
}
Player.prototype.Start = function(){
    if (this.life == -1){
               ctx.save();
               ctx.font = '800 16pt Nunito';
               ctx.clearRect(50,90, 400, 450);
               ctx.fillStyle = "black";
               ctx.fillText("WELCOME", 180, 140);
               ctx.fillText("The road is very dangerous.", 80, 180);
               ctx.fillText("Your goal is to cross the road.", 80, 220);
               ctx.fillText("If the player has a collision with a bug,", 80, 260);
               ctx.fillText("you lose one life. When you've crossed", 80, 300);
               ctx.fillText("the road as each of the 5 players, ", 80, 340);
               ctx.fillText("you will go to next level. You can", 80, 380);
               ctx.fillText("pick up Gems. It gives you extra points.", 80, 420);
               ctx.fillStyle = "red";
               ctx.font = '800 24pt Nunito';
               ctx.fillText("Press Space to start game", 80, 500);
               ctx.restore()
               }
    if (this.life == 0){
            ctx.save();
            ctx.font = "800 60pt Nunito";
            ctx.fillStyle = "red";
            ctx.strokeStyle = "black";
            ctx.lineWidth = 3;
            ctx.fillText("Game Over", 50, 250)
            ctx.strokeText("Game Over", 50, 250);
            ctx.font = "800 35pt Nunito";
            ctx.fillText("Press Space to restart", 50, 400);
            ctx.strokeText("Press Space to restart ", 50, 400);
            ctx.restore();
            }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var lines = [65, 148, 231];
var allEnemies = [];
for (var i = 0; i < 5; i++) {
allEnemies.push( new Enemy());
}
var player = new Player();

var Gem = function(){
    this.sprites = ['images/Gem Blue.png', 'images/Gem Green.png', 'images/Gem Orange.png'];
    this.init();
}
Gem.prototype.render = function() {
    if(player.life > 0){
    ctx.drawImage(Resources.get(this.sprites[this.ind]), this.x, this.y, 90, 150);}
}
Gem.prototype.update = function(dt) {}
Gem.prototype.init = function(){
    this.x = getRandomInt(0, 5) * 101;
    this.y = lines[randomLineIndex()];
    this.ind = getRandomInt(0, 3)
}
var gem = new Gem();

var Heart = function(){
    this.sprites = 'images/Heart.png';
    this.x = -100;
    this.y = -100;
    this.timePassed = 0;
}
Heart.prototype.render = function() {
    if(player.life > 0){
    ctx.drawImage(Resources.get(this.sprites), this.x, this.y+25, 90, 150);}
}
Heart.prototype.update = function(dt) {
    var tmp = this.timePassed;
    this.timePassed +=dt;
    if (this.timePassed >= 20 
        && tmp < 20){
        this.x = getRandomInt(0, 5) * 101;
        this.y = lines[randomLineIndex()];  
}

   if (this.timePassed >= 40 
        && tmp < 40){
        this.x = -100;
        this.y = -100;
        this.timePassed = 0
   }
}
Heart.prototype.init = function(){
    this.x = getRandomInt(0, 5) * 101;
    this.y = lines[randomLineIndex()];
    this.timePassed = 0;
    }
var heart = new Heart();


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
