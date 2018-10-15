// Enemies our player must avoid
class Enemy {
  constructor(speed, y, startingY, sprite = 'images/enemy-bug.png'){
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.startingX = -60;
    this.startingY = startingY;
    // X pos
    this.x = this.startingX;
    // Y pos
    this.y = y;
    //speed
    this.speed = speed;
    //resets the postion of the bugs
    this.resetPosition = function(){
      this.x = this.startingX;
      this.y = this.startingY;
    }
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = sprite;
  }
  currentColumn(){
    var result = "";
      if (this.x <= 100){
        result = 'firstColumn'
      }else if(this.x >= 101 && this.x <= 200){
        result = 'secondColumn'
      }else if(this.x >= 201 && this.x <= 300){
        result = 'thirdColumn'
      }else if(this.x >= 301 && this.x <= 400){
        result = 'fourthColumn'
      }else {
        result = 'fifthColumn'
      }
      return result;
  }
}


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

//is enemey outside of boundary in other words reached its destination?
if(this.x < 500){
  //Increment x by speed * dt..move foward
  this.x += this.speed * dt;
  //Reset position to start
    //Increment x by speed * dt..move foward
  } else {
    this.resetPosition();
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// Now write your own player class

/*player class*/
class Character {
  // Init allEnemies array
  // For each enemy create and push new Enemy object into above array

/*constructor*/
  constructor(sprite='images/char-boy.png',health = 4){
/*properties*/
    this.startingX = 200;
    this.startingY = 400;
    this.x = this.startingX,
    this.y = this.startingY,
    this.health = this.health,
    //allows me to reset the postion of the charicter
    this.takeDamage = function(){
      //reset position
      this.x = this.startingX;
      this.y = this.startingY;
    }
    this.river = 10,

    // sprite
    this.sprite = sprite;
/*methods*/
  //create character onscreen
  }
  currentColumn(){
    var result = "";
      if (this.x <= 100){
        result = 'firstColumn'
      }else if(this.x >= 101 && this.x <= 200){
        result = 'secondColumn'
      }else if(this.x >= 201 && this.x <= 300){
        result = 'thirdColumn'
      }else if(this.x >= 301 && this.x <= 400){
        result = 'fourthColumn'
      }else {
        result = 'fifthColumn'
      }
      return result;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  // hint update method...update position methods
    // collision
      // did player x & y collide with Enemy?
    // WIN?
      // did player reach a winning tile?
        // postion player back to starting position - x,y must now = starting x,y
    // movement handleing
      // update postioning according to input x,y

// This class requires an update(), render() and
// a handleInput() method.
}
    handleInput(input){
      let horizontalMovement = 98;
      let lateralMovement = 80;

      if(input === 'left'){
        if(this.x > 5){
          this.x -= horizontalMovement;
        }
      } else if(input === 'up'){
        if(this.y > 5){
          this.y -= lateralMovement;
          }
      } else if(input === 'right'){
        if(this.x < 350){
          this.x += horizontalMovement;
        }
      } else if(input === 'down'){
        if(this.y < 400){
          this.y += lateralMovement;
        }
      }

      const xCoordinates = [4,102,298,200,396];
      //stone collections
      if(this.samePostionAsStone(stone)){
        stone.x = xCoordinates[Math.floor(Math.random()*xCoordinates.length)];
        stone.y = stone.y === 0 ? 320 : 0;
        switch (stone.sprite) {
          case 'images/Gem Blue.png':
            stone.sprite = 'images/Gem Red.png';
            break;
          case 'images/Gem Red.png':
            stone.sprite = 'images/Gem Orange.png';
            break;
          case 'images/Gem Orange.png':
            stone.sprite = 'images/Gem Green.png';
            break;
        }
        let stones = [];
        stones.push(stone);
      }

      /// where is my charicter
    }

    update(){
      for(let enemy of allEnemies) {
        const firstRow = this.y <= 240 && this.y >= 161;
        const secondRow = this.y <= 160 && this.y >= 81;
        const thirdRow = this.y <= 80 && this.y > 0;

        if (thirdRow && clyde.currentColumn() === this.currentColumn()){
          this.takeDamage();
        } else if (secondRow && blinky.currentColumn() === this.currentColumn()){
          this.takeDamage();
        } else if (firstRow && pinky.currentColumn() === this.currentColumn()){
          this.takeDamage();
        } else if (firstRow && inky.currentColumn() === this.currentColumn()){
          this.takeDamage();
        }
      }
    }
    samePostionAsStone(stone){
      return this.x === stone.x && this.y === stone.y;
    }
}

class Stone {
  constructor(x,y,sprite = 'images/Gem Blue.png'){
    this.x = x,
    this.y = y,
    this.sprite = sprite
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

//the goal is for the charicter to gather all of the stones in the river
// Now instantiate your objects.

// Place the player object in a variable called player
const playerInput = prompt("which character do you want to play as?");
charicterSelect = '';
 if(playerInput === 'girl'){
   charicterSelect = "images/char-cat-girl.png";
} else if(playerInput === 'horn'){
    charicterSelect = 'images/char-horn-girl.png';
} else if(playerInput === 'princess'){
    charicterSelect = 'images/char-princess-girl.png';
} else {
    charicterSelect = 'images/char-boy.png';
}
const player = new Character(charicterSelect);

const blinky = new Enemy(200,145,145,'images/enemy-bug-blinky.png');

const clyde = new Enemy(300,60,60,'images/enemy-bug.png');
clyde.x = 200;

const inky = new Enemy(150,230,230,'images/enemy-bug-inky.png');
inky.x = 280;

const pinky = new Enemy(150,230,230,'images/enemy-bug-pinky.png');

const stone = new Stone(4,0,'images/Gem Blue.png');

let stones = [];
stones.push(stone);

let allEnemies = [];
allEnemies.push(clyde);
allEnemies.push(blinky);
allEnemies.push(inky);
allEnemies.push(pinky);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {

    var allowedKeys = {
      //qwerty
        87: 'up',
        65: 'left',
        68: 'right',
        83: 'down',
      //arrows
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',

    };

    player.handleInput(allowedKeys[e.keyCode]);
});
