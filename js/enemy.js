/**
 * This is the class for you inherit your enemies. Manages the life cycle,
 * route, environment, velocity, displacement, design, etc.
 * @constructor
 * @return {object}
 */
var Enemy = function() {
    this.x = 0;
    this.speed;
    this.route;
    this.sprite;
    this.lastTraveledRoute;
    this.environments;
};

/**
 * Initialize the enemy. You must assign a route - You can get an empty route
 * through the traffic manager. Eg traffic.getEmptyRoute(Enemy of the
 * Environment). It is also necessary to state the level of play.
 * @param  {number} route
 * @param  {integer} gameLevel
 * @param  {object} resources - Resource instance
 */
Enemy.prototype.init = function(route, gameLevel, resources) {
    var minSpeed = 150 + gameLevel * 6,
        maxSpeed = 90 + gameLevel * 3,
        spriteGroup = this.sprite.group,
        spriteElement = this.sprite.element;

    this.route = route;
    this.speed = Math.random() * maxSpeed + minSpeed;
    this.sprite = resources.urlImage(spriteGroup, spriteElement);
};

/**
 * Reset your enemy. This is important because it allows the engine recognize
 * when your enemy needs to get back to the top of the map and be restarted
 * again.
 */
Enemy.prototype.reset = function() {
    this.lastTraveledRoute = this.route;
    delete this.route;
};

/**
 * Update the enemy's position, required method for game. The width setting
 * allows the method automatically recognize when the enemy reached the end of
 * the route.
 * @param  {number} dt - a time delta between ticks
 * @param  {number} scenarioWidth
 */
Enemy.prototype.update = function(dt, scenarioWidth) {
    this.x += this.speed * dt;
    if(this.x > scenarioWidth)
        this.reset();
};

/**
 * Draw the enemy on the screen, required method for game
 * @param  {object} ctx - Canvas 2D
 * @param  {object} resourcesLoader
 */
Enemy.prototype.render = function(ctx, loader) {
    ctx.drawImage(loader.get(this.sprite), this.x, this.route);
};

/**
 * Returns the enemy of the environment. It is through the environment that
 * traffic manager defines the routes allowed for each type of enemy. You must
 * assign the enemy of the environment in child classes.
 * Example: Bug {this.environments = [ 'stone']; }
 * @return {string or array}
 */
Enemy.prototype.getEnvironments = function() {
    return this.environments;
};

/**
 * A verification method. Informs if the enemy has been reset but not yet
 * restarted.
 * @return {boolean}
 */
Enemy.prototype.itRestarted = function() {
    return this.hasOwnProperty('route') ? false : true;
};
