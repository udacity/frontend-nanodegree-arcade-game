// Some variables to measure around the canvas
var tileWidth = 101;
var topArea = 60;
var tileHeight = 83;

// For debugging purposes
function debugOutput(string, debugMode) {
  if (debugMode == 1) {
    console.log(string);
  }
}

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -110; //default position for enemies
    this.name = "Bug";
    this.currentCol = 0;
    this.currentRow = 2; //default row when an enemy is generated
    this.speed = 100; //default speed for enemies
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // this.currentCol = 0;
    // this.currentRow = 0;

    if (this.x < 550) {
      // this.x++;
      this.x = this.x + dt*this.speed;
      // this.x = this.x + 1;

      if ((this.x > (-tileWidth + 15)) && (this.x < (tileWidth - 15))) {
        this.currentCol = 1;
        if ((player.currentCol == this.currentCol) && (this.currentRow == player.currentRow)) {
          debugOutput(this.name + 'is at column ' +this.currentCol, 1);
        }
      }

      if ((this.x > 15) && (this.x < (2 * tileWidth - 15))) {
        this.currentCol = 2;
        if ((player.currentCol == this.currentCol) && (this.currentRow == player.currentRow)) {
          debugOutput(this.name + 'is at column ' +this.currentCol, 1);
        }
      }

      if ((this.x > (tileWidth + 15)) && (this.x < (3 * tileWidth - 15))) {
        this.currentCol = 3;
        if ((player.currentCol == this.currentCol) && (this.currentRow == player.currentRow)) {
          debugOutput(this.name + 'is at column ' +this.currentCol, 1);
        }
      }

      if ((this.x > (2 * tileWidth + 15)) && (this.x < (4 * tileWidth - 15))) {
        this.currentCol = 4;
        if ((player.currentCol == this.currentCol) && (this.currentRow == player.currentRow)) {
          debugOutput(this.name + 'is at column ' +this.currentCol, 1);
        }
      }

      if ((this.x > (3 * tileWidth + 15)) && (this.x < (5 * tileWidth - 15))) {
        this.currentCol = 5;
        if ((player.currentCol == this.currentCol) && (this.currentRow == player.currentRow)) {
          debugOutput(this.name + 'is at column ' +this.currentCol, 1);
        }
      }

      debugOutput('Bugs are at ' +this.x, 1);

      // tile[[this.currentCol,this.currentRow]].hasBug = 1;
      // debugOutput(this.name + 'is at column ' +this.currentCol, 1);

    } else {
      this.x = -110;
    }

}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.x = tileWidth*2; // Start on the third column
  this.y = topArea + tileHeight*3; // Start on the forth row
  this.currentCol = 3;
  this.currentRow = 5;
  var previousCol = 0;
  var previousRow = 0;
}

// This class requires an update(), render() and
// a handleInput() method.

Player.prototype.update = function(direction) {
  // TODO: this function may not even be necessary
  debugOutput('this.x is ' +this.x, 0);
  switch (this.x) {
    case (0):
    this.currentCol = 1;
    break;

    case (tileWidth):
    this.currentCol = 2;
    break;

    case (tileWidth * 2):
    this.currentCol = 3;
    break;

    case (tileWidth * 3):
    this.currentCol = 4;
    break;

    case (tileWidth * 4):
    this.currentCol = 5;
    break;
  }

  debugOutput('this.y is ' +this.y, 0);
  switch (this.y) {
    case (topArea - tileHeight):
    this.currentRow = 1;
    break;

    case (topArea):
    this.currentRow = 2;
    break;

    case (topArea + tileHeight):
    this.currentRow = 3;
    break;

    case (topArea + tileHeight * 2):
    this.currentRow = 4;
    break;

    case (topArea + tileHeight * 3):
    this.currentRow = 5;
    break;

    case (topArea + tileHeight * 4):
    this.currentRow = 6;
    break;
  }

  // Reset the game if the player makes it to the top row
  if (this.currentRow == 1) {
    debugOutput('Row 1 deteced, reset the game', 1);
    reset(); // Reset the game
  }

}

Player.prototype.render = function(direction) {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  debugOutput('Player is at (' +this.x +"," +this.y +')', 0);
}

