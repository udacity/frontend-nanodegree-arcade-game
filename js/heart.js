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
 * @description Sets action and bonus behavior when colliding with the player.
 */
Heart.prototype.collided = function() {
    var scoreboard = this.getModule('scoreboard');

    scoreboard.addLife(this.scoreIncrement);
    this.reset();
    this.hibernate();
};
