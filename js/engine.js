
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

    canvas.width = 505;
    canvas.height = 606;
    doc.getElementById('gameContainer').appendChild(canvas);

    // Main main() available globally for use in app.js
    global.main = function() {

        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        update(dt);
        render();

        lastTime = now;

        // Check game isn't in a paused status before requesting new frame
        if(!gamestatus.gameOver && !gamestatus.levelUp) {
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

    // Move enemies and check to see if player has 'won'
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
                    gamestatus.gameOver = true;
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

        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        // Call function to draw our remaining assets
        renderEntities();
    }

    // Draw our player, enemies and other game statuses on top of the background 'level'
    function renderEntities() {

        // Draw enemies in current location
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        // Draw player in current location
        player.render();

        // Draw scoreboard and display game messages if necessary
        gamestatus.render();
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

    // Make ctx globally accessible
    global.ctx = ctx;
})(this);
