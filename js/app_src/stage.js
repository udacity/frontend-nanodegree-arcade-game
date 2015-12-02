
var Stage = function(options) {

  this.sprites = options.sprites;
  this.resetTimer = 0;
  this.resetLength = options.resetLength || 3;
  this.backgroundColor = options.backgroundColor;
  // It can check to see if the Player sprite
  // Collides with Enemy sprites
  // TODO: Generalize into a one to many collision detection?
  this.render = options.render || function() {};
  this.states = options.states || {};
  this.defaultState = options.defaultState || '';
  this.paused = options.paused || false;
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
  // Render the state of the stage
  var is_paused = this.paused;
  this.sprites.forEach(function(sprite){
    if(!is_paused){
      sprite.update(dt);
    }
    sprite.render(dt);
  });

  // If the state of the game matches a state of the
  // stage, render it
  if(this.states[currentState] !== undefined){
    this.states[currentState](dt, this);
  }
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

Stage.prototype.pause = function(){
  this.paused = true;
};

Stage.prototype.resume = function(){
  this.paused = false;
};
