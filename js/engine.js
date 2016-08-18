/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available to make writing app.js
 * a little simpler to work with.
 */

/* For the instruction modal: */

 // Get the modal.
 var modal = document.getElementById("myModal");

 // Get the button that opens the modal.
 var btn = document.getElementById("myBtn");

 // Get the <span> element that closes the modal.
 var span = document.getElementsByClassName("close")[0];

 // When the user clicks the button, open the modal.
 btn.onclick = function() {
     modal.style.display = "block";
 }

 // When the user clicks on <span> (x), close the modal.
 span.onclick = function() {
     modal.style.display = "none";
 }

 // When the user clicks anywhere outside of the modal, close the modal.
 window.onclick = function(event) {
     if (event.target == modal) {
         modal.style.display = "none";
     }
 }

var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    var game = doc.getElementById('game');
    console.log(game);

    canvas.width = 505;
    canvas.height = 606;
    game.appendChild(canvas);

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
        win.requestAnimationFrame(main);
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
     * of the functions which may need to update entity's data. Also, call
     * collision detection methods.
     */
    function update(dt) {
        updateEntities(dt);
        player.checkCollisions(allEnemies);
        player.checkStarCollisions(allStars);
    }

    /* This is called by the update function and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to the object.
     */
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine).
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

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid."
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

        //Display the score.
        ctx.fillStyle="#31383B";
        ctx.font = '16pt sans-serif';
        ctx.fillText("Score: " + player.score, 405, 100);

        //Display instructions for changing the character.
        ctx.font = '10pt sans-serif';
        ctx.fillText("Press c for cat, p for princess and b for boy", 10, 550);
    }

    /* This function is called by the render function and is called on each game
     * tick. Its purpose is to then call the render functions defined
     * on enemy and player entities within app.js.
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function.
         */
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        player.render();

        allStars.forEach(function(star) {
            star.render();
        });
    }

    /*
     * Handle game reset states. Resets the elements of the game:
     * enemies, player, and stars.
     * It's only called once by the init() method.
     */
    function reset() {
      var enemy1 = new Enemy();
      var enemy2 = new Enemy();
      var enemy3 = new Enemy();

      allEnemies = [enemy1, enemy2, enemy3];

      player = new Player();

      var star1 = new Star();
      var star2 = new Star();
      var star3 = new Star();

      allStars = [star1, star2, star3];
    }

    var resetButton = document.getElementById("reset");

    resetButton.onclick = function() {
        reset();
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
        'images/char-cat-girl.png',
        'images/char-princess-girl.png',
        'images/Star.png'
    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
})(this);
