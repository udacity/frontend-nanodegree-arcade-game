/**
 * @description Controls the score of the game.
 * @constructor
 */
var Scoreboard = function() {
    this.life;
    this.score;
    this.level;
    this.scoreNextLevelUp;
    Module.call(this);
};

Scoreboard.prototype = Object.create(Module.prototype);
Scoreboard.prototype.constructor = Scoreboard;

/**
 * @description Starts the score. Assigns default settings.
 */
Scoreboard.prototype.init = function() {
    this.life   = this.config.life.startingIn;
    this.score  = this.config.score.startingIn;
    this.level  = this.config.level.startingIn;
    this.scoreNextLevelUp = this.config.level.fisrtLevelUp;
};

/**
 * @description Add points to the score. If a score has not been assigned,
 * amount of standard points will be added.
 * @param  {number} score
 */
Scoreboard.prototype.addScore = function(score) {
    this.score += score === undefined ? this.config.score.increment : score;
    if(this.score > this.scoreNextLevelUp)
        this.addLevel();
};

/**
 * @description Returns the number of points.
 * @return {number}
 */
Scoreboard.prototype.getScore = function() {
    return this.score;
};

/**
 * @description A new level is added to the game automatically when score
 * reaches a number of points. After the new level is added, a new amount of
 * points to be achieved to the next level is added to the score of the game.
 */
Scoreboard.prototype.addLevel = function() {
    var score,
        nextLevelUp = this.scoreNextLevelUp,
        percentage  = this.config.level.percentageNextLevel;

    this.level++;
    this.scoreNextLevelUp = (nextLevelUp/100) * percentage + nextLevelUp;
};

/**
 * @description Returns the current level of the game.
 * @return {number}
 */
Scoreboard.prototype.getLevel = function() {
    return this.level;
};

/**
 * @description Add life to player.
 * @param  {number} life - A value other than the default value (1)
 */
Scoreboard.prototype.addLife = function(life) {
    life === undefined ? this.life++ : this.life += life;
};

/**
 * @description Each point of life is consumed when the player collides with an
 * enemy or falls into the water.
 * @param  {number} life - A value other than the default value (1)
 */
Scoreboard.prototype.removeLife = function(life) {
    life === undefined ? this.life-- : this.life -= life;
};

/**
 * @description Returns the number of lives that the player still has.
 * @return {number}
 */
Scoreboard.prototype.getLife = function() {
    return this.life;
};

/**
 * @description Checks if the player still has life. Otherwise it returns true
 * to the end of the game.
 * @return {boolean}
 */
Scoreboard.prototype.isGameOver = function() {
    return this.life < 0 ? true : false;
};

/**
 * @description Restarts the score with the default values.
 */
Scoreboard.prototype.reset = function() {
    this.init();
};
