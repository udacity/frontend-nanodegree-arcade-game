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
  
var Sprite = function(x, y, sprite, imageWidth, imageHeight, boxWidth, boxHeight) {
  this['x-default'] = x;
  this['y-default'] = y;
  this.x = this['x-default'];
  this.y = this['y-default'];
  this.imageWidth = imageWidth;
  this.imageHeight = imageHeight;
  this.boxWidth = boxWidth || imageWidth;
  this.boxHeight = boxHeight || imageWidth;
  this.sprite = sprite;
};

Sprite.prototype.reset = function(){
  this.x = this['x-default'];
  this.y = this['y-default'];
};

Sprite.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Button = function(x, y, sprite, imageWidth, imageHeight, boxWidth, boxHeight, nextState) {
  Sprite.call(this, x, y, sprite, imageWidth, imageHeight, boxWidth, boxHeight);
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
