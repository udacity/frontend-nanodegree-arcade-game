/**
 * @description This is the class for you inherit your enemies. Manages the life
 * cycle,route, terrains surface, velocity, displacement, design, etc.
 * @constructor
 * @return {object}
 */
var Enemy = function() {
    this.x = 0;
    this.speed;
    this.sprite;
    this.levelGame;
    this.route = null;
    this.terrainsSurface;
    this.lastTraveledRoute = null;
    Entity.call(this);
};

Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

/**
 * @description Initialize the enemy.
 */
Enemy.prototype.init = function() {
    this.x = 0;
    this.speed = this.getRandomSpeed();
    if(typeof this.sprite !== 'string')
        this.convertSprite();
};

/**
 * @description Assigns the level of play to the enemy. This value is used to
 * generate an increasing speed according to the level of play.
 * @param  {number} level
 */
Enemy.prototype.setLevelGame = function(level) {
    this.levelGame = level;
};

/**
 * @description Generates a random speed.
 * @return {number}
 */
Enemy.prototype.getRandomSpeed = function() {
    var minSpeed = 150 + this.levelGame * 6,
        maxSpeed = 90 + this.levelGame * 3;

    return Math.random() * maxSpeed + minSpeed;
};

/**
 * @description Generate a valid url based on the group and enemy of the
 * element. After assigned to sprite enemy.
 */
Enemy.prototype.convertSprite = function() {
    var spriteGroup     = this.sprite.group,
        spriteElement   = this.sprite.element;

    this.sprite = this.resources.urlImage(spriteGroup, spriteElement);
};

/**
 * @description Assigns a route to the enemy.
 * @param  {number} route
 */
Enemy.prototype.setRoute = function(route) {
    this.route = route;
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
    var scenario = this.getPartExtra('scenario');

    this.x += this.speed * dt;
    if(this.x > scenario.width())
        this.reset();
};

/**
 * @description Draw the enemy on the screen, required method for game
 */
Enemy.prototype.render = function() {
    var ctx = this.canvas.getContext();
    ctx.drawImage(this.resourcesLoader.get(this.sprite), this.x, this.route);
};
