/**
 * @description Manages resources.
 * @constructor
 */
function Resources() {
    Module.call(this);
};

Resources.prototype = Object.create(Module.prototype);
Resources.prototype.constructor = Resources;

/**
 * @description Selects the settings for a specific resource.
 * @param  {string} resource - Resource name to be selected
 * @return {object} Object containing all resource settings
 */
Resources.prototype.getResourceConfig = function(resource) {
    var config = this.getConfig();

    if (!config.hasOwnProperty(resource))
        throw new TypeError('config not found: ' + resource);

    return config[resource];
};

/**
 * @description Image dimensions.
 * @param  {string} dimension - Options: width, height and full
 * @return {integer}
 */
Resources.prototype.imageSize = function(dimension) {
    var images = this.getResourceConfig('images');

    return images.size[dimension];
};

/**
 * @description Redeem the URL of a specific resource.
 * @param  {string} group   - The type of element that refers the resource.
 * Exemple: scenario, enemies, etc
 * @param  {string} element - Exemple: water
 * @return {string}
 */
Resources.prototype.urlImage = function(group, element) {
    var images = this.getResourceConfig('images');

    return images.urls[group][element];
};

/**
 * @description Returns a set of URLs according to the group of element.
 * @param  {string} group    - The group of element that refers the resource.
 * Exemple: scenario, enemies, etc
 * @param  {boolean} toObject - When the value is true returns the urls set on
 * an object
 * @return {array or object}
 */
Resources.prototype.urlsByImagesGroup = function(group, toObject) {
    var images			= this.getResourceConfig('images'),
    	imagesArray		= [],
    	imagesByGroup	= images.urls[group];

    if (toObject === true)
    	return imagesByGroup;

    Object.keys(imagesByGroup).forEach(function(url) {
    	imagesArray.push(imagesByGroup[url]);
    });

    return imagesArray;
};

/**
 * @description Returns a set with the urls of all resources.
 * @param  {boolean} toObject - When the value is true returns the urls set on
 * an object
 * @return {array or object}
 */
Resources.prototype.urlsAllImages = function(toObject) {
    var images		= this.getResourceConfig('images'),
    	imagesArray	= [],
    	allImages	= images.urls;

    if (toObject === true)
    	return allImages;

    Object.keys(allImages).forEach(function(group){
    	imagesArray = imagesArray.concat(this.urlsByImagesGroup(group));
    }.bind(this));

    return imagesArray;
};
