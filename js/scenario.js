/**
 * @description Game scenario. You can completely manage the game scenario, such
 * as number of columns, rows, and the terrain that each line will have. To base
 * the setting on the default settings, use the setDefaultConfig function.
 * @constructor
 */
function Scenario() {
    this.size = {
        cols: 0,
        rows: {}
    };
    Module.call(this);
};

Scenario.prototype = Object.create(Module.prototype);
Scenario.prototype.constructor = Scenario;

/**
 * @description This function set a scenario based on the game default settings.
 * You can change these settings directly in config.js file
 */
Scenario.prototype.setDefaultConfig = function() {
    this.setNumberColumns(this.getConfig().size.cols);
    Object.keys(this.getConfig().size.rows).forEach(function(terrain) {
        this.addNumberRows(terrain, this.getConfig().size.rows[terrain]);
    }.bind(this));
};

/**
 * @description Sets the number of columns that the scenario will have.
 * @param {number} numberColumns
 */
Scenario.prototype.setNumberColumns = function(numberColumns) {
    if (!Number.isInteger(numberColumns))
        throw new TypeError('Waiting for an integer');

    this.size.cols = numberColumns;
};

/**
 * @description Returns the set number of lines to the scenario.
 * @return {integer}
 */
Scenario.prototype.getNumberColumns = function() {
    return this.size.cols;
};

/**
 * @description Returns all the positions of the columns available in the
 * scenario.
 * @return {array}
 */
Scenario.prototype.getColumnsPositions = function() {
    var resources           = this.getModule('resources'),
        columnsPositions    = [];

    for (var i=0; i < this.getNumberColumns(); i++)
        columnsPositions.push((i * resources.imageSize('width')));

    return columnsPositions;
};

/**
 * @description Adds lines to the scenario. The lines are directly linked to the
 * type scenario. Warning: When you define a terrain, make sure that the same
 * image is set in the configuration file resource session.
 * @param {string} terrain - Exemple: water, stone and grass
 * @param {number} numberRows
 */
Scenario.prototype.addNumberRows = function(terrain, numberRows) {
    if (typeof terrain !== 'string')
        throw new TypeError('Waiting for an string');

    if (!Number.isInteger(numberRows))
        throw new TypeError('Waiting for an integer');

    terrain = terrain.toLowerCase();
    this.size.rows[terrain] = numberRows;
};

/**
 * @description Total number of lines in your scene. Each line represents a
 * route which in turn has its own terrain.
 * @return {integer}
 */
Scenario.prototype.getNumberRows = function() {
    var rows = 0;

    this.getTerrains().forEach(function(terrain) {
        if (this.hasTerrainRows(terrain))
            rows += this.size.rows[terrain];
    }.bind(this));

    return rows;
};

/**
 * @description The scenario is divided between the terrains: such as water,
 * stone, etc. This function returns an array containing all the labels of
 * defined terrains.
 * @return {array}
 */
Scenario.prototype.getTerrains = function() {
    return Object.keys(this.size.rows);
};

/**
 * @description With this feature you will have access to the number of lines
 * each terrain.
 * @param  {string} terrain
 * @return {number}
 */
Scenario.prototype.numberRowsByTerrain = function(terrain) {
    return this.hasTerrainRows(terrain) ? this.size.rows[terrain] : 0;
};

/**
 * @description Verifies that a terrain exists and if it has lines.
 * @param  {string}  terrain
 * @return {boolean}
 */
Scenario.prototype.hasTerrainRows = function(terrain) {
    if (!this.size.rows.hasOwnProperty(terrain))
        throw new TypeError('Terrain not found: ' + terrain);
    else if (this.size.rows[terrain] === 0)
        return false;
    else
        return true;
};

/**
 * @description Whidth of scenario.
 * @return {integer}
 */
Scenario.prototype.width = function() {
    var resources = this.getModule('resources');

    return this.getNumberColumns() * resources.imageSize('width');
};

/**
 * @description Height of scenario
 * @return {integer}
 */
Scenario.prototype.height = function() {
    var resources   = this.getModule('resources'),
        height      = resources.imageSize('height'),
        full        = resources.imageSize('full');

    return (this.getNumberRows() - 1) * height + full;
};

/**
 * @description Renders the scene
 */
Scenario.prototype.render = function() {
    var urlsRowsImages  = [],
        canvas          = this.getModule('canvas'),
        resources       = this.getModule('resources'),
        resourcesLoader = this.getModule('resourcesloader');

	this.getTerrains().forEach(function(terrain) {
		for(var i = 0; i < this.numberRowsByTerrain(terrain); i++)
            urlsRowsImages.push(resources.urlImage('scenario', terrain));
	}.bind(this));

	for (var row = 0; row < this.getNumberRows(); row++) {
		for (var col = 0; col < this.getNumberColumns(); col++) {
            var image = resourcesLoader.get(urlsRowsImages[row]);

			canvas.getContext().drawImage(image,
				col * resources.imageSize('width'),
				row * resources.imageSize('height'));
		}
	}
};
