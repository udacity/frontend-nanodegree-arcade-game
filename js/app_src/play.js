
var b1 = new Enemy(-101, 135);
var b2 = new Enemy(-101, 218);
var b3 = new Enemy(-101, 300);

var options = {
  enemies: [b1, b2, b3],
  powerups: []
};

var player = new Player(options);

var Play = new Stage({
  sprites: [player, b1, b2, b3],
  backgroundColor: 'white',
  states: {
    'win': function(){
      ctx.drawImage(Resources.get('images/win-screen.png'), 0, 0, 505, 606);
    },
    'lose': function(stage) {
      ctx.drawImage(Resources.get('images/lose-screen.png'), 0, 0, 505, 606);
      stage.pause();
    },
    'playing': function() {

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
