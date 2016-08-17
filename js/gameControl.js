/**
 * @description The control allows the movement of the character and pause the
 * game. You can change the control keys using the configuration file.
 * @constructor
 */
function GameControl() {
    this.callbacks = [];
    Module.call(this);
};

GameControl.prototype = Object.create(Module.prototype);
GameControl.prototype.constructor = GameControl;

/**
 * @description Add functions that will be called when a device key is pressed.
 * @param  {function} callbacks
 */
GameControl.prototype.addCallbacks = function(callbacks) {
    if (callbacks instanceof Array) {
        callbacks.forEach(function(callback) {
            this.addCallbacks(callback);
        }.bind(this));
    } else if (typeof callbacks === 'function') {
        this.callbacks.push(callbacks);
    } else {
        throw new TypeError('Waiting for a valid function');
    }
};

/**
 * @description Checks if there is a defined callback function.
 * @return {boolean}
 */
GameControl.prototype.hasCallbacks = function() {
    return this.callbacks.length > 0 ? true : false;
};

/**
 * @description Starts the listener. When a device key is pressed performs the
 * callback functions.
 */
GameControl.prototype.init = function() {
    var callbacks           = this.callbacks,
        standardDevice      = this.getConfig().standardDevice,
        deviceAllowedKeys   = this.getConfig()[standardDevice];

    if (!this.hasCallbacks())
        throw new TypeError('Need at least one function added to the callback');

    document.addEventListener('keyup', function(e) {
        callbacks.forEach(function(cb) {
            cb(deviceAllowedKeys[e.keyCode]);
        });
    });
};
