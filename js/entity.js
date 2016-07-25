/**
 * @description Allows you to create your entities.
 * @constructor
 */
var Entity = function() {
    this.canvas;
    this.resources;
    this.partsExtras = [];
    this.resourcesLoader;
    Module.call(this);
};

Entity.prototype = Object.create(Module.prototype);
Entity.prototype.constructor = Entity;

/**
 * Assigns the resource manager in your entity.
 * @param  {object} resources - Resource Instance
 */
Entity.prototype.setResources = function(resources) {
    this.resources = resources;
};

/**
 * Assigns the canvas manager in your entity.
 * @param  {object} canvas - Canvas Instance
 */
Entity.prototype.setCanvas = function(canvas) {
    this.canvas = canvas;
};

/**
 * Assigns the resources loader in your entity.
 * @param  {object} resourcesLoader - Resource Loader Instance
 */
Entity.prototype.setResourcesLoader = function(resourcesLoader) {
    this.resourcesLoader = resourcesLoader;
};

/**
 * @description You can add extra parts to the entity.
 * @param  {string} label
 * @param  {object} part
 */
Entity.prototype.addPartExtra = function(label, part) {
    this.partsExtras[label] = part;
};

/**
 * @description Returns an extra part added previously.
 * @param  {string} label
 * @return {object}
 */
Entity.prototype.getPartExtra = function(label) {
    return this.partsExtras[label];
};
