var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');


    canvas.width = 505;
    canvas.height = 606;
    document.body.appendChild(canvas);

    var tileWidth = 101; //x
    var tileHeight = 83;   //y
    var rowCount = 6;
    var columnCount = 5;

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
        drawScreen();
        drawPlayers();
        var topLine = "ARCADE GAME";
        var bottomLine = "Choose Players!!";
        writeText(topLine, bottomLine);
    }
 
