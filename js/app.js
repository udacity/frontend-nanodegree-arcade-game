//lane choices for bug positioning
const firstLane = 240;
const secondLane = 160;
const thirdLane = 80;
const offScreen = -60;

//column choices
const firstColumn = function (x) {
  return x >= 4 && x <= 101;
};
const secondColumn = function (x) {
  return x >= 102 && x <= 200;
};
const thirdColumn = function (x) {
  return x >= 201 && x <= 298;
};
const fourthColumn = function (x) {
  return x >= 300 && x <= 398;
};
const fifthColumn = function (x) {
  return x >= 398;
};

let currentColumn = function (xCoordinate) {
  let result = '';
  if (firstColumn(xCoordinate)) {
    result = 'firstColumn';
  } else if (secondColumn(xCoordinate)) {
    result = 'secondColumn';
  } else if (thirdColumn(xCoordinate)) {
    result = 'thirdColumn';
  } else if (fourthColumn(xCoordinate)) {
    result = 'fourthColumn';
  } else {
    result = 'fifthColumn';
  }
  return result;
};

let currentRow = function (objectWithYCoordinate) {
  let result = '';
  if (objectWithYCoordinate.y >= 80 && objectWithYCoordinate.y <= 100) {
    result = 'firstLane';
  } else if (objectWithYCoordinate.y >= 101 && objectWithYCoordinate.y <= 180) {
    result = 'secondLane';
  } else if (objectWithYCoordinate.y >= 181 && objectWithYCoordinate.y <= 240) {
    result = 'thirdLane';
  }
  return result;
};
let allHearts = [];

// Enemies our player must avoid
class Enemy {

  constructor(speed, lane, sprite = 'images/enemy-bug.png') {
    //speed
    this.speed = speed;
    this.offScreen = offScreen;
    this.startingY = lane;
    //starting position of enemy to be saved for later
    this.startingX = this.offScreen;

    //exact position of enemy, can be manipulated per instance
    this.x = this.offScreen;
    this.y = lane;

    //resets the position of the bugs
    this.resetPosition = function () {
      this.x = offScreen;
    };
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = sprite;
  }
}

// Update the enemy's position
Enemy.prototype.update = function (dt) {

  //is enemey outside of boundary in other words reached its destination?
  if (this.x < 500) {
    this.x += this.speed * dt;
    //Reset position to start
  } else {
    this.resetPosition();
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*player class*/
class Character {
  // Init allEnemies array
  // For each enemy create and push new Enemy object into above array

  /*constructor*/
  constructor(sprite = boy) {
    //allows me to save postioning for latter
    this.startingX = 200;
    this.startingY = 400;
    this.x = this.startingX;
    this.y = this.startingY;

    //charts how many hearts the player has
    this.health = 4;
    this.won = false;

    this.resetHealth = function () {
      fillAllHearts();
      this.health = 4;
    };

    //allows me to reset the postion of the charicter
    this.takeDamage = function () {
      //reset position
      this.x = this.startingX;
      this.y = this.startingY;

      //lower health
      this.health -= 1;
      allHearts.pop();

      //on player death
      if (this.health <= 0) {
        headerText.textContent = 'You Died';
        modal.style.display = 'block';
        console.log('lose');
      }
    };

    // sprite
    this.sprite = sprite;
    /*methods*/
    //create character onscreen
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

//movement
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
    if (this.x === stone.x && this.y === stone.y) {
      //makes it so the stone will be placed in random locations
      const xCoordinates = [4, 102, 298, 200, 396];
      stone.x = xCoordinates[Math.floor(Math.random() * xCoordinates.length)];

      //change the location of the stone from on the river to on the grass
      stone.y = stone.y === 0 ? 320 : 0;

      //stone skins
      const red = 'images/Gem Red.png';
      const blue = 'images/Gem Blue.png';
      const orange = 'images/Gem Orange.png';
      const green = 'images/Gem Green.png';
      const purple = 'images/Gem Purple.png';
      let stoneSpriteArray = [red, blue, orange, green, purple];
      //switches the color of the stone after collecting it
      let currentSpriteIndex = stoneSpriteArray.findIndex(
          k => k === stone.sprite);
      let lastSprite = stone.sprite === stoneSpriteArray[stoneSpriteArray.length
      - 1];
      stone.sprite =
          lastSprite ? stoneSpriteArray : stoneSpriteArray[currentSpriteIndex
          + 1];
    }
  }

//collision system for our bugs
  update() {
    for (let enemy of allEnemies) {

      if (currentRow(enemy) === currentRow(this) &&
          currentColumn(enemy) === currentColumn(this)) {
        this.takeDamage();
      }
    }
  }
}

//symbols that represent if a character takes takeDamage
class Heart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/Heart.png';
  }
}

Heart.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
const heart1 = new Heart(-27, 455);
const heart2 = new Heart(25, 455);
const heart3 = new Heart(75, 455);
const heart4 = new Heart(127, 455);
let fillAllHearts = function () {
  allHearts.push(heart1);
  allHearts.push(heart2);
  allHearts.push(heart3);
  allHearts.push(heart4);
};

class Stone {
  constructor(x, y, sprite = blue) {
    this.x = x,
        this.y = y,
        this.sprite = sprite;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

const stone = new Stone(4, 0, 'images/Gem Blue.png');
let stones = [];
stones.push(stone);

//player skins
const boy = 'images/char-boy.png';
const girl = 'images/char-girl.png';
const girlHorns = 'images/char-horn-horn.png';
const girlPink = 'images/char-pink-girl.png';
const girlPrincess = 'images/char-princess-girl.png';

//the goal is for the charicter to gather all of the stones in the river
// Now instantiate your objects.

// Place the player object in a variable called player
let player = new Character();
let createCharacter = function () {
  let playerInput = prompt('which character do you want to play as?');
  let characterSelect = '';
  if (playerInput === 'girl') {
    characterSelect = girl;
  } else if (playerInput === 'horn') {
    characterSelect = girlHorns;
  } else if (playerInput === 'girlPink') {
    characterSelect = girlPink;
  } else if (playerInput === 'princess') {
    characterSelect = girlPrincess;
  } else {
    characterSelect = boy;
  }
  player = new Character(characterSelect);
  player.resetHealth();
};
createCharacter();
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

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {

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
