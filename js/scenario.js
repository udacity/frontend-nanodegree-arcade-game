/**
 * @description It offers useful information about the scenario
 * @constructor
 */
function Scenario() {
    Module.call(this);
};

Scenario.prototype = Object.create(Module.prototype);
Scenario.prototype.constructor = Scenario;

/**
 * @description The scenario is defined by columns. You can increase the number
 * of columns in scenario configuration.
 * @return {integer}
 */
Scenario.prototype.numberColumns = function() {
    return this.getConfig().size.cols;
};

/**
 * @description Returns all the positions of the columns available in the
 * scenario.
 * @return {array}
 */
Scenario.prototype.getColumnsPositions = function() {
    var resources           = this.getModule('resources'),
        columnsPositions    = [];

    for (let i=0; i < this.numberColumns(); i++)
        columnsPositions.push((i * resources.imageSize('width')));

    return columnsPositions;
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
        rows += this.getConfig().size.rows[terrain];
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
    return Object.keys(this.getConfig().size.rows);
};

/**
 * @description With this feature you will have access to the number of lines
 * each terrains surface.
 * @param  {string} terrain
 * @return {number}
 */
Scenario.prototype.numberRowsByTerrainsSurface = function(terrain) {
    if (typeof terrain !== 'string')
        throw new TypeError('Type of invalid input. Expected value: String');

    return this.getConfig().size.rows[terrain];
};

/**
 * @description Whidth of scenario.
 * @return {integer}
 */
Scenario.prototype.width = function() {
    var resources = this.getModule('resources');

    return this.numberColumns() * resources.imageSize('width');
};

/**
 * @description Height of scenario
 * @return {integer}
 */
Scenario.prototype.height = function() {
    var resources   = this.getModule('resources'),
        height      = resources.imageSize('height'),
        full        = resources.imageSize('full');

    return (this.numberRows() - 1) * height + full;
};

/**
 * @description Renders the scene
 */
Scenario.prototype.render = function() {
    var urlsRowsImages  = [],
        canvas          = this.getModule('canvas'),
        resources       = this.getModule('resources'),
        resourcesLoader = this.getModule('resourcesloader');

	this.getTerrainsSurface().forEach(function(terrain) {
		for(let i = 0; i < this.numberRowsByTerrainsSurface(terrain); i++)
            urlsRowsImages.push(resources.urlImage('scenario', terrain));
	}.bind(this));

	for (var row = 0; row < this.numberRows(); row++) {
		for (let col = 0; col < this.numberColumns(); col++) {
            let image = resourcesLoader.get(urlsRowsImages[row]);
			canvas.getContext().drawImage(image,
				col * resources.imageSize('width'),
				row * resources.imageSize('height'));
		}
	}
};
