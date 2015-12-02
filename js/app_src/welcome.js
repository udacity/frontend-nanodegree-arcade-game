// Set up the graphic assets of the scene

var FroggerLogo = new Sprite({
  sprite: 'images/phrogger.png',
  dx: 0,
  dy: 0,
  dWidth: 505,
  dHeight: 126
});

var StartButton = new Sprite({
  sprite: 'images/start-btn.png',
  dWidth: 163,
  dHeight: 41,
  dx: ctx.canvas.width/2 - 30,
  dy: ctx.canvas.height * 0.75,
  clickable: true,
  nextState: 'playing',
  handleClick: function(){
    currentState = this.nextState;
    initPlay();
  }
});

var AvatarButton = new Sprite({
  sprite: 'images/avatar-btn.png',
  dWidth: 330,
  dHeight: 97,
  dx: ctx.canvas.width/2 - 160,
  dy: ctx.canvas.height * 0.3,
  clickable: true,
  nextState: 'choosing',
  handleClick: function() {
    currentState = this.nextState;
    initChoose();
  }
});

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

// Make the Stage
var Welcome = new Stage({
  sprites: [FroggerLogo, StartButton, AvatarButton, Frog],
  backgroundColor: 'black',
  defaultState: 'welcome'
});
