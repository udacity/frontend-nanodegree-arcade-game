var Timer = function() {};

Timer.prototype.secondsToMilliseconds = function(seconds) {
    return seconds * 1000;
};

Timer.prototype.createFutureTime = function(seconds) {
    return new Date(Date.now() + this.secondsToMilliseconds(seconds));
};

Timer.prototype.isFutureTime = function(futureTime) {
    var now = Date.now();
    return now >= futureTime.getTime() ? true : false;
};
