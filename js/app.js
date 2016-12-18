/*---------------------Entety---------------------*/
var Entety = function(x, y, sprite) {
    this.x = x || 0;
    this.y = y || 0;
    if (sprite) {
        this.sprite = sprite;
    }
}
Entety.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Entety.prototype.move = function(x, y){
    this.x += x || 0;
    this.y += y || 0;
    return this;
}
Entety.prototype.update = function(fn, calback) {
    if(this.active) {
        fn();
        if (callback) {
            callback();
        }
    }
}

/*-----------------------Map------------------------*/

var Map = function(numRows, numColumns, rowImages ,startX, startY, cellWidth, cellHeight) {
    this.numRows = numRows || 0;
    this.numColumns = numColumns || 0;
    this.rowImages = rowImages || [];
    this.startX = startX || 0;
    this.startY = startY || 0;
    this.cellWidth = cellWidth || 0;
    this.cellHeight = cellHeight || 0;
};


Map.prototype.render = function() {
    for (var row = 0; row < this.numRows; row++) {
        for (var column = 0; column < this.numColumns; column++) {
            ctx.drawImage(
                Resources.get(this.rowImages[row]),
                column * this.cellWidth + startX,
                row * this.cellHeight + startY
            );
        }
    }
}

Map.prototype.load = function(rowImages) {
    this.rowImages = rowImages.concat(this.rowImages);
    this.startY -= (this.rowImages.length - this.numRows) * this.cellHeight;
}
Map.prototype.update = (function(dt){
    var originalY = this.startY;
    return function(dt) {
        if (this.rowImages.length > this.numRows) {
            if (this.startY >= originalY) {
                this.startY = originalY;
                this.rowImages.slice(0,this.numRows);
            } else {
                this.startY += this.cellHeight * dt;
            }
        }
    }
}(dt));

/*---------------------Player---------------------*/

var Player = function(column, row, sprite) {
    Entety.call(this, map.cellWidth * column, map.cellHeight * row, sprite);
};
Player.prototype = Object.create(Entety.prototype);
Player.prototype.constructor = Player;
Player.prototype.reset = function() {
    this.y = map.cellHeight * 4;
};

Player.prototype.allSprites = [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'
];
Player.prototype.moveLeft = function() {
    if (this.x > 0) { //not at first coll
                this.x -= game.colWidth;
            }
};
Player.prototype.moveUp = function() {
    if (this.y > 0) { //under the water
                this.y -= game.rowHeight;
            }
};
Player.prototype.moveRight = function(){
    if (this.x < game.colWidth * 4) { //not beyond last col
                this.x += game.colWidth;
            }
};
Player.prototype.moveDown = function() {
    if (this.y < game.rowHeight * 4) { //not beyond last row
                this.y += game.rowHeight;
            }
};
Player.prototype.checkGem = function(){
    if (this.y === gem.y && this.x === gem.y) {
        if (gem.colors.length < gem.color - 1) {
            gem.color++;
            gem.init();
        } else {
            //stop rendering + next stage
        }
    }
};
Player.checkCollision = function() {
    var player = this;
    allEnemies.forEach(function(enemy){
        if (enemy.y === player.y && Math.abs(enemy.x - player.x) < map.cellWidth) {
            player.reset();
            //player.life--;
        }
    });
}

/*---------------------Enemy---------------------*/

var Enemy = function() {
    this.init();
}
Enemy.prototype = Object.create(Entety.prototype);
Enemy.prototype.constructor = Enemy;
Enemy.prototype.init = function() {
        this.setStartCol(); //set this.x
        this.generateRow(1, 3); //set this.y
        this.generateSpeed(); //set this.speed
    }

Enemy.prototype.sprite = 'images/enemy-bug.png';
/*this generates a */
Enemy.prototype.generateRow = function(min, max) {
    this.y = getRandomInt(min - 1, max - 1) * game.rowHeight;
};
Enemy.prototype.setStartCol = function() {
    this.x = 0 - map.cellWidth; //put before game
};
Enemy.prototype.generateSpeed = function() {
    this.speed = getRandomInt(1, 3); //slow 1x, normal 2x, fast 3x
};
Enemy.prototype.isAhead = function(enemy) {
    var result = enemy.x < this.x ? true : false;
    return result;
};

Enemy.prototype.checkCollision = function(index) {
    var current = this;         //saving current enemy
    for (var i = index + 1; i < allEnemies.length; i++){    //checking every unchekded enemy
        var enemy = allEnemies[i];      //saving actual enemy
        if (current.y === enemy.y && //cheking does it have a same row
            Math.abs(current.x - enemy.x) < map.cellWidth) { //ckeking does someone cover the other
            this.optimaseDistance(enemy); // abolish covering
            this.switchSpeed(enemy);    //switch speed after collision
        }
    };
}

