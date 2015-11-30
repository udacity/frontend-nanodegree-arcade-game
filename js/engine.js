/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available to make writing app.js
 * a little simpler to work with.
 */

var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        currentState = 'welcome',
        startTime,
        lastTime;

    canvas.width = 505;
    canvas.height = 606;
    $('.gameboard').append(canvas);
    global.$canvas = $('canvas');
    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    $('#resetGame').on('click',function(){
      resetGame();
    });
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */

         var now = Date.now(),
          // Convert milliseconds to seconds
          dt = (now - lastTime) / 1000.0;
          if (global.currentState === 'welcome') {
            Welcome.update(dt);
          } else if (global.currentState === 'lose') {
             render();
             Lose.update(dt);
         } else if (global.currentState === 'playing') {
           //TODO: Something like Play.update()
          // render();
             //update(dt);
             Play.update(dt);
         } else if (global.currentState === 'choosing') {
            AvatarSelect.update(dt);
         } else if (global.currentState === 'winner') {
            render();
            Winner.update(dt);
         }
        lastTime = now;
        win.requestAnimationFrame(main);

    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {

      lastTime = Date.now();
      startTime = lastTime;
      main();

      initWelcome();
    }

    // Process the click info into the canvas

    function handleClick(x, y) {
      // Adapted from Core HTML5 Canvas
      var bbox = canvas.getBoundingClientRect();
      return { x: x - bbox.left * (canvas.width / bbox.width),
               y: y - bbox.top * (canvas.height / bbox.height)
      };
    }

    function resetGame() {
      global.currentState = 'welcome';
      initWelcome();
      Scorekeeper.reset();
    }

    function initWelcome() {
      Welcome.reset();
      $canvas.on('click', function(e) {
        var loc = handleClick(e.clientX, e.clientY);
        Welcome.checkButtons(loc);
      });
    }

    function initChoose() {
      $canvas.off().on('click', function(e) {
        var loc = handleClick(e.clientX, e.clientY);
        AvatarSelect.checkButtons(loc);
      });
    }

    function initPlay() {
      Scorekeeper.render();
      $(document).on('keyup', function(e) {
        player.handleInput(allowedKeys[e.keyCode]);
      });
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png',
        'images/frog.png',
        'images/avatar-btn.png',
        'images/start-btn.png',
        'images/phrogger.png'
    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developer's can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
    global.currentState = currentState;
    global.allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space'
    };
    global.playerImg = 'images/char-boy.png';
    global.handleClick = handleClick;
    global.initPlay = initPlay;
    global.initChoose = initChoose;
})(this);
