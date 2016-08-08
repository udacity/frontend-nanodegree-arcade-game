function Bonus() {
    this.sprite = {
        group: 'bonus'
    };
    this.x = 0;
    this.route = null;
    Entity.call(this);
};

Bonus.prototype = Object.create(Entity.prototype);
Bonus.prototype.constructor = Bonus;

Bonus.prototype.init = function() {
    var allbonus        = Object.keys(this.config),
        bonusLabel      = allbonus[Math.floor(Math.random() * allbonus.length)],
        bonus           = this.config[bonusLabel];

    // Sprite
    this.sprite['name'] = bonusLabel;
    this.convertSprite();

    // Configs
    this['padding']         = bonus.padding;
    this['terrainsSurface'] = bonus.terrainsSurface;

    if (bonus.hasOwnProperty('score'))
        this['score'] = bonus.score;

    if (bonus.hasOwnProperty('life'))
        this['life'] = bonus.life;

    this.hibernate(15);
};

/**
 * @description Returns the surface terrains set for the enemy.
 * @return {string or array}
 */
Bonus.prototype.getTerrainsSurface = function() {
    return this.terrainsSurface;
};
