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

// console.log(avatars);

var newAvatarSelect = new Stage({
  sprites: avatars,
  backgroundColor: 'white'
});


// TODO: rewrite
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
      var a = new Sprite({
        sprite: item,
        dx: 101 * index,
        dy: 300,
        dWidth: 101,
        dHeight: 171
      });
      that.avatars.push(a);
      index++;
    });
  },
  update: function(dt) {
    this.render();
  },
  render: function() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    this.avatars.forEach(function(avatar){
      avatar.render();
    });
  },
  checkAvatars: function(loc) {
    var that = this;
    this.avatars.forEach(function(avatar){
      that.checkHitButton(loc, avatar);
    });
  },
  checkHitButton: function(loc, target) {
    // Assumes target is a Sprite
    if (loc.x > target.dx  &&
        loc.x < target.dx + target.dWidth &&
        loc.y > target.dy &&
        loc.y < target.dy + target.dHeight) {
          // console.log('yo');
          player.sprite = target.sprite;
          this.resetState();
        }
  },
  resetState: function() {
      document.addEventListener('keyup', function(e) {
        player.handleInput(allowedKeys[e.keyCode]);
      });
      currentState = 'playing';
    }
};

AvatarSelect.init();
