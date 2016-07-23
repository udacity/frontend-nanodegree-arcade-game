// Creating objects
var config      = new Config,
    resources   = new Resources,
    scenario    = new Scenario,
    routes      = new Routes,
    traffic     = new Traffic,
    loader      = new ResourcesLoader,
    engine      = new Engine(this);

// Assigning settings
resources.setConfig(config.select('resources'));
scenario.setConfig(config.select('scenario'));
traffic.setConfig(config.select('traffic'));

// Assigning Image Size
scenario.setImageSize({
    width: resources.imageSize('width'),
    height: resources.imageSize('height'),
    full: resources.imageSize('full')
});

// Creating routes
routes.create(scenario.rowsForEnvironment(), resources.imageSize('height'));

// Assigning routes to traffic manager
traffic.setRoutes(this.routes);

// Create canvas
engine.createCanvas(this.scenario.width(), this.scenario.height());

// Loader Resources
loader.load(resources.urlsAllImages());

// Assigning parts
engine.setParts('resources', resources);
engine.setParts('scenario', scenario);
engine.setParts('loader', loader);
engine.setParts('traffic', traffic);

// Test Enemy
var enemy = new Bug;
engine.addEnemy(enemy);

// Run engine
loader.onReady(engine.run.bind(engine));
