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
        if (player.gamePaused === true) {
          renderPauseScreen();
        } else {
          update(dt);
          render();
        }
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
      if (player.level === 0) {
       renderStartScreen();
       renderBorder();
      } else if (player.gamePaused === false) {
       // displays the game tiles, definition is in levelBuilder.js
       renderWorld();
       // invoke renderEntities before ui so monsters display on top layer
       // renderEntities definition is in levelBuilder.js
       renderEntities();
       // render UI above world and entities
       renderBorder();
       // render statistics above the border
       renderStatistics();
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
        'img/ocean_light.png',
        'img/ocean_bubbles.png',
        'img/ocean_deep.png',
        'img/ocean_deep_dark.png',
        'img/aqua_brick.png',
        'img/shore_top.png',
        'img/shore_bottom.png',
        'img/shore_jungle_top.png',
        'img/shore_jungle_bottom.png',
        'img/sand_brick.png',
        'img/sand_light.png',
        'img/sand_bright.png',
        'img/sand_dark.png',
        'img/grass_red.png',
        'img/grass_blue.png',
        'img/grass_yellow.png',
        'img/grass_light.png',
        'img/grass_dark.png',
        'img/grass_jungle.png',
        'img/badlands_green.png',
        'img/badlands_gold.png',
        'img/badlands_yellow.png',
        'img/badlands_orange.png',
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
        'img/ogre_two.png',
        'img/ogre_witch.png',
        'img/cyclops_warrior.png',
        'img/cyclops_officer.png',
        'img/octopus.png',
        'img/jellyfish.png',
        'img/dolphin.png',
        'img/naga_warrior_left.png',
        'img/naga_warrior_right.png',
        'img/naga_mage_left.png',
        'img/naga_mage_right.png',
        'img/naga_rogue_left.png',
        'img/naga_rogue_right.png',
        'img/naga_fighter_left.png',
        'img/naga_fighter_right.png',
        'img/naga_soothsayer_left.png',
        'img/naga_soothsayer_right.png',
        'img/naga_siren_left.png',
        'img/naga_siren_right.png',
        'img/turtle.png',
        'img/spiked_turtle.png',
        'img/eel_left.png',
        'img/eel_right.png',
        'img/anemone.png',
        'img/crocodile.png',
        'img/snake_white_stripe.png',
        'img/gecko.png',
        'img/lizard.png',
        'img/giant_serpent.png',
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
        'img/hero_ninja.png',
        'img/hero_engineer.png',
        'img/tree_gold.png',
        'img/tree_red.png',
        'img/rock.png',
        'img/bell.png'

    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
})(this);
