/**
 * @description It is important to control the traffic of their routes. This
 * allows a better gaming experience, allowing the player to plan your moves a
 * step before.
 * @constructor
 */
function Traffic() {
    this.routesInUse = {};
    Module.call(this);
};

Traffic.prototype = Object.create(Module.prototype);
Traffic.prototype.constructor = Traffic;

/**
 * @description Add an enemy on a route
 * @param  {numeric} route
 */
Traffic.prototype.declareRouteEntry = function(route) {
    if (!this.routesInUse.hasOwnProperty(route))
        this.routesInUse[route] = 0;

    this.routesInUse[route]++;
};

/**
 * @description Remove an enemy of a route
 * @param  {numeric} route
 */
Traffic.prototype.declareRouteOutput = function(route) {
    if (this.routesInUse[route] > 0)
        this.routesInUse[route]--;
};

/**
 * @description This feature allows you to control the traffic on their routes.
 * Before adding a new enemy the route, make sure the path is empty. You can use
 * the "routeIsFull" and also change the route traffic capacity through the
 * configuration file.
 * @param  {numeric} route
 * @return {boolean}
 */
Traffic.prototype.routeIsFull = function(route) {
    var enemiesInRoute = this.routesInUse[route];

    return enemiesInRoute == this.getConfig().routeCapacity ? true : false;
};

/**
 * @description Returns a route belonging to informed terrains.
 * @param  {terrains} terrains
 * @return {number}
 */
Traffic.prototype.getRoute = function(terrains) {
    var routesModule    = this.getModule('routes'),
        routes          = routesModule.get(terrains);

    return routes[Math.floor(Math.random() * routes.length)];
};

/**
 * @description This feature works in conjunction with "routeIsFull" to
 * determine a free route.
 * @param  {string or array} environments
 * @return {number} (Route)
 */
Traffic.prototype.getEmptyRoute = function(terrains) {
    var route = this.getRoute(terrains);

    return this.routeIsFull(route) ? this.getEmptyRoute(terrains) : route;
};
