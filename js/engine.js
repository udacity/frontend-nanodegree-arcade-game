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
        hud = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        hudctx = hud.getContext('2d'),
        lastTime;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    hud.width = canvasWidth;
    hud.height = canvasHeight;
    hud.style.position = 'absolute';
    hud.style.marginLeft = -canvasWidth + 'px';

    doc.body.appendChild(canvas);
    doc.body.appendChild(hud);

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
        /* Update function changes the position of the entity, while
         * render draws them out.
         */
        /* Moved the collision function here to check whether player picked
         * up jems or collided with enemies. This function should be moved out
         * into a separate function.
         * Version 1 : game ends if collisions with enemies
         */
        /* This should be refactored out into a separate function later on
         * so that this if else is a separate statement
         */
        if(gameRunning === true) {
            if(checkCollisions(allEnemies)) {
                // End the game if we hit any enemies
                endGame();
                gameRunning = false;
            }
            update(dt);
        }
        renderGame();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        win.requestAnimationFrame(main);
    };

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
     * on the entities themselves within your app.js file). Moved contents
     * of original updateEntities here, since checkCollision function has been
     * moved to the main function to also check for gems. Now, this loops
     * through all the objects within your all Enemies array as defined in
     * app.js and calls all of their update() methods + the player's update()
     * method.
     */
    function update(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    }

    /* updateEntities() content moved into update() method
     */

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function renderGame() {
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
                ctx.drawImage(Resources.get(rowImages[row]), col * blockWidth, row * blockHeight);
            }
        }

        renderEntities();
    }

    /* This function is called by the render function and is called on each game
     * tick. It's purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        player.render();
    }

    function checkCollisions(allColliders) {
        var collided = false;
        allColliders.forEach(function(collider) {
            /* Only start checking enemies that are in the
             * same row. Otherwise, ignore.
             * We add 10 from the player's y coordinate
             * to make up for the earlier adjustments to
             * make sure the player is aligned vertically.
             * this is… terrible.
             */
            if(collider.y === player.y + 10){
                /* if the leftmost coordinate of the player
                 * is between the leftmost and rightmost
                 * coords of the enemy, it's a hit
                 */
                if(collider.x <= player.x && (collider.x + blockWidth) >= player.x){
                    collided = true;
                }
            }
        })
        return collided;
    }

    function endGame() {
        /* Pause all enemies and stop them from running
         */
        allEnemies.forEach(function(enemy) {
            enemy.speed = 0;
        })

        hudctx.fillStyle = '#ffffff';
        hudctx.fillRect ((canvasWidth-330)/2,(canvasHeight-150)/2,330,150);
        hudctx.fillStyle = '#555555';
        hudctx.font = '15px Arial';
        hudctx.textAlign = 'center'
        hudctx.fillText("Game Over. Hit Enter to reset", canvasWidth/2,canvasHeight/2)
        ctx.clearRect(0,0,canvasWidth, canvasHeight);
    }

    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
    function reset() {
        // noop
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0,0,canvasWidth,canvasHeight);

        hudctx.fillStyle = '#ffffff';
        hudctx.globalAlpha = 0.95;
        hudctx.fillRect ((canvasWidth-330)/2,(canvasHeight-150)/2,330,150);
        hudctx.globalAlpha = 1;
        hudctx.fillStyle = '#555555';
        hudctx.font = '15px Arial';
        hudctx.textAlign = 'center'
        hudctx.fillText("New Game. Hit Enter to begin.", canvasWidth/2,canvasHeight/2)
    }

    /* Allows the game to be reset if game is not running.
     */
    document.addEventListener('keyup', function(e) {
        if (gameRunning === false) {
            if(e.keyCode === 13) {
                gameRunning = true;
                ctx.clearRect(0,0,canvasWidth,canvasHeight);
                hudctx.clearRect(0,0,canvasWidth,canvasHeight);
                gameReset();
            }
        }
    })

    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png'
    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developer's can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
})(this);
