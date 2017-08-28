/**
 * Entity Class
 * @constructor
 */
var Entity = function (args) {
    args = args || {};
    // member variables
    this.xPos               = args.xPos             || 0;
    this.yPos               = args.yPos             || 0;
    this.collisionOffsetX   = args.collisionOffsetX || 0;
    this.collisionOffsetY   = args.collisionOffsetY || 0;
    this.collisionWidth     = args.collisionWidth   || 0;
    this.collisionHeight    = args.collisionHeight  || 0;
    // for debug draw
    this.debugFillStyle = 'rgba(255,255,255,0.5)';
};
Entity.debugDrawEnabled = true;

Entity.prototype.debugDraw = function () {
    // BAIL!!
    if (!Entity.debugDrawEnabled) {
        return;
    }
    var rect = this.getCollisionRect();
    ctx.save();
    ctx.fillStyle = this.debugFillStyle;
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    ctx.restore();
};
Entity.prototype.getCollisionRect = function () {
    return {
        x: this.xPos + this.collisionOffsetX,
        y: this.yPos + this.collisionOffsetY,
        width: this.collisionWidth,
        height: this.collisionHeight
    }
};

// Detect collision between two entities
Entity.prototype.detectCollision = function (entity) {
    var rect1 = this.getCollisionRect(),
        rect2 = entity.getCollisionRect();

    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y
    );
};


// === === === === === === === === === === === === === === ===


/**
 * Enemy Class
 * @constructor
 */
var Enemy = function(row, width, height) {
    width  = width || 101;
    height = height || 83;

    Entity.call(this, {
        xPos: -(width), // pixels
        yPos: row * 83 - 20,
        collisionOffsetX: 10,
        collisionOffsetY: height - 5,
        collisionWidth: width - 20,
        collisionHeight: height - 20
    });

    this.speed = parseInt(range(50, 100));
    this.sprite = 'images/enemy-bug.png';
    // for debug draw
    this.debugFillStyle = 'rgba(255, 0, 0, 0.25)';
};
Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

// Static array
Enemy.scheduleToRemove = [];

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.xPos += this.speed * dt;

    if (this.xPos > canvas.width && Enemy.scheduleToRemove.indexOf(this) < 0) {
        Enemy.scheduleToRemove.push(this);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.xPos, this.yPos);
    this.debugDraw();
};


// === === === === === === === === === === === === === === ===


/**
 * Player Class
 * @constructor
 */
var Player = function (row, col, width, height) {
    width   = width || 101;
    height  = height || 83;

    Entity.call(this, {
        collisionOffsetX: 15,
        collisionOffsetY: height - 10,
        collisionWidth: width - 30,
        collisionHeight: height - 10
    });

    this.row = row;
    this.col = col;
    this.enabled = false;
    this.sprite = 'images/char-boy.png';
    // for debug draw
    this.debugFillStyle = 'rgba(0, 0, 255, 0.25)';

    this.calculatePosition();
};
Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

Player.prototype.handleInput = function (key) {
    switch (key) {
        case 'up':      this.row = Math.max(this.row - 1, 0); break;
        case 'down':    this.row = Math.min(this.row + 1, 5); break;
        case 'left':    this.col = Math.max(this.col - 1, 0); break;
        case 'right':   this.col = Math.min(this.col + 1, 4); break;
    }
    player.calculatePosition();
};
Player.prototype.calculatePosition = function () {
    this.xPos = this.col * 101;
    this.yPos = this.row * 83 - 20;
};
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.xPos, this.yPos);
    this.debugDraw();
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    if (!player.enabled) { return; }

    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});