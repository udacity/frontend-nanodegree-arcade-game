var Entity = function() {
    this.ctx;
    this.resources;
    this.resourdesLoader;
    this.sprite = {}
};

Entity.prototype.setCtx = function(ctx) {
    this.ctx = ctx;
};

Entity.prototype.setLoader = function(resourcesLoader) {
    this.resourcesLoader = resourcesLoader;
};

Entity.prototype.setResources = function(resources) {
    this.resources = resources;
};

Enemy.prototype.convertSprite = function() {
    if(typeof this.sprite === 'object')
        this.sprite = this.resources.urlImage(
            this.sprite.group,
            this.sprite.element
        );
};
