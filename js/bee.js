/**
 * @description Only an enemy of the game.
 * @constructor
 */
function Bee() {
    Enemy.call(this);
};

Bee.prototype = Object.create(Enemy.prototype);
Bee.prototype.constructor = Bee;

/**
 * @description Starts the insect through its default settings.
 * @param  {number} levelGame
 */
Bee.prototype.init = function(levelGame) {
    if (!this.isInitialized()) {
        this.endRouteCallbacks(this.hibernate.bind(this));
        this.hibernationDuration(20);
        this.setPadding(10);
        this.setEntityName('bee');
        this.setEntityGroup('enemies');
        this.addTerrainsSurface(['grass']);
        this.generateSprite();
        this.initialize();
        this.hibernate();
    }
    this.setSpeed(this.getRandomSpeed(levelGame));
};
