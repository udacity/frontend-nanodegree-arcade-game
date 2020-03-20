
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
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas element's height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    doc.getElementById('gameContainer').appendChild(canvas);

    // Main main() available globally for use in app.js
    global.main = function() {

        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        update(dt);
        render();

        lastTime = now;

        // Check game isn't in a paused status before requesting new frame
        if(!gameStatus.gameOver && !gameStatus.levelUp) {
            win.requestAnimationFrame(main);
        }
    };

    // Let's go... refactored slightly
    function init() {
        intro.render();
    }

    // Starts game (duh) made global to access from app.js once character selected
    global.startGame = function() {
        lastTime = Date.now();
        main();
    };

    // Update function called from main()
    function update(dt) {
        updateEntities(dt);
        checkCollisions();
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
        player.update();
    }

    // See if player has been eaten by a ladybug (?!)
    function checkCollisions() {
        allEnemies.forEach(function(enemy) {
            if(enemy.y === player.y) {
                if(enemy.x+60 > player.x && enemy.x-60 < player.x) {
                    // gameOver flag generates dialogue box in app.js
                    gameStatus.gameOver = true;
                }
            }
        });
    }

    // Do all the drawing (or rendering, I suppose)
    function render() {

        // Our background images, ordered as displayed
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
        ctx.clearRect(0,0,canvas.width,canvas.height);

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */

        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
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

        // Draw enemies in current location
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        // Draw player in current location
        player.render();

        // Draw scoreboard and display game messages if necessary
        gameStatus.render();
    }

    // Load our images
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-boy.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png',
        'images/Selector.png'
    ]);
    Resources.onReady(init);


    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     */

    global.ctx = ctx;
})(this);
