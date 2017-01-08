/**
 * @description Allows you to create your entities.
 * @constructor
 */
function Entity() {
    this.x = 0;
    this.padding = 0;
    this.name = undefined;
    this.group = undefined;
    this.route = undefined;
    this.sprite = undefined;
    this.initialized = false;
    this.terrainsSurface = [];
    this.hibernation = {
        status: false,
        duration: undefined,
        interval: undefined,
        startDate: null,
        endDate: null
    };
    Module.call(this);
};

Entity.prototype = Object.create(Module.prototype);
Entity.prototype.constructor = Entity;

/**
 * @description Initializes the entity. After starting an entity will always be
 * marked as initialized.
 */
Entity.prototype.initialize = function() {
    this.initialized = true;
};

/**
 * @description Returns the state of the entity. (Initialized or uninitialized).
 * @return {boolean}
 */
Entity.prototype.isInitialized = function() {
    return this.initialized;
};

/**
 * @description Hibernates the entity. You must set the time before calling
 * hibernation. If a range is defined entity enter into a constant sleep cycle.
 * That is, waking up and hibernating within the defined values.
 */
Entity.prototype.hibernate = function() {
    var timer       = this.getModule('timer'),
        duration    = this.hibernation.duration;

    this.hibernation.endDate = timer.createFutureTime(duration);
    this.hibernation.status = true;
};

/**
 * @description Sets a duration for hibernation of the entity.
 * @param  {number} duration
 */
Entity.prototype.hibernationDuration = function(duration) {
    this.hibernation.duration = duration;
};

/**
 * @description Sets a range for hibernation of the entity.
 * @param  {number} interval
 */
Entity.prototype.hibernationInterval = function(interval) {
    this.hibernation.interval = interval;
};

/**
 * @description Checks whether an entity is or is not hibernating.
 * @return {boolean}
 */
Entity.prototype.isHibernationActive = function() {
    return this.hibernation.status;
};

/**
 * @description Verifies that came the moment for the entity goes into
 * hibernation.
 * @return {boolean}
 */
Entity.prototype.isStartHibernation = function() {
    var timer = this.getModule('timer');

    return timer.isFutureTime(this.hibernation.startDate) ? true : false;
};

/**
 * @description Verifies that the time has come the entity agrees.
 * @return {boolean}
 */
Entity.prototype.isEndHibernation = function() {
    var timer = this.getModule('timer');

    return timer.isFutureTime(this.hibernation.endDate) ? true : false;
};

/**
 * @description Keep the entity agreed for a certain time. This function is
 * called when a sleep interval is set.
 */
Entity.prototype.waitHibernation = function() {
    var timer       = this.getModule('timer'),
        interval    = this.hibernation.interval;

    this.hibernation.startDate = timer.createFutureTime(interval);
};

/**
 * @description Accompanies the hibernation of the entity. When hibernation
 * comes to an end, wake up the entity.
 */
Entity.prototype.accompanyHibernation = function() {
    if (this.isEndHibernation()) {
        this.hibernation.status = false;
        this.hibernation.endDate = null;
        this.reset();
    }
};

/**
 * @description Accompanies the interval between hibernation entity. When it
 * comes time for a new hibernation puts the body to sleep.
 */
Entity.prototype.accompanyHibernationArrival = function() {
    if (this.isStartHibernation()) {
        this.hibernate();
        this.hibernation.startDate = null;
        this.reset();
    }
};

/**
 * @description Add terrain surfaces. Each route scenario has a specific type of
 * ground surface (eg water, grass, etc.). Add surfaces means giving access to
 * this entity to certain types of land.
 * @param {string or array} terrainsSurface
 */
Entity.prototype.addTerrainsSurface = function(terrainsSurface) {
    if (terrainsSurface instanceof Array)
        this.terrainsSurface = this.terrainsSurface.concat(terrainsSurface);
    else if (typeof terrainsSurface === 'string')
        this.terrainsSurface.push(terrainsSurface);
    else
        throw new TypeError('Invalid terrain surface type');
};

/**
 * @description Returns the surface terrains set for the entity.
 * @return {array}
 */
Entity.prototype.getTerrainsSurface = function() {
    return this.terrainsSurface;
};

/**
 * @description Checks whether the entity has terrains surface. If the terrain
 * parameter is set, it will be checked if the entity has this type of terrain
 * in particular.
 * @param  {string}  terrain - [optional]
 * @return {boolean}
 */
