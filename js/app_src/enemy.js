var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    Sprite.call(this, x, y);
    this.speed = 100+Math.random()*200;
    this.sprite = 'images/enemy-bug.png';
    // Bug is 70 px tall and 101px wide
    // Offset is 75px
    this.boxTopOffset = 75;
    this.boxSideOffset = 0;
    //this.boxX = this.x + this.boxSideOffset;
    this.boxY = this.y + this.boxTopOffset;
    this.boxX = this.x;
};

Enemy.prototype = Object.create(Sprite.prototype);
Enemy.prototype.constructor = Enemy;
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed*dt;
    this.boxX = this.x;
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if (this.x > ctx.canvas.width + this.boxWidth) {
      this.x = this['x-default'];
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
