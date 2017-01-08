/**
 * @description It lets you control some aspects of time.
 * @constructor
 */
function Timer() {
    Module.call(this);
};

Timer.prototype = Object.create(Module.prototype);
Timer.prototype.constructor = Timer;

/**
 * @description Convert seconds to milliseconds.
 * @param  {number} seconds
 * @return {number}
 */
Timer.prototype.secondsToMilliseconds = function(seconds) {
    if (typeof seconds !== 'number')
        throw new TypeError('Waiting value in seconds');

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
    if (!(futureTime instanceof Date))
        throw new TypeError('Waiting a instance Date');

    var now = Date.now();
    return now >= futureTime.getTime() ? true : false;
};
