const firstLane = 240;
const secondLane = 160;
const thirdLane = 80;
const offScreen = -60;
//player skins
const boy = 'images/char-boy.png';
const girl = 'images/char-girl.png';
const girlHorns = 'images/char-horn-horn.png';
const girlPink = 'images/char-pink-girl.png';
const girlPrincess = 'images/char-princess-girl.png';
const playerHealthMeters = [];
const allEnemies = [];
const gem = new Gem(4, 0, 'images/Gem Blue.png');
const gems = [];
gems.push(gem);


//lane choices for bug positioning
// Place the player object in a variable called player
let createPlayer = function () {
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
  return new Player(characterSelect);
};
const player = createPlayer();
player.resetHealth();
//the goal is for the character to gather all of the stones in the river
// Now instantiate your objects.

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
// Player.update() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {

      let allowedKeys = {
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
      player.update(allowedKeys[e.keyCode], allEnemies, gem);
      if (player.won()) {
        console.log("You WON!!");
      }

    }
);
