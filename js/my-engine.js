/* EN: my-engine.js is based on the engine.js provided by Udacity.
 * My comments (Ekaterina Nikonova) begin with 'EN'.
 * Major changes:
 * - function drawCanvas() is added for building canvas that fits all viewports
 * - ctx.scale() is used in the render() function to make elements match
 * the dimensions of the canvas
 * - background is rendered using the renderBackground() function that
 * chooses random columns to replace their top blocks with water and updates
 * the water pattern according to the value of waterLife
 * - added global vars to be used in app.js (ratio, level, dt, waterBlocks)
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
    ratio, //EN: scale ratio for canvas and entities (depends on viewport)
    lastTime;

    /*
    * EN: The number of water blocks (waterNum) and how long (waterLife,
    * in seconds) they remain in one place, depends on the level.
    */
  var updateBgTime = 0, //EN: timer for changing background pattern
    waterNum, //EN: number of water blocks (depends on level)
    waterBlocks, //EN: array with indexes of columns containing water
    waterLife, //EN: how long (in seconds) water blocks stay in one place
    /*
     * EN: TODO algorithm for defining the level
     */
    level = 5;

  /*
   * EN: Based on the level, we define the number of water blocks, their
   * initial pattern and how often the pattern changes.
   */

  switch (level) {
    case 2:
    waterNum = 4;
    waterBlocks = [0, 2, 4, 6];
    waterLife = 8;
    break;
    case 3:
    waterNum = 5;
    waterBlocks = [0, 2, 3, 4, 6];
    waterLife = 5;
    break;
    case 4:
    waterNum = 5;
    waterBlocks = [1, 2, 3, 4, 5];
    waterLife = 4;
    break;
    case 5:
    waterNum = 6;
    waterBlocks = [0, 1, 2, 4, 5, 6];
    waterLife = 3;
    break;
    default: //EN: Level 1
    waterNum = 2;
    waterBlocks = [1, 5];
    waterLife = 10;
  };

  /*
   * EN: The initial canvas dimensions are 851 by 730 px, it looks best in the
   * 1440 by 900 px viewport. The size of the canvas is changed according to
   * the real viewport, and the ratio is returned to be used for rendering
   * graphic assets.
   */
  function drawCanvas(c, ctx) {
    c.width = '851';
    c.height = '730';
    /*
     * EN: If the viewport is narrower than 700 px, side margins are decreased
     * and the reference width is 950 px, otherwise it's 1400 px.
     */
    var refWidth = window.innerWidth < 700 ? 950 : 1400;
    var refHeight = 900;
    /*
     * EN: To make sure that the canvas fits the screen both horizontally and
     * vertically, we choose the dimension that differs the most from the
     * reference.
     */
    var ratio = Math.min(window.innerWidth / refWidth, window.innerHeight / refHeight);
    c.width *= ratio;
    c.height *= ratio;
    return ratio;
  }

  ratio = drawCanvas(canvas, ctx);

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
      global.dt = dt; //EN: to be used for animations in app.js

    /* Call our update/render functions, pass along the time delta to
     * our update function since it may be used for smooth animation.
     */
    update(dt);
    render(dt);

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
    for (var row = 0; row < 3; row++) {
      for (var num1 = 0; num1 < allEnemies[row].length; num1++) {
        for (var num2 = 0; num2 < allEnemies[row].length; num2++) {
          if (num1 !== num2) {
            allEnemies[row][num1].checkCollisions(allEnemies[row][num2]);
          }
        }
      }
      allEnemies[row].forEach(function(enemy) {
        enemy.update(dt, canvas);
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

  /*
   * EN: The render() function now takes the 'dt' parameter to make the
   * background dynamic.
   */
  function render(dt) {
    /*
     * EN: Have to redraw the background at every tick, otherwise it is
     * impossible to maintain transparency, since pixels are drawn on top
     * of each other and the background soon becomes opaque.
     */
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(205, 255, 255, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    /* This array holds the relative URL to the image used
     * for that particular row of the game level.
     */
    var rowImages = [
      'images/stone-block-green.png',   // EN: 'Safe' stones
      'images/stone-block.png',   // Row 1 of 3 of stone
      'images/stone-block.png',   // Row 2 of 3 of stone
      'images/stone-block.png',   // Row 3 of 3 of stone
      'images/grass-block.png',   // Row 1 of 1 of grass
    ],
    numRows = 5,
    numCols = 7,
    row, col;

    function renderBackground() {
      /*
      * EN: We randomly choose columns (number = waterNum) and replace their top
      * with a water-block. This happens when updateBgTime reaches waterLife
      * limit.
      */
      if (updateBgTime > waterLife) {
        waterBlocks = [];
        while (waterBlocks.length < waterNum) {
          var rnd = parseInt((Math.random() * 6).toFixed());
          if (!waterBlocks.includes(rnd)) {
            waterBlocks.push(rnd);
          }
        }
        updateBgTime = 0;
      }
      global.waterBlocks = waterBlocks; //EN: to be used in app.js to detect when the character 'dies'
        for (row = 0; row < numRows; row++) {
          for (col = 0; col < numCols; col++) {
            /* The drawImage function of the canvas' context element
             * requires 3 parameters: the image to draw, the x coordinate
             * to start drawing and the y coordinate to start drawing.
             * We're using our Resources helpers to refer to our images
             * so that we get the benefits of caching these images, since
             * we're using them over and over.
             */
            ctx.scale(ratio, ratio);
            /*
             * EN: To place the background in the center of the canvas, we
             * start drawing from the (72, 162) point. The actual coordinates
             * will be calculated using the ratio. In the end of each cycle,
             * the scale is reset.
             */
            var block = Resources.get(rowImages[row]);
            if (row === 0 && waterBlocks.includes(col)) {
              block = Resources.get('images/water-block.png');
            }
            ctx.drawImage(block, 72 + col * 101, 162 + row * 83);
            ctx.scale(1 / ratio, 1 / ratio);
          }
        }

      updateBgTime += dt;
    };
    renderBackground();
    renderEntities();
  }

  /* This function is called by the render function and is called on each game
   * tick. Its purpose is to then call the render functions you have defined
   * on your enemy and player entities within app.js
   */
  function renderEntities() {
    /* Loop through all of the objects within the allEnemies array and call
     * the render function you have defined.
     */
    allEnemies.forEach(function(row) {
      row.forEach(function(enemy) {
        enemy.render(ratio);
      });
    })

    player.render(ratio);
  }

  /* This function does nothing but it could have been a good place to
   * handle game reset states - maybe a new game menu or a game over screen
   * those sorts of things. It's only called once by the init() method.
   */
  function reset() {
  }

  /* Go ahead and load all of the images we know we're going to need to
   * draw our game level. Then set init as the callback method, so that when
   * all of these images are properly loaded our game will start.
   */
  Resources.load([
    'images/stone-block-green.png',
    'images/stone-block.png',
    'images/water-block.png',
    'images/grass-block.png',
    'images/enemy-bug.png',
    'images/brown-bug.png',
    'images/blue-bug.png',
    'images/red-bug.png',
    'images/rainbow-bug.png',
    'images/char-boy.png',
    'images/char-horn-girl.png'
  ]);
  Resources.onReady(init);

  /* Assign the canvas' context object to the global variable (the window
   * object when run in a browser) so that developers can use it more easily
   * from within their app.js files.
   */
  global.ctx = ctx;
  global.ratio = ratio;
  global.level = level;
  global.canvas = canvas;
})(this);
