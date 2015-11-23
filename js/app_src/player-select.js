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
  backgroundColor: 'white'
});
