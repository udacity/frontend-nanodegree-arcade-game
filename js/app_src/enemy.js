// Enemies our player must avoid
// 'extends' the Sprite class

var Enemy = function(dx, dy) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    var enemy_defaults = {
      sprite: 'images/enemy-bug.png',
      dWidth: 101,
      dHeight: 80,
      dx: dx,
      dy: dy,
      sx: 0,
      sy: 75,
      sHeight: 80
    };

    Sprite.call(this, enemy_defaults);

    // Make the bugs move at different speeds
    this.speed = 100+Math.random()*200;

    // What state to change to after the player hits the bug
    this.nextState = 'lose';
};

Enemy.prototype = Object.create(Sprite.prototype);

Enemy.prototype.constructor = Enemy;
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.dx += this.speed*dt;

    // Draw the bug
    this.render();

    // Sets the bug to its initial position on the left of the screen
    if (this.dx > ctx.canvas.width + this.dWidth) {
      this.dx = this['dx-default'];
    }
};
