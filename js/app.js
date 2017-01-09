/*       ENEMY       */

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 50;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = "images/enemy-bug.png";
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    this.x += this.speed * dt;
    enemyPosition();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

        /*         PLAYER         */

// Now write your own player class
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.sprite = "images/char-boy.png"
};

// player position relocating point
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

// collision checking function
Player.prototype.checkCollision = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        if (player.x >= allEnemies[i].x - 40 && player.x <= allEnemies[i].x + 40) {
            if (player.y >= allEnemies[i].y - 35 && player.y <= allEnemies[i].y + 35) {
                alert("You hit a bug!! Your character will be relocated to the starting point!! Good luck!!");
                for (i=0; i < 4; i++) {
                    allEnemies[i].x = -150;
                }
                player.reset();
                lifePoint.splice(0,1);
                $(".lifePoint").replaceWith("<li class=\"flex-item lifePoint\">Life Point: " + lifePoint.length + "</li>");
            }
        }
    }
    
    if (player.y <= 0) {
        if (keyCollected.length > 0) {
            alert("You won! Go to next round!");
            player.reset();
        }
        else {
            alert("You need to bring the key to go to the next round!");
            player.reset();
        }
    }
    
    for (i=0; i < greenGems.length; i++) {
        if (player.x >= greenGems[i].x - 50 && player.x <= greenGems[i].x + 50) {
            if (player.y >= greenGems[i].y - 50 && player.y <= greenGems[i].y + 50) {
                greenGems.splice(i,1);
                gemsCollected.push("*");
            }
        }
    }
    
    for (i=0; i < orangeGems.length; i++) {
        if (player.x >= orangeGems[i].x - 50 && player.x <= orangeGems[i].x + 50) {
            if (player.y >= orangeGems[i].y - 50 && player.y <= orangeGems[i].y + 50) {
                orangeGems.splice(i,1);
                gemsCollected.push("*", "*");
            }
        }
    }
    
    for (i=0; i < blueGems.length; i++) {
        if (player.x >= blueGems[i].x - 50 && player.x <= blueGems[i].x + 50) {
            if (player.y >= blueGems[i].y - 50 && player.y <= blueGems[i].y + 50) {
                blueGems.splice(i,1);
                gemsCollected.push("*", "*", "*");
            }
        }
    }
    
    for (i=0; i < allKeys.length; i++) {
        if (player.x >= allKeys[i].x - 50 && player.x <= allKeys[i].x + 50) {
            if (player.y >= allKeys[i].y - 50 && player.y <= allKeys[i].y + 50) {
                allKeys.splice(i,1);
                keyCollected.push("*");
                $(".items").replaceWith("<li class=\"flex-item items\">Items: You have the key!</li>");
            }
        }
    }
    
    for (i=0; i < allHearts.length; i++) {
        if (player.x >= allHearts[i].x - 50 && player.x <= allHearts[i].x + 50) {
            if (player.y >= allHearts[i].y - 50 && player.y <= allHearts[i].y + 50) {
                allHearts.splice(i,1);
                lifePoint.push("*");
                $(".lifePoint").replaceWith("<li class=\"flex-item lifePoint\">Life Point: " + lifePoint.length + "</li>");
            }
        }
    }
    
    if (gemsCollected.length > 0) {
        $(".gems").replaceWith("<li class=\"flex-item gems\">Gems: " + gemsCollected.length + "</li>");
        var score = gemsCollected.length * 2;
        $(".score").replaceWith("<li class=\"flex-item score\">Score: " + score + "</li>");
    }
    
    if (lifePoint.length == 0) {
        alert("GAME OVER :(");
        // FOR FIXING BUGS
        lifePoint.push("DO SOMETHING");
        NewHeart();
    }
};

// update player's position
Player.prototype.update = function(dt) {
    player.checkCollision();
};

// draw player's character image on the board
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// handling character
Player.prototype.handleInput = function(inputKey) {
    if (inputKey == 'up') {
        player.y -= 50;
    }
    if (inputKey == 'right') {
        if (player.x < 400) {
            player.x += 50;
        }
    }
    if (inputKey == 'down') {
        if (player.y < 400) {
            player.y += 50;   
        }
    }
    if (inputKey == 'left') {
        if (0 < player.x) {
            player.x -= 50;
        }
    }
};

