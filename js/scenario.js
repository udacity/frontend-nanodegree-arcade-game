/**
 * @description It offers useful information about the scenario
 * @constructor
 * @param {config} config - configurations of scenario
 */
var Scenario = function(config) {
	Module.call(this, config);
};

Scenario.prototype = Object.create(Module.prototype);
Scenario.prototype.constructor = Scenario;

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
 * @description Whidth of scenario
 * @param  {integer} imageWidth - This value can be changed in the resource
 * settings. IMPORTANT: Change the value only if you have knowledge of the
 * codes involved.
 * @return {integer}
 */
Scenario.prototype.width = function(imageWidth) {
	return this.cols() * imageWidth;
};

/**
 * @description Height of scenario
 * @param  {integer} imageHeight
 * @param  {integer} imageHeightFull
 * These values can be changed in feature settings. IMPORTANT: Change the values
 * only if you have knowledge of the codes involved.
 * @return {integer}
 */
Scenario.prototype.height = function(imageHeight, imageHeightFull) {
	return (this.rows() - 1) * imageHeight + imageHeightFull;
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
				col * resources.imageSize('width'),
				row * resources.imageSize('height'));
		}
	}
};
