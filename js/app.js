var config          = new Config,
    timer           = new Timer,
    resources       = new Resources,
    resourcesLoader = new ResourcesLoader,
    scenario        = new Scenario,
    canvas          = new Canvas(this),
    routes          = new Routes,
    traffic         = new Traffic,
    engine          = new Engine(this);

// Resources
resources.setConfig(config.select('resources'));

// Resources Loader
resourcesLoader.multipleLoad(resources.urlsAllImages());

// Scenario
scenario.setConfig(config.select('scenario'));
scenario.addModules([canvas, resources, resourcesLoader]);

// Canvas
canvas.setConfig(config.select('canvas'));
canvas.size(scenario.width(), scenario.height());
canvas.create();

// Routes
routes.addModules([scenario, resources]);
routes.create();

// Traffic
traffic.addModule(routes);
traffic.setConfig(config.select('traffic'));

// Bug (test)
var bug = new Bug;
bug.addModules([scenario, resources, canvas, resourcesLoader, timer]);

// Player (test)
var player = new Player;
player.addModules([scenario, resources, canvas, resourcesLoader, timer, routes]);
player.init();
console.log(player);

// Engine
engine.addModules([scenario, traffic]);
engine.addEnemies([bug]);
engine.setPlayer(player);

resourcesLoader.onReady(engine.main.bind(engine));
