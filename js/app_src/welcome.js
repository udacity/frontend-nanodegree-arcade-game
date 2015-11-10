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


var Button = function() {

};

var StartButton = {
  // Hard-code the button
  x: ctx.canvas.width/2 - 75,
  y: ctx.canvas.height * 0.75,
  width: 150,
  height: 50,
  context: ctx,
  render: function() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText('Start', this.width/2, this.height);
  }
};


// TODO: Add another button for selecting players?


var Welcome = {
  resetTimer: 0,
  resetLength: 5,
  introGraphic: new Frog({
    image: 'images/frog.png',
    sx: 0,
    sy: 0,
    sWidth: 100,
    sHeight: 100,
    dx: -100,
    dy: ctx.canvas.height/2,
    dWidth: 100,
    dHeight: 100,
    imageWidth: 900,
    rate: 120,
    context: ctx
  }),
  update: function(dt) {
    this.render();
    this.introGraphic.update(dt);
    this.resetState(dt);
  },
  render: function() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.font = '36pt Helvetica';
    ctx.textSmoothingEnabled = true;
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';
    ctx.fillText('FROGGER', ctx.canvas.width/2, ctx.canvas.height/2);
    ctx.save();
    ctx.translate(StartButton.x, StartButton.y);
    StartButton.render();
    ctx.restore();
  },
  resetState: function(dt) {
    this.resetTimer += dt;

    if (this.resetTimer > this.resetLength ) {
      document.addEventListener('keyup', function(e) {
        player.handleInput(e.allowedKeys);
      });
      currentState = 'playing';
    }
  },
  checkStartButton: function(loc) {
    // Check if the click point is within the Button bounding box
    if (loc.x > StartButton.x &&
        loc.x < StartButton.x + StartButton.width &&
        loc.y > StartButton.y &&
        loc.y < StartButton.y + StartButton.height) {
          this.resetState();
          currentState = 'playing';
        }
  },
  checkChoosePlayerButton: function(loc) {
    if (loc.x > PlayerButton.x &&
        loc.x < PlayerButton.x + PlayerButton.width &&
        loc.y > PlayerButton.y &&
        loc.y < PlayerButton.y + PlayerButton.height) {
          currentState = 'choosing';
        }
  }
};
