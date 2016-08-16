/**
 * @description Manipulate the canvas element
 * @constructor
 * @param  {object} global - Global Instance
 */
function Canvas(global) {
    if (global === undefined)
        throw new TypeError('Global instance must be assigned');

    this.width = 0;
    this.height = 0;
    this.canvas = null;
    this.doc = global.document;
    Module.call(this);
};

Canvas.prototype = Object.create(Module.prototype);
Canvas.prototype.constructor = Canvas;

/**
 * @description Size of the canvas element. You can generate these measures
 * through the width() and height() the scene object.
 * @param  {number} width
 * @param  {number} height
 */
Canvas.prototype.size = function(width, height) {
    if (!Number.isInteger(width) || !Number.isInteger(height))
        throw new TypeError('Type of invalid input. Expected value: Integer');

    this.width = width;
    this.height = height;
};

/**
 * @description Creates the canvas object.
 */
Canvas.prototype.create = function() {
    var container   = this.doc.getElementById(this.getConfig().containerId);
    this.canvas     = this.doc.createElement('canvas');

    if (!(this.canvas instanceof HTMLCanvasElement))
        throw new TypeError('Error on canvas creation');

    if (this.width === 0 || this.height === 0)
        throw new TypeError('Waiting size to complete creation');

    this.canvas.width = this.width;
    this.canvas.height = this.height;
    container.appendChild(this.canvas);
};

/**
 * @description Returns the canvas element context.
 * @return {object}
 */
Canvas.prototype.getContext = function() {
    if (!(this.canvas instanceof HTMLCanvasElement))
        throw new TypeError('Canvas was not created');

    if (this.ctx === undefined)
        this.ctx = this.canvas.getContext('2d');

    return this.ctx;
};
