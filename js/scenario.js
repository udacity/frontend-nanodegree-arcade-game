/**
 * @description It offers useful information about the scenario
 * @constructor
 */
var Scenario = function() {
    Entity.call(this);
};

Scenario.prototype = Object.create(Entity.prototype);
Scenario.prototype.constructor = Scenario;

/**
 * @description The scenario is defined by columns. You can increase the number
 * of columns in scenario configuration.
 * @return {integer}
 */
Scenario.prototype.numberColumns = function() {
    return this.config.size.cols;
};

/**
 * @description Total number of lines in your scene. Each line represents a
 * route which in turn has its own terrain. You can set the desired amount of
 * rows in the settings.
 * @return {integer}
 */
Scenario.prototype.numberRows = function() {
    var rows = 0;

    this.getTerrainsSurface().forEach(function(terrain) {
        rows += this.config.size.rows[terrain];
    }.bind(this));
    return rows;
};

/**
 * @description The scenario is divided between the terrains surface: such as
 * water, stone, etc. This function returns an array containing all the labels
 * of defined terrains.
 * @return {array}
 */
Scenario.prototype.getTerrainsSurface = function() {
    return Object.keys(this.config.size.rows);
};

/**
 * @description With this feature you will have access to the number of lines
 * each terrains surface.
 * @param  {string} terrain
 * @return {number}
 */
Scenario.prototype.numberRowsByTerrainsSurface = function(terrain) {
    return this.config.size.rows[terrain];
};

/**
 * @description Whidth of scenario.
 * @return {integer}
 */
Scenario.prototype.width = function() {
    return this.numberColumns() * this.resources.imageSize('width');
};

/**
 * @description Height of scenario
 * @return {integer}
 */
Scenario.prototype.height = function() {
    var height  = this.resources.imageSize('height'),
        full    = this.resources.imageSize('full');

    return (this.numberRows() - 1) * height + full;
};

/**
 * @description Renders the scene
 */
Scenario.prototype.render = function() {
    var urlsRowsImages = [];

	this.getTerrainsSurface().forEach(function(terrain) {
		for(var i = 0; i < this.numberRowsByTerrainsSurface(terrain); i++) {
			urlsRowsImages.push(this.resources.urlImage('scenario', terrain));
		}
	}.bind(this));

	for (var row = 0; row < this.numberRows(); row++) {
		for (var col = 0; col < this.numberColumns(); col++) {
            var image = this.resourcesLoader.get(urlsRowsImages[row]);
			this.canvas.getContext().drawImage(image,
				col * this.resources.imageSize('width'),
				row * this.resources.imageSize('height'));
		}
	}
};
