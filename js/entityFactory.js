/**
 * @description Factory of entities. You can set the dependencies of common
 * entities. If you require specific dependencies just pass them at the time of
 * entity creation.
 * @constructor
 */
function EntityFactory() {
    this.defaultDependencies = [];
    Module.call(this);
};

EntityFactory.prototype = Object.create(Entity.prototype);
EntityFactory.prototype.constructor = EntityFactory;

/**
 * @description Add dependencies that will be common to all entities created.
 * @param {array or Module} dependencies
 */
EntityFactory.prototype.addDefaultDependencies = function(dependencies) {
    if (dependencies instanceof Array) {
        dependencies.forEach(function(dependency) {
            this.addDefaultDependencies(dependency);
        }.bind(this));
    } else if (dependencies instanceof Module) {
        this.defaultDependencies.push(dependencies);
    } else {
        throw new TypeError('Waiting array modules or specific module');
    }
};

/**
 * @description Create a specific entity. You can inject specific dependencies,
 * just pass them right now.
 * @param  {Entity} entityName
 * @param  {array or Module} specificDependencies
 * @return {Entity}
 */
EntityFactory.prototype.create = function(entityName, specificDependencies) {
    var entity          = new (entityName),
        dependencies    = this.defaultDependencies;

    if (specificDependencies instanceof Array) {
        specificDependencies.forEach(function(dependency) {
            if (!(dependency instanceof Module)) {
                let label = dependency.constructor.name;
                throw new TypeError('Invalid module: ' + label);
            }

            dependencies.push(dependency);
        });
    } else if (specificDependencies instanceof Module) {
        dependencies.push(specificDependencies);
    }

    if (dependencies.length > 0)
        entity.addDependencies(dependencies);

    return entity;
};
