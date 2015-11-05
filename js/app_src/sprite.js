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
