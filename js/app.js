//An anonimus self-invodked function
//capsulates every important things
// than it returns the game object,
//that is accessable on the global scope.
/*--------------------GAME--------------------*/
(function() {
    //this function generate an integer between costumable limits.
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    /*---------------------Entety---------------------*/
    // This a general superclass providing basic properties
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

    /*-----------------------Map------------------------*/
    // The Map class represents the background of the game,
    // and stores various values for further calcualtions

    // Map constructor function
    var Map = function(numRows, numColumns, rowImages, startX, startY, cellWidth, cellHeight) {
        this.numRows = numRows || 0;
        this.numColumns = numColumns || 0;
        this.rowImages = rowImages || [];
        this.startX = startX || 0;
        this.startY = startY || 0;
        this.cellWidth = cellWidth || 0;
        this.cellHeight = cellHeight || 0;
        this.limitTop = 0;
        this.limitRight = (this.numColumns - 1) * this.cellWidth;
        this.limitBottom = (this.numRows - 2) * this.cellHeight;
        this.limitLeft = this.startX;
        this.originalY = this.startY;
    };

    // This method creates the background piece by piece
    // It has an optional argument, that represents the open gate
    // at the end of the game.
    Map.prototype.render = function(bool) {
            // loop through every row
            for (var row = 0; row < this.rowImages.length; row++) {
                // loop through every column
                for (var column = 0; column < this.numColumns; column++) {
                    if (bool && row === 0 && column === 2) {
                        ctx.drawImage(
                            Resources.get('images/stone-block.png'),
                            column * this.cellWidth + this.startX,
                            row * this.cellHeight + this.startY
                        );
                    } else {
                        ctx.drawImage(
                            Resources.get(this.rowImages[row]),
                            column * this.cellWidth + this.startX,
                            row * this.cellHeight + this.startY
                        );
                    }
                }
            }
        }
        // This method add extra rows to the original ones
        // without pushing everithing down
    Map.prototype.load = function(rowImages) {
            this.rowImages = rowImages.concat(this.rowImages);
            this.startY -= (this.rowImages.length - this.numRows) * this.cellHeight;
        }
        // This method when perceives extra rows,
        // the map starts to slide down slowly,
        // until every new row become visble,
        // than it cuts down surplus rows.
    Map.prototype.update = function(dt, callback) {
        if (this.rowImages.length > this.numRows) {
            if (this.startY >= this.originalY) {
                this.startY = this.originalY;
                this.rowImages = this.rowImages.slice(0, this.numRows);
                callback();
            } else {
                this.startY += this.cellHeight * dt;
                allPlayers.forEach(function(p) {
                    if (p !== player) {
                        p.y += map.cellHeight * dt;
                    }
                });
            }
        }
    }


    /*---------------------Player---------------------*/
    // This class represent every playable character

    // Player constructor function
    var Player = function(column, row, sprite, top, right, bottom, left) {
        Entety.call(this, map.cellWidth * column, map.cellHeight * row, sprite);
        this.limitTop = top || map.limitTop;
        this.limitRight = right || map.limitRight;
        this.limitBottom = bottom || map.limitBottom;
        this.limitLeft = left || map.limitLeft;
    };

    // Set inheritance from Entety class
    Player.prototype = Object.create(Entety.prototype);
    Player.prototype.constructor = Player;

    //This function called after collisions
    Player.prototype.reset = function() {
        this.y = map.cellHeight * 4;
    };
    // An array of every charachter's image
    Player.prototype.allSprites = [
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png'
    ];

    // player can move in all directions
    Player.prototype.moveLeft = function() {
        if (this.x > this.limitLeft) { //not at the first row
            this.x -= map.cellWidth;
        }
    };
    Player.prototype.moveUp = function() {
        if (this.y > this.limitTop) { //not next to the river
            this.y -= map.cellHeight;
        }
    };
    Player.prototype.moveRight = function() {
        if (this.x < this.limitRight) { //not at the last column
            this.x += game.colWidth;
        }
    };
    Player.prototype.moveDown = function() {
        if (this.y < this.limitBottom) { //not at the last row
            this.y += game.rowHeight;
        }
    };

    // This method check collicion with gems
    Player.prototype.checkGem = function() {
        if (this.y === gem.y && this.x === gem.x) {
            if (gem.colors.length > gem.color + 1) {
                gem.color++;
                gem.init();
                //adding 1 new enemy after every collected gem
                createEnemies(1);
            } else {
                // If all gems are collected, new stage will be loaded
                nextStage();
            }
        }
    };

    // This method check collision with enemys
    // and resets everything back after collision
    Player.prototype.checkCollision = function() {
        var player = this;
        allEnemies.forEach(function(enemy) {
            if (enemy.y === player.y && Math.abs(enemy.x - player.x) < map.cellWidth * 0.7) {
                var stage = allStages[currentStage];
                var stageUpdate = stage.update;
                var stageKeys = stage.allowedKeys;
                stage.update = function() {};
                stage.allowedKeys = {};
                setTimeout(function() {
                    stage.update = stageUpdate;
                    stage.allowedKeys = stageKeys;
                    player.reset();
                    gem.color = 0;
                    currentStage = 3;
                    allEnemies = [];
                    createEnemies(2);
                }, 500);
                //player.life--;
            }
        });
    }

    // This method defines
    Player.prototype.leave = function(dt) {
        if (this.y <= map.cellHeight * -2) {
            nextStage();
        } else {
            this.y -= dt * map.cellHeight;
        }
    }

    /*---------------------Enemy---------------------*/
    // This class represens the bugs in the game
    // Every enemy generating randomly
    //at the left side of the plaing area.

    // Enemy constructor function
    var Enemy = function() {
        this.init();
    }

    // Set inheritance from Entety class
    Enemy.prototype = Object.create(Entety.prototype);
    Enemy.prototype.constructor = Enemy;
    Enemy.prototype.init = function() {
            this.setStartCol(); //set this.x
            this.generateRow(1, 3); //set this.y
            this.generateSpeed(); //set this.speed
        }
        // Set enemies sprite
    Enemy.prototype.sprite = 'images/enemy-bug.png';

    // This method generates enemies row
    Enemy.prototype.generateRow = function(min, max) {
        this.y = getRandomInt(min - 1, max - 1) * game.rowHeight;
    };

    // This method place enemy on the left side the canvas
    Enemy.prototype.setStartCol = function() {
        this.x = 0 - map.cellWidth;
    };

    // This method generate enemies speed
    Enemy.prototype.generateSpeed = function() {
        this.speed = getRandomInt(1, 3); //slow 1x, normal 2x, fast 3x
    };

    // This function compare an enemy to another based on X coordinates
    Enemy.prototype.isAhead = function(enemy) {
        var result = enemy.x > this.x ? true : false;
        return result;
    };
    // This function prevents the event when two bug take the same place on map.
    Enemy.prototype.checkCollision = function(index) {
        var current = this; //saving current enemy
        for (var i = index + 1 , numEnemies = allEnemies.length; i < numEnemies; i++) { //checking every unchekded enemy
            var enemy = allEnemies[i]; //saving actual enemy
            if (current.y === enemy.y && //cheking does it have a same row
                Math.abs(current.x - enemy.x) < map.cellWidth) { //ckeking does someone cover the other
                this.optimaseDistance(enemy); // abolish covering
                this.switchSpeed(enemy); //switch speed after collision
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
        if (this.isAhead(enemy)) {
            this.x = enemy.x - map.cellWidth;
        } else {
            enemy.x = this.x - map.cellWidth;
        }
    }

    Enemy.prototype.update = function(dt) {
        if (this.x >= map.cellWidth * 5) { //if the enemy left the screen
            this.init(); //than reset it's position and generate a new speed value
        } else {
            this.x += map.cellWidth * dt * this.speed; // othervise it moves from left to right
        }
    };

    /*---------------------Gem---------------------*/
    //This classs represents the collectable items on the map

    // Gem constructor function
    var Gem = function(x, y, color) {
        Entety.call(this, x, y);
        this.color = color || 0;
        this.init();
    };

    // Set inheritance from Entety class
    Gem.prototype = Object.create(Entety.prototype);
    Gem.prototype.constructor = Gem;

    // Setting the color of the gem, modifies it's sprite as well.
    Object.defineProperty(Gem.prototype, "color", {
        get: function() {
            return this.color1;
        },
        set: function(c) {
            this.color1 = c;
            this.sprite = this.colors[c];
        }
    });

    // An array of the gem's colors
    Gem.prototype.colors = [
        'images/Gem Blue.png',
        'images/Gem Green.png',
        'images/Gem Orange.png',
        'images/Key.png'
    ];

    // This method generates gems randomly on map
    Gem.prototype.init = function() {
        this.y = getRandomInt(0, 2) * map.cellHeight;
        this.x = getRandomInt(0, 4) * map.cellWidth;
    }

    Gem.prototype.update = function() {
        //use it for any effect
    }

    /*--------------------Selector--------------------*/
    // This class represents the selector
    // at the character selecting stage;


    // Selector constructor function
    var Selector = function(x, y, sprite) {
        Entety.call(this, x, y, sprite)
    };

    // Set inheritance from Entety class
    Selector.prototype = Object.create(Entety.prototype);
    Selector.prototype.constructor = Selector;

    // player can move slector right and left directions
    Selector.prototype.moveLeft = function() {
        if (this.x > map.limitLeft) {
            this.x -= map.cellWidth;
        }
    }
    Selector.prototype.moveRight = function() {
            if (this.x < map.limitRight) {
                this.x += map.cellWidth;
            }
        }
        //This function called when player is selected
    Selector.prototype.selectPlayer = function() {
        for (var i = 0; i < allPlayers.length; i++) {
            if (this.x === allPlayers[i].x) {
                player = allPlayers[i];
            }
        }
    };

    /*--------------------Text--------------------*/
    // There are two kind of text in the game; h1,h2
    // and a basic text superclass

    // Text constructor function
    var Text = function(text, row, alpha, visible) {
        this.text = text;
        this.y = row * map.cellHeight + map.startY || map.startY + 0.5 * map.cellHeight;
        this.x = map.numColumns * map.cellWidth / 2;
        this.alpha = alpha || 1;
        this.originalX = this.x;
        this.originalY = this.y;
        this.visible = visible || true;
    }

    // a render method for text
    Text.prototype.render = function() {
        ctx.fillStyle = "rgba(255, 255, 255, " + this.alpha + ")";
        ctx.font = this.font;
        ctx.textAlign = "center";
        ctx.fillText(this.text, this.x, this.y);
    };

    // This method push text to it's original position
    Text.prototype.update = function(dt) {
        if (this.x <= this.originalX) {
            this.x += 3;
        }
        if (this.y <= this.originalY) {
            this.y += 3;
        }
    };

    // This method place text before the canvas,
    // than it moves back to it's original position
    // by the update method
    Text.prototype.show = function() {
        this.y = -map.cellHeight;
    }

    // This is a pulse effect for text
    Text.prototype.pulse = function(dt) {
        if (this.visible) {
            if (this.alpha > 0) {
                this.alpha -= dt * 2;
            } else {
                this.visible = false;
            }
        } else if (this.alpha < 1) {
            this.alpha += dt * 1;
        } else {
            this.visible = true;
        }
    };

    /*--------------------H1--------------------*/
    // These lines declare H1 class
    var H1 = function(text, x, y, alpha, visible) {
        Text.call(this, text, x, y, alpha);
    };
    H1.prototype = Object.create(Text.prototype);
    H1.prototype.constructor = H1;
    H1.prototype.font = "50px Arial";
    /*--------------------H2--------------------*/
    // These lines declare H2 class
    var H2 = function(text, x, y, alpha) {
        Text.call(this, text, x, y, alpha);
    };
    H2.prototype = Object.create(Text.prototype);
    H2.prototype.constructor = H2;
    H2.prototype.font = "30px Arial";



    /*--------------------Event listener--------------------*/
    // This is an event listeren for user inputs
    // Every stage has it's own list of valid keys
    // and every valid key has it's own triggerable method
    // Some stages haven't got any valid keys.
    document.addEventListener('keyup', function(e) {
        var task = allStages[currentStage].allowedKeys[e.keyCode];
        if (task) { // if listener matched with any valid key
            task();
        };
    });

    /*-------------------creating the enteties-----------------*/
    // the base of rowImages for the first map
    var rowImages = [
        'images/grass-block.png', // Row 1 of 6 of grass
        'images/grass-block.png', // Row 2 of 6 of grass
        'images/grass-block.png', // Row 3 of 6 of grass
        'images/grass-block.png', // Row 4 of 6 of grass
        'images/grass-block.png', // Row 5 of 6 of grass
        'images/grass-block.png' // Row 6 of 6 of grass
    ];
    var map = new Map(6, 5, rowImages, 0, -51, 101, 79); //creating new map
    var player = new Player(); //new player
    var allPlayers = []; // array for playable characters
    var allEnemies = []; // array for enemies
    var selector; // variable for selector
    var heading1 = new H1("", 3.5); // new H1
    var heading2 = new H2("", 4.5, 0.01); // new H2
    var gem = new Gem(); // new gem
    var currentStage = 0; //set current stage to the first

    /*---------------additional functions---------------*/


    // This function creates a certain number of enemies
    function createEnemies(num) {
        for (var i = 0; i < num; i++) {
            allEnemies.push(new Enemy());
        }
    };

    // This function install the next stage of the game
    function nextStage() {
        currentStage++;
        allStages[currentStage].init();
    }

    // This function creates all character for player character stage
    function createAllPlayers(row) {
        var row = row || 0;
        var player;
        for (i = 0; i < 5; i++) {
            player = new Player(i, row, Player.prototype.allSprites[i]);
            allPlayers.push(player);
        }
    }

    function isReadyToLeave() {
        if (player.x === 2 * map.cellWidth && player.y === 0) {
            nextStage();
        }
    }

    /*------------------------GAME--------------------------*/
    // the piblic core object of the game,
    // that provides fundamental values and methods for engine.js
    var game = {
        update: function(dt) {
            allStages[currentStage].update(dt)
        },
        render: function() {
            allStages[currentStage].render()
        },
        rowHeight: map.cellHeight, // hight of cell, 79px
        colWidth: map.cellWidth, // width of cell, 101px
        cellPaddingTop: 51, // top, transparent part of cell
        cellPaddingBottom: 41 // bottom, extra texture of cell
    };

    /*------------------------STAGES--------------------------*/

    // This is where the behavior of the game is written
    // Each stage has it's own init, update, render,
    // and allowedKeys object.
    // The init runs only once, when the next stage function is triggered
    // The update and render functions runs repeatedly,
    // while current stage is active.

    var allStages = [{ //stage 0, welcome screen
        init: function() {
            heading1.text = 'FROGGER GAME';
            heading2.text = 'press SPACE to start';
            heading1.show();
        },
        update: function(dt) {
            heading1.update(dt); // heading1 sliding down
            if (heading1.y >= heading1.originalY) { //after h1 is ready
                heading2.pulse(dt); // h2 starting to pulse
                allStages[currentStage].allowedKeys = {
                    32: nextStage // space
                }
            }
        },
        render: function(dt) {
            map.render();
            heading1.render();
            heading2.render();
        },
        allowedKeys: {
            // will modified by update function
        }
    }, { //stage 1, character selector screen
        init: function() {
            createAllPlayers(4); // creating characters
            selector = new Selector( // creating selector
                2 * game.colWidth,
                4 * game.rowHeight,
                'images/Selector.png');
            heading1.text = 'SELECT YOUR CHARACTER'; //changing h1
            heading2.text = 'press SPACE to select'; //changing h1
            heading1.font = "30px Arial"; //changing h1 fontsize
        },
        update: function(dt) {
            heading2.pulse(dt); // h2 starting to pulse
        },
        render: function() {
            map.render();
            selector.render();
            heading1.render();
            heading2.render();
            allPlayers.forEach(function(p) {
                p.render();
            });

        },
        allowedKeys: {
            32: function() { //space
                selector.selectPlayer();
                nextStage();
            },
            37: function() { //left arrow
                selector.moveLeft()
            },
            39: function() { // right arrow
                selector.moveRight()
            }
        }

    }, { //stage 2, loading level 1

        init: function() {
            var rowImages = [
                'images/water-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png'
            ];
            map.load(rowImages); //loading level 1's map
        },
        update: function(dt) {
            map.update(dt, nextStage); // after loading new map, next stage
        },
        render: function() {
            map.render();
            allPlayers.forEach(function(player) {
                player.render();
            });
        },
        allowedKeys: {

        }
    }, {
        //stage 3 - level 1 is ready to play
        init: function() {
            createEnemies(2); //creating 2 enemies
        },
        update: function(dt) {
            allEnemies.forEach(function(enemy, index) {
                enemy.update(dt);
                enemy.checkCollision(index);
            });
            player.checkCollision();
            player.checkGem();
        },
        render: function() {
            map.render();
            gem.render();
            player.render();
            allEnemies.forEach(function(enemy) {
                enemy.render();
            });
        },
        allowedKeys: {
            37: function() {
                player.moveLeft()
            }, //left arrow
            38: function() {
                player.moveUp()
            }, // up arrow
            39: function() {
                player.moveRight()
            }, //  right arrow
            40: function() {
                    player.moveDown()
                } //down arrow
        }
    }, { //stage 4 -- all gems are collected
        init: function() {},
        update: function(dt) {
            allEnemies.forEach(function(enemy, index) {
                enemy.update(dt);
                enemy.checkCollision(index);
            });
            player.checkCollision();
            //
            isReadyToLeave();
        },
        render: function() {
            map.render(true); // gate is open
            player.render();
            allEnemies.forEach(function(enemy) {
                enemy.render();
            });
        },
        allowedKeys: {
            37: function() {
                player.moveLeft()
            }, //left arrow
            38: function() {
                player.moveUp()
            }, // up arrow
            39: function() {
                player.moveRight()
            }, //  right arrow
            40: function() {
                    player.moveDown()
                } //down arrow
        }
    }, { //stage 5 -- player walks away
        init: function() {
            allEnemies = []; // destroying all enemies
        },
        update: function(dt) {
            player.leave(dt);
        },
        render: function() {
            map.render(true);
            player.render();
        }
    }, { // stage -- Winning stage, that resets the game
        init: function() {
            heading1.text = "You Win!";
            heading1.show();
            map.load(rowImages);
        },
        update: function(dt) {
            map.update(dt, function() { // clearing variables back to original
                currentStage = 0;
                allStages[currentStage].init();
                gem.color = 0;
                player = {};
                allPlayers = [];
                heading2.alpha = 0.01;
                heading1.font = "50px Arial";
            })
            heading1.update(dt);
        },
        render: function() {
            map.render();
            heading1.render();
        },
        allowedKeys: {}

    }];
    /*-------------------START + RETURN-----------------------*/
    // starting the desired stage
    allStages[currentStage].init();
    // returning game object
    window.game = game;
}())
