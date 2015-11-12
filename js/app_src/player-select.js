

var Avatar = function(sprite, x, y) {
  this.x = x;
  this.y = y;
  this.sprite = sprite;
};

Avatar.prototype.render = function() {
  // console.log(this.x, this.y);
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var AvatarSelect = {
  avatarImages: [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'
  ],
  avatars: [],
  resetTimer: 0,
  resetLength: 2,
  init: function() {
    var that = this;
    var index = 0;
    this.avatarImages.forEach(function(item){
      var a = new Avatar(item, 90 * index, 300);
      that.avatars.push(a);
      index++;
    });
  },
  update: function(dt) {
    this.render();
    this.resetState(dt);
  },
  render: function() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    this.avatars.forEach(function(item){
      item.render();
    });
  },
  handleInput: function() {
    // Use the mouse to select player
  },
  resetState: function(dt) {
    // this.resetTimer += dt;
    if (this.resetTimer >= this.resetLength ) {
      document.addEventListener('keyup', function(e) {
        player.handleInput(allowedKeys[e.keyCode]);
      });
      currentState = 'playing';
    }
  }
};

AvatarSelect.init();
