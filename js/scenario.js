/**
 * @description It offers useful information about the scenario
 * @constructor
 * @param {config} config - configurations of scenario
 */
var Scenario = function(config) {
	this.imageSize = {};
	Module.call(this, config);
};

Scenario.prototype = Object.create(Module.prototype);
Scenario.prototype.constructor = Scenario;

Scenario.prototype.setImageSize = function(imageSize) {
	Object.keys(imageSize).forEach(function(dimension) {
		this.imageSize[dimension] = imageSize[dimension];
	}.bind(this));
};

/**
 * @description The scenario is defined by columns. You can increase the number
 * of columns in scenario configuration.
 * @return {integer}
 */
Scenario.prototype.cols = function() {
	return this.config.size.cols;
};

/**
 * @description Total number of lines in your scene. Each line represents a
 * route which in turn has its own environment. You can set the desired amount
 * of rows in the settings.
 * @return {integer}
 */
Scenario.prototype.rows = function() {
	var rows = 0,
        rowsObject = this.config.size.rows;

    this.getEnvironments().forEach(function(environment) {
        rows += rowsObject[environment];
    });
	return rows;
};

/**
 * The scenario is divided between environments. these environments have their
 * own type of terrain, such as water, stone, etc. This function returns an
 * array containing all the labels defined environments.
 * @return {array}
 */
Scenario.prototype.getEnvironments = function() {
    return Object.keys(this.config.size.rows);
}

/**
 * @description With this feature you will have access to the number of lines
 * each environment. It is also possible to return the amount of line in a
 * particular environment.
 * @param {string} environment - The environment you want to return the
 * amount of line.
 * @return {object or number}
 */
Scenario.prototype.rowsForEnvironment = function(environment) {
    var rowsObject = this.config.size.rows;

    if(environment)
        return rowsObject[environment];
    return rowsObject;
};

/**
 * @description Whidth of scenario.
 * @return {integer}
 */
Scenario.prototype.width = function() {
	return this.cols() * this.imageSize.width;
};

/**
 * @description Height of scenario
 * @return {integer}
 */
Scenario.prototype.height = function() {
	return (this.rows() - 1) * this.imageSize.height + this.imageSize.full;
};

/**
 * @description Renders the scene
 * @param  {canvas 2d} ctx
 * @param  {object} loader - Resources Loader instance
 * @param  {[type]} resources - Resources instance
 */
Scenario.prototype.render = function(ctx, loader, resources) {
	var urlsRowsImages = []
		numRows = this.rows(),
		numCols = this.cols();

	this.getEnvironments().forEach(function(environment) {
		for(var i = 0; i < this.rowsForEnvironment(environment); i++) {
			urlsRowsImages.push(resources.urlImage('scenario', environment));
		}
	}.bind(this));

	for (var row = 0; row < numRows; row++) {
		for (var col = 0; col < numCols; col++) {
			ctx.drawImage(loader.get(urlsRowsImages[row]),
				col * this.imageSize.width,
				row * this.imageSize.height);
		}
	}
};
