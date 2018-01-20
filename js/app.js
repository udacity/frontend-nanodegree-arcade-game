
//Base Class for all Entities in game
class gameEntity{
    constructor(mySpriteImgPath, myX, myY){
        this.sprite = mySpriteImgPath;
        this.x = myX;
        this.y = myY;
        this.originX=myX;
        this.originY=myY;
    }
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    reset(){
        this.x = this.originX;
        this.y = this.originY;
    }
}
// Enemies our player must avoid
class Enemy extends gameEntity{
    constructor(mySpriteImgPath, myX, myY, mySpeed){
        super(mySpriteImgPath, myX, myY);
        this.speed = mySpeed;
    }
    hitTestEnemy(thePlayer){
        if((Math.abs(thePlayer.x - this.x) <= 60) && (Math.abs(thePlayer.y - this.y) <= 60)){
            thePlayer.reset();       
            console.log("hit");
        }

    }
    update(dt){
        this.x +=(dt*this.speed);
        if(this.x > 500)
            this.reset();

        this.hitTestEnemy(player);
    }
}
/* Original Enemies code
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
*/
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class playerClass extends gameEntity{
    constructor(mySpriteImgPath, myX, myY){
        super(mySpriteImgPath, myX, myY);
    }
    update(dt){
        if(this.y<40)
        winner = true;
    }
    handleInput(key){
        if(key === 'left')
            this.x -= 25;
        else if(key === 'right')
            this.x += 25;
        else if(key === 'up')
            this.y -= 25;
        else if(key === 'down')
            this.y += 25;
        
            if(this.y <= -10){
                this.y= -10;
            }else if(this.y >= 450){
                this.y = 450;
            }

            if(this.x <= 5){
                this.x= -10;
            }else if(this.x >= 420){
                this.x = 420;
            }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy('images/enemy-bug.png', -100, 60, Math.floor(Math.random()*(200-100))), new Enemy('images/enemy-bug.png', -100, 150, Math.floor(Math.random()*(300-100))),
                  new Enemy('images/enemy-bug.png', -100, 230, Math.floor(Math.random()*(200-100))), new Enemy('images/enemy-bug.png', -100, 310, Math.floor(Math.random()*(300-100)))];
var player = new playerClass('images/char-boy.png', 200, 400);

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
