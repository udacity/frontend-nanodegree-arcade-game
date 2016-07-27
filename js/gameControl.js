/**
 * @description This is the control of your game. You can enable new key in the
 * configuration file or even add a new device.
 * @constructor
 * @param  {object} global
 */
var GameControl = function(global) {
    this.doc = global;
    this.callbacks = [];
    Module.call(this);
};

GameControl.prototype = Object.create(Module.prototype);
GameControl.prototype.constructor = GameControl;

/**
 * @description Functions they receive a call when there is action on the keys.
 * @param  {function} callback
 */
GameControl.prototype.addCallback = function(callback) {
    this.callbacks.push(callback);
};

/**
 * @description Starts the listener. When an action occurs, the ear will send a
 * call the added functions.
 */
GameControl.prototype.init = function() {
    var callbacks           = this.callbacks,
        standardDevice      = this.config.standardDevice,
        deviceAllowedKeys   = this.config[standardDevice];

    this.doc.addEventListener('keyup', function(e) {
        callbacks.forEach(function(cb) {
            cb(deviceAllowedKeys[e.keyCode]);
        });
    });
};
