// Establish base classes for use in game objects

// TODO Add an update function to handle different rendering states
// I want to make the characters go splat

var Sprite = function(options) {
  // Sprite takes an options object

  // Coordinates for game stage
  this['dx-default'] = this.dx = options.dx;
  this['dy-default'] = this.dy = options.dy;

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
  this.tween = options.tween || function(dt) { };

  // Interactive options
  this.clickable = options.clickable || false;
  this.nextState = options.nextState || currentState;
  this.handleClick = options.handleClick || 'null';
  this.handleHit = options.handleHit || 'null';

  // Rendering options
  this.showBoundingBox = false;
};

Sprite.prototype.reset = function(){
  this.dx = this['dx-default'];
  this.dy = this['dy-default'];
  this.currentFrame = 0;
  this.timer = 0;
};

Sprite.prototype.render = function(dt) {
  if(this.anim) {
    // Only update the sprite if it's flagged to be animated
    this.animate(dt);
  }
  // API reference: drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
  ctx.drawImage( Resources.get(this.sprite), this.sx, this.sy, this.sWidth, this.sHeight, this.dx, this.dy, this.dWidth, this.dHeight );
  if( this.showBoundingBox ) {
    this.drawBoundingBox();
  }
};


Sprite.prototype.drawBoundingBox = function() {
  // This is just a method to draw a square around
  // the bounding box of each sprite. This is useful
  // for establishing the correct position settings for
  // initializing the sprites.
  ctx.save();
  ctx.strokeStyle = 'red';
  ctx.beginPath();
  ctx.moveTo(this.dx, this.dy);
  ctx.lineTo(this.dx + this.dWidth, this.dy);
  ctx.lineTo(this.dx + this.dWidth, this.dy + this.dHeight);
  ctx.lineTo(this.dx, this.dy + this.dHeight);
  ctx.lineTo(this.dx, this.dy);
  ctx.stroke();
  ctx.restore();
};

Sprite.prototype.animate = function(dt) {
  // Update will animate the frames of a sprite sheet
  // It assumes that each frame is spaced a distance
  // equivalent to the width of the sprite on stage
  this.timer += dt;
  if(this.timer >= this.fps){
    this.timer = 0;
    if(this.currentFrame * this.dWidth >= this.spriteSheetWidth){
      this.currentFrame = 0;
    }
    this.sx = this.currentFrame * this.dWidth;
    this.currentFrame++;
  }
  // The tween is a function custom to each instance
  this.tween(dt);
};

Sprite.prototype.moveX = function(ddx) {
  this.dx += ddx;
};

Sprite.prototype.moveY = function(ddy) {
  this.dy += ddy;
};

Sprite.prototype.update = function(dt) {

};

//

/*
var Button = function(options, nextState) {
  Sprite.call(this, options);
  this.nextState = nextState;
  this.clickable = true;
};

Button.prototype = Object.create(Sprite.prototype);

Button.constructor = Button;

*/

// The Stage class keeps a list of sprites
// The global context is hardcoded in here

var Stage = function(options) {

  this.sprites = options.sprites;
  this.resetTimer = 0;
  this.resetLength = options.resetLength;
  this.backgroundColor = options.backgroundColor;
  // It can check to see if the Player sprite
  // Collides with Enemy sprites
  // TODO: Generalize into a one to many collision detection?
  this.render = options.render || function() {};
};

Stage.prototype.renderBackground = function() {
  // Render the stage itself
  ctx.save();
  ctx.fillStyle = this.backgroundColor;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

Stage.prototype.update = function(dt) {
  // Render all sprites
  this.renderBackground();
  this.render();
  this.sprites.forEach(function(sprite){
    sprite.update(dt);
    sprite.render(dt);
  });
};

Stage.prototype.reset = function(dt) {
  // Reset the sprites in the stage
  this.sprites.forEach(function(sprite){
    sprite.reset();
  });
};

Stage.prototype.checkButtons = function(loc) {
  // Check if the click point is within the Button bounding box
  var that = this;
  this.sprites.forEach(function(sprite){
    if(sprite.clickable){
      that.checkButtonHit(loc, sprite);
    }
  });
};

Stage.prototype.checkButtonHit = function(loc, button) {
  if (loc.x > button.dx &&
      loc.x < button.dx + button.dWidth &&
      loc.y > button.dy &&
      loc.y < button.dy + button.dHeight) {
        button.handleClick();
      }
};
