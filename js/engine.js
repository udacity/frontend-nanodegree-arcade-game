/**
 * @description This file provides the game loop functionality (update
 * entities and render). You can find a complete description of this class in
 * address: github.com/udacity/frontend-nanodegree-arcade-game
 * @constructor
 */
function Engine() {
    this.entities = [];
    this.player = null;
    this.pause = false;
    this.lastTime = undefined;
    Module.call(this);
};

Engine.prototype = Object.create(Module.prototype);
Engine.prototype.constructor = Engine;

/**
 * @description Inserting or removing the engine paused. You can set the pause
 * button directly in the settings file.
 * @param  {string} key
 */
Engine.prototype.pauseGame = function(key) {
    var now = Date.now();

    if (key === 'pause') {
        if (this.pause)
            this.lastTime = now;

        this.pause = this.isPauseGame() ? false : true;
    }
};

/**
 * @description Checks whether the engine is paused.
 * @return {boolean}
 */
Engine.prototype.isPauseGame = function() {
    return this.pause;
};

/**
 * @description Defines a player to the engine.
 * @param {Player} player
 */
Engine.prototype.setPlayer = function(player) {
    if (!(player instanceof Player))
        throw new TypeError('Invalid player');

    this.player = player;
};

/**
 * @description Returns the player defined in the engine.
 * @return {Player}
 */
Engine.prototype.getPlayer = function() {
    return this.player;
};

/**
 * @description Verifies that a player has been set for the engine.
 * @return {boolean}
 */
Engine.prototype.hasPlayer = function() {
    return (this.player instanceof Player) ? true : false;
};

/**
 * @description Adds entities.
 * @param {Entity or array} entities
 */
Engine.prototype.addEntities = function(entities) {
    if (entities instanceof Array)
        entities.forEach(function(entity) {
            this.addEntities(entity);
        }.bind(this));
    else if (entities instanceof Entity)
        this.entities.push(entities);
    else
        throw new TypeError('Invalid entity');
};

/**
 * @description Back in an array, the added entities.
 * @return {array}
 */
Engine.prototype.getEntities = function() {
    return this.entities;
};

/**
 * @description Checks if an entity was added into engine.
 * @return {boolean}
 */
Engine.prototype.hasEntities = function() {
    return this.entities.length > 0 ? true : false;
};

/**
 * @description This function serves as the kickoff point for the game
 * loop itself and handles properly calling the update and render methods.
 */
Engine.prototype.main = function() {
    var now = Date.now(),
        dt  = (now - this.lastTime) / 1000.0;

    if (!this.isPauseGame()) {
        this.update(dt);
        this.render();
        this.checkCollisions();
        this.lastTime = now;
    }
    window.requestAnimationFrame(this.main.bind(this));
};

/**
 * @description This function is called by main (our game loop) and itself
 * calls all of the functions which may need to update entity's data.
 * @param  {number} dt - delta time
 */
Engine.prototype.update = function(dt) {
    var traffic = this.getModule('traffic');

    // Entities
    if (this.hasEntities()) {
        this.getEntities().forEach(function(entity){
            if (!entity.hasRoute())
                entity.init();

            if (entity instanceof Enemy)
                entity.update(dt);
        });
    }

    // Player
    if (this.hasPlayer())
        this.player.init();
};

/**
 * @description Constantly checks if the character collided with other entities.
 */
Engine.prototype.checkCollisions = function() {
    var collision = this.getModule('collision');

    if (this.hasEntities()) {
        this.getEntities().forEach(function(entity) {
            var entityMin = entity.minCollisionPoint(),
                entityMax = entity.maxCollisionPoint();

            if (collision.collided(entityMin, entityMax, entity.getRoute())
                && !entity.isHibernationActive()) {
                entity.collided();

                this.player.moveForStartPoint();
            }
        });
    }
};

/**
 * @description This function is called every game tick (or loop of the game
 * engine) because that's how games work - they are flipbooks creating the
 * illusion of animation but in reality they are just drawing the entire screen
 * over and over.
 */
Engine.prototype.render = function() {
    var scenario = this.getModule('scenario');

    // Scenario
    scenario.render();

    // Entities
    if (this.hasEntities()) {
        this.getEntities().forEach(function(entity){
            entity.render();
        });
    }

    // Player
    if (this.hasPlayer())
        this.player.render();
};

/**
 * @description This function does some initial setup that should only occur
 * once, particularly setting the lastTime variable that is required for the
 * game loop.
 */
Engine.prototype.run = function() {
    var scoreboard = this.getModule('scoreboard');

    this.lastTime = Date.now();
    scoreboard.init();
    this.main();
};
