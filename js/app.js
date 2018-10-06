// Enemies our player must avoid
class Enemy {
  constructor(){
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.startingX = -60;
    this.startingY = 0;
    // X pos
    this.x = this.startingX;
    // Y pos
    this.y = this.startingY;
    //speed
    this.speed = 0;
    //resetPosition
    this.resetPosition = function(){
      this.x = this.startingX;
      this.y = this.startingY;
    }
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
  };
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
  constructor(){
/*properties*/
    this.startingX = 200;
    this.startingY = 400;
    this.x = this.startingX,
    this.y = this.startingY,
    //allows me to reset the postion of the charicter
    this.resetPosition = function(){
      this.x = this.startingX;
      this.y = this.startingY;
    }
    this.river = 10,

    // sprite
    this.sprite = 'images/char-boy.png';
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
      /// where is my charicter
      console.log("my X" + this.x + " my Y" + this.y);
    }

    update(){
      for(let enemy of allEnemies) {
        const firstRow = this.y <= 300 && this.y >= 200;
        const secondRow = this.y <= 200 && this.y >= 100;
        const thirdRow = this.y <= 100 && this.y > 0;



        const clydePosition = clyde.x;
        const charPosition = this.x;

        if (thirdRow && clyde.currentColumn() === this.currentColumn()){
          this.resetPosition();

        } else if (secondRow && blinky.currentColumn() === this.currentColumn()){
          this.resetPosition();
        } else if (firstRow && inky.currentColumn() === this.currentColumn()){
          this.resetPosition();
        } else {
          console.log("nigga you still alive");
        }
      }
    }
}

// Now instantiate your objects.
//const Inky = new Enemy();
//const Blinky = new Enemy();
//const Pinky = new Enemy();d
//const Clyde = new Enemy();
// Place all enemy objects in an array called allEnemies
//const allEnemies = {Inky, Blinky, Pinky, Clyde}

// Place the player object in a variable called player
const player = new Character();
const blinky = new Enemy();
  blinky['speed'] = 200;
  blinky.y = 145;
  blinky['startingY'] = 145;

const clyde = new Enemy();
  clyde['speed'] = 100;
  clyde.y = 60;
  clyde.x = 200;
  clyde['startingY'] = 60;

const inky = new Enemy();
  inky['speed'] = 150;
  inky.y = 230;
  clyde.x = 300;
  inky['startingY'] = 230;

let allEnemies = [];
allEnemies.push(clyde);
allEnemies.push(blinky);
allEnemies.push(inky);



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
