/**
 * @description Enemy.
 * @constructor
 */
var Bee = function() {
    this.sprite = {
        group:  'enemies',
        name:   'bug'
    };
    this.padding = 30;
    this.futureTime = null;
    this.terrainsSurface = 'grass';
    Enemy.call(this);
};

Bee.prototype = Object.create(Enemy.prototype);
Bee.prototype.constructor = Bee;
