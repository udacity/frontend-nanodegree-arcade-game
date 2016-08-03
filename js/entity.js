/**
 * @description Allows you to create your entities.
 * @constructor
 */
var Entity = function() {
    this.rendering = true;
    Module.call(this);
};

Entity.prototype = Object.create(Module.prototype);
Entity.prototype.constructor = Entity;

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
 * @description Enable rendering entity.
 */
Entity.prototype.activateRender = function() {
    this.rendering = true;
};

/**
 * @description Disable rendering of the entity.
 */
Entity.prototype.deactivateRender = function() {
    this.rendering = false;
};

/**
 * @description This function renders the entity on the screen. Positioned in
 * the x-axis and y acorco with the value of x and route.
 */
Entity.prototype.render = function() {
    var canvas          = this.getModule('canvas'),
        resourcesLoader = this.getModule('resourcesLoader'),
        ctx             = canvas.getContext();

    if(this.rendering)
        ctx.drawImage(resourcesLoader.get(this.sprite), this.x, this.route);
};