$(document).ready(function() {
    $("#up").click(function() {
        player.y -= 50;
    });
    
    $("#right").click(function() {
        if (player.x < 400) {
            player.x += 50;
        }
    });
    
    $("#down").click(function() {
        if (player.y < 400) {
            player.y += 50;
        }
    });

    $("#left").click(function() {
        player.x -= 50;
    });
});

        /*         GEMS         */

// green gem
var GreenGem = function(x, y) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
    this.sprite = "images/Gem-Green.png"
};

GreenGem.prototype.update = function(dt) {
    
};

// draw gem
GreenGem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// orange gem
var OrangeGem = function(x, y) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
    this.sprite = "images/Gem-Orange.png"
};

OrangeGem.prototype.update = function(dt) {
    
};

// draw gem
OrangeGem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// blue gem
var BlueGem = function(x, y) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
    this.sprite = "images/Gem-Blue.png"
};

BlueGem.prototype.update = function(dt) {
    
};

// draw gem
BlueGem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


        /*         KEY         */

var Key = function(x,y) {
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 80;
    this.sprite = "images/Key.png"
};

Key.prototype.update = function() {
    
};

// draw key
Key.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

        /*         HEART         */

var Heart = function(x,y) {
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 80;
    this.sprite = "images/Heart.png";
}

Heart.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// variables, objects
var player = new Player(200, 400);

var allEnemies = [];

var greenGems = [];

var orangeGems = [];

var blueGems = [];

var allKeys = [];

var gemsCollected = [];

var keyCollected = [];

var allHearts = [];

var lifePoint = ["*", "*", "*"];

// enemy coordination for x
var enemyCoordX = -150;

// enemy coordination for y
// var enemyCoordY = 60 * (Math.floor((Math.random() * 6) + 1))

// enemy random speed
// var enemySpeed = 30 * allGems.length + 10 * (Math.floor((Math.random() * 10) + 1))

// speed increase
spdInc = 1

        // random enemy placing
var enemyPlace = function() {
    for (i=0; i < 4; i++) {
        var enemy = new Enemy(enemyCoordX, 60 * (Math.floor((Math.random() * 6) + 1)), spdInc * 30 * greenGems.length + 10 * (Math.floor((Math.random() * 10) + 1)));
        allEnemies.push(enemy);
    }
};

enemyPlace();

        // check enemy positions
var enemyPosition = function() {
    for (i=0; i < allEnemies.length; i++) {
        if (allEnemies[i].x > 650) {
            allEnemies[i].x = enemyCoordX;
            allEnemies[i].y = 60 * (Math.floor((Math.random() * 6) + 1));
            allEnemies[i].speed = 30 * greenGems.length + 10 * (Math.floor((Math.random() * 10) + 1));
        }
    }
}

        // random gem placing

// green gem
for (x=0; x < 2; x++) {
    var Grngem = new GreenGem(30 * Math.floor((Math.random() * 10) + 1), 30 * Math.floor((Math.random() * 10) + 1));
    greenGems.push(Grngem);
};

// orange gem
var Ornggem = new OrangeGem(30 * Math.floor((Math.random() * 10) + 1), 30 * Math.floor((Math.random() * 10) + 1));
orangeGems.push(Ornggem);

// blue gem
var Bgem = new BlueGem(30 * Math.floor((Math.random() * 10) + 1), 30 * Math.floor((Math.random() * 10) + 1));
blueGems.push(Bgem);

        // random item placing
// heart
var NewHeart = function() {
    var heart = new Heart(30 * Math.floor((Math.random() * 10) + 1), 30 * Math.floor((Math.random() * 10) + 1));
    allHearts.push(heart);
}

NewHeart();

// key
var key = new Key(30 * Math.floor((Math.random() * 10) + 1), 30 * Math.floor((Math.random() * 10) + 1));
allKeys.push(key);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});