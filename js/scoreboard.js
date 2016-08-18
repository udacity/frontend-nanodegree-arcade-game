/**
 * @description Score of the Game. You can add new points, levels and lives.
 * Moreover, it is also remove lives and redeem any amount of scoreboard.
 * @constructor
 */
function Scoreboard() {
    this.data = {
        score: 0,
        level: 0,
        life: 0,
        nextLevel: 0
    };
    Module.call(this);
};

Scoreboard.prototype = Object.create(Module.prototype);
Scoreboard.prototype.constructor = Scoreboard;

/**
 * @description Starts the score of the game. Updates the default settings.
 */
Scoreboard.prototype.init = function() {
    this.addData('score', this.getConfig().score.startingIn);
    this.addData('level', this.getConfig().level.startingIn);
    this.addData('life', this.getConfig().life.startingIn);
    this.addData('nextLevel', this.getConfig().level.fisrtLevelUp);
};

/**
 * @description Add data to the score of the game. To add data such as points,
 * lives and levels, use the specific functions.
 * @param {string} name - Data field name
 * @param {number} value
 * @param {undefined or number} valueDefault
 */
Scoreboard.prototype.addData = function(name, value, valueDefault) {
    var valueActual     = this.getData(name),
        valueConsidered = value === undefined ? valueDefault : value;

    this.data[name] = (valueActual + valueConsidered);
};

/**
 * @description Remove data to the score of the game. To remove data such as
 * points, lives and levels, use the specific functions.
 * @param {string} name - Data field name
 * @param {number} value
 * @param {undefined or number} valueDefault
 */
Scoreboard.prototype.removeData = function(name, value, valueDefault) {
    var valueActual     = this.getData(name),
        valueConsidered = value === undefined ? valueDefault : value;

    this.data[name] = (valueActual - valueConsidered);
};

/**
 * @description Return a given scoreboard in accordance with the given name.
 * @param  {string} name - Data field name
 * @return {number}
 */
Scoreboard.prototype.getData = function(name) {
    return this.data[name];
};

/**
 * @description Add score in the scoreboard. You can spend a specific amount
 * that will be added to the score.
 * @param {number} score
 */
Scoreboard.prototype.addScore = function(score) {
    var scoreDefault    = this.getConfig().score.increment;

    this.addData('score', score, scoreDefault);
    if (this.getData('score') >= this.getData('nextLevel'))
        this.addLevel();
};

/**
 * @description Returns the number of points in the game.
 * @return {number}
 */
Scoreboard.prototype.getScore = function() {
    return this.getData('score');
};

/**
 * @description Add a level in the game. You can spend a specific amount that
 * will be added to the scoreboard. This function is automatically called when
 * the score reaches a new level.
 * @param {number} level
 */
Scoreboard.prototype.addLevel = function(level) {
    var percentage          = this.getConfig().level.percentageNextLevel,
        scorePercentage     = (this.getData('nextLevel') * percentage) / 100,
        nextLevel           = (this.getData('nextLevel') * 2) + scorePercentage;

    this.addData('level', level, 1);
    this.addData('nextLevel', Math.floor(nextLevel));
};

/**
 * @description Returns the current level of the game.
 * @return {number}
 */
Scoreboard.prototype.getLevel = function() {
    return this.getData('level');
};

/**
 * @description Add new life. You can spend a specific amount that will be added
 * to the scoreboard.
 * @param {number} life
 */
Scoreboard.prototype.addLife = function(life) {
    this.addData('life', life, 1);
};

/**
 * @description Remove a life. You can spend a specific amount that will be
 * to remove the scoreboard. Lives are automatically removed when the character
 * is hit by enemies.
 * @param  {number} life
 */
Scoreboard.prototype.removeLife = function(life) {
    this.removeData('life', life, 1);
};

/**
 * @description Returns the number of lives.
 * @return {number} [description]
 */
Scoreboard.prototype.getLife = function() {
    return this.getData('life');
};

/**
 * @description Verifies that the character loses all lives and the game is over.
 * @return {boolean}
 */
Scoreboard.prototype.isGameOver = function() {
    return this.getData('life') < 0 ? true : false;
};
