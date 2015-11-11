var Player = function(sprite, x, y) {
  this.x = x;
  this.y = y;
  this.sprite = sprite;
};

Player.prototype.render = function() {
  // this.x
  // this.y
  ctx.canvas.drawImage(this.sprite);
};

var PlayerSelect = {
  players: [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'
  ],
  update: function() {
    // Hi
  },
  render: function() {
    this.players.forEach(function(player){

    });
  },
  handleInput: function() {
    // Use the mouse to select player
  }
};
