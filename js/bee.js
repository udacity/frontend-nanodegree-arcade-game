/**
 * @description Enemy.
 * @constructor
 */
var Bee = function() {
    this.sprite = {
        group:  'enemies',
        name:   'bee'
    };
    this.padding = 30;
    this.futureTime = null;
    this.hibernationTime = 10;
    this.terrainsSurface = 'grass';
    Enemy.call(this);
    this.hibernate();
};

Bee.prototype = Object.create(Enemy.prototype);
Bee.prototype.constructor = Bee;

/**
 * @description Update the enemy's position, required method for game.
 * @param  {number} dt
 */
Bee.prototype.update = function(dt) {
    var timer = this.getModule('timer');

    if(this.futureTime === null)
        this.futureTime = timer.createFutureTime(this.hibernationTime);

    if(timer.isFutureTime(this.futureTime) && this.isHibernate())
        this.wake();

    Enemy.prototype.update.call(this, dt);
    return true;
};

/**
 * @description Reset the enemy.
 */
Bee.prototype.reset = function() {
    this.futureTime = null;
    this.hibernate();
    Enemy.prototype.reset.call(this);
    return true;
};
