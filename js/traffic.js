/**
 * @description It is important to control the traffic of their routes. This
 * allows a better gaming experience, allowing the player to plan your moves a
 * step before.
 * @constructor
 */
var Traffic = function() {
    Module.call(this);
    this.routes;
    this.routesInUse = {};
};

Traffic.prototype = Object.create(Module.prototype);
Traffic.prototype.constructor = Traffic;

/**
 * @description Assigning Routes Object
 * @param  {object} routes
 * @return {object}
 */
Traffic.prototype.setRoutes = function(routes) {
    if(!(routes instanceof Routes))
        throw new TypeError('Traffic needs to allocate an instance of Routes.');
    this.routes = routes;
};

/**
 * @description Add an enemy on a route
 * @param  {numeric} route
 */
Traffic.prototype.addOnTheRoute = function(route) {
    if(!this.routesInUse.hasOwnProperty(route))
        this.routesInUse[route] = 0;
    this.routesInUse[route]++;
};

/**
 * @description Remove an enemy of a route
 * @param  {numeric} route
 */
Traffic.prototype.removeOfRoute = function(route) {
    if(this.routesInUse[route] > 0)
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
    return this.routesInUse[route] == this.config.routeCapacity ? true : false;
};

/**
 * @description This feature works in conjunction with "routeIsFull" to
 * determine a free route.
 * @param  {string or array} environments
 * @return {number} (Route)
 */
Traffic.prototype.getEmptyRoute = function(environments) {
    var routes = this.routes.get(environments),
        route = routes[Math.floor(Math.random() * routes.length)];

    return this.routeIsFull(route) ? this.getEmptyRoute(environments) : route;
};

/**
 * @description This function works to keep the traffic of your updated routes.
 */
Traffic.prototype.reloadRoutesInUse = function() {};

/**
 * @description Forwards the latest changes of route traffic to Registry.
 */
Traffic.prototype.pushRoutesInUse = function() {}
