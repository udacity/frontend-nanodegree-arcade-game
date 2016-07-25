/**
 * @description enemies factory
 */
var EnemyFactory = function() {
    Entity.call(this);
};

EnemyFactory.prototype = Object.create(Entity.prototype);
EnemyFactory.prototype.constructor = EnemyFactory;

/**
 * @description Returns an enemy according to the declared type.
 * @param  {object name} type
 * @return {object}
 */
EnemyFactory.prototype.createEnemy = function(type) {
    var enemy;

    enemy = new (type);
    enemy.setResources(this.resources);
    enemy.setCanvas(this.canvas);
    enemy.setResourcesLoader(this.resourcesLoader);
    enemy.addPartExtra('scenario', this.getPartExtra('scenario'));
    return enemy;
};
