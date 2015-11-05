var myCanvasWidth = ctx.canvas.width;
var myCanvasHeight = ctx.canvas.height;

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
