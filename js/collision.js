/**
 * @description This is the collision system. It compares the position of two
 * objects and points when a collision occurs.
 */
var Collision = function() {
    this.entities = {};
    Module.call(this);
};

Collision.prototype = Object.create(Module.prototype);
Collision.prototype.constructor = Collision;

/**
 * @description Assign an object containing two entities with their respective
 * parameters (x, route and padding)
 * @param  {object} data
 */
Collision.prototype.addEntityData = function(data) {
    this.entities = data;
};

/**
 * @description Calculates and returns the collision area of the entity.
 * @param  {string} entity
 */
Collision.prototype.getImpingementArea = function(entity) {
    var resources   = this.getModule('resources'),
        entityData  = this.entities[entity];

    return resources.imageSize('width') - (2 * entityData.padding);
};

/**
 * @description Calculates and returns the lowest point of the entity collision.
 * @param  {string} entity
 */
Collision.prototype.minCollisionPoint = function(entity) {
    var entityData = this.entities[entity];
    return entityData.x + entityData.padding;
};

/**
 * @description Computes and returns the highest point of the entity collision.
 * @param  {number} minCPoint
 * @param  {number} impingementArea
 */
Collision.prototype.maxCollisionPoint = function(minCPoint, impingementArea) {
    return minCPoint + impingementArea;
};

/**
 * @description Check if there was a collision between the two entities.
 * @return {boolean}
 */
Collision.prototype.collided = function() {
    var labels  = Object.keys(this.entities),
        one     = this.entities[labels[0]],
        two     = this.entities[labels[1]];

    if(one.route === two.route) {
        labels.forEach(function(label){
            this.entities[label]['area']    = this.getImpingementArea(label);
            this.entities[label]['min']     = this.minCollisionPoint(label);
            this.entities[label]['max']     = this.maxCollisionPoint(
                this.entities[label]['min'],
                this.entities[label]['area']
            );
        }.bind(this));

        if ((one.max >= two.min && one.max <= two.max)
            || (one.min >= two.min && one.min <= two.max)
            || (one.min >= two.min && one.max <= two.max)
            || (two.min >= one.min && two.max <= one.max)
        ) {
            return true;
        }
    }
    return false;
};
