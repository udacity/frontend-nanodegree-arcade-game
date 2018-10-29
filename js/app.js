import {Player} from "./player.js";
import {Enemy} from "./enemy";

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

//the goal is for the character to gather all of the stones in the river
// Now instantiate your objects.

// Place the player object in a variable called player
let player = new Player();
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
  player = new Player(characterSelect);
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
