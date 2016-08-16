/**
 * @description This file provides the game loop functionality (update
 * entities and render). You can find a complete description of this class in
 * address: github.com/udacity/frontend-nanodegree-arcade-game
 * @constructor
 * @param {object} global - Global Instance
 */
function Engine(global) {
    if (global === undefined)
        throw new TypeError('Global instance must be assigned');

    this.enemies = [];
    this.player = null;
    this.pause = false;
    this.lastTime = undefined;
    this.win = global.window;
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
 * @description Checks whether the motor is paused.
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
 * @description Adds enemies. The enemies parameter expects an enemy or an array
 * of enemies.
 * @param {Enemy or array} enemies
 */
Engine.prototype.addEnemies = function(enemies) {
    if (enemies instanceof Array)
        enemies.forEach(function(enemy) {
            this.addEnemies(enemy);
        }.bind(this));
    else if (enemies instanceof Enemy)
        this.enemies.push(enemies);
    else
        throw new TypeError('Invalid enemy');
};

/**
 * @description Back in an array, the added enemies.
 * @return {array}
 */
Engine.prototype.getEnemies = function() {
    return this.enemies;
};

/**
 * @description Checks if an enemy was added into engine.
 * @return {boolean}
 */
Engine.prototype.hasEnemies = function() {
    return this.enemies.length > 0 ? true : false;
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
        this.lastTime = now;
    }
    this.win.requestAnimationFrame(this.main.bind(this));
};

/**
 * @description This function is called by main (our game loop) and itself
 * calls all of the functions which may need to update entity's data.
 * @param  {number} dt - delta time
 */
Engine.prototype.update = function(dt) {
    var traffic = this.getModule('traffic');

    // Enemies
    if (this.hasEnemies()) {
        this.getEnemies().forEach(function(enemy){
            enemy.init(10);

            if (!enemy.hasRoute()) {
                if (enemy.hasLastTraveledRoute())
                    traffic.declareRouteOutput(enemy.getLastTraveledRoute());

                enemy.setRoute(
                    traffic.getEmptyRoute(enemy.getTerrainsSurface())
                );
                traffic.declareRouteEntry(enemy.getRoute());
            }

            enemy.update(dt);
        });
    }
    // Player
    if (this.hasPlayer()) {
        this.player.init();
    }
};

Engine.prototype.checkCollisions = function() {};

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
    // Enemies
    if (this.hasEnemies()) {
        this.getEnemies().forEach(function(enemy){
            enemy.render();
        });
    }
    // Player
    if (this.hasPlayer())
        this.player.render();
};

Engine.prototype.reset = function() {};

/**
 * @description This function does some initial setup that should only occur
 * once, particularly setting the lastTime variable that is required for the
 * game loop.
 */
Engine.prototype.run = function() {
    this.lastTime = Date.now();
    this.main();
};
