var config          = new Config,
    resources       = new Resources,
    scenario        = new Scenario,
    routes          = new Routes,
    traffic         = new Traffic,
    canvas          = new Canvas(this),
    resourcesLoader = new ResourcesLoader,
    engine          = new Engine(this);

// Resources
resources.setConfig(config.select('resources'));

// Scenario
scenario.setConfig(config.select('scenario'));
scenario.setResources(resources);
scenario.setCanvas(canvas);
scenario.setResourcesLoader(resourcesLoader);

// Canvas
canvas.size(scenario.width(), scenario.height());
canvas.appendIn('canvas-container');
canvas.create();

// Routes
routes.setResources(resources);
routes.create(scenario);

// Traffic
traffic.setRoutes(routes);
traffic.setConfig(config.select('traffic'));

// Resources Loader
resourcesLoader.load(resources.urlsAllImages());

// Factory
var factory = new EnemyFactory;
factory.setResources(resources);
factory.setCanvas(canvas);
factory.setResourcesLoader(resourcesLoader);
factory.addPartExtra('scenario', scenario);

// Engine
engine.setScenario(scenario);
engine.setTraffic(traffic);
engine.addEnemies(factory.createEnemy(Bug));
engine.addEnemies(factory.createEnemy(Bug));
engine.addEnemies(factory.createEnemy(Bug));

// Run Engine
// After loading of the resources
resourcesLoader.onReady(engine.run.bind(engine));
