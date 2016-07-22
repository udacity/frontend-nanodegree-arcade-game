/**
 * @description Enemy. Receives a characteristic sprite and one or more
 * environment(s).
 * @constructor
 * @return {object}
 */
var Bug = function() {
    Enemy.call(this);
    this.sprite = {
        group: 'enemies',
        element: 'bug'
    };
    this.environments = 'stone';
};

Bug.prototype = Object.create(Enemy.prototype);
Bug.prototype.constructor = Bug;