// this function switch the speed with an enemy
Enemy.prototype.switchSpeed = function(enemy) {
    var currentSpeed = this.speed;
    this.speed = enemy.speed;
    enemy.speed = currentSpeed;
}

// this function abolis covering by setting the distance from negativ value to zero
Enemy.prototype.optimaseDistance = function(enemy) {
        this.x = this.isAhead(enemy) ? enemy.x + map.cellWidth : enemy.x - map.cellWidth;
    }

Enemy.prototype.update = function(dt) {
    if (this.x >= map.cellWidth * 5) { //if the enemy left the screen
        this.init();    //than reset it's position and generate a new speed value
    } else {
        this.x + = map.cellWidth * dt * this.speed; // othervise it moves from left to right
    }
};


/*---------------------Gem---------------------*/

var Gem = function(x, y, color) {
    Entety.call(x, y);
    this.color1 = color;
    this.init();
};

Object.defineProperty(Gem.prototype, color, {
    get: function() {return this.color1 ;},
    set: function(c) {this.color1 = c; this.sprite = this.colors[c]; }
});

Gem.prototype.nextGem = function(){
    this.color++;
}

Gem.prototype.colors = [
    'images/Gem Blue.png',
    'images/Gem Green.png',
    'images/Gem Orange.png',
    'images/Key.png'
];
Gem.prototype.init = function () {
    this.y = getRandomInt(0,2) * game.rowHeight;
    this.x = getRandomInt(0,4) * game.colWidth;
}
Gem.prototype.update = function() {
    //use it for any effect
}










