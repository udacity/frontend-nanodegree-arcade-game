/**
 * @description Routes are imaginary points (cordenadas on the Y axis). Roads
 * that your enemies will go through the game. The number of routes imaginary is
 * equal to the number of lines of the scenario. This route manager sets these
 * imaginary points using the standard height of the images to create a
 * cordenada near the center of each line.
 * @constructor
 */
var Routes = function() {
	this.routes = {};
};

/**
 * @description Create routes scenario
 * @param  {object} rowsAndTypes - An object containing environments and their
 * respective amounts of rows.
 * @param  {integer} imageHeight  - Standard height of game images
 */
Routes.prototype.create = function(rowsForEnvironment, imageHeight) {
	var currentRoute = -124.5;

    Object.keys(rowsForEnvironment).forEach(function(environment) {
        for(var i = 0; i < rowsForEnvironment[environment]; i++) {
            currentRoute += imageHeight;
            if (!this.routes.hasOwnProperty(environment))
                this.routes[environment] = [];
            this.routes[environment].push(currentRoute);
        }
    }.bind(this));
};

/**
 * @description Returns an array containing all routes. By setting its own
 * environment, only the routes of this environment will be returned.
 * @param {string or array} environments
 * @return {array}
 */
Routes.prototype.get = function(environments) {
    var routesArray = [];

    if (typeof environments === 'string') {
        return this.routes[environments];
    } else if (environments instanceof Array) {
        environments.forEach(function(environment) {
            routesArray = routesArray.concat(this.routes[environment]);
        }.bind(this));
        return routesArray;
    } else {
        return this.get(Object.keys(this.routes));
    }
};

/**
 * @description Returns the first or last route. The count is performed from the
 * top down scenario. That is, the first route is on top. The last in cenário
 * bottom.
 * @param  {array} routes
 * @param  {string} firstOrLast - last. fitst is default.
 * @return {number}
 */
Routes.prototype.getFirstOrLast = function(routes, firstOrLast) {
    var firstRoute = Math.min.apply(null, routes),
        lastRoute = Math.max.apply(null, routes);

    return firstOrLast === 'last' ? lastRoute : firstRoute;
};
