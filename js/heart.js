/**
 * @description Hearts are bonuses that the player can collect during the game.
 * When collected, add extra lives.
 * @constructor
 */
function Heart() {
    Bonus.call(this);
};

Heart.prototype = Object.create(Bonus.prototype);
Heart.prototype.constructor = Heart;

/**
 * Initialize a heart
 */
Heart.prototype.init = function() {
    var traffic = this.getModule('traffic');

    if (!this.isInitialized()) {
        this.setPadding(20);
        this.setEntityGroup('bonus');
        this.addTerrainsSurface(['grass','stone']);
        this.generateSprite();
        this.initialize();
        this.hibernate();
    }

    this.setAxisX(this.getRandomAxisX());
    this.setRoute(traffic.getRoute(this.getTerrainsSurface()));
};

/**
 * @description Sets action and bonus behavior when colliding with the player.
 */
Heart.prototype.collided = function() {
    var scoreboard = this.getModule('scoreboard');

    scoreboard.addLife(this.scoreIncrement);
    this.reset();
    this.hibernate();
};
