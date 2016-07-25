/**
 * @description Allows you to create your modules.
 * @constructor
 */
var Module = function() {
	this.config;
};

/**
 * @description Allows you to include a configurantion object in your modules.
 * @param {object} config - configurations of module
 */
Module.prototype.setConfig = function(config) {
	this.config = config;
};
