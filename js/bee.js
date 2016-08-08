/**
 * @description Enemy.
 * @constructor
 */
var Bee = function() {
    this.sprite = {
        group:  'enemies',
        name:   'bee'
    };
    this.score = 20;
    this.padding = 30;
    this.durationHibernation = 10;
    this.terrainsSurface = 'grass';
    Enemy.call(this);
};

Bee.prototype = Object.create(Enemy.prototype);
Bee.prototype.constructor = Bee;

/**
 * @description Initialize the enemy.
 * @param  {number} levelGame
 */
Bee.prototype.init = function(levelGame) {
    this.hibernate(this.durationHibernation);
    Enemy.prototype.init.call(this, levelGame);
    return true;
};

/**
 * @description Reset the enemy.
 */
Bee.prototype.reset = function() {
    this.hibernate(this.durationHibernation);
    Enemy.prototype.reset.call(this);
    return true;
};
