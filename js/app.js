var config          = new Config,
    resources       = new Resources,
    scenario        = new Scenario,
    routes          = new Routes,
    traffic         = new Traffic,
    scoreboard      = new Scoreboard,
    sbWebInterface  = new ScoreboardWebInterface(this),
    canvas          = new Canvas(this),
    resourcesLoader = new ResourcesLoader,
    engine          = new Engine(this),
    gameControl     = new GameControl(this);

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

// Scoreboard
scoreboard.setConfig(config.select('scoreboard'));
sbWebInterface.setConfig(config.select('scoreboard'));
scoreboard.setWebInterface(sbWebInterface);

// Resources Loader
resourcesLoader.load(resources.urlsAllImages());

// Factory
var factory = new EntityFactory;
factory.setResources(resources);
factory.setCanvas(canvas);
factory.setResourcesLoader(resourcesLoader);
factory.addPartExtra('scenario', scenario);

// Engine
engine.setScenario(scenario);
engine.setTraffic(traffic);
engine.setScoreboard(scoreboard);
// Enemy
engine.addEnemies(factory.createEntity(Bug));
engine.addEnemies(factory.createEntity(Bug));
engine.addEnemies(factory.createEntity(Bug));
// Player
var player = factory.createEntity(Player);
player.addPartExtra('routes', routes);
engine.setPlayer(player);

// Game Control
gameControl.setConfig(config.select('gameControl'));
gameControl.addCallback(engine.inPause.bind(engine));
gameControl.addCallback(player.move.bind(player));
gameControl.init();

// Run Engine
// After loading of the resources
resourcesLoader.onReady(engine.run.bind(engine));
