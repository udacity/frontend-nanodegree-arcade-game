// Set up the graphic assets of the scene

var FroggerLogo = new Sprite({
  sprite: 'images/phrogger.png',
  dx: 0,
  dy: 0,
  dWidth: 505,
  dHeight: 126
});

var StartButton = new Button({
  sprite: 'images/start-btn.png',
  dWidth: 163,
  dHeight: 41,
  dx: ctx.canvas.width/2 - 30,
  dy: ctx.canvas.height * 0.75,
},'playing');

var AvatarButton = new Button({
  sprite: 'images/avatar-btn.png',
  dWidth: 330,
  dHeight: 97,
  dx: ctx.canvas.width/2 - 160,
  dy: ctx.canvas.height * 0.3
},'choosing');

var Frog = new Sprite({
  sprite: 'images/frog.png',
  sx: 0,
  sy: 0,
  sWidth: 100,
  sHeight: 100,
  dx: -100,
  dy: ctx.canvas.height/2,
  dWidth: 100,
  dHeight: 100,
  spriteSheetWidth: 900,
  fps: 1/12,
  anim: 1,
  tween: function(dt) {
    this.moveX(75 * dt);
  }
});

var Welcome = new Stage({
  resetLength: 5,
  sprites: [FroggerLogo, StartButton, AvatarButton, Frog],
  backgroundColor: 'black'
});

var oldWelcome = {
  resetTimer: 0,
  resetLength: 5,
  sprites: [FroggerLogo, StartButton, AvatarButton, Frog],
  update: function(dt) {
    this.render(dt);
    this.sprites.forEach(function(sprite) {
      sprite.render(dt);
    });
    this.resetState(dt);
  },
  render: function(dt) {
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  },
  resetState: function(dt) {
    this.resetTimer += dt;
    if (this.resetTimer >= this.resetLength ) {
      document.addEventListener('keyup', function(e) {
        player.handleInput(allowedKeys[e.keyCode]);
      });
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      currentState = 'playing';
    }
  },
  checkAllButtons: function(loc) {
    // Check if the click point is within the Button bounding box
    var welcome_panel = this;
    this.sprites.forEach(function(sprite){
      if(sprite.clickable){
        welcome_panel.checkHitButton(loc, sprite);
      }
    });
  },
  checkHitButton: function(loc, button) {
    if (loc.x > button.dx &&
        loc.x < button.dx + button.dWidth &&
        loc.y > button.dy &&
        loc.y < button.dy + button.dHeight) {
          this.resetState(this.resetLength);
          if(button.nextState === 'choosing'){
            $canvas.off().on('click',function(e){
              var loc = handleClick(e.clientX, e.clientY);
              AvatarSelect.checkAvatars(loc);
            });
          }
          currentState = button.nextState;
        }
  }
};
