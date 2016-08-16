/**
 * @description This is the player. You can control various aspects of the
 * player in this file.
 * @constructor
 */
function Player() {
    Entity.call(this);
};

Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

/**
 * @description Initializes the character giving the required settings. You can
 * change any default setting through specific methods.
 */
Player.prototype.init = function() {
    if (!this.isInitialized()) {
        this.setPadding(45);
        this.setEntityName('boy');
        this.setEntityGroup('characters');
        this.addTerrainsSurface(['stone', 'grass']);
        this.generateSprite();
        this.initialize();
        this.moveForStartPoint();
    }
};

/**
 * @description Move the character up. When the character hits the water it is
 * redirected to the starting point and points are scored on your score.
 * @param  {number} distance
 */
Player.prototype.moveUp = function(distance) {
    var routes      = this.getModule('routes')
        startWater  = routes.getFirstOrLast('last', 'water');

    this.setRoute((this.getRoute() - distance));
    if (this.getRoute() <= startWater) {
        this.moveForStartPoint();
    }
};

/**
 * @description Move the character to the right. Before performing the motion
 * check if this move will not take the character out of the scenario. If
 * everything is correct, move the character.
 * @param  {number} distance
 */
Player.prototype.moveRight = function(distance) {
    var scenario = this.getModule('scenario'),
        position = (this.getAxisX() + distance);

    if (position < scenario.width())
        this.setAxisX(position);
};

/**
 * @description Move the character down. Before performing the motion check if
 * this move will not take the character out of the ground allowed. If
 * everything is correct, move the character.
 * @param  {number} distance
 */
Player.prototype.moveDown = function(distance) {
    var routes      = this.getModule('routes'),
        position    = (this.getRoute() + distance);

    if (position <= routes.getFirstOrLast('last', this.getTerrainsSurface()))
        this.setRoute(position);
};

/**
 * @description Move the character to the left. Before performing the motion
 * check if this move will not take the character out of the scenario. If
 * everything is correct, move the character.
 * @param  {number} distance
 */
Player.prototype.moveLeft = function(distance) {
    var scenario = this.getModule('scenario'),
        position = (this.getAxisX() - distance);

    if (position >= 0)
        this.setAxisX(position);
};

/**
 * @description Move the character to the starting point of the scene. The
 * starting point will always be a median column, or close to it, that is the
 * last route permitada for the character.
 */
Player.prototype.moveForStartPoint = function() {
    var routes          = this.getModule('routes'),
        scenario        = this.getModule('scenario'),
        scenarioColumns = scenario.getColumnsPositions();

    this.setAxisX(scenarioColumns[Math.floor((scenario.numberColumns() / 2))]);
    this.setRoute(routes.getFirstOrLast('last', this.getTerrainsSurface()));
};

/**
 * @description Awaits motion events. So when receiving, moving the character
 * according to the direction.
 * @param  {string} direction
 */
Player.prototype.move = function(direction) {
    var resources   = this.getModule('resources'),
        imageWidth  = resources.imageSize('width'),
        imageHeight = resources.imageSize('height');

    switch (direction) {
        case 'up':
            this.moveUp(imageHeight);
            break;

        case 'right':
            this.moveRight(imageWidth);
            break;

        case 'down':
            this.moveDown(imageHeight);
            break;

        case 'left':
            this.moveLeft(imageWidth);
            break;
    }
};
