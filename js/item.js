var ExtraLife = function(x, y) {
  this.x = x;
  this.y = y;
  this.sound = new Audio('sounds/extra_life.wav');
  this.consumed = false;
  this.sprite = 'img/extra_life.png';
};

// render ExtraLife sprite
ExtraLife.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// give the player one extra life
ExtraLife.prototype.giveBonus = function() {
  this.sound.play();
  player.lives ++;
}

///////////////////////////////////////
// Instantiate Items Section
// columns (x-value)
var colOne = 32;
var colTwo = 160;
var colThree = 288;
var colFour = 416;
var colFive = 544;
var colSix = 672;
var colSeven = 800;

// rows (y-value)
var rowOne = 704;
var rowTwo = 576;
var rowThree = 448;
var rowFour = 320;
var rowFive = 192;
var rowSix = 64;

// create extra life variables
var extraLife7 = new ExtraLife(colSeven, rowThree);
var extraLife9 = new ExtraLife(colSeven, rowFour);
var extraLife17 = new ExtraLife(colOne, rowSix);
var extraLife20 = new ExtraLife(colSeven, rowSix);
var extraLife23 = new ExtraLife(colSeven, rowFive);


// add all items to an array that can be used to reset consumed statues
var allItems = [];

allItems.push(extraLife7, extraLife9, extraLife17, extraLife20, extraLife23);