Player.prototype.handleInput = function(direction) {
  // Set trackers for where the player was before moving
  var previousCol = this.currentCol;
  var previousRow = this.currentRow;

  if (direction == 'left') {
    debugOutput("player pressed " +direction, 1);
    debugOutput("this.x was at " +this.x +". tileWidth was " +tileWidth, 0);
    if (this.x > 0 ) { // ensure that we don't go past the first column
      this.x = this.x - tileWidth;
      debugOutput("valid move");
      this.currentCol = this.currentCol - 1;
      debugOutput("currentCol is " +this.currentCol, 1);
    }
    debugOutput("this.x is at " +this.x +". tileWidth is " +tileWidth, 0);
  }

  if (direction == 'up') {
    debugOutput("player pressed " +direction, 1);
    debugOutput("this.y was at " +this.y +". tileHeight was " +tileHeight);
    if (this.y > 0 ) { // ensure that we don't go past the first row
      this.y = this.y - tileHeight;
      debugOutput("valid move");
      this.currentRow = this.currentRow - 1;
      debugOutput("currentRow is " +this.currentRow, 1);
    }
    debugOutput("this.y is at " +this.y +". tileHeight is " +tileHeight);
  }

  if (direction == 'right') {
    debugOutput("player pressed " +direction, 1);
    debugOutput("this.x was at " +this.x +". tileWidth was " +tileWidth);
    if (this.x < tileWidth*4 ) { // ensure that we don't go past the last column
      this.x = this.x + tileWidth;
      debugOutput("valid move");
      this.currentCol = this.currentCol + 1;
      debugOutput("currentCol is " +this.currentCol, 1);
    }
    debugOutput("this.x is at " +this.x +". tileWidth is " +tileWidth);
  }

  if (direction == 'down') {
    debugOutput("player pressed " +direction, 1);
    debugOutput("this.y was at " +this.y +". tileHeight was " +tileHeight);
    if (this.y < (tileHeight*4 + topArea) ) { // ensure that we don't go past the bottow row
      this.y = this.y + tileHeight;
      debugOutput("valid move");
      this.currentRow = this.currentRow + 1;
      debugOutput("currentRow is " +this.currentRow, 1);
    }
    debugOutput("this.y is at " +this.y +". tileHeight is " +tileHeight);
  }

  // Play back the tile the player's currently in
  debugOutput("Player is at " +this.currentCol +"," +this.currentRow, 1);
  debugOutput("Player was previously at " +previousCol +"," +previousRow, 1);
  tile[[previousCol,previousRow]].hasPlayer = 0;
  tile[[this.currentCol,this.currentRow]].hasPlayer = 1;
  debugOutput(previousCol +"," +previousRow +" hasPlayer = " +tile[[previousCol,previousRow]].hasPlayer, 1);
  debugOutput(this.currentCol +"," +this.currentRow +" hasPlayer = " +tile[[this.currentCol,this.currentRow]].hasPlayer, 1);

  // Show which tiles has Player in it
  for (var y = 1; y < 7; y++) { // outter loop scans through each row. There are 6 rows.
    for (var x = 1; x < 6; x++) { //inner loop scans through each column. There are 5 columns.
      if (tile[[x,y]].hasPlayer == 1) {
        debugOutput(x +"," +y +" has player", 1);
      }
    }
  }
}

// Reset the game

function reset() {
    // Reset the player
    player.x = tileWidth*2; // Start on the third column
    player.y = topArea + tileHeight*3; // Start on the forth row

    // Reset the enemies
    enemyTop.x = -220; // Top row enemy starting position
    enemyMiddle.x = -110; // Middle row enemy starting position
    enemyBottom.x = -350; // Bottom row enemy starting position
}

// Set up Tile objects to determine whether enemies of the player are currently on those tiles
// Co-ordinates are based on rows and columns, starting from the top right
var Tile = function (xcoord, ycoord) {
  this.xcoord = xcoord;
  this.ycoord = ycoord;
  this.hasBug = 0; // On instantiation, the current tile does not have the bug on it
  this.hasPlayer = 0; // On instantiation, the current tile does not have the player on it
}

Tile.prototype.clearBugs = function () {
  for (var y = 1; y < 7; y++) { // outter loop scans through each row. There are 6 rows.
    for (var x = 1; x < 6; x++) { //inner loop scans through each column. There are 5 columns.
      tile[[x,y]].hasBug = 0;
    }
  }
}

Tile.prototype.clearPlayer = function () {
  for (var y = 1; y < 7; y++) { // outter loop scans through each row. There are 6 rows.
    for (var x = 1; x < 6; x++) { //inner loop scans through each column. There are 5 columns.
      tile[[x,y]].hasPlayer = 0;
    }
  }
}

// instantiate the tiles
var tile = [[]]; // create a two-dimensional array to represent the grid of tiles using an x-y coordinate system

for (var y = 1; y < 7; y++) { // outter loop scans through each row. There are 6 rows.
  for (var x = 1; x < 6; x++) { //inner loop scans through each column. There are 5 columns.
    tile[[x,y]] = new Tile(x,y);
  }
}
debugOutput(tile, 1);

// Now instantiate your objects.
// Instantiate each enemy
// Rows are counted from the top
var enemyTop = new Enemy();
enemyTop.y = 0 + topArea;
enemyTop.currentRow = 2;
enemyTop.name = "Albert";
enemyTop.x = -220; // Top row enemy starting position
enemyTop.speed = 200;

var enemyMiddle = new Enemy();
enemyMiddle.y = 0 + topArea + tileHeight;
enemyMiddle.currentRow = 3;
enemyMiddle.name = "Brandy";
// middle row enemy starting position and speed uses default values

var enemyBottom = new Enemy();
enemyBottom.y = 0 + topArea + tileHeight*2;
enemyBottom.currentRow = 4;
enemyBottom.name = "Clarice";
enemyBottom.x = -350; // Bottom row enemy starting position
enemyBottom.speed = 80;

// Place all enemy objects in an array called allEnemies
var allEnemies = [enemyTop, enemyMiddle, enemyBottom];
// var allEnemies = [enemyBottom];

// Place the player object in a variable called player
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
