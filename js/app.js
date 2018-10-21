
//lane choices for bug postioning
const firstLane = 230;
const secondLane = 145;
const thirdLane = 60;

const offScreen = -60;

// Enemies our player must avoid
class Enemy {

  constructor(speed, lane, sprite = 'images/enemy-bug.png') {
    //speed
    this.speed = speed;
    this.offScreen = -60;
    this.currentlane = lane;
    //starting postion of enemy to be saved for later
    this.startingX = this.offScreen;

    //exact position of enemy, can be manipulated per instance
    this.x = this.offScreen;
    this.y = lane;

    //resets the postion of the bugs
    this.resetPosition = function() {
      this.x = offScreen;
    }
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = sprite;
  }

    currentColumn() {

      const firstColumn = this.x <= 100;
      const secondColumn = this.x >= 101 && this.x <= 200;
      const thirdColumn = this.x >= 201 && this.x <= 300;
      const fourthColumn = this.x >= 301 && this.x <= 400;
      const fithColumn = this.x >= 401;

      if (firstColumn) {
        return 'firstColumn'
      } else if (secondColumn) {
        return 'secondColumn'
      } else if (thirdColumn) {
        return 'thirdColumn'
      } else if (fourthColumn) {
        return 'fourthColumn'
      } else if (fithColumn) {
        return 'fifthColumn'
      }
    }
}


// Update the enemy's position
Enemy.prototype.update = function(dt) {

  //is enemey outside of boundary in other words reached its destination?
  if (this.x < 500) {
    this.x += this.speed * dt;
    //Reset position to start
  } else {
    this.resetPosition();
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



//symbols that represent if a character takes takeDamage
class Heart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/Heart.png';
  }
}

Heart.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


/*player class*/
class Character {
  // Init allEnemies array
  // For each enemy create and push new Enemy object into above array

  /*constructor*/
  constructor(sprite = 'images/char-boy.png') {
      /*properties*/
      this.startingX = 200;
      this.startingY = 400;
      this.x = this.startingX;
      this.y = this.startingY;
      this.health = 4;
      this.isCollectingStones = true;
    //allows me to reset the postion of the charicter
    this.takeDamage = function() {
      //reset position
      this.x = this.startingX;
      this.y = this.startingY;
      //lower health
      this.health -= 1;
      switch (this.health) {
        case 3:
          allHearts.pop();
          break;
        case 2:
          allHearts.pop();
          break;
        case 1:
          allHearts.pop();
          break;
        default:
          allHearts.pop();
          console.log("You lose");
          break;
      }
    };
  this.river = 10,

    // sprite
    this.sprite = sprite;
  /*methods*/
  //create character onscreen
}
currentColumn() {
  var result = "";
  if (this.x <= 100) {
    result = 'firstColumn'
  } else if (this.x >= 101 && this.x <= 200) {
    result = 'secondColumn'
  } else if (this.x >= 201 && this.x <= 300) {
    result = 'thirdColumn'
  } else if (this.x >= 301 && this.x <= 400) {
    result = 'fourthColumn'
  } else {
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
handleInput(input) {
  let horizontalMovement = 98;
  let lateralMovement = 80;

  if (input === 'left') {
    if (this.x > 5) {
      this.x -= horizontalMovement;
    }
  } else if (input === 'up') {
    if (this.y > 5) {
      this.y -= lateralMovement;
    }
  } else if (input === 'right') {
    if (this.x < 350) {
      this.x += horizontalMovement;
    }
  } else if (input === 'down') {
    if (this.y < 400) {
      this.y += lateralMovement;
    }
  }


  //stone collections
  if (this.samePostionAsStone(stone)) {
    const xCoordinates = [4, 102, 298, 200, 396];
    stone.x = xCoordinates[Math.floor(Math.random() * xCoordinates.length)];
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
      case 'images/Gem Green.png':
        stone.sprite = 'images/Gem Purple.png';
        break;
      case 'images/Gem Purple.png':
        console.log("you win");
    }
  }

  /// where is my charicter
}

update() {
  for (let enemy of allEnemies) {
    const firstRow = this.y <= 240 && this.y >= 161;
    const secondRow = this.y <= 160 && this.y >= 81;
    const thirdRow = this.y <= 80 && this.y > 0;

    if (thirdRow && clyde.currentColumn() === this.currentColumn()) {
      this.takeDamage();
    } else if (secondRow && blinky.currentColumn() === this.currentColumn()) {
      this.takeDamage();
    } else if (firstRow && pinky.currentColumn() === this.currentColumn()) {
      this.takeDamage();
    } else if (firstRow && inky.currentColumn() === this.currentColumn()) {
      this.takeDamage();
    }
  }
}
samePostionAsStone(stone) {
  return this.x === stone.x && this.y === stone.y;
}

}

class Stone {
  constructor(x, y, sprite = 'images/Gem Blue.png') {
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
characterSelect = '';
if (playerInput === 'girl') {
  characterSelect = "images/char-cat-girl.png";
} else if (playerInput === 'horn') {
  characterSelect = 'images/char-horn-girl.png';
} else if (playerInput === 'princess') {
  characterSelect = 'images/char-princess-girl.png';
} else {
  characterSelect = 'images/char-boy.png';
}
const player = new Character(characterSelect);

const allEnemies = [];
//red
const blinky = new Enemy(200, firstLane, 'images/enemy-bug-blinky.png');
allEnemies.push(blinky);
//orange
const clyde = new Enemy(300, secondLane, 'images/enemy-bug.png');
allEnemies.push(clyde);
//blue
const inky = new Enemy(200, thirdLane, 'images/enemy-bug-inky.png');
allEnemies.push(inky);
//pink
const pinky = new Enemy(90, thirdLane, 'images/enemy-bug-pinky.png');
allEnemies.push(pinky);

const stone = new Stone(4, 0, 'images/Gem Blue.png');

let stones = [];
stones.push(stone);

const heart1 = new Heart(-27, 455);
const heart2 = new Heart(25, 455);
const heart3 = new Heart(75, 455);
const heart4 = new Heart(127, 455);

let allHearts = [];
allHearts.push(heart1);
allHearts.push(heart2);
allHearts.push(heart3);
allHearts.push(heart4);

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
