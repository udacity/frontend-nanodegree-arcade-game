/**
 * @description Allows you to create your entities.
 * @constructor
 */
var Entity = function() {
    this.hibernation = false;
    Module.call(this);
};

Entity.prototype = Object.create(Module.prototype);
Entity.prototype.constructor = Entity;

/**
 * @description Putting an entity in hibernation. Hibernation will last until
 * the set time (in seconds) over.
 * @param  {number} duration
 */
Entity.prototype.hibernate = function(duration) {
    var timer = this.getModule('timer');

    this['endHibernation'] = timer.createFutureTime(duration);
    this.hibernation = true;
};

/**
 * @description Verifies that hibernation is over. If so changes the active
 * state to the entity.
 */
Entity.prototype.followHibernation = function() {
    var timer = this.getModule('timer');

    if (timer.isFutureTime(this.endHibernation)) {
        this.hibernation = false;
        delete this.endHibernation;
    }
};

/**
 * @description Returns status the hibernation of the entity.
 * @return {boolean}
 */
Entity.prototype.checkHibernation = function() {
    return this.hibernation;
};

/**
 * @description Returns the entity's position on the x axis.
 * @return {number}
 */
Entity.prototype.axisX = function() {
    return this.x;
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
 * @description Every entity has a sprite. An image that is rendered on the
 * user's screen. This function converts an object containing the group and
 * entity's name in an address (url) valid.
 */
Entity.prototype.convertSprite = function() {
    var resources       = this.getModule('resources'),
        spriteGroup     = this.sprite.group,
        spriteName      = this.sprite.name;

    this.sprite = resources.urlImage(spriteGroup, spriteName);
};

/**
 * @description This function renders the entity on the screen. Positioned in
 * the x-axis and y acorco with the value of x and route.
 */
Entity.prototype.render = function() {
    var canvas          = this.getModule('canvas'),
        resourcesLoader = this.getModule('resourcesLoader'),
        ctx             = canvas.getContext();

    if (this.hasOwnProperty('endHibernation'))
        this.followHibernation();

    if (this.hibernation === false)
        ctx.drawImage(resourcesLoader.get(this.sprite), this.x, this.route);
};
