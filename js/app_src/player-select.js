var avatar_source_sprites = [
  'images/char-boy.png',
  'images/char-cat-girl.png',
  'images/char-horn-girl.png',
  'images/char-pink-girl.png',
  'images/char-princess-girl.png'
];

var avatars = avatar_source_sprites.map(function(item, index){
  return new Sprite({
    sprite: item,
    clickable: true,
    dx: index * 101,
    dy: (ctx.canvas.height - 170) / 2,
    dWidth: 101,
    dHeight: 170,
    nextState: 'playing',
    handleClick: function(){
      playerImg = item;
      player.setSprite();
      currentState = this.nextState;
      initPlay();
    }
  });
});

var AvatarSelect = new Stage({
  sprites: avatars,
  backgroundColor: 'black',
  render: function() {
    var rowImages = [
          'images/stone-block.png',   // Top row is water
          'images/stone-block.png',   // Row 1 of 3 of stone
          'images/stone-block.png',   // Row 2 of 3 of stone
          'images/stone-block.png',   // Row 3 of 3 of stone
          'images/stone-block.png',   // Row 1 of 2 of grass
          'images/stone-block.png'    // Row 2 of 2 of grass
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
