// Enemies our player must avoid
var Enemy = function(x, y, speeds)
{
  this.x = x;
  this.y = y;
  this.speeds = speeds;
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt)
{
  this.x +=this.speeds *dt;
    // You should multiply any movement by the dt parameter
    //when the bug gets to end.... it needs to be reset()
    if (this.x > 505)
    {
      this.reset();
    }

    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function()
{
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// reset the bug at the start
Enemy.prototype.reset = function()
{
  this.x = -200;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Beggining coordinates for player
var beginX = 200;
var beginY = 400;

var Player = function()
{
  this.x = beginX;
  this.y = beginY;
  this.sprite = 'images/char-cat-girl.png';
};

//create the ends of places where the player can go and can't go

Player.prototype.update = function()
{
  if (this.x < 0)
  {
    this.x=0;
  }
  else if (this.x > 400)
  {
    this.x = 400;
  }
  else if (this.y > 400)
  {
    this.y = 400;
  }
  else if (this.y < 0)
  {
    this.reset();
  }
};

//reset function to start over

Player.prototype.reset = function()
{
  this.x = beginX;
  this.y = beginY;
};

Player.prototype.render = function()
{
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];

for (var i = 0; i < 3; i++)
{
  var bugY = 65 + 80 *i;
  var bugX = Math.floor(Math.random()*30);
  var bugSpeeds = 50 + Math.floor(Math.random()*200);
  allEnemies.push(new Enemy(bugX, bugY, bugSpeeds));
}

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

Player.prototype.handleInput = function(key)
{
  switch (key)
  {
    case 'up':
    this.y -=90;
    break;

    case 'down':
    this.y += 90;
    break;

    case 'left':
    this.x -=100;
    break;

    case 'right':
    this.x +=100;
    break;

    default:
    break;
  }
};
