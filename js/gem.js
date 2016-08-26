/**
 * @description Gems are bonuses that the player can collect during the game.
 * Gems, when collected, add an extra score on the game score.
 * @constructor
 */
function Gem() {
    Bonus.call(this);
};

Gem.prototype = Object.create(Bonus.prototype);
Gem.prototype.constructor = Gem;

/**
 * Initialize a gem
 * @return {[type]} [description]
 */
Gem.prototype.init = function() {
    var traffic = this.getModule('traffic');

    if (!this.isInitialized()) {
        this.hibernationInterval(6);
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
