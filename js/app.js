var map = {
    rowHeight : 83,  //hight of cell
    colWidth : 101,  //width of cell
    cellPaddingTop : 50,   //top, transparent part of cell
    cellPaddingBottom : 38};
(function(){
    var map = {
    rowImages : [],
    rowHeight : 83,  //hight of cell
    colWidth : 101,  //width of cell
    cellPaddingTop : 50,   //top, transparent part of cell
    cellPaddingBottom : 38,   //bottom, extra texture of cell
    render : function() {
        var numRows = 6,
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
                ctx.drawImage(Resources.get(map.rowImages[row]), col * map.colWidth, row * map.rowHeight - map.cellPaddingTop);
            }
        }
    }
};

    function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



var Enemy = function() {
       this.init()
};

Enemy.prototype.init = function() {
    this.setStartCol(); //set this.x
    this.generateRow(1,3); //set this.y
    this.generateSpeed();   //set this.speed
}

Enemy.prototype.sprite = 'images/enemy-bug.png';
/*this generates a */
Enemy.prototype.generateRow = function(min, max) {
    this.y = getRandomInt(min-1, max-1) * map.rowHeight;
};
Enemy.prototype.setStartCol = function() {
    this.x = 0 - map.colWidth;  //put before map
};
Enemy.prototype.generateSpeed = function() {
    this.speed = getRandomInt(1,3); //slow 1x, normal 2x, fast 3x
};
Enemy.prototype.isBefore = function(enemy) {
    var result = enemy.x < this.x ? true : false;
    return result;
};

Enemy.prototype.checkCollision = function(index) {
    var current = this;
    allEnemies.forEach(function(enemy,index2) {
        if (index2 >= index &&   //uncheck enemy
            current !== enemy &&   //different enemy
            current.y === enemy.y &&  //same row
            Math.abs(current.x - enemy.x) < map.colWidth    //has contact
           ) {
            if (current.isBefore(enemy)) {
                current.optimaseDistance(enemy);
                current.switchSpeed(enemy);
            } else {
                enemy.optimaseDistance(current);
                enemy.switchSpeed(current);
            }
        }
    });
}
Enemy.prototype.switchSpeed = function(enemy) {
    var currentSpeed = this.speed;
    this.speed = enemy.speed;
    enemy.speed = currentSpeed;
}
Enemy.prototype.optimaseDistance = function(folower) {
    folower.x = this.x - map.colWidth;
}
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt, index) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x >= map.colWidth*5) { //bug left the screen
            this.init();
        } else {
            this.x += map.colWidth * dt * this.speed;
        }
    this.checkCollision(index);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function(sprite, column, row) {
    this.sprite = sprite;
    this.x = map.colWidth * column;    //zero based
    this.y = map.rowHeight * row;   //zero based
};
Player.prototype.reset =function(){
    this.y = map.rowHeight * 4;
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.update = function() {
};
Player.allSprites = [
            'images/char-boy.png',
            'images/char-cat-girl.png',
            'images/char-horn-girl.png',
            'images/char-pink-girl.png',
            'images/char-princess-girl.png'
        ];
Player.prototype.handleInput = function(direction) {
    switch(direction) {
        case 'left':
            if (this.x > 0) {           //not on first coll
                this.x -= map.colWidth;
            }
            break;
        case 'right':
            if (this.x < map.colWidth * 4) {  //not on last col
                this.x += map.colWidth;
            }
            break;
        case 'up':
            if (this.y > 0) {      //under the bridge
                this.y -= map.rowHeight;
            }
            break;
        case 'down':
            if (this.y < map.rowHeight * 4) {        //last row
                this.y += map.rowHeight;
            }
        }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    allStages[currentStage].allowedKeys[e.keyCode]();
});
var player = new Player();
var allPlayers = [];
var allEnemies = [];
var createEnemies = setInterval(function(){
    allEnemies.push(new Enemy());
    if (allEnemies.length === 4 ) {
        clearInterval(createEnemies);
    }
}, 400);
 function nextStage() {
     currentStage++;
     allStages[currentStage].init();
 }
    var currentStage = 0;
    var createAllPlayers = function(row) {
        var row = row || 0;
        var player;
        for (i = 0; i < 5; i++) {
            player = new Player(Player.allSprites[i], i, row);
            allPlayers.push(player);
        }
    }
    var Text = function(text, x, y, color){
        this.text = text;
        this.x = x || 0;
        this.y = y || 0;
        this.color = color || 'white';
    }
    Text.prototype.render = function() {
        ctx.fillStyle = this.color;
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.fillText(this.text, this.x, this.y);
    };
    var heading1 = new Text("", map.colWidth * 2.5, map.rowHeight * 2.5);
    var heading2 = new Text("", map.colWidth * 2.5, map.rowHeight * 3.5);

    var allStages = [
        {       //stage 0, welcome screen
            init : function() {
                map.rowImages = ['images/grass-block.png', 'images/grass-block.png', 'images/grass-block.png', 'images/grass-block.png', 'images/grass-block.png', 'images/grass-block.png'];
                heading1.text = 'FROGGER GAME';
                heading2.text = 'press SPACE to start';
            },
            update : function() {},
            render : function(dt) {
                map.render();
                heading1.render();
                heading2.render();
            },
            allowedKeys : { 32 : nextStage} //space
        },
        {       //stage 1, character selector screen
            init : function() {
                createAllPlayers(4);
                heading1.text = 'SELECT YOUR CHARACTER';
                heading2.text = 'press SPACE to apply';

            },
            update : function() {
            },
            render : function() {
                map.render();
                allPlayers.forEach(function(player) {
                    player.render();
                });
                selector.render();
            }

        }
    ];
    var game = {
        update : allStages[currentStage].update,
        render : allStages[currentStage].render
    };
    allStages[0].init();
    window.game = game;
}())














