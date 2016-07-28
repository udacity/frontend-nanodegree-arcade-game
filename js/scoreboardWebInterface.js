/**
 * @description Changes the score values on the user's screen.
 * @param  {object} global
 */
var ScoreboardWebInterface = function(global) {
    this.doc = global.document;
    Module.call(this);
};

ScoreboardWebInterface.prototype = Object.create(Module.prototype);
ScoreboardWebInterface.prototype.constructor = ScoreboardWebInterface;

/**
 * @description Changes the value of points, levels and lives, according to the
 * element and assigned value.
 * @param  {string} element
 * @param  {number} value
 */
ScoreboardWebInterface.prototype.change = function(element, value) {
    var config          = this.config[element].webInterface,
        elmHtml         = this.doc.getElementById(config.id),
        elmHtmlContent  = '<span></span> ' + config.label + value;

    elmHtml.innerHTML = elmHtmlContent;
};

/**
 * @description Starts an animation on an element.
 * @param  {string} element
 * @param  {string} animation - add or remove
 */
ScoreboardWebInterface.prototype.animation = function(element, animation) {
    var config          = this.config[element].webInterface,
        elmHtml         = this.doc.getElementById(config.id);

    elmHtml.setAttribute('class', animation);
    setTimeout(function() {
        elmHtml.removeAttribute('class');
    }, 2000);
};
