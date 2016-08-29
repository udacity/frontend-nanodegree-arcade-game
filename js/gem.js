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
