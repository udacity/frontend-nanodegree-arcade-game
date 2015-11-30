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
  this.tween = options.tween;

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
    this.update(dt);
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

Sprite.prototype.update = function(dt) {
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

};

Stage.prototype.render = function() {
  // Render the stage itself
  ctx.save();
  ctx.fillStyle = this.backgroundColor;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

Stage.prototype.update = function(dt) {
  // Render all sprites
  this.render();
  this.sprites.forEach(function(sprite){
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

// Set up the graphic assets of the scene

var FroggerLogo = new Sprite({
  sprite: 'images/phrogger.png',
  dx: 0,
  dy: 0,
  dWidth: 505,
  dHeight: 126
});

var StartButton = new Sprite({
  sprite: 'images/start-btn.png',
  dWidth: 163,
  dHeight: 41,
  dx: ctx.canvas.width/2 - 30,
  dy: ctx.canvas.height * 0.75,
  clickable: true,
  nextState: 'playing',
  handleClick: function(){
    currentState = this.nextState;
    initPlay();
  }
});

var AvatarButton = new Sprite({
  sprite: 'images/avatar-btn.png',
  dWidth: 330,
  dHeight: 97,
  dx: ctx.canvas.width/2 - 160,
  dy: ctx.canvas.height * 0.3,
  clickable: true,
  nextState: 'choosing',
  handleClick: function() {
    currentState = this.nextState;
    initChoose();
  }
});

var Frog = new Sprite({
  sprite: 'images/frog.png',
  sx: 0,
  sy: 0,
  sWidth: 100,
  sHeight: 100,
  dx: -100,
  dy: ctx.canvas.height/2,
  dWidth: 100,
  dHeight: 100,
  spriteSheetWidth: 900,
  fps: 1/12,
  anim: 1,
  tween: function(dt) {
    this.moveX(75 * dt);
  }
});

// Make the Stage
var Welcome = new Stage({
  resetLength: 5,
  sprites: [FroggerLogo, StartButton, AvatarButton, Frog],
  backgroundColor: 'black'
});

// TODO supercede as a state of
// the Stage class

var Winner = {
  resetTimer: 0,
  resetLength: 2,
  update: function(dt) {
    this.render();
    this.resetState(dt);
  },
  render: function() {
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.font = '36pt Helvetica';
    ctx.textSmoothingEnabled = true;
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';
    ctx.fillText('You Win', ctx.canvas.width/2, ctx.canvas.height/2);
  },
  resetState: function(dt) {
    this.resetTimer += dt;
    if ( this.resetTimer > this.resetLength ) {
      document.addEventListener('keyup', player.handleInput);
      player.reset();
      currentState = 'playing';
      this.resetTimer = 0;
      Scorekeeper.update();
    }
  }
};

// TODO supercede as a state of
// the Stage class

var Lose = {
  resetTimer: 0,
  resetLength: 1,
  update: function(dt) {
    // console.log('you lose');
    this.render();
    this.resetState(dt);
  },
  render: function() {
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.font = '36pt Helvetica';
    ctx.textSmoothingEnabled = true;
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';
    ctx.fillText('You Lose', ctx.canvas.width/2, ctx.canvas.height/2);
  },
  resetState: function(dt) {
    this.resetTimer += dt;
    if ( this.resetTimer > this.resetLength ) {
      document.addEventListener('keyup', player.handleInput);
      player.reset();
      currentState = 'playing';
      this.resetTimer = 0;
      player.reset();
      allEnemies.forEach(function(enemy) {
        enemy.reset();
      });
    }
  }
};

// Enemies our player must avoid
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

    this.speed = 100+Math.random()*200;
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
    this.render();
    if (this.dx > ctx.canvas.width + this.dWidth) {
      this.dx = this['dx-default'];
    }
};

// Draw the enemy on the screen, required method for game
/*
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
*/

var Player = function() {

  var player_options = {
    sprite: playerImg,
    dWidth: 70,
    dHeight: 80,
    dx: 218,
    dy: 468,
    sx: 15,
    sy: 63,
    sHeight: 90,
    sWidth: 70
  };

  Sprite.call(this, player_options);
  // ddx and ddy are the amounts to move the player
  // on each step
  this.ddx = 0;
  this.ddy = 0;
};

Player.prototype = Object.create(Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
  this.dx += this.ddx;
  this.dy += this.ddy;
  this.render();
  this.checkCollsions();
  this.checkForWin();
  this.ddx = 0;
  this.ddy = 0;
};

Player.prototype.handleInput = function(key) {
  // Check the bounds, don't allow character to go out of screen
  if(key === 'left'){
    // x-min = 0
    if( this.dx > 0 ){
      this.ddx = -101;
    }
  } else if (key === 'up') {
    if( this.dy > -10 ){
      // y-max = -10
      this.ddy = -83;
    }
  } else if (key === 'down') {
    if( this.dy < 405 ){
      // y-min = 405
      this.ddy = 83;
    }
  } else if (key === 'right') {
    if( this.dx < 404 ){
      // x-max = 404
      this.ddx = 101;
    }
  } else if (key === 'space') {
    currentState = 'pause';
  }
};

Player.prototype.checkCollsions = function() {
  var player = this;
  allEnemies.forEach( function(enemy) {
    if (player.dx < enemy.dx + enemy.dWidth &&
      player.dx + player.dWidth > enemy.dx &&
      player.dy < enemy.dy + enemy.dHeight &&
      player.dy + player.dHeight > enemy.dy) {
        document.removeEventListener('keyup', player.handleInput);
        // TODO: let the bug run over the character
        currentState = 'lose';
    }
  });
};

Player.prototype.checkForWin = function(dt) {
  if (this.dy < 73 ) {
    document.removeEventListener('keyup', function(e) {
      player.handleInput(allowedKeys[e.keyCode]);
    });
    currentState = 'winner';
  }
};

Player.prototype.setSprite = function() {
  this.sprite = playerImg;
};

// Handles score data
var Score = {
  score: 0,
  winValue: 100,
  incrementScore: function() {
    this.score += this.winValue;
  },
  getScore: function() {
    return this.score;
  },
  resetScore: function() {
    this.score = 0;
  }
};

// Handles the score view
var Scorekeeper = {
  $el: $(".scoreboard"),
  recordScore: function() {
    // update model
  },
  update: function() {
    Score.incrementScore();
    this.render();
  },
  render: function() {
    this.$el.html('Score: ' + Score.getScore());
  },
  reset: function() {
    Score.resetScore();
    this.$el.html('');
  }
};

var avatar_source_sprites = [
  'images/char-boy.png',
  'images/char-cat-girl.png',
  'images/char-horn-girl.png',
  'images/char-pink-girl.png',
  'images/char-princess-girl.png'
];

var avatars = avatar_source_sprites.map(function(item, index){
  return new Sprite({
    sprite: item,
    clickable: true,
    dx: index * 101,
    dy: (ctx.canvas.height - 170) / 2,
    dWidth: 101,
    dHeight: 170,
    nextState: 'playing',
    handleClick: function(){
      playerImg = item;
      player.setSprite();
      currentState = this.nextState;
      initPlay();
    }
  });
});

var AvatarSelect = new Stage({
  sprites: avatars,
  backgroundColor: 'white'
});


// TODO: randomize position and direction

var b1 = new Enemy(-101, 135);
var b2 = new Enemy(-101, 218);
var b3 = new Enemy(-101, 300);
var player = new Player();
var allEnemies = [b1, b2, b3];


// TODO: Create a sessionStorage score variable to
// be updated with the Scorekeepr object

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
