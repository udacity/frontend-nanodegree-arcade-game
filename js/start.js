var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');


    canvas.width = 505;
    canvas.height = 606;
    document.body.appendChild(canvas);

    var tileWidth = 101; //x
    var tileHeight = 83;   //y
    var rowCount = 6;
    var columnCount = 5;

    var loadedPlayers = false;
    var choosePlayer = false;

    var lastTime = Date.now();
    var playerLife = 3;
    var gLifeHTML;
    var gScoreHTML;


var enemy1 = new Enemy(0,60);
var enemy2 = new Enemy(50,140);
var enemy3 = new Enemy(400,220);
var enemy4 = new Enemy(550,140);
var allEnemies = [enemy1, enemy2, enemy3, enemy4];
//var allEnemies = [enemy1];

var player = new Player(0,400);
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
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png'
    ]);
    Resources.onReady(initScreen);

    function initScreen(){
        drawScreen();
        var topLine = "ARCADE GAME";
        var bottomLine = "Press any key to start";
        writeText(topLine, bottomLine);
    }


    function writeText(topLine, bottomLine){
      ctx.font = "36pt Impact";
      ctx.textAlign = "center";
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 3;
      if(topLine != null){
       ctx.fillText(topLine ,canvas.width/2,150);
        ctx.strokeText(topLine ,canvas.width/2,150);
      }
      if(bottomLine != null){
        ctx.fillText(bottomLine ,canvas.width/2,canvas.height-150);
        ctx.strokeText(bottomLine ,canvas.width/2,canvas.height-150);
      }
    }

    function drawScreen(){
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

    }

    function drawPlayers(){
        var rowImages = [
            'images/char-boy.png',
            'images/char-cat-girl.png',
            'images/char-horn-girl.png',
            'images/char-pink-girl.png',
            'images/char-princess-girl.png'
            ], rowCnt = 5, col = 100;
         for(var i=0; i<rowCnt; i++){
           ctx.drawImage(Resources.get(rowImages[i]), col * i, 150); 
         }   
        ctx.font = "36pt Impact";
        ctx.textAlign = "center";
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        col = 100;                                                                      
        for(var i=1;i<=rowCnt;i++){
            ctx.fillText(i , col*(i-1) + 50, 350);
            ctx.strokeText(i , col*(i-1) + 50, 350);
        }
    }

    function loadPlayers(){
        console.log("Load players");
        drawScreen();
        drawPlayers();
        var topLine = "ARCADE GAME";
        var bottomLine = "Choose Players!!";
        writeText(topLine, bottomLine);
    }

    function gamestartAnimation(){
        drawScreen();
    }

    function loadChosenPlayer(i, count){
        drawScreen();
        var rowImages = [
            'images/char-boy.png',
            'images/char-cat-girl.png',
            'images/char-horn-girl.png',
            'images/char-pink-girl.png',
            'images/char-princess-girl.png'
            ], rowCnt = 5, col = 100;
        ctx.drawImage(Resources.get(rowImages[i]), 200, 150);  
        var topLine = "ARCADE GAME";  
        var bottomLine = "GAME STARTING... " + count;
        writeText(topLine, bottomLine);
        count -= 1;
        if(supportsLocalStorage){
            saveValue("arcade.player.sprite", rowImages[i]);
        }
        if(count >= 0){
             setTimeout(function(){
                 loadChosenPlayer(i, count);
            }, 1000);
        }else{
            player.setSprite(rowImages[i]);
            gLifeHTML = document.createElement("p");
            gLifeHTML.innerHTML = "Life : " + playerLife;
            gScoreHTML = document.createElement("p");
            gScoreHTML.innerHTML = "Score : " + player.score;
            document.body.appendChild(gLifeHTML);
            document.body.appendChild(gScoreHTML);
            main();
        }
    }
 
    function handleKeyboardEvent(event){
        if(loadedPlayers == false){
            loadedPlayers = true;
            loadPlayers();
        }else if( (loadedPlayers == true)&&(choosePlayer == false)){
            var key = event.keyCode;
            if((key >= 49)&&( key <= 53)){
                choosePlayer = true;
                console.log("Player chosen" + (key - 49 + 1));
                loadChosenPlayer((key - 49), 3);
            }
        }else{
            console.log("Players already loaded" + event.keyCode);
        }
    }

    function supportsLocalStorage(){
            return (('localStorage' in window) && (window.localStorage != null)) 
        }

    function saveValue(key, value) {
            if(!supportsLocalStorage)
                return false;
            localStorage.setItem(key,value);
            return true;
        }



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
        window.requestAnimationFrame(main);
    }


    function update(dt) {
        updateEntities(dt);
        checkCollisions();
    }

    function checkCollisions(){
        allEnemies.forEach(function(enemy) {
            findEnemyBlock(enemy, player);

        });
    }

    function findEnemyBlock(enemy, player){
        var startX = enemy.x - enemy.length/2;
        var endX = enemy.x + enemy.length/2;
        var playerRow = Math.ceil(player.y/tileHeight);
        var enemyRow = Math.ceil(enemy.y/tileHeight);
        if(playerRow == enemyRow){
            if((player.x >= startX) &&(player.x <= endX)){
                console.log("Player = " + player.x + " Enemy = " + enemy.x);
                console.log("Collission occured");
                this.collision = true
                playerLife -= 1;
                gLifeHTML.innerHTML = "Life : " + playerLife;
                if(playerLife <= 0){
                    reset();
                }
                
                player.resetPlayer(); 
            }
        }
    }

    function reset(){

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
        gScoreHTML.innerHTML = "Score : " + player.score;
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
    }

    /* This function is called by the render function and is called on each game
     * tick. Its purpose is to then call the render functions you have defined
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

