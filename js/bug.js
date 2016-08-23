/**
 * @description Only an enemy of the game.
 * @constructor
 */
function Bug() {
    Enemy.call(this);
};

Bug.prototype = Object.create(Enemy.prototype);
Bug.prototype.constructor = Bug;

/**
 * @description Starts the insect through its default settings.
 * @param  {number} levelGame
 */
Bug.prototype.init = function(levelGame) {
    if (!this.isInitialized()) {
        this.setPadding(10);
        this.setEntityName('bug');
        this.setEntityGroup('enemies');
        this.addTerrainsSurface(['stone']);
        this.generateSprite();
        this.initialize();
    }

    this.setSpeed(this.getRandomSpeed(levelGame));
};
