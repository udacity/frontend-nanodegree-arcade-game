/**
 * @description Score of the Game. You can add new points, levels and lives.
 * Moreover, it is also remove lives and redeem any amount of scoreboard.
 * @constructor
 */
function Scoreboard() {
    this.score = 0;
    this.level = 0;
    this.life = 0;
    this.nextLevel = 0;
    Module.call(this);
};

Scoreboard.prototype = Object.create(Module.prototype);
Scoreboard.prototype.constructor = Scoreboard;

/**
 * @description Starts the score of the game. Updates the default settings.
 */
Scoreboard.prototype.init = function() {
    var scoreboardWI = this.getModule('scoreboardwebinterface');

    this.addData('score', this.getConfig().score.startingIn);
    this.addData('level', this.getConfig().level.startingIn);
    this.addData('life', this.getConfig().life.startingIn);
    this.changeNextLevel(this.getConfig().level.fisrtLevelUp);

    if (this.hasRecord()) {
        scoreboardWI.display('record', 'inline');
        scoreboardWI.change('record', this.getRecord());
        scoreboardWI.animation('record');
    } else  {
        scoreboardWI.display('record', 'none');
    }
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
        valueConsidered = value === undefined ? valueDefault : value,
        scoreboardWI    = this.getModule('scoreboardwebinterface');

    this[name] = (valueActual + valueConsidered);
    scoreboardWI.change(name, this.getData(name));
    scoreboardWI.animation(name);
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
        valueConsidered = value === undefined ? valueDefault : value,
        scoreboardWI    = this.getModule('scoreboardwebinterface');

    this[name] = (valueActual - valueConsidered);
    scoreboardWI.change(name, this.getData(name));
    scoreboardWI.animation(name, 'remove');
};

/**
 * @description Return a given scoreboard in accordance with the given name.
 * @param  {string} name - Data field name
 * @return {number}
 */
Scoreboard.prototype.getData = function(name) {
    return this[name];
};

/**
 * @description Changes the amount necessary to reach the new level.
 * @param  {number} value
 */
Scoreboard.prototype.changeNextLevel = function(value) {
    if (typeof value !== 'number')
        throw new TypeError('Waiting for a valid number');

    this.nextLevel = value;
};

/**
 * @description Returns the amount needed to achieve a new level.
 * @return {number} [description]
 */
Scoreboard.prototype.getNextLevel = function() {
    return this.nextLevel;
}

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

    this.changeNextLevel(Math.floor(nextLevel));
    this.addData('level', level, 1);
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

    if (this.isGameOver())
        this.reset();
};

/**
 * @description Returns the number of lives.
 * @return {number} [description]
 */
Scoreboard.prototype.getLife = function() {
    return this.getData('life');
};

/**
 * @description Reset and init scoreboard.
 */
Scoreboard.prototype.reset = function() {
    if (this.isRecord())
        localStorage.setItem('nanodegreeGameRecord', this.getScore());

    this.score = 0;
    this.level = 0;
    this.life = 0;
    this.init();
};

/**
 * @description Verifies that the character loses all lives and the game is over.
 * @return {boolean}
 */
Scoreboard.prototype.isGameOver = function() {
    return this.getData('life') < 0 ? true : false;
};

/**
 * @description Checks whether the browser supports localStorage.
 * @return {boolean}
 */
Scoreboard.prototype.isSupportStorage = function() {
    return window.localStorage ? true : false;
};

/**
 * @description Checks that the record was added.
 * @return {boolean}
 */
Scoreboard.prototype.hasRecord = function() {
    if (this.isSupportStorage()) {
        if (localStorage.getItem('nanodegreeGameRecord') !== null)
            return true;
    }

    return false;
};

/**
 * @description Verifies that a new record has been reached.
 * @return {boolean}
 */
Scoreboard.prototype.isRecord = function() {
    if (!this.isSupportStorage())
        return false;

    if (this.hasRecord()) {
        var record = this.getRecord();

        if (this.getScore() <= record)
            return false;
    }

    return true;
};

/**
 * @description Returns the current record.
 * @return {number}
 */
Scoreboard.prototype.getRecord = function() {
    return parseInt(localStorage.getItem('nanodegreeGameRecord'));
};
