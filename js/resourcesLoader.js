/**
 * @description This is simply an image loading utility. It eases the process of
 * loading image files so that they can be used within your game. It also
 * includes a simple "caching" layer so it will reuse cached images if you
 * attempt to load the same image multiple times.
 * @constructor
 */
function ResourcesLoader() {
	this.resourceCache = {};
	this.readyCallbacks = [];
	Module.call(this);
};

ResourcesLoader.prototype = Object.create(Module.prototype);
ResourcesLoader.prototype.constructor = ResourcesLoader;

/**
 * @description This is the image loading function.
 * @param  {string} url
 */
ResourcesLoader.prototype.singleLoad = function(url) {
	if (!this.resourceCache.hasOwnProperty(url)) {
		var img = new Image;

		img.onload = function() {
			this.resourceCache[url] = img;
			if (this.isReady())
				this.callbacks();
		}.bind(this);

		img.src = url;
		this.resourceCache[url] = false;
	}
};

/**
 * @description This draws the load function for each picture element of the
 * array. If need be only load an image, use single load.
 * @param  {array}
 */
ResourcesLoader.prototype.multipleLoad = function(urls) {
	if (!(urls instanceof Array))
		throw new TypeError('Waiting a valid array');

	urls.forEach(function(url) {
		this.singleLoad(url);
	}.bind(this));
};

/**
 * @description this function determines if all of the images that have been
 * requested for loading have in fact been properly loaded.
 * @return {boolean}
 */
ResourcesLoader.prototype.isReady = function() {
	var ready = true;

    Object.keys(this.resourceCache).forEach(function(url) {
		if (!(this.resourceCache[url] instanceof Image))
			ready = false;
	}.bind(this));

	return ready;
};

/**
 * @description Calls the callback functions if any.
 */
ResourcesLoader.prototype.callbacks = function() {
	if (this.readyCallbacks.length > 0)
		this.readyCallbacks.forEach(function(func) {
			func();
		});
};

/**
 * @description This is used by developers to grab references to images they
 * know have been previously loaded.
 * @param  {string} url
 * @return {object} - Instance Image
 */
ResourcesLoader.prototype.get = function(url) {
	if (this.resourceCache.hasOwnProperty(url))
		return this.resourceCache[url];

	throw new TypeError('Resource not found');
};

/**
 * This function will add a function to the callback stack that is called when
 * all requested images are properly loaded.
 * @param  {func}
 */
ResourcesLoader.prototype.onReady = function(func) {
	this.readyCallbacks.push(func);
};
