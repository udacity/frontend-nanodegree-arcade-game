/**
 * @description Entity factory
 */
var EntityFactory = function() {
    Entity.call(this);
};

EntityFactory.prototype = Object.create(Entity.prototype);
EntityFactory.prototype.constructor = EntityFactory;

/**
 * @description Returns an entity according to the declared type.
 * @param  {object name} type
 * @return {object}
 */
EntityFactory.prototype.createEntity = function(type) {
    var entity;

    entity = new (type);
    entity.addModule('canvas', this.getModule('canvas'));
    entity.addModule('scenario', this.getModule('scenario'));
    entity.addModule('resources', this.getModule('resources'));
    entity.addModule('resourcesLoader', this.getModule('resourcesLoader'));
    return entity;
};
