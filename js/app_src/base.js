// Establish base classes for use in game objects

// TODO Add an update function to handle different rendering states
// I want to make the characters go splat

/*
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
*/

var Sprite = function(options) {
  // Sprite takes an options object

  // Coordinates for game stage
  this['x-default'] = this.dx = options.dx;
  this['y-default'] = this.dy = options.dy;

  // The url of the image
  this.sprite = options.sprite;

  // The width of the image on the destination canvas
  this.dWidth = options.dWidth;
  this.dHeight = options.dHeight;

  // Coordinates of the source image for clipping
  this.sx = options.sx || 0;
  this.sy = options.sy || 0;
  this.sWidth = options.sWidth || options.dWidth;
  this.sHeight = options.sHeight || options.dHeight;

  // Animation options
  this.currentFrame = options.currentFrame || 0;
  this.fps = options.fps || 0;
  this.timer = 0;
  this.spriteSheetWidth = options.spriteSheetWidth || options.dWidth;
  this.anim = options.anim || 0;
};

Sprite.prototype.reset = function(){
  this.dx = this['x-default'];
  this.dy = this['y-default'];
};

Sprite.prototype.render = function() {
  //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
  ctx.drawImage(Resources.get(this.sprite), this.sx, this.sy, this.sWidth, this.sHeight, this.dx, this.dy, this.dWidth, this.dHeight);
};

Sprite.prototype.update = function(dt) {
  // this.sx = this.currentFrame * this.dWidth;
  this.timer += dt;
  if(this.timer >= this.fps){
    this.timer = 0;
    if(this.currentFrame * this.dWidth >= this.spriteSheetWidth){
      this.currentFrame = 0;
    }
    this.sx = this.currentFrame * this.dWidth;
    this.currentFrame++;

  }
};

Sprite.prototype.moveX = function(ddx) {
  this.dx += ddx;
};

Sprite.prototype.moveY = function(ddy) {
  this.dy += ddy;
};

var Button = function(options, nextState) {
  Sprite.call(this, options);
  this.nextState = nextState;
};

Button.prototype = Object.create(Sprite.prototype);

Button.constructor = Button;

Button.prototype.handleHit = function() {
  currentState = this.nextState;
};

// TODO add rendering capacity for sprites
/*
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
*/


/*
// The Panel class is for the 'avatar select' and 'welcome' panels
// It could support similar 'toasts' where user input is needed
// outside of the main gameplay

var Panel = function(options) {
  var panel = {};
  for (var prop in options){
    panel[prop] = options[prop];
  }
};

Panel.prototype.render() {

}

Panel.prototype.checkButtons(loc) {

}

Panel.prototype.checkIfHit(loc, button) {
  // check if callback is a function
}

*/
