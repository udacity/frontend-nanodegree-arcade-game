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
    Entity.call(this);
};

Routes.prototype = Object.create(Entity.prototype);
Routes.prototype.constructor = Routes;

/**
 * @description Create routes scenario
 * @param  {object} scenario - Scenario Instance
 */
Routes.prototype.create = function(scenario) {
    var currentRoute = -124.5;

    scenario.getTerrainsSurface().forEach(function(terrain) {
        for(var i = 0; i < scenario.numberRowsByTerrainsSurface(terrain); i++) {
            currentRoute += this.resources.imageSize('height');
            if(!this.routes.hasOwnProperty(terrain))
                this.routes[terrain] = [];

            this.routes[terrain].push(currentRoute);
        }
    }.bind(this));
};

/**
 * @description Returns an array containing all routes. By setting its own
 * environment, only the routes of this environment will be returned.
 * @param {string or array} environments
 * @return {array}
 */
Routes.prototype.get = function(terrains) {
    var routesArray = [];

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
 * top down scenario. That is, the first route is on top. The last in cenário
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
