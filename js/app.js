// Establish base classes for use in game objects

// TODO Add an update function to handle different rendering states
// I want to make the characters go splat

/*
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
*/
  
var Sprite = function(x, y, sprite, imageWidth, imageHeight, boxWidth, boxHeight) {
  this['x-default'] = x;
  this['y-default'] = y;
  this.x = this['x-default'];
  this.y = this['y-default'];
  this.imageWidth = imageWidth;
  this.imageHeight = imageHeight;
  this.boxWidth = boxWidth || imageWidth;
  this.boxHeight = boxHeight || imageWidth;
  this.sprite = sprite;
};

Sprite.prototype.reset = function(){
  this.x = this['x-default'];
  this.y = this['y-default'];
};

Sprite.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Button = function(x, y, sprite, imageWidth, imageHeight, boxWidth, boxHeight, nextState) {
  Sprite.call(this, x, y, sprite, imageWidth, imageHeight, boxWidth, boxHeight);
  this.nextState = nextState;
};

Button.prototype = Object.create(Sprite.prototype);

Button.constructor = Button;

Button.prototype.handleHit = function() {
  currentState = this.nextState;
};

// TODO add rendering capacity for sprites
/*
frog.frameCounter = 0;
frog.timer = 0;
frog.fps = 1/12;
frog.render = function(dt) {
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
*/


/*
// The Panel class is for the 'avatar select' and 'welcome' panels
// It could support similar 'toasts' where user input is needed
// outside of the main gameplay

var Panel = function(options) {
  var panel = {};
  for (var prop in options){
    panel[prop] = options[prop];
  }
};

Panel.prototype.render() {

}

Panel.prototype.checkButtons(loc) {

}

Panel.prototype.checkIfHit(loc, button) {
  // check if callback is a function
}

*/

// TODO: Just use bitmaps to draw buttons

var Frog = function(options) {
  // Assumes that each tile of the sprite sheet is square
  // Build a frame-by-frame animation of the frog hopping
  var frog = {};
  for (var prop in options){
    frog[prop] = options[prop];
  }
  frog.frameCounter = 0;
  frog.timer = 0;
  frog.fps = 1/12;
  frog.render = function(dt) {
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
    //console.log(dt);

  };
  frog.update = function(dt) {
    frog.timer += dt;
    frog.render();
    if(frog.timer >= frog.fps){
      frog.timer = 0;
      frog.frameCounter++;
      frog.dx += frog.rate * frog.fps;
      if(frog.frameCounter * frog.dWidth >= frog.imageWidth){
        frog.frameCounter = 0;
      }
    }
  };
  return frog;
};

// function(x, y, sprite, imageWidth, imageHeight, boxWidth, boxHeight, nextState)
var Frogger = new Sprite(0, 100, 'images/phrogger.png', 505, 126);

var StartButton = new Button(ctx.canvas.width/2 - 36, ctx.canvas.height * 0.75, 'images/start-btn.png', 150, 41, 'playing');

var AvatarButton = new Button(ctx.canvas.width/2 - 160, ctx.canvas.height * 0.5, 'images/avatar-btn.png', 330, 97, 'choosing');


var Welcome = {
  resetTimer: 0,
  resetLength: 5,
  buttons: [StartButton, AvatarButton],
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
    this.introGraphic.update(dt);
    this.resetState(dt);
  },
  render: function() {
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    Frogger.render();
    StartButton.render();
    AvatarButton.render();
  },
  resetState: function(dt) {
    this.resetTimer += dt;
    if (this.resetTimer >= this.resetLength ) {
      document.addEventListener('keyup', function(e) {
        player.handleInput(allowedKeys[e.keyCode]);
      });
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      currentState = 'playing';
    }
  },
  checkAllButtons: function(loc) {
    // Check if the click point is within the Button bounding box
    var welcome_panel = this;
    this.buttons.forEach(function(button){
      welcome_panel.checkHitButton(loc, button);
    });
  },
  checkHitButton: function(loc, button) {
    if (loc.x > button.x &&
        loc.x < button.x + button.width &&
        loc.y > button.y &&
        loc.y < button.y + button.height) {
          this.resetState(this.resetLength);
          if(button.nextState === 'choosing'){
            $canvas.off().on('click',function(e){
              var loc = handleClick(e.clientX, e.clientY);
              AvatarSelect.checkAvatars(loc);
            });
          }
          currentState = button.nextState;
        }
  }
};


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

var Lose = {
  resetTimer: 0,
  resetLength: 1,
  update: function(dt) {
    console.log('you lose');
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
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    Sprite.call(this, x, y, 'images/enemy-bug.png', 101, 171);
    this.speed = 100+Math.random()*200;
    // this.sprite = 'images/enemy-bug.png';
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
    this.render();
    if (this.x > ctx.canvas.width + this.boxWidth) {
      this.x = this['x-default'];
    }
};

// Draw the enemy on the screen, required method for game
/*
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
*/

var Player = function() {
  // Box is 70px wide by 80px tall
  // Offset at the top is 60px
  Sprite.call(this, 202, 405, 'images/char-boy.png');

  this.dx = 0;
  this.dy = 0;
  // this.sprite = 'images/char-boy.png';
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
    if (player.boxX < enemy.boxX + enemy.boxWidth &&
      player.boxX + player.boxWidth > enemy.boxX &&
      player.boxY < enemy.boxY + enemy.boxHeight &&
      player.boxHeight + player.boxY > enemy.boxY) {
        document.removeEventListener('keyup', player.handleInput);
        // TODO: let the bug run over the character
        currentState = 'lose';
    }
  });
};

Player.prototype.checkForWin = function(dt) {
  if (this.y < 73 ) {
    document.removeEventListener('keyup', function(e) {
      player.handleInput(allowedKeys[e.keyCode]);
    });
    currentState = 'win';
  }
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
    this.$el.html(Score.getScore());
  }
};


var AvatarSelect = {
  avatarImages: [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'
  ],
  avatars: [],
  resetTimer: 0,
  resetLength: 2,
  init: function() {
    var that = this;
    var index = 0;
    this.avatarImages.forEach(function(item){
      var a = new Sprite(101 * index, 300, item, 101, 171, 101, 70);
      that.avatars.push(a);
      index++;
    });
  },
  update: function(dt) {
    this.render();
  },
  render: function() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    this.avatars.forEach(function(item){
      item.render();
    });
  },
  checkAvatars: function(loc) {
    var that = this;
    this.avatars.forEach(function(avatar){
      that.checkHitButton(loc, avatar);
    });
  },
  checkHitButton: function(loc, target) {
    // Assumes target is a Sprite

    if (loc.x > target.x  &&
        loc.x < target.x + target.imageWidth &&
        loc.y > target.y &&
        loc.y < target.y + target.imageHeight) {
          // console.log('yo');
          player.sprite = target.sprite;
          this.resetState();
        }
  },
  resetState: function() {
      document.addEventListener('keyup', function(e) {
        player.handleInput(allowedKeys[e.keyCode]);
      });
      currentState = 'playing';
    }
};

AvatarSelect.init();


// TODO: randomize position and direction
var b1 = new Enemy(-101, 65);
var b2 = new Enemy(-101, 145);
var b3 = new Enemy(-101, 225);
var player = new Player(202, 405);
var allEnemies = [b1, b2, b3];

// TODO: Create a sessionStorage score variable to
// be updated with the Scorekeepr object

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
