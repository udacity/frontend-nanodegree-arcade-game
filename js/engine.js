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
 * This engine makes the canvas' context (ctx) object globally available to make
 * writing app.js a little simpler to work with.
 */

var Engine = (function(global) {

    let gameContinue = true;
    let collectedGems = 0;
    let lives = 3;
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
        update(dt);
        render();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
         if (gameContinue) {
           win.requestAnimationFrame(main);
         }
    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
    function update(dt) {
        updateEntities(dt);
        checkCollisions();
        checkGems();
        endGame();
    }

    // This function checks if collision of the player and one of the enemies occured.
    function checkCollisions() {
      if (player.y === 71) {
        if (player.x - bug1.x <= 70 && bug1.x - player.x <= 81 ||
          player.x - bug4.x <= 60 && bug4.x - player.x <= 81) {
          player.x = 202;
          player.y = 320;
          lives -= 1;
          document.querySelectorAll('.lives img')[lives].style.visibility = 'hidden';
        }
      } else if (player.y === 154) {
        if (player.x - bug2.x <= 70 && bug2.x - player.x <= 81 ||
          player.x - bug5.x <= 60 && bug5.x - player.x <= 81) {
          player.x = 202;
          player.y = 320;
          lives -= 1;
          document.querySelectorAll('.lives img')[lives].style.visibility = 'hidden';

        }
      } else if (player.y === 237) {
        if (player.x - bug3.x <= 70 && bug3.x - player.x <= 81 ||
          player.x - bug6.x <= 60 && bug6.x - player.x <= 81) {
          player.x = 202;
          player.y = 320;
          lives -= 1;
          document.querySelectorAll('.lives img')[lives].style.visibility = 'hidden';
        }
      }
    }

    /* This function checks if the player collected the gem and
    calls gem.update(), which changes color and position. */
    function checkGems () {
      if (player.y === 71 && gem.y === 105) {
        if (gem.x - player.x === 20) {
          gem.update();
          collectedGems += 1;
          document.querySelector('.gems.number').textContent = collectedGems;
        }
      } else if (player.y === 154 && gem.y === 190) {
        if (gem.x - player.x === 20) {
          gem.update();
          collectedGems += 1;
          document.querySelector('.gems.number').textContent = collectedGems;
        }
      } else if (player.y === 237 && gem.y === 275) {
        if (gem.x - player.x === 20) {
          gem.update();
          collectedGems += 1;
          document.querySelector('.gems.number').textContent = collectedGems;
        }
      }
    }

    /* This function checks if the playes lost or won, shows the modal and places the player
    in the start point */
    function endGame() {
      if (player.y < 60 && collectedGems >= 5) {
        gameContinue = false;
        document.querySelector('#win').style.display = 'block';
        player.x = 202;
        player.y = 320;
      } else if (lives <= 0) {
        gameContinue = false;
        document.querySelector('#lose').style.display = 'block';
        player.x = 202;
        player.y = 320;
      }
    }

    /* This is called by the update function and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        var rowImages = [
                'images/water-block.png',   // Top row is water
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/grass-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 5,
            row, col;

        // Before drawing, clear existing canvas
        ctx.clearRect(0,0,canvas.width,canvas.height)

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.
                 */
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        renderEntities();
    }

    /* This function is called by the render function and is called on each game
     * tick. Its purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function.
         */
        gem.render();
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });
        player.render();
    }

    // This function handles game reset states - when the player chose to play more 
    function reset() {
      gameContinue = true;
      collectedGems = 0;
      lives = 3;
      document.querySelector('#win').style.display = 'none';
      document.querySelector('#lose').style.display = 'none';
      [...document.querySelectorAll('.lives img')].forEach(heart => heart.style.visibility = 'visible');
      document.querySelector('.gems.number').textContent = collectedGems;
      player.x = 202;
      player.y = 320;
    }

    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/gem-green.png',
        'images/gem-blue.png',
        'images/gem-orange.png',
    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;

    // Listener for 'won' popup
    document.querySelector('.play-again').addEventListener('click', function () {
      init();
    });

    document.querySelector('#win .close').addEventListener('click', function () {
      document.querySelector('#win').style.display = 'none';
    });

    // Listener for 'lost' popup
    document.querySelector('.try-again').addEventListener('click', function () {
      init();
    });

    document.querySelector('#lose .close').addEventListener('click', function () {
      document.querySelector('#lose').style.display = 'none';
    });

})(this);
