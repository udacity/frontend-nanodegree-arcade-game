/**
 * @description Allows you to create your modules.
 * @constructor
 */
var Module = function() {
	this.config;
    this.modules = {};
};

/**
 * @description Allows you to include a configurantion object in your modules.
 * @param {object} config - configurations of module
 */
Module.prototype.config = function(config) {
	this.config = config;
};

Module.prototype.addModule = function(label, module) {
    this.modules[label] = module;
};

Module.prototype.getModule = function(label) {
    return this.modules[label];
}
