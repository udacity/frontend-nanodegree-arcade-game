// Here is the game itself!
var b1 = new Enemy(-101, 135);
var b2 = new Enemy(-101, 218);
var b3 = new Enemy(-101, 300);

var powerupOptions = {
  sprite: 'images/Gem Orange.png',
  dx: 101,
  dy: 183,
  sy: 58,
  dWidth: 101,
  dHeight: 111,
  nextState: 'powerup'
};

// The powerup is the gem that the player can collect
var powerup = new Sprite(powerupOptions);

var options = {
  otherSprites: [powerup, b1, b2, b3]
};

// The player is our 'hero'
var player = new Player(options);

var Play = new Stage({
  // powerup is assumed to be the first
  // element in the array for simplicity's sake
  sprites: [powerup, b1, b2, b3, player],
  backgroundColor: 'black',
  defaultState: 'playing',

  // The length of delay after a 'win' or 'lose' display
  resetLength: 1,

  // These are additional rendering functions
  // for handling states of the Play stage
  states: {
    'win': function(dt, stage){
      // Disable keyvboard input temporarily
      document.removeEventListener('keyup', function(e) {
        player.handleInput(allowedKeys[e.keyCode]);
      });
      ctx.drawImage(Resources.get('images/win-screen.png'), 0, 0, 505, 606);
      stage.pause();
      stage.resetTimer += dt;
      if(stage.resetTimer > stage.resetLength){
        Scorekeeper.update();
        currentState = 'reset';
      }
    },
    'lose': function(dt, stage) {
      document.removeEventListener('keyup', player.handleInput);
      ctx.drawImage(Resources.get('images/lose-screen.png'), 0, 0, 505, 606);
      stage.pause();
      stage.resetTimer += dt;
      if(stage.resetTimer > stage.resetLength){
        currentState = 'reset';
      }

    },
    'powerup': function(dt, stage) {
      // Take the gem off the stage
      // Assumes that the powerup is the first
      // item in the array
      stage.sprites.shift();

      // Take the gem out of the list of sprites
      // which the player checks for collisions
      player.otherSprites.shift();

      // Increase the score for collecting a gem
      Scorekeeper.update();

      // Set the state back to 'playing'
      currentState = stage.defaultState;
    },
    'reset': function(dt, stage) {
      // Check if a powerup has been collected
      // Reset the sprites in the stage
      stage.sprites.forEach(function(sprite){
        sprite.reset();
      });
      stage.resume();
      stage.resetTimer = 0;
      currentState = stage.defaultState;
    }
  },
  render: function() {
    var rowImages = [
          'images/water-block.png',   // Top row is water
          'images/stone-block.png',   // Row 1 of 3 of stone
          'images/stone-block.png',   // Row 2 of 3 of stone
          'images/stone-block.png',   // Row 3 of 3 of stone
          'images/grass-block.png',   // Row 1 of 2 of grass
          'images/grass-block.png'    // Row 2 of 2 of grass
      ],
      numRows = 6,
      numCols = 5,
      row, col;

      for (row = 0; row < numRows; row++) {
          for (col = 0; col < numCols; col++) {
              ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
          }
      }
  }
});
