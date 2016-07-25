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
    enemy.setResources(resources);
    enemy.setCanvas(canvas);
    enemy.setResourcesLoader(resourcesLoader);
    enemy.addPartExtra('scenario', scenario);
    return enemy;
};
