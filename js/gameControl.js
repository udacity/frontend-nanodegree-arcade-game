/**
 * @description The control allows the movement of the character and pause the
 * game. You can change the control keys using the configuration file.
 * @constructor
 */
function GameControl() {
    Module.call(this);
};

GameControl.prototype = Object.create(Module.prototype);
GameControl.prototype.constructor = GameControl;

/**
 * @description Starts the listener. When a device key is pressed performs the
 * callback functions.
 */
GameControl.prototype.init = function() {
    var callbacks           = this.getCallbacks('keyup'),
        standardDevice      = this.getConfig().standardDevice,
        deviceAllowedKeys   = this.getConfig()[standardDevice];

    document.addEventListener('keyup', function(e) {
        callbacks.forEach(function(cb) {
            cb(deviceAllowedKeys[e.keyCode]);
        });
    });
};
