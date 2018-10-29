const COLUMN_X_COORDINATES = [0, 100, 200, 300, 400];

const ROW_Y_COORDINATES = [0, 80, 160, 245, 325, 410];

let getIndexFromValue = function(array, value) {
  return array.findIndex(function(e) { return e === Math.floor(value) });
};

// const firstLane = 240;
// const secondLane = 160;
// const thirdLane = 80;
const firstLane = ROW_Y_COORDINATES[3];
const secondLane = ROW_Y_COORDINATES[2];
const thirdLane = ROW_Y_COORDINATES[1];
const offScreen = -60;
//player skins
const boy = 'images/char-boy.png';
const girl = 'images/char-girl.png';
const girlHorns = 'images/char-horn-horn.png';
const girlPink = 'images/char-pink-girl.png';
const girlPrincess = 'images/char-princess-girl.png';
const allEnemies = [];
//gem skins
const gemRed = new Gem(0, 0, 'images/Gem Red.png');
const gemBlue = new Gem(0, 0, 'images/Gem Blue.png');
const gemOrange = new Gem(0, 0, 'images/Gem Orange.png');
const gemGreen = new Gem(0, 0, 'images/Gem Green.png');
const gemPurple = new Gem(0, 0, 'images/Gem Purple.png');
let gems = [gemRed, gemBlue, gemOrange, gemGreen, gemPurple];
let gem = Gem.firstGem(gems);
let player = null;
//lane choices for bug positioning
// Place the player object in a variable called player
let resetGems = function() {
  gems = [gemRed, gemBlue, gemOrange, gemGreen, gemPurple];
  player.gemsCollected = [];
  gem = gems[0];
};

let restartGame = function () {
  player = Player.createPlayer();
  resetGems();
};

//the goal is for the character to gather all of the stones in the river
// Now instantiate your objects.

//gemRed
const blinky = new Enemy(200, firstLane, 'images/enemy-bug-red.png');
allEnemies.push(blinky);
//gemOrange
const clyde = new Enemy(300, secondLane, 'images/enemy-bug-orange.png');
allEnemies.push(clyde);
//gemBlue
const inky = new Enemy(200, thirdLane, 'images/enemy-bug-blue.png');
allEnemies.push(inky);
//pink
const pinky = new Enemy(90, thirdLane, 'images/enemy-bug-pink.png');
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

      player.update(allowedKeys[e.keyCode]);

      if (player.won()) {
        console.log("You WON!!");
      }

    }
);
