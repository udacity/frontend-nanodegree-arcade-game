var config          = new Config,
    timer           = new Timer,
    resources       = new Resources,
    resourcesLoader = new ResourcesLoader,
    scenario        = new Scenario,
    canvas          = new Canvas,
    routes          = new Routes,
    traffic         = new Traffic,
    scoreboard      = new Scoreboard,
    entityFactory   = new EntityFactory,
    engine          = new Engine,
    gameControl     = new GameControl;

// Resources
resources.setConfig(config.select('resources'));

// Resources Loader
resourcesLoader.multipleLoad(resources.urlsAllImages());

// Scenario
scenario.setConfig(config.select('scenario'));
scenario.addDependencies([canvas, resources, resourcesLoader]);

// Canvas
canvas.setConfig(config.select('canvas'));
canvas.size(scenario.width(), scenario.height());
canvas.create();

// Routes
routes.addDependencies([scenario, resources]);
routes.create();

// Traffic
traffic.addDependency(routes);
traffic.setConfig(config.select('traffic'));

// Scoreboard
scoreboard.setConfig(config.select('scoreboard'));
scoreboard.init();

// Entity Factory
entityFactory.addDefaultDependencies([
    scenario,
    resources,
    canvas,
    resourcesLoader,
    timer
]);

// Player
var player = entityFactory.create(Player, [routes, scoreboard]);

// Engine
engine.addDependencies([scenario, traffic]);
engine.addEnemies([
    entityFactory.create(Bug),
    entityFactory.create(Bug),
    entityFactory.create(Bug),
    entityFactory.create(Bee)
]);
engine.setPlayer(player);

// Game Control
gameControl.setConfig(config.select('gameControl'));
gameControl.addCallbacks([
    engine.pauseGame.bind(engine),
    player.move.bind(player)
]);
gameControl.init();

// Run
resourcesLoader.onReady(engine.run.bind(engine));
