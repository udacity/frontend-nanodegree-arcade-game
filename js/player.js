/**
 * @description This is the player. You can control various aspects of the
 * player in this file.
 * @constructor
 */
var Player = function() {
    this.sprite = {
        group:      'characters',
        element:    'boy'
    };
    this.x = 0;
    this.sprite;
    this.startPoint;
    this.route = null;
    this.pause = false;
    this.started = false;
    Entity.call(this);
};

Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

/**
 * @description Start the player, sending him to the starting point of the game.
 */
Player.prototype.init = function() {
    this.moveStartPoint();

    if(this.started === false)
        this.started = true;

    if(typeof this.sprite !== 'string')
        this.convertSprite();
};

/**
 * @description Verifies that the game is in progress.
 * @return {boolean}
 */
Player.prototype.gameStarted = function() {
    return this.started;
};

/**
 * @description Returns the player's route. If the player has not yet started
 * or fell into the water the function returns null.
 * @return {number or null}
 */
Player.prototype.getRoute = function() {
    return this.route;
};

/**
 * @description Generate a valid url based on the group and player of the
 * element. After assigned to sprite player.
 */
Player.prototype.convertSprite = function() {
    var spriteGroup     = this.sprite.group,
        spriteElement   = this.sprite.element;

    this.sprite = this.resources.urlImage(spriteGroup, spriteElement);
};

/**
 * @description Forwards the player to the starting point of the game.
 */
Player.prototype.moveStartPoint = function() {
    var routes      = this.getPartExtra('routes');
        scenario    = this.getPartExtra('scenario')
        imageWidth  = this.resources.imageSize('width');

    this.x = Math.trunc(scenario.numberColumns() / 2) * imageWidth;
    this.route = routes.getFirstOrLast('last');
};

/**
 * @description Move the player in the scene. The control device can be set in
 * the configuration file.
 * @param  {string} direction
 */
Player.prototype.move = function(direction) {
    var routes      = this.getPartExtra('routes'),
        scenario    = this.getPartExtra('scenario'),
        imageWidth  = this.resources.imageSize('width'),
        imageHeight = this.resources.imageSize('height');

    if(direction === 'pause')
        this.pause = this.pause ? false : true;

    if(!this.pause) {
        switch (direction) {
            case 'up':
                this.route -= imageHeight;
                if(this.route < routes.getFirstOrLast('first', 'stone'))
                    this.reset();
                break;

            case 'right':
                this.x += imageWidth;
                if(this.x >= scenario.width())
                    this.x -= imageWidth;
                break;

            case 'down':
                this.route += imageHeight;
                if(this.route > routes.getFirstOrLast('last'))
                    this.route = routes.getFirstOrLast('last');
                break;

            case 'left':
                this.x -= imageWidth;
                if(this.x < 0)
                    this.x += imageWidth;
                break;
        }
    }
};

/**
 * @description Restart the player.
 */
Player.prototype.reset = function() {
    this.route = null;
};

/**
 * @description Draw the player on the screen, required method for game
 */
Player.prototype.render = function() {
    var ctx = this.canvas.getContext();
    ctx.drawImage(this.resourcesLoader.get(this.sprite), this.x, this.route);
};
