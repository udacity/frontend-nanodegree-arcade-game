/**
 * @description Manages resources.
 * @constructor
 * @param {config} config - configurations of resources
 */
var Resources = function() {
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
	return this.config[resource];
};

/**
 * @description Image dimensions.
 * @param  {string} dimension - Options: width, height and full
 * @return {integer}
 */
Resources.prototype.imageSize = function(dimension) {
	var imageConfig = this.getResourceConfig('images');
	return imageConfig.size[dimension];
};

/**
 * @description Redeem the URL of a specific resource.
 * @param  {string} group   - The type of element that refers the resource.
 * Exemple: scenario, enemies, etc
 * @param  {string} name - Exemple: water
 * @return {string}
 */
Resources.prototype.urlImage = function(group, name) {
	var imageConfig = this.getResourceConfig('images');
	return imageConfig.urls[group][name];
};

/**
 * @description Returns a set of URLs according to the group of element.
 * @param  {string} group    - The group of element that refers the resource.
 * Exemple: scenario, enemies, etc
 * @param  {boolean} toObject - When the value is true returns the urls set on
 * an object
 * @return {array}
 */
Resources.prototype.urlsByImagesGroup = function(group, toObject) {
	var imagesArray = [],
		imageConfig = this.getResourceConfig('images'),
		imagesByGroup = imageConfig.urls[group];

	if(toObject === true)
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
 * @return {array}
 */
Resources.prototype.urlsAllImages = function(toObject) {
	var imagesArray = [],
		imageConfig = this.getResourceConfig('images'),
		allImages = imageConfig.urls;

	if(toObject === true)
		return allImages;

	Object.keys(allImages).forEach(function(group){
		imagesArray = imagesArray.concat(this.urlsByImagesGroup(group));
	}.bind(this));
	return imagesArray;
};
