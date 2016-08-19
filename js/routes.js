/**
 * @description Routes are imaginary points (coordinates on the Y axis). Roads
 * that your enemies will go through the game. The number of routes imaginary is
 * equal to the number of lines of the scenario. This route manager sets these
 * imaginary points using the standard height of the images to create a
 * coordinate near the center of each line.
 * @constructor
 */
function Routes() {
    this.routes = {};
    Module.call(this);
};

Routes.prototype = Object.create(Module.prototype);
Routes.prototype.constructor = Routes;

/**
 * @description Create routes scenario
 */
Routes.prototype.create = function() {
    var scenario        = this.getModule('scenario'),
        resources       = this.getModule('resources'),
        currentRoute    = -124.5;

    scenario.getTerrains().forEach(function(terrain) {
        for (let i = 0; i < scenario.numberRowsByTerrain(terrain); i++) {
            currentRoute += resources.imageSize('height');
            if (!this.routes.hasOwnProperty(terrain))
                this.routes[terrain] = [];

            this.routes[terrain].push(currentRoute);
        }
    }.bind(this));
};

/**
 * @description Returns an array containing all routes. By setting its own
 * terrain, only the routes of this terrain will be returned.
 * @param {string or array} terrains
 * @return {array}
 */
Routes.prototype.get = function(terrains) {
    var routesArray = [];

    if (Object.keys(this.routes).length === 0)
        throw new TypeError('Waiting creation of routes');

    if (typeof terrains === 'string') {
        return this.routes[terrains];
    } else if (terrains instanceof Array) {
        terrains.forEach(function(terrain) {
            routesArray = routesArray.concat(this.routes[terrain]);
        }.bind(this));
        return routesArray;
    } else {
        return this.get(Object.keys(this.routes));
    }
};

/**
 * @description Returns the first or last route. The count is performed from the
 * top down scenario. That is, the first route is on top. The last in scenario
 * bottom.
 * @param  {string} firstOrLast - last. first is default.
 * @param  {string, array or empty} terrains
 * @return {number}
 */
Routes.prototype.getFirstOrLast = function(firstOrLast, terrains) {
    var routes      = this.get(terrains),
        firstRoute  = Math.min.apply(null, routes),
        lastRoute   = Math.max.apply(null, routes);

    return firstOrLast === 'last' ? lastRoute : firstRoute;
};
