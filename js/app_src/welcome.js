// TODO: Just use bitmaps to draw buttons

var Frog = function(options) {
  // Assumes that each tile of the sprite sheet is square
  // Build a frame-by-frame animation of the frog hopping
  var frog = {};
  for (var prop in options){
    frog[prop] = options[prop];
  }
  frog.frameCounter = 0;
  frog.timer = 0;
  frog.fps = 1/12;
  frog.render = function(dt) {
    frog.context.drawImage(
      Resources.get(frog.image),
      frog.sx + frog.frameCounter * frog.dWidth,
      frog.sy,
      frog.sWidth,
      frog.sHeight,
      frog.dx,
      frog.dy,
      frog.dWidth,
      frog.dHeight
    );
    //console.log(dt);

  };
  frog.update = function(dt) {
    frog.timer += dt;
    frog.render();
    if(frog.timer >= frog.fps){
      frog.timer = 0;
      frog.frameCounter++;
      frog.dx += frog.rate * frog.fps;
      if(frog.frameCounter * frog.dWidth >= frog.imageWidth){
        frog.frameCounter = 0;
      }
    }
  };
  return frog;
};

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

var F = new Sprite({
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
  anim: 1
});

var Welcome = {
  resetTimer: 0,
  resetLength: 5,
  sprites: [FroggerLogo, StartButton, AvatarButton, F],
  update: function(dt) {
    this.render(dt);
    //this.introGraphic.update(dt);
    this.sprites[this.sprites.indexOf(F)].moveX(100*dt);
    this.resetState(dt);
  },
  render: function(dt) {
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    this.sprites.forEach(function(item){
      item.render();
      if(item.anim){
        item.update(dt);
      }
    });
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
    this.buttons.forEach(function(button){
      welcome_panel.checkHitButton(loc, button);
    });
  },
  checkHitButton: function(loc, button) {
    if (loc.x > button.x &&
        loc.x < button.x + button.width &&
        loc.y > button.y &&
        loc.y < button.y + button.height) {
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
