/**
 * This is simply an image loading utility. It eases the process of loading
 * image files so that they can be used within your game. It also includes a
 * simple "caching" layer so it will reuse cached images if you attempt to load
 * the same image multiple times.
 * @constructor
 * @return {object}
 */
var ResourcesLoader = function() {
	this.resourceCache = {};
	this.readyCallbacks = [];
};

/**
 * This is the image loading function. It accepts an array of strings pointing
 * to image files or a string for a single image.
 * @param  {string or array} urlOrArr
 */
ResourcesLoader.prototype.load = function(urlOrArr) {
	if(urlOrArr instanceof Array) {
		urlOrArr.forEach(function(url) {
			this._load(url);
		}.bind(this));
	} else {
		this._load(urlOrArr);
	}
};

//improve more... more... this
ResourcesLoader.prototype._load = function(url) {
	if(this.resourceCache[url]) {
		return this.resourceCache[url];
	} else {
		var img = new Image();
		img.onload = function() {
			this.resourceCache[url] = img;

			if(this.isReady()) {
				this.readyCallbacks.forEach(function(func) {
					func();
				});
			}
		}.bind(this);
	}

	this.resourceCache[url] = false;
	img.src = url;
};

/**
 * This is used by developers to grab references to images they know have been
 * previously loaded. If an image is cached, this functions the same as calling
 * load() on that URL.
 * @param  {string} url
 * @return {img}
 */
ResourcesLoader.prototype.get = function(url) {
	return this.resourceCache[url];
};

/**
 * this function determines if all of the images that have been requested for
 * loading have in fact been properly loaded.
 * @return {boolean}
 */
ResourcesLoader.prototype.isReady = function() {
	var ready = true;
	var self = this;
    for(var k in this.resourceCache) {
        if(self.resourceCache.hasOwnProperty(k) &&
           !self.resourceCache[k]) {
            ready = false;
        }
    };
    return ready;
};

/**
 * This function will add a function to the callback stack that is called when
 * all requested images are properly loaded.
 * @param  {func}
 */
ResourcesLoader.prototype.onReady = function(func) {
	this.readyCallbacks.push(func);
};
