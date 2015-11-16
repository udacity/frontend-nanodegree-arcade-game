// Establish base classes for use in game objects

// A button is used in the welcome panel
// It should probably also be used for the Avatars
// Perhaps these should be 'Flash' inspired, with static
// sprites and animated sprites based on different base
// classes?

var Button = function(text, x, y, width, height, nextState) {
  this.text = text;
  this.x = x - width/2;
  this.y = y;
  this.width = width;
  this.height = height;
  this.nextState = nextState;
};

// TODO: remove the canvas vector stuff from the Button
// Draw these with bitmaps or svg
Button.prototype.render = function() {
  ctx.fillStyle = 'blue';
  ctx.fillRect(0, 0, this.width, this.height);
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.fillText(this.text, this.width/2, this.height);
};

/*
Button.prototype.handleHit = function() {
  currentState = this.nextState;
};
*/

// TODO Add an update function to handle different rendering states
// I want to make the characters go splat
var Sprite = function(x, y, sprite) {
  this['x-default'] = x;
  this['y-default'] = y;
  this.x = this['x-default'];
  this.y = this['y-default'];
  this.imageWidth = 101;
  this.imageHeight = 171;
  this.boxWidth = 101;
  this.boxHeight = 70;
  this.sprite = sprite;
};

Sprite.prototype.reset = function(){
  this.x = this['x-default'];
  this.y = this['y-default'];
};

Sprite.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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
