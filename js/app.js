

var Frog = function(options) {
  // Assumes that each tile of the sprite sheet is square
  // Build a frame-by-frame animation of the frog hopping
  var frog = {};
  for (var prop in options){
    frog[prop] = options[prop];
  }
  frog.frameCounter = 0;
  frog.render = function(dt) {
    frog.dx += frog.rate * dt;
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
    frog.frameCounter++;
    //console.log(dt);
    if(frog.frameCounter * frog.dWidth >= frog.imageWidth){
      frog.frameCounter = 0;
    }
  };
  return frog;
};

var Welcome = {
  introGraphic: new Frog({
    image: 'images/frog.png',
    sx: 0,
    sy: 0,
    sWidth: 100,
    sHeight: 100,
    dx: -100,
    dy: ctx.canvas.height/2,
    dWidth: 100,
    dHeight: 100,
    imageWidth: 900,
    rate: 120,
    context: ctx
  }),
  update: function(dt) {
    this.render();
    this.introGraphic.render(dt);
  },
  render: function() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.font = '36pt Helvetica';
    ctx.textSmoothingEnabled = true;
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';
    ctx.fillText('FROGGER', ctx.canvas.width/2, ctx.canvas.height/2);
  },
  resetState: function() {
    currentState = 'playing';
  }
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
var myCanvasWidth = ctx.canvas.width;
var myCanvasHeight = ctx.canvas.height;

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


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

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
          console.log(enemy['x-default']);
    }
  });
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// TODO: randomize position and direction
var b1 = new Enemy(-101, 65);
var b2 = new Enemy(-101, 145);
var b3 = new Enemy(-101, 225);
var player = new Player(202, 405);
var allEnemies = [b1, b2, b3];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
