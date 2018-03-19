// Enemies our player must avoid
const Enemy = class {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    constructor(){
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';

        this.x = -102;
        this.y = randomYPosition();
        this.speed = randomSpeed();
        this.width = 101;
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x = this.x + this.speed * dt;
        if(this.x > 600){
            this.x = -101;
            this.y = randomYPosition();
            this.speed = randomSpeed();
        }
        //handle collision
        this.checkCollision();  
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    //Enemy and player are moving on the same y points
    //Check if they have collided on the x axis
    //player and enemy are 101 on width
    checkCollision() {
        if((this.y == player.y) && (((player.x) < this.x + 80))&&(player.x + player.width > this.x)){
        //bring player to original position
        player.resetPlayer();
        }
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = class{
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.resetPlayer();
        this.width = 101;
        this.score = 0;
    }

    //handles the user input and moves the player on the screen
    handleInput(key) {
        switch(key) {
        case 'up':
            player.y -= 83;
            break;
        case 'down':
            player.y += 83;
            break;
        case 'left':
            player.x -= 101;
            break;
        case 'right':
            player.x += 101;
            break;
        default:
            console.log(obj);
        }
    }

    //update the player position and make sure it doesn't go
    //outside of the rendering box
    update() {
        if(this.y < 1){
            //the player made it
            this.resetPlayer();
            this.raiseScore();
        }
        
        if(this.y > 380){
            this.y = 380;
        }
        
        if(this.x < -2){
            this.x = -2;
        }
        
        if(this.x > 402){
            this.x = 402;
        }
    }

    // Draw the player on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        ctx.font = '24PT Impact';
        ctx.fillText(`Score: ${this.score}`, 10, 90);
    }

    //Bring player to original position
    resetPlayer() {
        this.y = 380;
        this.x = 200;
    }

    //Raise the score
    raiseScore() {
        this.score++;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const allEnemies = []; 
const numEnemies = 3;

for(let i = 0; i < numEnemies; i++){
    allEnemies[i] = new Enemy;
    allEnemies[i].speed = randomSpeed(); 
    allEnemies[i].y= randomYPosition();
}
// Place the player object in a variable called player
const player = new Player;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', e => {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//this function takes an array and a number of items you want to return
//https://stackoverflow.com/questions/19269545/how-to-get-n-no-elements-randomly-from-an-array
function getRandom(arr, n) {
    let result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        const x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}


//get a random speed
function randomSpeed(){
    const speed = Math.floor(Math.random() * (400 - 100) + 100); 
    return speed;
}

//get a random y position for enemy
function randomYPosition(){
    positions = [48, 131, 214];
    const position = getRandom(positions, 1);
    return position;
}
