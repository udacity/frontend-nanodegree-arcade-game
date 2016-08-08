var config          = new Config,
    timer           = new Timer,
    entityFactory   = new EntityFactory,
    resources       = new Resources,
    collision       = new Collision,
    canvas          = new Canvas(this),
    resourcesLoader = new ResourcesLoader,
    scenario        = new Scenario,
    routes          = new Routes,
    traffic         = new Traffic,
    sbWebInterface  = new ScoreboardWebInterface(this),
    scoreboard      = new Scoreboard,
    engine          = new Engine(this),
    gameControl     = new GameControl(this);

// Resources
resources.config(config.select('resources'));

// Collision
collision.addModule('resources', resources);

// Scenario
scenario.config(config.select('scenario'));
scenario.addModule('resources', resources);
scenario.addModule('canvas', canvas);
scenario.addModule('resourcesLoader', resourcesLoader);

// Canvas
canvas.size(scenario.width(), scenario.height());
canvas.appendIn('canvas-container');
canvas.create();

// Routes
routes.addModule('scenario', scenario);
routes.addModule('resources', resources);
routes.create();

// Traffic
traffic.config(config.select('traffic'));
traffic.addModule('routes', routes);

// Scoreboard
scoreboard.config(config.select('scoreboard'));
sbWebInterface.config(config.select('scoreboard'));
scoreboard.addModule('sbWebInterface', sbWebInterface);
scoreboard.init();

// Resources Loader
resourcesLoader.load(resources.urlsAllImages());

// Factory
entityFactory.addModule('timer', timer);
entityFactory.addModule('canvas', canvas);
entityFactory.addModule('scenario', scenario);
entityFactory.addModule('resources', resources);
entityFactory.addModule('resourcesLoader', resourcesLoader);

// Player
var player = entityFactory.createEntity(Player);
player.addModule('routes', routes);

// Engine
engine.addModule('traffic', traffic);
engine.addModule('scenario', scenario);
engine.addModule('collision', collision);
engine.addModule('scoreboard', scoreboard);

// Add Enemies
engine.addEnemies(entityFactory.createEntity(Bug));
engine.addEnemies(entityFactory.createEntity(Bug));
engine.addEnemies(entityFactory.createEntity(Bug));
engine.addEnemies(entityFactory.createEntity(Bee));

// Assign Player
engine.setPlayer(player);

// Game Control
gameControl.config(config.select('gameControl'));
gameControl.addCallback(engine.inPause.bind(engine));
gameControl.addCallback(player.move.bind(player));
gameControl.init();

// Run Engine
// After loading of the resources
resourcesLoader.onReady(engine.run.bind(engine));
