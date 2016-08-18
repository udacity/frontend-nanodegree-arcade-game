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
        this.hibernationDuration(5);
        //this.hibernationInterval(10);
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

/**
 * @description Update the enemy's position.
 * @param  {number} dt
 */
Bee.prototype.update = function(dt) {
    var scenario = this.getModule('scenario');

    if(!this.isHibernationActive()) {
        if (!this.hasSpeed())
            throw new TypeError('Waiting for speed setting');

        let increase = this.getAxisX() + (this.getSpeed() * dt);
        if (increase > 0)
            this.setAxisX(increase);

        if (this.getAxisX() > scenario.width()) {
            this.reset();
            this.hibernate();
        }
    }
};
