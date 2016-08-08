/**
 * @description Manipulate the canvas element
 * @constructor
 * @param  {object} global - Global Instance
 */
function Canvas(global) {
    this.width;
    this.height;
    this.canvas;
    this.container;
    this.doc = global.document;
};

/**
 * @description Size of the canvas element. You can generate these measures
 * through the width() and height() the scene object.
 * @param  {number} width
 * @param  {number} height
 */
Canvas.prototype.size = function(width, height) {
    this.width = width;
    this.height = height;
};

/**
 * @description Canvas will be added within the html element containing the
 * assigned ID that method.
 * @param  {string} container
 */
Canvas.prototype.appendIn = function(container) {
    this.container = container;
}

/**
 * @description Creates the canvas object.
 */
Canvas.prototype.create = function() {
    this.canvas = this.doc.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    var container = this.doc.getElementById(this.container);
    container.appendChild(this.canvas);
};

/**
 * @description Returns the canvas element context.
 * @return {object}
 */
Canvas.prototype.getContext = function() {
    if (this.ctx === undefined)
        this.ctx = this.canvas.getContext('2d');

    return this.ctx;
};
