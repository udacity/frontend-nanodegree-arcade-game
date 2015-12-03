// Front-End Nanodegree Arcade Game Clone
// Benjamin Ritter


// The Sprite class is designed to serve
// as a base class for all the 'graphics'
// in the game, from the buttons on the
// welcome panel to the bugs and player.
// Several of its properties match the
// Canvas object's. Sprite takes an options object.
var Sprite = function(options) {

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

// Resets the internal timer and postion of the sprite
Sprite.prototype.reset = function(){
  this.dx = this['dx-default'];
  this.dy = this['dy-default'];
  this.currentFrame = 0;
  this.timer = 0;
};

Sprite.prototype.render = function(dt) {
  // Only update the sprite if it's flagged to be animated
  if(this.anim) {
    this.animate(dt);
  }

  // Canvas API: drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
  ctx.drawImage( Resources.get(this.sprite), this.sx, this.sy, this.sWidth, this.sHeight, this.dx, this.dy, this.dWidth, this.dHeight );

  // Drawing the bounding box is used only to visualize
  // the hit test mechanism. See drawBoundingBox method below.
  if( this.showBoundingBox ) {
    this.drawBoundingBox();
  }
};

// This is just a method to draw a square around
// the bounding box of each sprite. This is useful
// for establishing the correct position settings for
// initializing the sprites.
Sprite.prototype.drawBoundingBox = function() {
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

// Animates the frames of a sprite sheet
// It assumes that each frame is spaced a distance
// equivalent to the width of the sprite on stage
Sprite.prototype.animate = function(dt) {

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

// This method gets overridden in the
// Enemy and Player classes
Sprite.prototype.update = function(dt) {

};
