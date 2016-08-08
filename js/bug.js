/**
 * @description Enemy.
 * @constructor
 */
function Bug() {
    this.sprite = {
        group:  'enemies',
        name:   'bug'
    };
    this.padding = 0;
    this.terrainsSurface = 'stone';
    Enemy.call(this);
};

Bug.prototype = Object.create(Enemy.prototype);
Bug.prototype.constructor = Bug;
