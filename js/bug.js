/**
 * @description Enemy.
 * @constructor
 */
function Bug() {
    Enemy.call(this);
};

Bug.prototype = Object.create(Enemy.prototype);
Bug.prototype.constructor = Bug;

Bug.prototype.init = function(levelGame) {
    if (!this.isInitialized()) {
        //this.hibernationDuration(5);
        //this.hibernationInterval(10);
        this.setPadding(10);
        this.setEntityName('bug');
        this.setEntityGroup('enemies');
        this.addTerrainsSurface(['stone']);
        this.generateSprite();
        this.initialize();
        //this.hibernate();
    }

    this.setSpeed(this.getRandomSpeed(levelGame));
};
