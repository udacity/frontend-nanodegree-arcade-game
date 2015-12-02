
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

var powerup = new Sprite(powerupOptions);

var options = {
  otherSprites: [powerup, b1, b2, b3]
};

var player = new Player(options);

var Play = new Stage({
  sprites: [powerup, b1, b2, b3, player],
  backgroundColor: 'black',
  defaultState: 'playing',
  resetLength: 1,
  states: {
    'win': function(dt, stage){
      ctx.drawImage(Resources.get('images/win-screen.png'), 0, 0, 505, 606);
      stage.pause();
      stage.resetTimer += dt;
      if(stage.resetTimer > stage.resetLength){
        Scorekeeper.update();
      }
      document.removeEventListener('keyup', function(e) {
        player.handleInput(allowedKeys[e.keyCode]);
      });
    },
    'lose': function(dt, stage) {
      ctx.drawImage(Resources.get('images/lose-screen.png'), 0, 0, 505, 606);
      stage.pause();
      stage.resetTimer += dt;
      document.removeEventListener('keyup', player.handleInput);
    },
    'powerup': function(dt, stage) {
      stage.sprites.shift();
      player.otherSprites.shift();
      Scorekeeper.update();
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
