/**
 * @description This file provides the game loop functionality (update
 * entities and render). You can find a complete description of this
 * class in address: github.com/udacity/frontend-nanodegree-arcade-game
 * @param {object} global
 */
var Engine = function(global) {
    this.ctx;
	this.lastTime;
	this.doc = global.document;
	this.win = global.window;
};

/**
 * @description This create canvas.
 */
Engine.prototype.createCanvas = function(width, height) {
	var canvas = this.doc.createElement('canvas');

	canvas.width = width;
	canvas.height = height;
	this.ctx = canvas.getContext('2d');
	div = this.doc.getElementById('canvas-container');
	div.appendChild(canvas);
};

/**
 * @description This function serves as the kickoff point for the game
 * loop itself and handles properly calling the update and render methods.
 */
Engine.prototype.main = function() {
    var now = Date.now(),
        dt = (now - this.lastTime) / 1000.0;

    this.update(dt);
    this.lastTime = now;
	this.win.requestAnimationFrame(this.main.bind(this));
};

/**
 * @description This function is called by main (our game loop) and itself
 * calls all of the functions which may need to update entity's data.
 * @param  {number} dt - delta time
 */
Engine.prototype.update = function(dt) {
	this.updateEntities(dt);
};

/**
 * @description Updates the entities of game. Example: enemies, player, etc.
 * @param  {number} dt - delta time
 */
Engine.prototype.updateEntities = function(dt) {
    console.log(dt);
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
