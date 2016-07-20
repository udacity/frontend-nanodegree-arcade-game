/**
 * @description Allows you to create your modules.
 * @constructor
 * @param {object} config - configurations of module
 */
var Module = function(config) {
	this.config;

	if(config !== undefined)
		this.setConfig(config);
};

/**
 * @description Allows you to include a configurantion object in your modules.
 * @param {object} config - configurations of module
 */
Module.prototype.setConfig = function(config) {
	if(!(config.constructor === Object))
		throw new TypeError('Invalid configuration object');
	this.config = config;
};
