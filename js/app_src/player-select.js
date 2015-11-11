var Avatar = function(sprite, x, y) {
  this.x = x;
  this.y = y;
  this.sprite = sprite;
};

Avatar.prototype.render = function() {
  // this.x
  // this.y
  ctx.canvas.drawImage(this.sprite);
};

var AvatarSelect = {
  avatars: [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'
  ],
  resetTimer: 0,
  resetLength: 2,
  update: function(dt) {
    // Hi
    console.log('select avatar');
    this.resetState(dt);
  },
  render: function() {
    this.avatars.forEach(function(player){

    });
  },
  handleInput: function() {
    // Use the mouse to select player
  },
  resetState: function(dt) {
    this.resetTimer += dt;
    if (this.resetTimer >= this.resetLength ) {
      document.addEventListener('keyup', function(e) {
        player.handleInput(allowedKeys[e.keyCode]);
      });
      currentState = 'playing';
    }
  }
};
