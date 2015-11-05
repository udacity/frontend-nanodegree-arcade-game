var Player = function() {
  // Box is 70px wide by 80px tall
  // Offset at the top is 60px
  Sprite.call(this, 202, 405);

  this.dx = 0;
  this.dy = 0;
  this.sprite = 'images/char-boy.png';
  this.boxWidth = 70;
  this.boxHeight = 80;
  this.boxTopOffset = 60;
  this.boxSideOffset = 15;
  this.boxX = this.x + this.boxSideOffset;
  this.boxY = this.y + this.boxTopOffset;
};

Player.prototype = Object.create(Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
  this.x += this.dx;
  this.y += this.dy;
  this.boxX = this.x + this.boxSideOffset;
  this.boxY = this.y + this.boxTopOffset;
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  this.checkCollsions();
  this.checkForWin();
  this.dx = 0;
  this.dy = 0;
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
  // Check the bounds, don't allow character to go out of screen
  if(key === 'left'){
    // x-min = 0
    if( this.x > 0 ){
      this.dx = -101;
    }
  } else if (key === 'up') {
    if( this.y > -10 ){
      // y-max = -10
      this.dy = -83;
    }
  } else if (key === 'down') {
    if( this.y < 405 ){
      // y-min = 405
      this.dy = 83;
    }
  } else if (key === 'right') {
    if( this.x < 404 ){
      // x-max = 404
      this.dx = 101;
    }
  } else if (key === 'space') {
    currentState = 'pause';
  }
};

Player.prototype.checkCollsions = function() {
  var player = this;
  allEnemies.forEach( function(enemy) {
    //console.log(player.sprite);
    // need to find the width
    // console.log(enemy.boxX);
    if (player.boxX < enemy.boxX + enemy.boxWidth &&
      player.boxX + player.boxWidth > enemy.boxX &&
      player.boxY < enemy.boxY + enemy.boxHeight &&
      player.boxHeight + player.boxY > enemy.boxY) {
          currentState = 'reset';
    }
  });
};

Player.prototype.checkForWin = function() {
  if (this.y <= 83 ) {
    currentState = 'win';
    console.log('win');
  }
};
