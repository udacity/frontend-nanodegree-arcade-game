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
        gameArea = doc.createElement('div'),
        musicButton = doc.createElement('button'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 704;
    canvas.height = 896;

    doc.body.appendChild(gameArea);
    $(gameArea).append(canvas);
    $(gameArea).append(musicButton);


    gameArea.setAttribute("id", "game-area");
    canvas.setAttribute("id", "game-canvas");
    musicButton.setAttribute("id", "music-btn");
    $(musicButton).text("Music On/Off");


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
        // checkCollisions();
    }

    /* This is called by the update function and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {
        //allEnemies.forEach(function(enemy) {
        //    enemy.update(dt);
        //});
        if (player.level === 1) {
          levelOne.forEach(function(enemy) {
            enemy.update(dt);
          });
        } else if (player.level === 2) {
          levelTwo.forEach(function(enemy) {
            enemy.update(dt);
          });
        } else if (player.level === 3) {
          levelThree.forEach(function(enemy) {
            enemy.update(dt);
          });
        } else if (player.level === 4) {
          levelFour.forEach(function(enemy) {
            enemy.update(dt);
          });
        } else if (player.level === 5) {
          levelFive.forEach(function(enemy) {
            enemy.update(dt);
          });
        } else if (player.level === 6) {
          levelSix.forEach(function(enemy) {
            enemy.update(dt);
          });
        }
        player.update();
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
        var rowImages = [];
            if (player.level == 1) {
              rowImages = [
                  'img/grass_light.png',   // Top Row
                  'img/grass_dark.png', // Row 2
                  'img/grass_dark.png', // Row 3
                  'img/grass_dark.png', // Row 4
                  'img/grass_light.png', // Row 5
                  'img/grass_light.png' // Row 6 Starting location
              ];
            } if (player.level == 2) {
              rowImages = [
                  'img/sand_light.png',   // Top Row - Advances to next level
                  'img/grass_red.png', // Row 2 - Centipedes
                  'img/grass_blue.png', // Row 3 - Roaches
                  'img/grass_yellow.png', // Row 4 - Spiders
                  'img/grass_light.png', // Row 5
                  'img/grass_light.png' // Row 6 Starting location
              ];
            } else if (player.level == 3) {
              rowImages = [
                  'img/rock_path.png',   // Top row
                  'img/sand_brick.png',   // Row 2
                  'img/sand_brick.png',   // Row 3
                  'img/sand_brick.png',   // Row 4
                  'img/sand_light.png',   // Row 5
                  'img/sand_light.png'    // Row 6 - Bottom Row
              ];
            } else if (player.level == 4) {
              rowImages = [
                  'img/rock_path.png',   // Top row
                  'img/sand_dark.png',  // Row 2
                  'img/sand_dark.png',   // Row 3
                  'img/sand_dark.png',   // Row 4
                  'img/sand_light.png',   // Row 5
                  'img/rock_path.png',    // Row 6 - Bottom Row
              ];
            } else if (player.level == 5) {
              rowImages = [
                  'img/grass_dark.png',   // Top row
                  'img/grey_brick.png',  // Row 2
                  'img/grey_brick.png',   // Row 3
                  'img/grey_brick.png',   // Row 4
                  'img/grey_brick.png',   // Row 5
                  'img/rock_path.png'    // Row 6 - Bottom Row
              ];
            } else if (player.level == 6) {
              rowImages = [
                  'img/grass_light.png',        // Top row
                  'img/grass_red.png',    // Row 2
                  'img/grass_yellow.png', // Row 3
                  'img/grass_blue.png',   // Row 4
                  'img/grass_dark.png',  // Row 5
                  'img/grass_light.png'    // Row 6 - Bottom Row
              ];
            }

        var  numRows = 6,
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
                ctx.drawImage(Resources.get(rowImages[row]), (col * 128) + 32, (row * 128) + 64);
            }
        }

        // call renderEntities before ui so monsters to under UI
        renderEntities();

        // UI outline section ///////////////
        //draw top side
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 672, 64);

        // draw bottom side
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.fillRect(32, 830, 672, 896);

        // draw left side
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 32, 896);

        // draw right side
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.fillRect(672, 0, 704, 896);


        // UI statistics section //////////
        // Draw name
        ctx.font = '24pt Impact';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        ctx.strokeText('Dungeon Crawl', 250, 40);
        ctx.fillStyle = 'white';
        ctx.fillText('Dungeon Crawl', 250, 40);
        // Draw line underneath
        ctx.beginPath();
        ctx.moveTo(230, 48);
        ctx.lineTo(470, 48);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 5;
        ctx.stroke();



        // draw level
        ctx.font = '18pt Arial';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        ctx.strokeText('Level: ' + player.level, 580, 40);
        ctx.fillStyle = 'yellow';
        ctx.fillText('Level: ' + player.level, 580, 40);

        // draw score
        ctx.font = '18pt Arial';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        ctx.strokeText('Score: ' + player.score, 20, 40);
        ctx.fillStyle = 'yellow';
        ctx.fillText('Score: ' + player.score, 20, 40);

        // draw lives ///////////////////////////
        // TODO maybe make this into a loop?
        ctx.font = '24pt Arial';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        ctx.strokeText('Lives:', 36, 875);
        ctx.fillStyle = 'red';
        ctx.fillText('Lives:', 36, 875);
        if (player.lives === 1) {
         ctx.drawImage(Resources.get('img/heart.png'), 110, 832);
        } else if (player.lives === 2) {
         ctx.drawImage(Resources.get('img/heart.png'), 110, 832);
         ctx.drawImage(Resources.get('img/heart.png'), 135, 832);
        } else if (player.lives === 3) {
         ctx.drawImage(Resources.get('img/heart.png'), 110, 832);
         ctx.drawImage(Resources.get('img/heart.png'), 135, 832);
         ctx.drawImage(Resources.get('img/heart.png'), 160, 832);
       } else if (player.lives === 4) {
         ctx.drawImage(Resources.get('img/heart.png'), 110, 832);
         ctx.drawImage(Resources.get('img/heart.png'), 135, 832);
         ctx.drawImage(Resources.get('img/heart.png'), 160, 832);
         ctx.drawImage(Resources.get('img/heart.png'), 185, 832);
       } else if (player.lives === 5) {
         ctx.drawImage(Resources.get('img/heart.png'), 110, 832);
         ctx.drawImage(Resources.get('img/heart.png'), 135, 832);
         ctx.drawImage(Resources.get('img/heart.png'), 160, 832);
         ctx.drawImage(Resources.get('img/heart.png'), 185, 832);
         ctx.drawImage(Resources.get('img/heart.png'), 210, 832);
       }
    }


    /* This function is called by the render function and is called on each game
     * tick. Its purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {

        // renders the enemies for each level
        // each level's array name begins with 'all'
        if (player.level === 1) {
          levelOne.forEach(function(enemy) {
            enemy.render();
          });
        } else if (player.level === 2) {
          levelTwo.forEach(function(enemy) {
            enemy.render();
          });
        } else if (player.level === 3) {
          levelThree.forEach(function(enemy) {
            enemy.render();
          });
        } else if (player.level === 4) {
          levelFour.forEach(function(enemy) {
            enemy.render();
          });
        } else if (player.level === 5) {
          levelFive.forEach(function(enemy) {
            enemy.render();
          });
        } else if (player.level === 6) {
          levelSix.forEach(function(enemy) {
            enemy.render();
          });
        }

        player.render();
    }

    //////////////////////////////////////////////////////////////////////
    // Props to "Audio Play Pause Mute Buttons Tutorial" for helping me
    // create the functionality behind the music/on off button
    // Source: http://tinyurl.com/pauseplaysource
    var audio, playbtn;
    function initAudioPlayer(){
    	audio = new Audio();
      // soundtrack source: Edward Shallow
      // url= http://freemusicarchive.org/music/Edward_Shallow/
    	audio.src = "sounds/Edward_Shallow_The_Infinite_Railroad.mp3";
    	audio.loop = true;
    	audio.pause();
    	// Set object references
    	playbtn = document.getElementById("music-btn");

    	playbtn.addEventListener("click", playPause);

    	function playPause(){
    		if(audio.paused){
    		    audio.play();
    	    } else {
    		    audio.pause();
    	    }
    	}
    }
    window.addEventListener("load", initAudioPlayer);

    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
     function reset() {
       // noop
    }

    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    /////////////////////////////////////////////////////////////////
    // All sprites for this game came from one tileset
    // Source: OpenArt.org
    // url='http://opengameart.org/content/dungeon-crawl-32x32-tiles'
    // Note: All images added to game must be called by Resources.load()
    Resources.load([
        'img/heart.png',
        'img/grey_brick.png',
        'img/rock_path.png',
        'img/ocean.png',
        'img/sand_brick.png',
        'img/sand_light.png',
        'img/sand_dark.png',
        'img/grass_red.png',
        'img/grass_blue.png',
        'img/grass_yellow.png',
        'img/grass_light.png',
        'img/grass_dark.png',
        'img/snail.png',
        'img/scorpion.png',
        'img/beetle.png',
        'img/centipede.png',
        'img/roach.png',
        'img/spider.png',
        'img/hornet.png',
        'img/firefly.png',
        'img/moth.png',
        'img/goblin_fighter.png',
        'img/goblin_warrior.png',
        'img/goblin_mage.png',
        'img/goblin_sorc.png',
        'img/worg_warrior.png',
        'img/worg_mage.png',
        'img/worg_rogue.png',
        'img/elf_warrior.png',
        'img/elf_mage.png',
        'img/elf_priest.png',
        'img/elf_necromancer.png',
        'img/hero_knight.png'
    ]);
    Resources.onReady(init);

    //$(document).ready(function() {
    //  $('#music-btn').click(function() {

    //  var soundfile = new Audio('sounds/Edward_Shallow_The_Infinite_Railroad.mp3');

    //  global.soundtrack = soundfile;

    //  if (global.soundtrack.paused) {
    //    global.soundtrack.play();
    //  } else {
    //    global.soundtrack.pause();
    //  }
    //  });
    //});

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
})(this);
