/**
 * @description Enemy.
 * @constructor
 */
var Bug = function() {
    this.sprite = {
        group:  'enemies',
        name:   'bug'
    };
    this.padding = 30;
    this.terrainsSurface = 'stone';
    Enemy.call(this);
};

Bug.prototype = Object.create(Enemy.prototype);
Bug.prototype.constructor = Bug;