Entity.prototype.hasTerrainsSurface = function(terrain) {
    if (typeof terrain !== 'string')
        return this.terrainsSurface.length > 0 ? true : false;

    return this.terrainsSurface.indexOf(terrain) >= 0 ? true : false;
};

/**
 * @description Defines the group that the entity belongs. (Eg enemies, bonus,
 * etc).
 * @type {string}
 */
Entity.prototype.setEntityGroup = function(group) {
    this.group = group;
};

/**
 * @description Defines the entity name. (example: bug, bee, etc).
 * @param {string} name
 */
Entity.prototype.setEntityName = function(name) {
    this.name = name;
};

/**
 * @description Returns the group to which the entity belongs.
 * @return {string}
 */
Entity.prototype.getEntityGroup = function() {
    return this.group;
};

/**
 * @description Returns the entity name.
 * @return {string}
 */
Entity.prototype.getEntityName = function() {
    return this.name;
};

/**
 * @description Defines a position on the X axis.
 * @param {number} axisX
 */
Entity.prototype.setAxisX = function(axisX) {
    this.x = axisX;
};

/**
 * @description Returns the entity's position on the x axis.
 * @return {number}
 */
Entity.prototype.getAxisX = function() {
    return this.x;
};

/**
 * @description Defines a padding entity. This value will help to calculate
 * accurately colissões.
 * @param {number} padding
 */
Entity.prototype.setPadding = function(padding) {
    this.padding = padding;
};

/**
 * @description Returns the padding of the entity. This value is used to
 * calculate the area of collision between the entities.
 * @return {number}
 */
Entity.prototype.getPadding = function() {
    return this.padding;
};

/**
 * @description Assigns the route that the entity should go.
 * @param  {number} route
 */
Entity.prototype.setRoute = function(route) {
    this.route = route;
};

/**
 * @description Returns the route that the entity this.
 * @return {number}
 */
Entity.prototype.getRoute = function() {
    return this.route;
};

/**
 * @description Checks if a route has been set to entity.
 * @return {boolean}
 */
Entity.prototype.hasRoute = function() {
    return this.route === undefined ? false : true;
};

/**
 * @description Restarts the route of the entity.
 */
Entity.prototype.resetRoute = function() {
    this.route = undefined;
};

/**
 * @description Calculates and returns the collision area of the entity.
 * @return {number}
 */
Entity.prototype.getImpingementArea = function() {
    var resources = this.getModule('resources');

    return resources.imageSize('width') - (2 * this.getPadding());
};

/**
 * @description Calculates and returns the lowest point of the entity collision.
 * @return {number}
 */
Entity.prototype.minCollisionPoint = function() {
    return this.getAxisX() + this.getPadding();
};

/**
 * @description Computes and returns the highest point of the entity collision.
 * @return {number} [description]
 */
Entity.prototype.maxCollisionPoint = function() {
    return this.minCollisionPoint() + this.getImpingementArea();
};

/**
 * @description Every entity has a sprite. An image that is rendered on the
 * user's screen. This function converts an object containing the group and
 * entity's name in an address (url) valid.
 */
Entity.prototype.generateSprite = function() {
    var resources = this.getModule('resources');

    if (typeof this.group !== 'string' || typeof this.name !== 'string')
        throw new TypeError('Waiting for group definition and name');

    this.sprite = resources.urlImage(this.group, this.name);
};

/**
 * @description Return the sprite of entity.
 * @return {undefined or string}
 */
Entity.prototype.getSprite = function() {
    return this.sprite;
};

/**
 * @description Reset enemy.
 */
Entity.prototype.reset = function() {
    this.setAxisX(0);
    this.resetRoute();
};

/**
 * @description This function renders the entity on the screen. Positioned in
 * the x-axis and y acorco with the value of x and route.
 */
Entity.prototype.render = function() {
    var canvas          = this.getModule('canvas'),
        resourcesLoader = this.getModule('resourcesloader'),
        ctx             = canvas.getContext();

    if (this.isHibernationActive()) {
        this.accompanyHibernation();
    } else {
        if (this.hibernation.interval !== undefined) {
            if (this.hibernation.startDate === null)
                this.waitHibernation();
            this.accompanyHibernationArrival();
        }
        ctx.drawImage(resourcesLoader.get(this.getSprite()), this.getAxisX(), this.getRoute());
    }
};
