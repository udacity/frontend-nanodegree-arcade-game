// Establish base classes for use in game objects

// A button is used in the welcome panel
// It should probably also be used for the Avatars
var Button = function(text, x, y, width, height, nextState) {
  this.text = text;
  this.x = x - width/2;
  this.y = y;
  this.width = width;
  this.height = height;
  this.nextState = nextState;
};

Button.prototype.render = function() {
  ctx.fillStyle = 'blue';
  ctx.fillRect(0, 0, this.width, this.height);
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.fillText(this.text, this.width/2, this.height);
};

var Avatar = function(sprite, x, y) {
  this.x = x;
  this.y = y;
  this.width = 101;
  this.height = 171;
  this.sprite = sprite;
};

Avatar.prototype.render = function() {
  // console.log(this.x, this.y);
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Sprite = function(x, y) {
  this['x-default'] = x;
  this['y-default'] = y;
  this.x = this['x-default'];
  this.y = this['y-default'];
  this.boxWidth = 101;
  this.boxHeight = 70;
};

Sprite.prototype.reset = function(){
  this.x = this['x-default'];
  this.y = this['y-default'];
};
// Enemies our player must avoid
