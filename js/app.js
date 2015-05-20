//Variables I use for the additional features
var characterImages = [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'
    ];
var characterIndex; 
var enemyImages = [
    'images/car-bug.png',
    'images/enemy-bug.png',
    'images/poli-bug.png',
    'images/burger-bug.png'
    ];
var enemyIndex;
var playersOptions = [false, false]; 
var renderSelection = false;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.speed = Math.floor(Math.random()*300) + 100;
    this.x = 0;
    if (this.x == 0) {
        this.y = Math.floor(Math.random()*3)*85 + 40;
    };
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x <= 550){
        this.x += this.speed * dt;
    }else{
        this.x = -2;
    }

    // Reset the game if player hits a bug's proximity by 30px
    if(player.x >= this.x - 30 && player.x <= this.x + 30){
        if(player.y >= this.y - 30 && player.y <= this.y + 30){
            this.reset();
        }
    }
}


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
 ctx.drawImage(Resources.get(enemyImages[enemyIndex]), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Player class 
var Player = function(){
    this.x = 200;
    this.y = 400;
}

//Update method
Player.prototype.update = function(){
    if(this.ctlKey === 'left' && this.x > 0){ 
        this.x = this.x - 50;
    }else if(this.ctlKey === 'right' && this.x != 400){
        this.x = this.x + 50;
    }else if(this.ctlKey === 'up'){
        this.y = this.y - 50; 
    }else if (this.ctlKey === 'down' && this.y != 400){
        this.y = this.y + 50;
    }
    this.ctlKey = null;
    if(this.y < 25){
        this.reset();
    }
}

//Render method
Player.prototype.render = function() {
 ctx.drawImage(Resources.get(characterImages[characterIndex]), this.x, this.y);
}

//handleInput method
Player.prototype.handleInput = function(key){
    this.ctlKey = key;    
}

//Reset player method
Object.prototype.reset = function() {
  player.x = 200;
  player.y = 400;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player 
var allEnemies = [];
(function setEnemies(){
    allEnemies.push(new Enemy(-2,60));
    allEnemies.push(new Enemy(-3,100));
    allEnemies.push(new Enemy(-5,150));
    allEnemies.push(new Enemy(-7,220));
}());

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

//Additional functions: character options, enemy options, enter Uda City
function characterOption (imgId, imgIndex) {
    characterIndex = imgIndex;
    var buttons = document.getElementsByClassName('characterImg'); 
    for (var i = 0, length = buttons.length; i < length; i++) {
       buttons[i].style.border = '2px solid white';
    }
    document.getElementById(imgId).style.border = '3px solid orange';
    playersOptions[0] = true;
}


function enemyClick (imgId, imgIndex) {
    enemyIndex = imgIndex;
    var buttons = document.getElementsByClassName('enemyImg'); 
    for (var i = 0, length = buttons.length; i < length; i++) {
       buttons[i].style.border = '2px solid white';
    }
    document.getElementById(imgId).style.border = '3px solid orange';
    playersOptions[0] = true;
}



function enterCity () {
    var selectionCount = 0;
    for (var i = 0, length = playersOptions.length; i < length; i++) {
        if(playersOptions[i] === true) {
           selectionCount++; 
        }
    }
    if (selectionCount === 1) {
        document.getElementById('selection').style.display = 'none';
        renderSelection = true;
    } else {
        alert('Please choose your character and personal bug before starting the game.');
    }
}


