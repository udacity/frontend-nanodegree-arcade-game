/**
 * @description Allows you to create your modules.
 * @constructor
 */
function Module() {
    this.config = null;
    this.modules = {};
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
 * @description Add a new dependency to module.
 * @param  {Module} dependencyModule - Module heritage
 * @param  {string} label - Optional. If the label is not assigned, the
 * dependency name, in lower case will be considered as a label.
 */
Module.prototype.addDependency = function(dependency, label) {
    if (!(dependency instanceof Module))
        throw new TypeError('Need a valid module');

    if (label === undefined)
        label = (dependency.constructor.name).toLowerCase();

    this.modules[label] = dependency;
};

/**
 * @description Add multiple dependencies to module.
 * @param {array} dependencies
 */
Module.prototype.addDependencies = function(dependencies) {
    if (!(dependencies instanceof Array))
        throw new TypeError('Waiting array dependencies');

    dependencies.forEach(function(dependency) {
        this.addDependency(dependency);
    }.bind(this));
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
