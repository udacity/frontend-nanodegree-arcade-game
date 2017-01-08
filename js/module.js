/**
 * @description Allows you to create your modules.
 * @constructor
 */
function Module() {
    this.config = null;
    this.modules = {};
    this.callbacks = {};
};

/**
 * @description Allows you to include a configurantion object in your modules.
 * @param {object} config - configurations of module
 */
Module.prototype.setConfig = function(config) {
    if (typeof config !== 'object')
        throw new TypeError('Need a valid configuration');

    this.config = config;
};

/**
 * @description Return the configuration assigned to the module.
 * @return {object}
 */
Module.prototype.getConfig = function() {
    if (!this.hasConfig())
        throw new TypeError('Not set configuration');

    return this.config;
};

/**
 * @description Checks if there is a setting in the module.
 * @return {boolean}
 */
Module.prototype.hasConfig = function() {
    return this.config !== null ? true : false;
};

/**
 * @description Add dependencies to module.
 * @param {array} dependencies
 */
Module.prototype.addDependencies = function(dependencies) {
    if (dependencies instanceof Array) {
        dependencies.forEach(function(dependency) {
            this.addDependencies(dependency);
        }.bind(this));
    } else if (dependencies instanceof Module) {
        var label = (dependencies.constructor.name).toLowerCase();

        this.modules[label] = dependencies;
    } else {
        throw new TypeError('Need a valid module or array');
    }
};

/**
 * @description Returns a specific module.
 * @param  {string} label
 * @return {object}
 */
Module.prototype.getModule = function(label) {
    if (!this.modules.hasOwnProperty(label))
        throw new TypeError('Module not found: ' + label);

    return this.modules[label];
};

/**
 * @description Add callbacks functions to the module.
 * @param {string} label
 * @param {function} func
 */
Module.prototype.addCallbacks = function(label, callbacks) {
    if (typeof callbacks !== 'function' && !(callbacks instanceof Array))
        throw new TypeError('Waiting for a valid function or array');

    this.callbacks[label] = callbacks;
};

/**
 * @description Returns a specific callback function.
 * @param  {string} label
 * @return {function}
 */
Module.prototype.getCallbacks = function(label) {
    if (!this.hasCallbacks(label))
        throw new TypeError('Callback not found');

    var callbacks = this.callbacks[label];
    if (typeof callbacks === 'function')
        callbacks = [callbacks];

    return callbacks;
};

/**
 * @description Check if a specific callback function has been added to the
 * module.
 * @param  {string}  label
 * @return {boolean}
 */
Module.prototype.hasCallbacks = function(label) {
    return this.callbacks.hasOwnProperty(label) ? true : false;
};

/**
 * @description Performs a function or an array of callbacks functions.
 * @param  {string} label
 */
Module.prototype.executeCallbacks = function(label) {
    var callbacks = this.getCallbacks(label);

    callbacks.forEach(function(callback) {
        if (typeof callback !== 'function')
            throw new TypeError('Invalid function');

        callback();
    });
};
