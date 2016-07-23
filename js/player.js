/**
 * Game Player
 * @constructor
 * @return {object}
 */
var Player = function() {
    this.x;
    this.route;
    this.sprite;
    this.startPoint;
};

/**
 * So that the player is properly initiated some settings should be assigned.
 * @param  {string} sprite
 * @param  {object} startPoint
 */
Player.prototype.init = function(sprite, startPoint) {
    this.sprite = sprite;
    this.startPoint = startPoint;
    this.x = this.startPoint.x;
    this.route = this.startPoint.route;
};

/**
 * Every time the player was hit by enemies. Use this function to reset the
 * player.
 */
Player.prototype.reset = function() {
    delete this.route;
};

/**
 * Update the enemy's position, required method for game.
 * @param  {[type]} dt
 */
Player.prototype.update = function(dt) {};

/**
 * Draw the player on the screen, required method for game
 * @param  {object} ctx - Canvas 2D
 * @param  {object} resourcesLoader
 */
Player.prototype.render = function(ctx, loader) {
    ctx.drawImage(loader.get(this.sprite), this.x, this.route);
};
