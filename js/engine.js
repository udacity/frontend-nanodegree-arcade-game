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

    // set game area dimensions
    // Dungeon Frogger is set to a 128x128 grid
    canvas.width = 960;
    canvas.height = 896;

    // add game display elements to html document
    doc.body.appendChild(gameArea);
    $(gameArea).append(canvas);

    gameArea.setAttribute("id", "game-area");
    canvas.setAttribute("id", "game-canvas");

    /*
    // display music button
    $(gameArea).append(musicButton);
    musicButton.setAttribute("id", "music-btn");
    $(musicButton).text("Music On/Off");
    // add functionality to music button
    window.addEventListener("load", initAudioPlayer);
    */


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
        player.startSound.play();
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
    }

    /* This is called by the update function and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to the object. Do your drawing in your
     * render methods.
     */

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {

      // draw ui border

      // draw ui top
      //var  numTopRows = 11,
      //     topRow;
      //     for (topRow = 0; topRow < numTopRows; topRow++) {
      //      ctx.drawImage(Resources.get('img/grey_border_block.png'), (topRow * //64), 0);
      //     }
      //
      // draw ui left



      // First, render start screen
      if (player.level === 0) {
        // Draw main background
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 960, 896);

        // Draw game name
        ctx.font = '56pt Impact';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        ctx.strokeText('Dungeon Dash', 260, 150);
        ctx.fillStyle = 'yellow';
        ctx.fillText('Dungeon Dash', 260, 150);
        // Draw line underneath game name
        ctx.beginPath();
        ctx.moveTo(230, 162);
        ctx.lineTo(730, 162);
        ctx.strokeStyle = 'yellow';
        ctx.lineWidth = 5;
        ctx.stroke();

        // select class message
        ctx.font = '36pt Ravi Prakash';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        ctx.strokeText('Select your class:', 320, 228);
        ctx.fillStyle = 'red';
        ctx.fillText('Select your class:', 320, 228);

        // select class instructions
        ctx.font = '24pt Ravi Prakash';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        ctx.fillStyle = 'white';
        ctx.strokeText('Use left or right keys to switch classes', 260, 600);
        ctx.fillText('Use left or right keys to switch classes', 260, 600);
        // press enter instructions
        ctx.strokeText('Press enter to choose a class', 320, 670);
        ctx.fillText('Press enter to choose a class', 320, 670);

        // Draw class box
        ctx.beginPath();
        ctx.fillStyle = "grey";
        ctx.fillRect(380, 240, 180, 200);
        // draw class sprite
        ctx.drawImage(Resources.get(player.sprite), 402, 270)

        // draw class name section
        // set class name font style
        ctx.font = '20pt Impact';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        ctx.fillStyle = 'yellow';
        // conditional to align class names characters 10+ long
        if (player.classes[player.classIndex].className.length >= 10) {
         ctx.strokeText(player.classes[player.classIndex].className, 400, 424);
         ctx.fillText(player.classes[player.classIndex].className, 400, 424);

         // conditional to align class names characters 8+ long
        } else if (player.classes[player.classIndex].className.length
          >= 8) {
          ctx.strokeText(player.classes[player.classIndex].className, 404, 424);
          ctx.fillText(player.classes[player.classIndex].className, 404, 424);

          // conditional to align class names characters 7 characters long
        } else if (player.classes[player.classIndex].className.length
          === 7) {
          ctx.strokeText(player.classes[player.classIndex].className, 416, 424);
          ctx.fillText(player.classes[player.classIndex].className, 416, 424);

          // conditional to align class names characters 5-6 long
        } else if (player.classes[player.classIndex].className.length
          >= 5) {
          ctx.strokeText(player.classes[player.classIndex].className, 430, 424);
          ctx.fillText(player.classes[player.classIndex].className, 430, 424);

          // conditional to align class names characters 4- short
        } else {
          ctx.strokeText(player.classes[player.classIndex].className, 440, 424);
          ctx.fillText(player.classes[player.classIndex].className, 440, 424);
        }
        // end start screen rendering
        ////////////////////////////////////////////////////////////////////
        // begin game render conditions
      } else {
          // displays the game tiles, definition is in levelBuilder.js
          renderWorld();
          // call renderEntities before ui so monsters display on top layer
          renderEntities();

          // UI outline section ///////////////
          //draw ui background top side
          // ctx.beginPath();
          // ctx.fillStyle = "black";
           //ctx.fillRect(0, 0, 672, 64);

           // draw ui background top left side
          var  numTopLeftCols = 5,
                topLeftCol;
                for (topLeftCol = 0; topLeftCol < numTopLeftCols; topLeftCol++) {
                  ctx.drawImage(Resources.get('img/grey_border_block.png'), (topLeftCol * 64), 0);
                }

           // draw ui background top right side
          var  numTopLeftCols = 5,
                topLeftCol;
                for (topLeftCol = 0; topLeftCol < numTopLeftCols; topLeftCol++) {
                  ctx.drawImage(Resources.get('img/grey_border_block.png'), (topLeftCol * 64) + 640, 0);
                }

          // draw ui background bottom side
           ctx.beginPath();
           ctx.fillStyle = "black";
           ctx.fillRect(0, 830, 906, 896);

          // draw ui left
           var  numLeftRows = 24,
                leftRow;
                for (leftRow = 0; leftRow < numLeftRows; leftRow++) {
                ctx.drawImage(Resources.get('img/grey_border_block_small.png'), 0, (leftRow * 32) + 64);
              }

          // draw ui right
          var  numRightRows = 24,
              rightRow;
              for (rightRow = 0; rightRow < numRightRows; rightRow++) {
                ctx.drawImage(Resources.get('img/grey_border_block_small.png'), 928, (rightRow * 32) + 64);
              }

        ctx.drawImage(Resources.get('img/gate_three_blocks.png'), 320, 0);
          // draw left side
          //ctx.beginPath();
          //ctx.fillStyle = "black";
          //ctx.fillRect(0, 0, 32, 896);
          // draw right side
          //ctx.beginPath();
          //ctx.fillStyle = "black";
          //ctx.fillRect(672, 0, 704, 896);

          // UI statistics section //////////
          // Draw name
          //ctx.font = '24pt Impact';
          //ctx.strokeStyle = 'black';
          //ctx.lineWidth = 3;
          //ctx.strokeText('Dungeon Dash', 255, 40);
          //ctx.fillStyle = 'white';
          //ctx.fillText('Dungeon Dash', 255, 40);
          // Draw line underneath
          //ctx.beginPath();
          //ctx.moveTo(230, 48);
          //ctx.lineTo(470, 48);
          //ctx.strokeStyle = 'white';
          //ctx.lineWidth = 5;
          //ctx.stroke();



          // draw level background
          ctx.beginPath();
          ctx.fillStyle = "black";
          ctx.fillRect(854, 14, 90, 38);
          // draw level text
          ctx.font = '18pt Impact';
          ctx.strokeStyle = 'black';
          ctx.lineWidth = 3;
          ctx.strokeText('Level: ' + player.level, 860, 40);
          ctx.fillStyle = 'yellow';
          ctx.fillText('Level: ' + player.level, 860, 40);

          // draw score background
          ctx.beginPath();
          ctx.fillStyle = "black";
          ctx.fillRect(14, 14, 124, 38);
          // draw score text
          ctx.font = '18pt Impact';
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
    }


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
        'img/grey_border_block.png',
        'img/grey_border_block_small.png',
        'img/gate_three_blocks.png',
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
        'img/ant_worker.png',
        'img/ant_soldier.png',
        'img/mosquito.png',
        'img/larva_orange.png',
        'img/larva_grey.png',
        'img/brain_bug.png',
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
        'img/centaur_archer_orange.png',
        'img/centaur_archer_red.png',
        'img/centaur_xbow_brown.png',
        'img/centaur_xbow_grey.png',
        'img/hero_knight.png',
        'img/hero_sorceress.png',
        'img/hero_mage.png',
        'img/hero_scribe.png',
        'img/hero_templar.png',
        'img/hero_oracle.png',
        'img/hero_priest.png',
        'img/hero_monk.png',
        'img/hero_rogue.png',
        'img/hero_enchantress.png',
        'img/hero_paladin.png',
        'img/hero_berserker.png',
        'img/tree_1.png'

    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
})(this);
