/**
 * @description This file provides the game loop functionality (update
 * entities and render). You can find a complete description of this
 * class in address: github.com/udacity/frontend-nanodegree-arcade-game
 * @param {object} global
 */
var Engine = function(global) {
    this.traffic;
    this.lastTime;
    this.scenario;
    this.enemies = [];
    this.win = global.window;
};

/**
 * @description Assign instantiates the scenario.
 * @param  {object} scenario - Scenario Instance
 */
Engine.prototype.setScenario = function(scenario) {
    this.scenario = scenario;
};

/**
 * @description Assign traffic
 * @param  {[type]} traffic
 */
Engine.prototype.setTraffic = function(traffic) {
    this.traffic = traffic;
};

/**
 * @description Add enemies.
 * @param  {object} enemy
 */
Engine.prototype.addEnemies = function(enemy) {
    this.enemies.push(enemy);
};

/**
 * @description This function serves as the kickoff point for the game
 * loop itself and handles properly calling the update and render methods.
 */
Engine.prototype.main = function() {
    var now = Date.now(),
        dt = (now - this.lastTime) / 1000.0;

    this.update(dt);
    this.render();
    this.lastTime = now;
	this.win.requestAnimationFrame(this.main.bind(this));
};

/**
 * @description This function is called by main (our game loop) and itself
 * calls all of the functions which may need to update entity's data.
 * @param  {number} dt - delta time
 */
Engine.prototype.update = function(dt) {
    // Enemies
    this.enemies.forEach(function(enemy) {
        if(enemy.needStartup()) {
            if(enemy.getLastTraveledRoute() !== null)
                this.traffic.declareRouteOutput(enemy.getLastTraveledRoute());

            var route = this.traffic.getEmptyRoute(enemy.getTerrainsSurface());
            this.traffic.declareRouteEntry(route);
            enemy.setLevelGame(1);
            enemy.setRoute(route);
            enemy.init();
        }
        enemy.update(dt);
    });
};

/**
 * This function is called every game tick (or loop of the game engine) because
 * that's how games work - they are flipbooks creating the illusion of animation
 * but in reality they are just drawing the entire screen over and over.
 */
Engine.prototype.render = function() {
    // Scenario
    this.scenario.render();

    // Enemies
    this.enemies.forEach(function(enemy) {
        enemy.render();
    });
};

/**
 * This function does nothing but it could have been a good place to handle game
 * reset states - maybe a new game menu or a game over screen those sorts of
 * things. It's only called once by the init() method.
 */
Engine.prototype.reset = function() {
	// reset
};

/**
 * @description This function does some initial setup that should only occur
 * once, particularly setting the lastTime variable that is required for the
 * game loop.
 */
Engine.prototype.run = function() {
	this.reset();
	this.lastTime = Date.now();
	this.main();
};
