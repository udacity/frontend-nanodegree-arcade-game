/**
 * @description It lets you control some aspects of time.
 * @constructor
 */
function Timer() {};

/**
 * @description Convert seconds to milliseconds.
 * @param  {number} seconds
 * @return {number}
 */
Timer.prototype.secondsToMilliseconds = function(seconds) {
    return seconds * 1000;
};

/**
 * @description Create an instance of Date at a future time.
 * @param  {number} seconds
 * @return {object} Date
 */
Timer.prototype.createFutureTime = function(seconds) {
    return new Date(Date.now() + this.secondsToMilliseconds(seconds));
};

/**
 * @description Compare dates to indicate whether a given time has been reached.
 * @param  {object} futureTime - Date Instance
 * @return {boolean}
 */
Timer.prototype.isFutureTime = function(futureTime) {
    var now = Date.now();
    return now >= futureTime.getTime() ? true : false;
};
