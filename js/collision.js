/**
 * @description Monitors the collision between entities where character is the
 * central body.
 * @constructor
 */
function Collision() {
    this.player = null;
    Module.call(this);
};

Collision.prototype = Object.create(Module.prototype);
Collision.prototype.constructor = Collision;

/**
 * @description Attaches to the player object instance.
 * @param {Player} player
 */
Collision.prototype.setPlayer = function(player) {
    if (!(player instanceof Player))
        throw new TypeError('Waiting for valid instance of the object player');

    this.player = player;
};

/**
 * @description Verifies that the instance of the player object is assigned.
 * @return {Boolean} [description]
 */
Collision.prototype.hasPlayer = function() {
    return this.player instanceof Player ? true : false;
};

/**
 * @description Verifies that the collision between the player and an entity
 * has occurred.
 * @param  {number} min - Minimum collision position (entity)
 * @param  {[type]} max - Maximum collision position (entity)
 * @param  {[type]} route - Current route (entity)
 * @return {boolean}
 */
Collision.prototype.collided = function(min, max, route) {
    if (this.hasPlayer()) {
        if (this.player.getRoute() === route) {
            var playerMin = this.player.minCollisionPoint(),
                playerMax = this.player.maxCollisionPoint();

            if ((playerMax >= min && playerMax <= max)
                || (playerMin >= min && playerMin <= max)
                || (playerMin >= min && playerMax <= max)
                || (min >= playerMin && max <= playerMax))
                return true;
        }

        return false;
    }

    throw new TypeError('Waiting for definition of character');
};
