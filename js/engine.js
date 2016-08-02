/**
 * @description This file provides the game loop functionality (update
 * entities and render). You can find a complete description of this
 * class in address: github.com/udacity/frontend-nanodegree-arcade-game
 * @param {object} global
 */
var Engine = function(global) {
    this.player;
    this.lastTime;
    this.enemies = [];
    this.pause = false;
    this.win = global.window;
    Module.call(this);
};

Engine.prototype = Object.create(Module.prototype);
Engine.prototype.constructor = Engine;

/**
 * @description Add enemies.
 * @param  {object} enemy
 */
Engine.prototype.addEnemies = function(enemy) {
    this.enemies.push(enemy);
};

/**
 * @description Assign player
 * @param  {object} player - Player Instance
 */
Engine.prototype.setPlayer = function(player) {
    this.player = player;
};

/**
 * @description Pause the game. You can change the pause button in the game
 * settings.
 * @param  {string} key
 */
Engine.prototype.inPause = function(key) {
    if(key === 'pause') {
        if(this.pause)
            this.lastTime = Date.now();
        this.pause = this.pause ? false : true;
    }
}

/**
 * @description This function serves as the kickoff point for the game
 * loop itself and handles properly calling the update and render methods.
 */
Engine.prototype.main = function() {
    if(!this.pause) {
        var now = Date.now(),
            dt = (now - this.lastTime) / 1000.0;

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
    var traffic     = this.getModule('traffic'),
        scoreboard  = this.getModule('scoreboard');

    // Enemies
    this.enemies.forEach(function(enemy) {
        if(enemy.needStartup()) {
            if(enemy.getLastTraveledRoute() !== null) {
                traffic.declareRouteOutput(enemy.getLastTraveledRoute());
                scoreboard.addScore();
            }

            var route = traffic.getEmptyRoute(enemy.getTerrainsSurface());
            traffic.declareRouteEntry(route);
            enemy.setRoute(route);
            enemy.init(scoreboard.getLevel());
        }
        enemy.update(dt);
    });

    // Player
    if(this.player.getRoute() === null) {
        if(this.player.gameStarted())
            scoreboard.removeLife();
        this.player.init();
    }

    // Collision
    this.checkCollisions();
};

/**
 * @description Checks whether the character collided with an enemy.
 */
Engine.prototype.checkCollisions = function() {
    var collision   = this.getModule('collision')
        scoreboard  = this.getModule('scoreboard');

    this.enemies.forEach(function(enemy) {
        collision.addEntityData({
            'player': {
                x: this.player.axisX(),
                route: this.player.getRoute(),
                padding: this.player.getPadding()
            },
            'enemy': {
                x: enemy.axisX(),
                route: enemy.getRoute(),
                padding: enemy.getPadding()
            }
        });

        if(collision.collided()) {
            scoreboard.removeLife();
            enemy.reset();
            this.player.init();
        }
    }.bind(this));
};

/**
 * This function is called every game tick (or loop of the game engine) because
 * that's how games work - they are flipbooks creating the illusion of animation
 * but in reality they are just drawing the entire screen over and over.
 */
Engine.prototype.render = function() {
    var scenario = this.getModule('scenario');

    // Scenario
    scenario.render();

    // Enemies
    this.enemies.forEach(function(enemy) {
        enemy.render();
    });

    // Player
    this.player.render();
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
