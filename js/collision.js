var Collision = function() {
    this.enemy;
    this.player;
    this.imageWidth;
};

Collision.prototype.setImageWidth = function(width, height) {
    this.imageWidth = width;
};

Collision.prototype.setPlayerData = function(playerData) {
    this.player = playerData;
};

Collision.prototype.setEnemyData = function(enemyData) {
    this.enemy = enemyData;
};

Collision.prototype.getImpingementArea = function(entity) {
    var entityData = this[entity];
    return this.imageWidth - (2 * entityData.padding);
};

Collision.prototype.minCollisionPoint = function(entity) {
    var entityData = this[entity];
    return entityData.x + entityData.padding;
};

Collision.prototype.maxCollisionPoint = function(minCPoint, impingementArea) {
    return minCPoint + impingementArea;
};

Collision.prototype.collided = function() {
    if(this.player.route === this.enemy.route) {
        var player = {
            impingementArea: this.getImpingementArea('player'),
            min: this.minCollisionPoint('player')
        };
        player['max'] = this.maxCollisionPoint(
            player.min,
            player.impingementArea
        );

        var enemy = {
            impingementArea: this.getImpingementArea('enemy'),
            min: this.minCollisionPoint('enemy')
        };
        enemy['max'] = this.maxCollisionPoint(
            enemy.min,
            enemy.impingementArea
        );

        if ((enemy.max >= player.min && enemy.max <= player.max)
            || (enemy.min >= player.min && enemy.min <= player.max)
            || (enemy.min >= player.min && enemy.max <= player.max)
            || (player.min >= enemy.min && player.max <= enemy.max)
        ) {
            return true;
        }
    }

    return false;
};
