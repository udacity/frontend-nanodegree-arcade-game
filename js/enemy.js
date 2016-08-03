/**
 * @description This is the class for you inherit your enemies. Manages the life
 * cycle,route, terrains surface, velocity, displacement, design, etc.
 * @constructor
 * @return {object}
 */
var Enemy = function() {
    this.speed;
    this.route = null;
    this.updating = true;
    this.lastTraveledRoute = null;
    Entity.call(this);
};

Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

/**
 * @description Initialize the enemy.
 * @param  {number} levelGame
 */
Enemy.prototype.init = function(levelGame) {
    this.x = 0;
    this.speed = this.getRandomSpeed(levelGame);
    if(typeof this.sprite !== 'string')
        this.convertSprite();
};

/**
 * @description Generates a random speed.
 * @return {number}
 */
Enemy.prototype.getRandomSpeed = function(levelGame) {
    var minSpeed = 150 + levelGame * 6,
        maxSpeed = 90 + levelGame * 3;

    return Math.random() * maxSpeed + minSpeed;
};

/**
 * @description Returns the surface terrains set for the enemy.
 * @return {string or array}
 */
Enemy.prototype.getTerrainsSurface = function() {
    return this.terrainsSurface;
};

/**
 * @description Returns the last route taken by the enemy.
 * @return {number}
 */
Enemy.prototype.getLastTraveledRoute = function() {
    return this.lastTraveledRoute;
};

/**
 * @description Verifies that enemy must be restarted.
 * @return {boolean}
 */
Enemy.prototype.needStartup = function() {
    return this.route === null ? true : false;
};

/**
 * @description Activates the update of the enemy.
 */
Enemy.prototype.activateUpdate = function() {
    this.updating = true;
};

/**
 * @description Disable the update of the enemy.
 */
Enemy.prototype.deactivateUpdate = function() {
    this.updating = false;
};

/**
 * @description Puts the enemy into hibernation. In this state the enemy
 * ceases to be updated and rendered.
 */
Enemy.prototype.hibernate = function() {
    this.deactivateUpdate();
    this.deactivateRender();
};

/**
 * @description Checks whether the enemy is in hibernation.
 * @return {boolean}
 */
Enemy.prototype.isHibernate = function() {
    return this.updating || this.rendering ? false : true;
};

/**
 * @description Acorda an enemy from hibernation, returning your updates and
 * regular renderings.
 */
Enemy.prototype.wake = function() {
    this.activateUpdate();
    this.activateRender();
};

/**
 * @description Reset the enemy.
 */
Enemy.prototype.reset = function() {
    this.lastTraveledRoute = this.route;
    this.route = null;
};

/**
 * @description Update the enemy's position, required method for game.
 * @param  {number} dt
 */
Enemy.prototype.update = function(dt) {
    var scenario = this.getModule('scenario');

    if(this.updating) {
        this.x += this.speed * dt;
        if(this.x > scenario.width())
            this.reset();
    }
};
