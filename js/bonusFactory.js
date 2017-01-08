/**
 * @description Bonus factory
 * @constructor
 */
function BonusFactory() {
    Module.call(this);
};

BonusFactory.prototype = Object.create(Module.prototype);
BonusFactory.prototype.constructor = BonusFactory;

/**
 * @description Create a specific bonus. It is necessary to inject settings.
 * @param  {Bonus} bonusName
 * @param  {object} config
 */
BonusFactory.prototype.create = function(bonusName, config) {
    var entityFactory   = this.getModule('entityfactory'),
        bonus           = entityFactory.create(bonusName);

    bonus.setConfig(config);
    return bonus;
};
