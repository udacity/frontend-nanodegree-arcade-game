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

var newGameInput, gameStatus, canvas;
var allEnemies = [];
var maxEnemies = 7;
var spawnEnemyTimeouts = [];
var player;
var waterEntity;

var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        ctx,
        lastTime,
        areResourcesLoaded,
        isGameOver;

    // Global debug draw bool (collision rects)
    Entity.debugDrawEnabled = false;

    newGameInput = doc.createElement('input');
    newGameInput.setAttribute('id', 'NewGameInput');
    newGameInput.setAttribute('type', 'button');
    newGameInput.setAttribute('value', 'NEW GAME');
    newGameInput.onclick = startGame;

    gameStatus = doc.createElement('div');
    gameStatus.setAttribute('id', 'GameStatus');

    canvas = doc.createElement('canvas');
    canvas.width = 505;
    canvas.height = 606;
    ctx = canvas.getContext('2d');

    doc.body.appendChild(newGameInput);
    doc.body.appendChild(gameStatus);
    doc.body.appendChild(canvas);

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function startGame() {

        if (!areResourcesLoaded) {
            return;
        }

        reset();
        insertEnemies();
        player.enabled = true;
        lastTime = Date.now();
        main();
    }

    /*
     * Called when the user hits an enemy or water
     */
    function endGame(didPlayerWin) {

        while (spawnEnemyTimeouts.length > 0) {
            clearTimeout(spawnEnemyTimeouts.shift());
        }

        isGameOver = true;

        if (didPlayerWin) {
            gameStatus.classList = ['win'];
            gameStatus.innerText = 'YOU WIN!!';
        }
        else {
            gameStatus.classList = ['lose'];
            gameStatus.innerText = 'YOU LOSE!!';
        }

        render();
    }

    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
    function reset() {

        while (spawnEnemyTimeouts.length > 0) {
            clearTimeout(spawnEnemyTimeouts.shift());
        }

        allEnemies = [];
        gameStatus.innerText = '';
        isGameOver = false;
        player = new Player(5, 2);
        waterEntity = new Entity({
            collisionOffsetX: 10,
            collisionOffsetY: 60,
            collisionWidth: canvas.width - 20,
            collisionHeight: 63
        });
    }

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
        render();
        update(dt);

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        if (!isGameOver) {
            win.requestAnimationFrame(main);
        }
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

        // Remove any enemies that have gone off screen
        while (Enemy.scheduleToRemove.length > 0) {
            allEnemies.splice(allEnemies.indexOf(Enemy.scheduleToRemove.shift()), 1);
        }
    }

    /*
     * Check for collision with enemies and end the game
     */
    function checkCollisions() {
        var enemy = null;
        if (allEnemies.length > 0) {
            var i, n = allEnemies.length;
            for (i = 0; i < n; ++i) {
                if (player.detectCollision(allEnemies[i])) {
                    enemy = allEnemies[i];
                    break;
                }
            }
        }

        if (enemy) {
            endGame(false);
        }
        else if (player.detectCollision(waterEntity)) {
            endGame(true);
        }
    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {
        clearCtx();

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
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        renderEntities();

        if (isGameOver) {
            ctx.save();
            ctx.fillStyle = 'rgba(0,0,0,0.4)';
            ctx.fillRect(0, 50, canvas.width, canvas.height - 70);
            ctx.restore();
        }
    }

    /* This function is called by the render function and is called on each game
     * tick. Its purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
        player.render();
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });
    }

    function clearCtx() {
        ctx.save();
        ctx.fillStyle = '#FFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
    }

    function insertEnemy (row) {

        var timeToWait = range(1000, 4000); // 1-4 seconds
        spawnEnemyTimeouts[row - 1] = setTimeout(insertEnemy.bind(null, row), timeToWait);

        // BAIL!
        if (allEnemies.length >= maxEnemies) { return; }

        var enemy = new Enemy(row);
        allEnemies.push(enemy);
    }

    function insertEnemies () {

        // Spawn a few enemies so you can't just run to the end
        for (var i = 1, n = 4; i < n; ++i) {
            var enemy = new Enemy(i);
            enemy.xPos = range(0, canvas.width / 2);
            allEnemies.push(enemy);
        }

        // Spawn with timer
        insertEnemy(1);
        insertEnemy(2);
        insertEnemy(3);
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
        'images/char-boy.png'
    ]);
    Resources.onReady(function () {
        areResourcesLoaded = true;
        reset();
        render();
    });

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;

})(this);
