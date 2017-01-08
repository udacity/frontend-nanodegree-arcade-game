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
 */
Bug.prototype.init = function() {
    var traffic = this.getModule('traffic');

    if (!this.isInitialized()) {
        this.setPadding(10);
        this.setEntityName('bug');
        this.setEntityGroup('enemies');
        this.addTerrainsSurface(['stone']);
        this.generateSprite();
        this.initialize();
    }

    this.setRoute(traffic.getEmptyRoute(this.getTerrainsSurface()));
    traffic.declareRouteEntry(this.getRoute());
    this.setSpeed(this.getRandomSpeed());
};
