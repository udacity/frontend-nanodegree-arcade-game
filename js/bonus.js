/**
 * @description The bonuses are items that appear during the game. Each item has
 * a distinct bonus: accretion of points and lives. Change the bonuses and other
 * behavior in the configuration file.
 * @constructor
 */
function Bonus() {
    this.scoreIncrement = 0;
    Entity.call(this);
};

Bonus.prototype = Object.create(Entity.prototype);
Bonus.prototype.constructor = Bonus;

/**
 * Initialize a bonus
 */
Bonus.prototype.init = function() {
    var traffic = this.getModule('traffic');

    if (!this.isInitialized()) {
        this.setDefaultConfig();
        this.setPadding(20);
        this.setEntityGroup('bonus');
        this.addTerrainsSurface(['grass','stone']);
        this.generateSprite();
        this.initialize();
        this.hibernate();
    }

    this.setAxisX(this.getRandomAxisX());
    this.setRoute(traffic.getRoute(this.getTerrainsSurface()));
};

/**
 * @description This function set a bonus based on the game default settings.
 * You can change these settings directly in config.js file
 */
Bonus.prototype.setDefaultConfig = function() {
    this.setScoreIncrement(this.getConfig().scoreIncrement);
    this.setEntityName(this.getConfig().entityName);
    this.hibernationDuration(this.getConfig().hibernationDuration);
    this.hibernationInterval(this.getConfig().hibernationInterval);
};

/**
 * @description Defines a score that will be added in game scoreboard.
 * @param {number} score
 */
Bonus.prototype.setScoreIncrement = function(score) {
    if (!Number.isInteger(score))
        throw new TypeError('Waiting for a score in numeric format.');

    this.scoreIncrement = score;
};

/**
 * Returns a random position of the axis X.
 * @return {number}
 */
Bonus.prototype.getRandomAxisX = function() {
    var traffic     = this.getModule('traffic'),
        scenario    = this.getModule('scenario'),
        columns     = scenario.getColumnsPositions();

    return columns[Math.floor(Math.random() * columns.length)];
}

/**
 * @description Sets action and bonus behavior when colliding with the player.
 */
Bonus.prototype.collided = function() {
    var scoreboard = this.getModule('scoreboard');

    scoreboard.addScore(this.scoreIncrement);
    this.reset();
    this.hibernate();
};
