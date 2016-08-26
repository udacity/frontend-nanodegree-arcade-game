/**
 * @description This is the class for you inherit your enemies. Manages the life
 * cycle,route, terrains surface, velocity, displacement, design, etc.
 * @constructor
 */
function Enemy() {
    this.speed = undefined;
    Entity.call(this);
};

Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

/**
 * @description Sets a velocity for the enemy. You can get a random speed
 * through getRandomSpeed function.
 * @param {number} speed
 */
Enemy.prototype.setSpeed = function(speed) {
    if (typeof speed !== 'number')
        throw new TypeError('Velocity invalid');

    this.speed = speed;
};

/**
 * @description Returns the current speed of the enemy.
 * @return {number}
 */
Enemy.prototype.getSpeed = function() {
    return this.speed;
};

/**
 * @description Generates a random speed. That speed uses the current level of
 * the game as a parameter to calculate.
 * @return {number}
 */
Enemy.prototype.getRandomSpeed = function() {
    var scoreboard  = this.getModule('scoreboard'),
        levelGame   = scoreboard.getLevel();

    return Math.random() * (150 + levelGame * 6) + (90 + levelGame * 2);
};

/**
 * @description Checks whether the enemy has a set speed.
 * @return {boolean}
 */
Enemy.prototype.hasSpeed = function() {
    return this.getSpeed() !== undefined ? true : false;
};

/**
 * @description Function is called when each enemy reaches the end of the route.
 * Checks for callback functions to be invoked.
 */
Enemy.prototype.endRoute = function() {
    if (this.hasCallbacks('endRoute'))
        this.executeCallbacks('endRoute');
};

/**
 * @description Function is performed when the enemy collides with the player.
 * When creating a new enemy, you can set specific reactions to this collision
 * enemy. Sobescreva the collided() method.
 */
Enemy.prototype.collided = function() {
    var scoreboard = this.getModule('scoreboard');

    scoreboard.removeLife();
};

/**
 * @description Update the enemy's position.
 * @param  {number} dt
 */
Enemy.prototype.update = function(dt) {
    var scenario = this.getModule('scenario');

    if(!this.isHibernationActive()) {
        if (!this.hasSpeed())
            throw new TypeError('Waiting for speed setting');

        let increase = this.getAxisX() + (this.getSpeed() * dt);
        if (increase > 0)
            this.setAxisX(increase);

        if (this.getAxisX() > scenario.width()) {
            this.reset();
            this.endRoute();
        }

    }
};
