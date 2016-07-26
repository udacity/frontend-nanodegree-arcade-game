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
    entity.setResources(this.resources);
    entity.setCanvas(this.canvas);
    entity.setResourcesLoader(this.resourcesLoader);
    entity.addPartExtra('scenario', this.getPartExtra('scenario'));
    return entity;
};
