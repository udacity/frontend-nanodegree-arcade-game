/**
 * @description The bonuses are extra points and lives assigned to the player
 * throughout the game.
 * @constructor
 */
function Bonus() {
    this.route = null;
    this.starting = false;
    this.intervalHibernation = 8;
    this.durationHibernation = 15;
    Entity.call(this);
};

Bonus.prototype = Object.create(Entity.prototype);
Bonus.prototype.constructor = Bonus;

/**
 * @description Initialize the bonus.
 */
Bonus.prototype.init = function() {
    this.defineBonus();
    this.convertSprite();
    this.hibernate(this.durationHibernation);
};

/**
 * @description Creates the bonus settings.
 */
Bonus.prototype.defineBonus = function() {
    var bonus       = this.getRandomBonus(),
        scenario    = this.getModule('scenario'),
        columns     = scenario.getColumnsPositions();

    // Sprite
    this.sprite = {};
    this.sprite['group'] = 'bonus';
    this.sprite['name'] = bonus.label;

    this['padding'] = bonus.padding;
    this.x = columns[Math.floor(Math.random() * columns.length)];
    this['terrainsSurface'] = bonus.terrainsSurface;

    if (bonus.hasOwnProperty('score'))
        this['score'] = bonus.score;

    if (bonus.hasOwnProperty('life'))
        this['life'] = bonus.life;
};

/**
 * @description Select which bonus will be set.
 * @return {object} - Bonus settings
 */
Bonus.prototype.getRandomBonus = function() {
    var allbonus    = Object.keys(this.config),
        label       = allbonus[Math.floor(Math.random() * allbonus.length)]
        bonus       = this.config[label];

    bonus['label'] = label;
    return bonus;
};

/**
 * @description Returns the surface terrains set for the enemy.
 * @return {string or array}
 */
Bonus.prototype.getTerrainsSurface = function() {
    return this.terrainsSurface;
};

/**
 * @description Manages hibernation bonus.
 */
Bonus.prototype.update = function() {
    var timer = this.getModule('timer');

    if (this.checkHibernation() === false) {
        if (!this.hasOwnProperty('endIntervalHibernation')) {
            var end = timer.createFutureTime(this.intervalHibernation);
            this['endIntervalHibernation'] = end;
        }

        if (timer.isFutureTime(this.endIntervalHibernation)) {
            this.reset();
        }
    }
};

/**
 * @description Reset the bonus.
 */
Bonus.prototype.reset = function() {
    if (this.hasOwnProperty('score'))
        delete this.score;
    if (this.hasOwnProperty('life'))
        delete this.life;

    this.route = null;
    delete this.endIntervalHibernation;
    this.init();
};