(function () {
    var game = {
        update: function(dt) {
            allStages[currentStage].update(dt)
        },
        render: function() {
            allStages[currentStage].render()
        },
        rowHeight: 79, //hight of cell
        colWidth: 101, //width of cell
        cellPaddingTop: 51, //top, transparent part of cell
        cellPaddingBottom: 41 //bottom, extra texture of cell
    };


    var Enemy = function() {
        this.init()
    };




    // Now instantiate your objects.
    // Place all enemy objects in an array called allEnemies
    // Place the player object in a variable called player
    var Selector = function(sprite, x, y) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
    }
    Selector.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    Selector.prototype.moveLeft = function() {
        if (this.x > 0) {
            this.x -= game.colWidth;
        }
    }
    Selector.prototype.moveRight = function() {
        if (this.x < game.colWidth * 4) {
            this.x += game.colWidth;
        }
    }
    Selector.prototype.selectPlayer = function() {
        var i;
        for(i = 0; i < allPlayers.length; i++){
            if (this.x === allPlayers[i].x) {
            player = allPlayers[i];
            }
        }
    };
    // This listens for key presses and sends the keys to your
    // Player.handleInput() method. You don't need to modify this.
    document.addEventListener('keyup', function(e) {
        var task = allStages[currentStage].allowedKeys[e.keyCode];
        if (task) {
            task();
        };
    });
    var player = new Player();
    var allPlayers = [];
    var allEnemies = [];
    var createEnemies = (function(){
        var triggerAbleInterval;
        var enemiesNum = allEnemies.length;
        return function(num){
            triggeraAbleInterval = setInterval(function() {
            allEnemies.push(new Enemy());
                if (allEnemies.length >= enemiesNum + num) {
                    clearInterval(triggeraAbleInterval);
                }
            }, 400);
        };
    }());
    /*var triggeraAbleInterval;
    var createEnemies = function(num) {
        var enemiesNum = allEnemies.length;
        triggeraAbleInterval = setInterval(function() {
            allEnemies.push(new Enemy());
            if (allEnemies.length >= enemiesNum + num) {
                clearInterval(triggeraAbleInterval);
            }
        }, 400);
    };
*/
    function nextStage() {
        currentStage++;
        allStages[currentStage].init();
    }
    var selector;

    function createAllPlayers(row) {
        var row = row || 0;
        var player;
        for (i = 0; i < 5; i++) {
            player = new Player(Player.allSprites[i], i, row);
            allPlayers.push(player);
        }
    }
    var Text = function(text, x, y, alpha) {
        this.text = text;
        this.x = x || 0;
        this.y = y || 0 - game.rowHeight;
        this.alpha = alpha || 1;
        this.visible = 0;
    }
    Text.prototype.render = function() {
        ctx.fillStyle = "rgba(255, 255, 255, "+this.alpha+")";
        ctx.font = this.font;
        ctx.textAlign = "center";
        ctx.fillText(this.text, this.x, this.y);
    };
    Text.prototype.show = function(callback) {
        var y = this.y;
        this.y = 0;
        var text = this;
        var allowedKeys = allStages[currentStage].allowedKeys;
        allStages[currentStage].allowedKeys = {};
        text.constructor.prototype.update = (function(callback){

            var callback = callback || function(){};
            return function(dt){
                if(this.y < y) {
                    this.y += game.rowHeight * dt *2;
                } else {
                    this.constructor.prototype.update = function(){};
                    allStages[currentStage].allowedKeys = allowedKeys;
                    callback();
                }
            };
        }(callback));
    };
    Text.prototype.pulse = function() {
        this.constructor.prototype.update = (function(){
            return function(){
                if (this.visible) {
            if(this.alpha > 0) {
                this.alpha -= 0.03;
            } else {
                this.visible = false;
            }
        } else if (this.alpha < 1) {
            this.alpha += 0.015;
        } else {
            this.visible = true;
        }
            };
        }())
    }
    Text.prototype.update = function() {};
    var H1 = function(text, x, y, alpha) {
        Text.call(this, text, x, y, alpha);
    };
    H1.prototype = Object.create(Text.prototype);
    H1.prototype.constructor = H1;
    H1.prototype.font = "50px Arial";
    var H2 = function(text, x, y, alpha) {
        Text.call(this, text, x, y, alpha);
    };
    H2.prototype = Object.create(Text.prototype);
    H2.prototype.constructor = H2;
    H2.prototype.font = "30px Arial";

    var background = new Map(-game.cellPaddingTop,[],6,5)
    var heading1 = new H1("", game.colWidth * 2.5, game.rowHeight * 2.5);
    var heading2 = new H2("", game.colWidth * 2.5, game.rowHeight * 3.5, 0.01);
    var gem = new Gem();
    var currentStage = 0;
    var allStages = [{ //stage 0, welcome screen
        init: function () {
            background.rowImages = ['images/grass-block.png', 'images/grass-block.png', 'images/grass-block.png', 'images/grass-block.png', 'images/grass-block.png', 'images/grass-block.png', 'images/grass-block.png'];

            heading1.text = 'FROGGER GAME';
            heading2.text = 'press SPACE to start';
            /*background.move(['images/water-block.png',
        'images/stone-block.png','images/stone-block.png',
        'images/stone-block.png']);*/
            heading1.show(function(){
                heading2.pulse();
            });
        },
        update: function (dt) {
            background.update(dt);
            heading1.update(dt);
            heading2.update(dt);
        },
        render: function(dt) {
            background.render();
            heading1.render();
            heading2.render();
        },
        allowedKeys: {
            32: nextStage
        } //space
    }, { //stage 1, character selector screen
        init: function() {
            createAllPlayers(4);
            selector = new Selector('images/Selector.png', 2 * game.colWidth, 4 * game.rowHeight);
            heading1.text = 'SELECT YOUR CHARACTER';
            heading2.text = 'press SPACE to apply';
            heading1.font = "30px Arial";
            heading2.pulse();
        },
        update: function(dt) {
            heading2.update();
        },
        render: function() {
            background.render();
            selector.render();
            heading1.render();
            heading2.render();
            allPlayers.forEach(function(player) {
                player.render();
            });

        },
        allowedKeys: {
            32: function(){
                selector.selectPlayer();
                nextStage();
            },
            37: function() {
                selector.moveLeft()
            },
            39: function() {
                selector.moveRight()
            }
        }

    }, {
        //stage 2 - level 1
        init : function(){
            background.move(['images/water-block.png',
        'images/stone-block.png','images/stone-block.png',
        'images/stone-block.png'], function(){
                createEnemies(4);
            });
        },
        update : function(dt){
            background.update(dt);
            allEnemies.forEach(function(enemy,index) {
                enemy.update(dt);
                enemy.checkCollision(index);
            });
            gem.update();
            player.update();
        },
        render : function(){
            background.render();
            gem.render();
            allPlayers.forEach(function(player) {
                player.render();
            });
            allEnemies.forEach(function(enemy) {
                enemy.render();
            });
        },
        allowedKeys : {
            37 : function() {player.moveLeft()},
            38 : function(){player.moveUp()},
            39 : function(){player.moveRight()},
            40 : function(){player.moveDown()}
        }
    }
                    ];
    allStages[0].init();
    window.game = game;
}())
